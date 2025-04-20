
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { BarChart, LineChart, PieChart } from 'recharts';
// import { PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, Plus, Car, Coffee, Lightbulb, ShoppingBag } from 'lucide-react';
// import Navbar from '@/components/layouts/Navbar';
// import Footer from '@/components/layouts/Footer';
// import { ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Pie, Cell } from 'recharts';
// import { Link } from 'react-router-dom';
 import { useNavigate } from "react-router-dom";

// // Mock data
// const monthlyData = [
//   { name: 'Jan', carbon: 250 },
//   { name: 'Feb', carbon: 240 },
//   { name: 'Mar', carbon: 220 },
//   { name: 'Apr', carbon: 230 },
//   { name: 'May', carbon: 210 },
//   { name: 'Jun', carbon: 180 },
//   { name: 'Jul', carbon: 190 },
// ];

// const weeklyData = [
//   { name: 'Mon', carbon: 40 },
//   { name: 'Tue', carbon: 45 },
//   { name: 'Wed', carbon: 38 },
//   { name: 'Thu', carbon: 42 },
//   { name: 'Fri', carbon: 48 },
//   { name: 'Sat', carbon: 30 },
//   { name: 'Sun', carbon: 25 },
// ];

// const sourcesData = [
//   { name: 'Transportation', value: 45 },
//   { name: 'Food', value: 25 },
//   { name: 'Energy', value: 20 },
//   { name: 'Shopping', value: 10 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
import { Car, Coffee, Lightbulb, ShoppingBag, Plus } from 'lucide-react';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { Link } from 'react-router-dom';

const activities = [
  {
    date: '2023-04-08',
    activity: 'Commuted by bicycle instead of car',
    saved: 5.2,
    icon: Car,
  },
  {
    date: '2023-04-07',
    activity: 'Chose a vegetarian meal',
    saved: 2.8,
    icon: Coffee,
  },
  {
    date: '2023-04-06',
    activity: 'Reduced heating by 2 degrees',
    saved: 1.4,
    icon: Lightbulb,
  },
  {
    date: '2023-04-05',
    activity: 'Purchased locally made product',
    saved: 3.1,
    icon: ShoppingBag,
  },
];

const suggestions = [
  {
    title: 'Try public transit',
    description: 'Taking the bus twice a week could reduce your carbon footprint by 12%',
    impact: 'Medium',
    category: 'Transportation',
  },
  {
    title: 'Reduce meat consumption',
    description: 'Having one meat-free day per week can reduce your food carbon footprint by 15%',
    impact: 'High',
    category: 'Food',
  },
  {
    title: 'Unplug electronics',
    description: 'Unplugging unused electronics can save 10% on your electricity bill',
    impact: 'Low',
    category: 'Energy',
  },
];

const Dashboard = () => {
  //const [chartPeriod, setChartPeriod] = useState('weekly');
  const navigate=useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-earthwise-neutral-dark">Dashboard</h1>
              <p className="text-earthwise-neutral">Track your carbon footprint and progress</p>
            </div>
            
            <Button asChild className="mt-4 md:mt-0 bg-earthwise-green hover:bg-earthwise-green-dark">
              <Link to="/calculator">
                <Calculator className="mr-2 h-4 w-4" /> Calculate
              </Link>
            </Button>
          </div>
{/* Extra Cards Row */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
<Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Enter Weekly/Monthly Activities
                </CardTitle>
                <CardDescription>
                  Log your larger patterns and sustainable habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-earthwise-blue mb-3">
                  Plan Ahead
                </div>

                <Button
                  className="bg-earthwise-green hover:bg-earthwise-green-dark text-white mr-4"
                  onClick={() => navigate("/monthly")}
                >
                  Enter Details
                </Button>
                <Button variant="outline" className="text-earthwise-green border-2 border-earthwise-green hover:bg-earthwise-green/10" onClick={() => navigate("/monthly-details")}>

                  Show Details
                </Button>
              </CardContent>
            </Card>
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">Add Daily Activities</CardTitle>
      <CardDescription>Track your everyday green choices easily</CardDescription>
    </CardHeader>
    <CardContent>
    
      <div className="text-3xl font-bold text-earthwise-green-dark mb-3">Stay Consistent</div>
      <div className="flex space-x-4">
      <Button className="bg-earthwise-green hover:bg-earthwise-green-dark text-white">
      <Link to="/daily-form">Enter Details</Link>
        
      </Button>
      <Button variant="outline" className="text-earthwise-green border-2 border-earthwise-green hover:bg-earthwise-green/10" onClick={() => navigate("/show-details")}>
      
    Show Details

    </Button>
    </div>
    </CardContent>
  </Card>
</div>

          {/* Summary Cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Footprint</CardTitle>
                <CardDescription>Monthly carbon emissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-earthwise-green-dark">180 kg</div>
                <p className="text-sm text-earthwise-neutral flex items-center mt-2">
                  <span className="text-green-500 flex items-center">↓ 15% </span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Carbon Saved</CardTitle>
                <CardDescription>Total savings this year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-earthwise-blue">452 kg</div>
                <p className="text-sm text-earthwise-neutral mt-2">
                  Equivalent to planting 20 trees
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Top Source</CardTitle>
                <CardDescription>Your biggest carbon source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-earthwise-neutral-dark">Transportation</div>
                <p className="text-sm text-earthwise-neutral mt-2">
                  45% of your total footprint
                </p>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Streak</CardTitle>
                <CardDescription>Days of green choices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-earthwise-brown">12 days</div>
                <p className="text-sm text-earthwise-neutral mt-2">
                  Keep it up for a new record!
                </p>
              </CardContent>
            </Card>
          </div> */}

          {/* Charts */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Carbon Footprint Trend</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant={chartPeriod === 'weekly' ? "default" : "outline"} 
                      onClick={() => setChartPeriod('weekly')}
                      className={chartPeriod === 'weekly' ? "bg-earthwise-green hover:bg-earthwise-green-dark" : ""}
                      size="sm"
                    >
                      Weekly
                    </Button>
                    <Button 
                      variant={chartPeriod === 'monthly' ? "default" : "outline"} 
                      onClick={() => setChartPeriod('monthly')}
                      className={chartPeriod === 'monthly' ? "bg-earthwise-green hover:bg-earthwise-green-dark" : ""}
                      size="sm"
                    >
                      Monthly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartPeriod === 'weekly' ? weeklyData : monthlyData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} kg CO₂`, 'Carbon Emissions']}
                        contentStyle={{ borderRadius: '8px' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="carbon" 
                        name="Carbon Emissions (kg CO₂)" 
                        stroke="#4CAF50" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emissions by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div> */}

          {/* Recent Activities and Suggestions */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Green Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-start p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0 p-2 bg-earthwise-green/10 rounded-full mr-4">
                        <activity.icon className="h-5 w-5 text-earthwise-green" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{activity.activity}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">{activity.date}</span>
                          <span className="text-sm font-semibold text-earthwise-green">
                            Saved {activity.saved} kg CO₂
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          suggestion.impact === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : suggestion.impact === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {suggestion.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{suggestion.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Category: {suggestion.category}</span>
                        <Button variant="link" className="text-earthwise-blue p-0 h-auto text-sm">Try This</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          {/* </div> */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Green Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-start p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0 p-2 bg-earthwise-green/10 rounded-full mr-4">
                        <activity.icon className="h-5 w-5 text-earthwise-green" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{activity.activity}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">{activity.date}</span>
                          <span className="text-sm font-semibold text-earthwise-green">
                            Saved {activity.saved} kg CO₂
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          suggestion.impact === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : suggestion.impact === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {suggestion.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{suggestion.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">Category: {suggestion.category}</span>
                        <Button variant="link" className="text-earthwise-blue p-0 h-auto text-sm">Try This</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>*/}
        </div> 
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
