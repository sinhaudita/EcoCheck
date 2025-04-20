import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Leaf } from 'lucide-react';
import './styles.css'; // Add this at the top of your .tsx file
<link rel="stylesheet" href="styles.css"></link>

interface FormData {
  Sex: string;
  BodyType: string;
  Diet: string;
  HowOftenShower: string;
  HeatingEnergySource: string;
  Transport: string;
  VehicleType: string;
  WasteBagSize: string;
  WasteBagWeeklyCount: number;
  SocialActivity: string;
  FrequencyOfTravelingByAir: string;
  EnergyEfficiency: string;
  MonthlyGroceryBill: number;
  VehicleMonthlyDistanceKm: number;
  HowLongTVPCDailyHour: number;
  HowLongInternetDailyHour: number;
  HowManyNewClothesMonthly: number;
  Recycling: string[];
  CookingWith: string[];
}

interface ResultData {
  carbon_footprint: number;
  formatted_footprint: string;
  classification: string;
  tips: string[];
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

const CarbonCalculator: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    Sex: 'male',
    BodyType: 'normal',
    Diet: 'omnivore',
    HowOftenShower: 'daily',
    HeatingEnergySource: 'coal',
    Transport: 'private',
    VehicleType: 'diesel',
    WasteBagSize: 'medium',
    WasteBagWeeklyCount: 2,
    SocialActivity: 'sometimes',
    FrequencyOfTravelingByAir: 'rarely',
    EnergyEfficiency: 'Sometimes',
    MonthlyGroceryBill: 300,
    VehicleMonthlyDistanceKm: 0,
    HowLongTVPCDailyHour: 4,
    HowLongInternetDailyHour: 3,
    HowManyNewClothesMonthly: 5,
    Recycling: ['Paper'],
    CookingWith: ['Stove'],
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<ResultData | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm your Eco Advisor. Ask me anything about sustainability, climate change, or how to reduce your impact.",
      sender: 'bot'
    }
  ]);
  const [userMessage, setUserMessage] = useState('');

  // Handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) || value === '' ? value : Number(value),
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, group: 'Recycling' | 'CookingWith') => {
    const { value, checked } = e.target;
    const currentValues = [...formData[group]];

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [group]: [...currentValues, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [group]: currentValues.filter((item) => item !== value),
      }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    // Validate: walk/bicycle transport should have a vehicle distance of 0
    if (formData.Transport === 'walk/bicycle' && formData.VehicleMonthlyDistanceKm > 0) {
      setError('Vehicle distance must be 0 when transport is walk/bicycle');
      return false;
    }
    
    // Validate: total screen time (TV + Internet) cannot exceed 24 hours per day
    if (formData.HowLongTVPCDailyHour + formData.HowLongInternetDailyHour > 24) {
      setError('Total screen time cannot exceed 24 hours per day');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/calculate_footprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An error occurred while calculating your carbon footprint.');
      }

      const result: ResultData = await response.json();
      setResults(result);
      setShowResults(true);
      
      // Store values for chatbot context
      localStorage.setItem("carbon_footprint", result.carbon_footprint.toString());
      localStorage.setItem("user_data", JSON.stringify(formData));
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update vehicle fields when transport changes
  useEffect(() => {
    if (formData.Transport === 'private') {
      setFormData(prev => ({
        ...prev,
        VehicleType: prev.VehicleType || 'diesel'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        VehicleType: 'Unknown',
        ...(formData.Transport === 'walk/bicycle' ? { VehicleMonthlyDistanceKm: 0 } : {})
      }));
    }
  }, [formData.Transport]);

  // Send a chat message
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    
    // Prepare payload with stored user data for context
    const carbonFootprint = parseFloat(localStorage.getItem("carbon_footprint") || '0');
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    const payload = {
      query: userMessage,
      carbon_footprint: carbonFootprint,
      user_data: userData,
    };
    
    // Clear input
    setUserMessage('');
    
    try {
      const response = await fetch("http://127.0.0.1:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      // Add bot response to chat
      setChatMessages(prev => [...prev, { 
        text: result.response || "Error: No response from chatbot.", 
        sender: 'bot' 
      }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, { 
        text: `Error: ${error.message}`, 
        sender: 'bot' 
      }]);
    }
  };
  
  // Handle Enter key press for chat
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
   
    <div className="container">
      <header>
        <Leaf className="h-10 w-10 text-white" />
      <h1>🌏 EcoCheck: Carbon Emission Calculator</h1>
      <p>Estimate your carbon footprint and get personalized eco-advice</p>
    </header>

      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sex">Gender</label>
                <select 
                  id="sex" 
                  name="Sex" 
                  value={formData.Sex} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <small>Biological sex for metabolic calculations</small>
              </div>
              <div className="form-group">
                <label htmlFor="bodyType">Body Type</label>
                <select 
                  id="bodyType" 
                  name="BodyType" 
                  value={formData.BodyType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="obese">Obese</option>
                  <option value="overweight">Overweight</option>
                  <option value="underweight">Underweight</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="diet">Diet</label>
                <select 
                  id="diet" 
                  name="Diet" 
                  value={formData.Diet} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="omnivore">Omnivore</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="showerFreq">Shower Frequency</label>
                <select 
                  id="showerFreq" 
                  name="HowOftenShower" 
                  value={formData.HowOftenShower} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="daily">Daily</option>
                  <option value="less frequently">Less Frequently</option>
                  <option value="more frequently">More Frequently</option>
                  <option value="twice a day">Twice a Day</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Living Situation</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="heatingSource">Home Heating Source</label>
                <select 
                  id="heatingSource" 
                  name="HeatingEnergySource" 
                  value={formData.HeatingEnergySource} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="coal">Coal</option>
                  <option value="electricity">Electricity</option>
                  <option value="natural gas">Natural Gas</option>
                  <option value="wood">Wood</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="transport">Primary Transportation</label>
                <select 
                  id="transport" 
                  name="Transport" 
                  value={formData.Transport} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                  <option value="walk/bicycle">Walk/Bicycle</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group" style={{ display: formData.Transport === 'private' ? 'block' : 'none' }}>
                <label htmlFor="vehicleType">Vehicle Fuel Type</label>
                <select 
                  id="vehicleType" 
                  name="VehicleType" 
                  value={formData.VehicleType} 
                  onChange={handleInputChange}
                  disabled={formData.Transport !== 'private'}
                >
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="lpg">LPG</option>
                  <option value="petrol">Petrol</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="wasteSize">Typical Waste Bag Size</label>
                <select 
                  id="wasteSize" 
                  name="WasteBagSize" 
                  value={formData.WasteBagSize} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="extra large">Extra Large</option>
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Lifestyle Habits</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="socialActivity">Social Activity Frequency</label>
                <select 
                  id="socialActivity" 
                  name="SocialActivity" 
                  value={formData.SocialActivity} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="never">Never</option>
                  <option value="often">Often</option>
                  <option value="sometimes">Sometimes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="airTravel">Air Travel Frequency</label>
                <select 
                  id="airTravel" 
                  name="FrequencyOfTravelingByAir" 
                  value={formData.FrequencyOfTravelingByAir} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="frequently">Frequently</option>
                  <option value="never">Never</option>
                  <option value="rarely">Rarely</option>
                  <option value="very frequently">Very Frequently</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="energyEfficiency">Energy Efficient Practices</label>
                <select 
                  id="energyEfficiency" 
                  name="EnergyEfficiency" 
                  value={formData.EnergyEfficiency} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="No">No</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="wasteCount">Weekly Waste Bags</label>
                <input 
                  type="number" 
                  id="wasteCount" 
                  name="WasteBagWeeklyCount" 
                  min="0" 
                  max="20" 
                  value={formData.WasteBagWeeklyCount} 
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Consumption Patterns</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="groceryBill">Monthly Grocery Bill ($)</label>
                <input 
                  type="number" 
                  id="groceryBill" 
                  name="MonthlyGroceryBill" 
                  min="0" 
                  max="10000" 
                  value={formData.MonthlyGroceryBill} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleDistance">Monthly Vehicle Distance (km)</label>
                <input 
                  type="number" 
                  id="vehicleDistance" 
                  name="VehicleMonthlyDistanceKm" 
                  min="0" 
                  max="20000" 
                  value={formData.VehicleMonthlyDistanceKm} 
                  onChange={handleInputChange}
                  disabled={formData.Transport === 'walk/bicycle'}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tvHours">Daily Screen Time (TV/PC)</label>
                <input 
                  type="number" 
                  id="tvHours" 
                  name="HowLongTVPCDailyHour" 
                  min="0" 
                  max="24" 
                  value={formData.HowLongTVPCDailyHour} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="internetHours">Daily Internet Use (hours)</label>
                <input 
                  type="number" 
                  id="internetHours" 
                  name="HowLongInternetDailyHour" 
                  min="0" 
                  max="24" 
                  value={formData.HowLongInternetDailyHour} 
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="newClothes">New Clothing Items/Month</label>
                <input 
                  type="number" 
                  id="newClothes" 
                  name="HowManyNewClothesMonthly" 
                  min="0" 
                  max="100" 
                  value={formData.HowManyNewClothesMonthly} 
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Sustainability Practices</h2>
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>Recycled Materials</label>
                <div className="checkbox-container">
                  {['Glass', 'Metal', 'Paper', 'Plastic'].map((material) => (
                    <div className="checkbox-option" key={material}>
                      <input 
                        type="checkbox" 
                        id={`recycle${material}`} 
                        value={material}
                        checked={formData.Recycling.includes(material)}
                        onChange={(e) => handleCheckboxChange(e, 'Recycling')}
                      />
                      <label htmlFor={`recycle${material}`}>{material}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>Cooking Appliances Used</label>
                <div className="checkbox-container">
                  {['Airfryer', 'Grill', 'Microwave', 'Oven', 'Stove'].map((appliance) => (
                    <div className="checkbox-option" key={appliance}>
                      <input 
                        type="checkbox" 
                        id={`cook${appliance}`} 
                        value={appliance}
                        checked={formData.CookingWith.includes(appliance)}
                        onChange={(e) => handleCheckboxChange(e, 'CookingWith')}
                      />
                      <label htmlFor={`cook${appliance}`}>{appliance}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" id="calculateBtn" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate My Carbon Footprint'}
            </button>
          </div>
        </form>
      ) : (
        <div id="results">
          <div className="results-header">
            <h2>Your Carbon Footprint Results</h2>
            <button 
              onClick={() => setShowResults(false)} 
              className="btn-outline"
            >
              <i className="fas fa-arrow-left"></i> Back to Form
            </button>
          </div>
          <div className="result-card">
            <div className="result-value">
              <span>{results?.formatted_footprint}</span>
              <span className="unit">kg CO₂/year</span>
            </div>
            <div className="result-category">
              <span className={`badge ${results?.classification.toLowerCase()}`}>
                {results?.classification}
              </span>
            </div>
          </div>
          
          <div className="result-classification">
            <h3>Footprint Classification</h3>
            <ul>
              <li className="classification-item low">
                🌱 <strong>Low (Less than 1,000 kg):</strong> Below average environmental impact
              </li>
              <li className="classification-item average">
                🌍 <strong>Average (1,000-3,000 kg):</strong> Typical urban dweller
              </li>
              <li className="classification-item high">
                🔥 <strong>High (More than 3,000 kg):</strong> Above average impact - consider reduction strategies
              </li>
            </ul>
          </div>
          
          <div className="tips-section">
            <h3>💡 Tips to Reduce Your Footprint</h3>
            <ul id="tipsList">
              {results?.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Calculating your carbon footprint...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <div className="error-icon">❌</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => setError('')} className="btn-outline">Dismiss</button>
        </div>
      )}

      {/* Chatbot Section */}
      <div className="chatbot">
        <h2>Eco Advisor</h2>
        <p>Ask our AI assistant about reducing your carbon footprint or other sustainability topics.</p>
        <div className="chat-container">
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
            />
            <button onClick={handleSendMessage} className="btn btn-primary">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;