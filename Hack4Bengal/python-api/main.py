from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import List, Optional, Dict, Any
import pandas as pd
import joblib
import os
from langchain_community.llms import Ollama
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
import asyncio
from functools import lru_cache

app = FastAPI(title="EcoSwitch Carbon Footprint API")

# Enable CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all encoders and model
try:
    body_onec = joblib.load('model/body_onec.pkl')
    diet_onec = joblib.load('model/diet_onec.pkl')
    shower_onec = joblib.load('model/shower_onec.pkl')
    heating_onec = joblib.load('model/heating_onec.pkl')
    transport_onec = joblib.load('model/transport_onec.pkl')
    vehicle_onec = joblib.load('model/vehicle_onec.pkl')
    social_onec = joblib.load('model/social_onec.pkl')
    freq_onec = joblib.load('model/freq_onec.pkl')
    wasteSize_onec = joblib.load('model/wasteSize_onec.pkl')
    energyEff_onec = joblib.load('model/energyEff_onec.pkl')
    Sex_encoder = joblib.load('model/Sex_encoder.pkl')
    recycle_bin = joblib.load('model/recycle_bin.pkl')
    cook_bin = joblib.load('model/cook_bin.pkl')
    model = joblib.load('model/xgboost_model_tuned.pkl')
except Exception as e:
    print(f"Error loading models or encoders: {e}")
    # You might want to handle this more gracefully in production

# Input validation model
class UserInput(BaseModel):
    Sex: str
    MonthlyGroceryBill: float
    VehicleMonthlyDistanceKm: float
    WasteBagWeeklyCount: int
    HowLongTVPCDailyHour: float
    HowManyNewClothesMonthly: int
    HowLongInternetDailyHour: float
    BodyType: str
    Diet: str
    HowOftenShower: str
    HeatingEnergySource: str
    Transport: str
    VehicleType: str
    SocialActivity: str
    FrequencyOfTravelingByAir: str
    WasteBagSize: str
    EnergyEfficiency: str
    Recycling: List[str]
    CookingWith: List[str]

    @validator('VehicleType')
    def validate_vehicle_type(cls, v, values):
        if values.get('Transport') != 'private' and v != 'Unknown':
            raise ValueError("Vehicle type should be 'Unknown' for non-private transport")
        return v

    @validator('VehicleMonthlyDistanceKm')
    def validate_vehicle_distance(cls, v, values):
        if values.get('Transport') == 'walk/bicycle' and v > 0:
            raise ValueError("Vehicle distance must be 0 when transport is walk/bicycle")
        return v

    @validator('HowLongTVPCDailyHour', 'HowLongInternetDailyHour')
    def validate_screen_time(cls, v, values):
        if 'HowLongTVPCDailyHour' in values and 'HowLongInternetDailyHour' in values:
            if values['HowLongTVPCDailyHour'] + v > 24:
                raise ValueError("Total screen time cannot exceed 24 hours per day")
        return v

# Chatbot input model
class ChatbotRequest(BaseModel):
    query: str
    carbon_footprint: Optional[float] = None
    user_data: Optional[Dict[str, Any]] = None

# -----------------------------
# Knowledge Base & Chatbot Setup
# -----------------------------
@lru_cache(maxsize=1)
def setup_retriever():
    """Cache the retriever setup to avoid reloading on each request"""
    try:
        loader = WebBaseLoader(["https://www.ipcc.ch/reports/"])
        docs = loader.load()
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = splitter.split_documents(docs)
        vectorstore = Chroma.from_documents(splits, embedding=HuggingFaceEmbeddings())
        return vectorstore.as_retriever()
    except Exception as e:
        print(f"Error setting up retriever: {e}")
        return None

# Initialize retriever on startup to avoid first-request delay
@app.on_event("startup")
async def startup_event():
    # Initialize in background to avoid blocking app startup
    asyncio.create_task(initialize_retriever())

async def initialize_retriever():
    setup_retriever()

# Initialize LLM using Ollama
try:
    llm = Ollama(model="llama3.2", temperature=0.3)
except Exception as e:
    print(f"Error initializing LLM: {e}")
    llm = None

@lru_cache(maxsize=100)
def get_cached_response(query: str, context: str, footprint: float, user_data_str: str):
    """Cache chatbot responses to improve performance"""
    try:
        prompt = f"""
You are an eco-assistant helping a user reduce their carbon footprint.
User's carbon footprint: {footprint} kg CO₂/year
User lifestyle data: {user_data_str}

Using the context provided from trusted climate reports: 
{context}

Answer the following question from the user:
{query}
"""
        return llm.invoke(prompt)
    except Exception as e:
        print(f"Error getting chatbot response: {e}")
        return f"Sorry, I encountered an error: {str(e)}"

@app.post("/calculate_footprint")
async def calculate_footprint(user_input: UserInput):
    try:
        # Convert pydantic model to dictionary format expected by the pipeline
        input_data = {
            'Sex': user_input.Sex,
            'Monthly Grocery Bill': user_input.MonthlyGroceryBill,
            'Vehicle Monthly Distance Km': user_input.VehicleMonthlyDistanceKm,
            'Waste Bag Weekly Count': user_input.WasteBagWeeklyCount,
            'How Long TV PC Daily Hour': user_input.HowLongTVPCDailyHour,
            'How Many New Clothes Monthly': user_input.HowManyNewClothesMonthly,
            'How Long Internet Daily Hour': user_input.HowLongInternetDailyHour,
            'Body Type': user_input.BodyType,
            'Diet': user_input.Diet,
            'How Often Shower': user_input.HowOftenShower,
            'Heating Energy Source': user_input.HeatingEnergySource,
            'Transport': user_input.Transport,
            'Vehicle Type': user_input.VehicleType,
            'Social Activity': user_input.SocialActivity,
            'Frequency of Traveling by Air': user_input.FrequencyOfTravelingByAir,
            'Waste Bag Size': user_input.WasteBagSize,
            'Energy efficiency': user_input.EnergyEfficiency,
            'Recycling': user_input.Recycling,
            'Cooking_With': user_input.CookingWith
        }

        # Create DataFrame and process the input data
        df = pd.DataFrame([input_data])
        
        # Encode categorical features
        df['Sex'] = Sex_encoder.transform(df['Sex'])
        
        # One-hot encoding for various categorical features
        body_encoded = body_onec.transform(df[['Body Type']]).toarray()
        diet_encoded = diet_onec.transform(df[['Diet']]).toarray()
        shower_encoded = shower_onec.transform(df[['How Often Shower']]).toarray()
        heating_encoded = heating_onec.transform(df[['Heating Energy Source']]).toarray()
        transport_encoded = transport_onec.transform(df[['Transport']]).toarray()
        vehicle_encoded = vehicle_onec.transform(df[['Vehicle Type']]).toarray()
        social_encoded = social_onec.transform(df[['Social Activity']]).toarray()
        freq_encoded = freq_onec.transform(df[['Frequency of Traveling by Air']]).toarray()
        waste_encoded = wasteSize_onec.transform(df[['Waste Bag Size']]).toarray()
        energy_encoded = energyEff_onec.transform(df[['Energy efficiency']]).toarray()
        
        # Multi-label encoding for recycling and cooking
        df['Recycling'] = df['Recycling'].apply(lambda x: x if isinstance(x, list) else [])
        df['Cooking_With'] = df['Cooking_With'].apply(lambda x: x if isinstance(x, list) else [])
        recycle_encoded = recycle_bin.transform(df['Recycling'])
        cook_encoded = cook_bin.transform(df['Cooking_With'])
        
        # Combine numerical and encoded features
        numerical_features = df[['Sex', 'Monthly Grocery Bill', 'Vehicle Monthly Distance Km',
                               'Waste Bag Weekly Count', 'How Long TV PC Daily Hour',
                               'How Many New Clothes Monthly', 'How Long Internet Daily Hour']]
        
        final_df = pd.concat([
            numerical_features.reset_index(drop=True),
            pd.DataFrame(body_encoded, columns=body_onec.get_feature_names_out()),
            pd.DataFrame(diet_encoded, columns=diet_onec.get_feature_names_out()),
            pd.DataFrame(shower_encoded, columns=shower_onec.get_feature_names_out()),
            pd.DataFrame(heating_encoded, columns=heating_onec.get_feature_names_out()),
            pd.DataFrame(transport_encoded, columns=transport_onec.get_feature_names_out()),
            pd.DataFrame(vehicle_encoded, columns=vehicle_onec.get_feature_names_out()),
            pd.DataFrame(social_encoded, columns=social_onec.get_feature_names_out()),
            pd.DataFrame(freq_encoded, columns=freq_onec.get_feature_names_out()),
            pd.DataFrame(waste_encoded, columns=wasteSize_onec.get_feature_names_out()),
            pd.DataFrame(energy_encoded, columns=energyEff_onec.get_feature_names_out()),
            pd.DataFrame(recycle_encoded, columns=recycle_bin.classes_),
            pd.DataFrame(cook_encoded, columns=cook_bin.classes_)
        ], axis=1)
        
        # Make prediction
        prediction = model.predict(final_df)
        
        # Determine footprint classification
        classification = "Low"
        if prediction[0] > 3000:
            classification = "High"
        elif prediction[0] > 1000:
            classification = "Average"
            
        # Return the result
        return {
            "carbon_footprint": float(prediction[0]),
            "formatted_footprint": f"{prediction[0]:,.2f}",
            "classification": classification,
            "tips": [
                "Reduce meat consumption",
                "Use public transportation more frequently",
                "Improve home insulation",
                "Switch to renewable energy sources"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
        
@app.post("/chatbot")
async def chatbot_endpoint(request: ChatbotRequest):
    """Endpoint for the eco-chatbot to answer user questions"""
    try:
        if not llm:
            raise HTTPException(status_code=503, detail="LLM service is not available")
            
        retriever = setup_retriever()
        if not retriever:
            raise HTTPException(status_code=503, detail="Knowledge base retriever is not available")
        
        # Get relevant documents for the query
        docs = retriever.get_relevant_documents(request.query)
        context = "\n\n".join([doc.page_content for doc in docs[:3]])
        
        # Format user data as string for the prompt
        user_data_str = str(request.user_data) if request.user_data else "No user data available"
        footprint = request.carbon_footprint if request.carbon_footprint else "Unknown"
        
        # Get response from LLM
        response = get_cached_response(request.query, context, footprint, user_data_str)
        
        # Handle different response types
        if hasattr(response, "content"):
            return {"response": response.content}
        else:
            return {"response": str(response)}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")

# Add a simple health check endpoint
@app.get("/")
async def root():
    return {
        "status": "API is running", 
        "message": "Welcome to EcoSwitch Carbon Footprint API",
        "features": ["Carbon footprint calculation", "Eco-friendly chatbot assistant"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)