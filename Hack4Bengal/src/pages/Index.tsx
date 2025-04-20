
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { Leaf, Car, Coffee, Lightbulb, ShoppingBag, BarChart, MessagesSquare, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Carbon Footprint and Discover Greener Alternatives</h1>
            <p className="text-lg mb-8 text-white/90">
              EcoCheck helps you understand your environmental impact and provides personalized suggestions to reduce your carbon footprint - without compromising your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-earthwise-green-dark hover:bg-earthwise-neutral-light">
                <Link to="/calculator">Calculate Your Footprint</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 shadow-xl animate-float">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Leaf className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">Start Your Green Journey Today</h3>
                <p className="text-white/90 text-center mb-6">
                  Join thousands of others making a difference through simple, everyday choices.
                </p>
                <Button asChild className="w-full bg-white text-earthwise-green-dark hover:bg-earthwise-neutral-light">
                  <Link to="/signup">Sign Up Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-earthwise-neutral-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-earthwise-neutral-dark">How It Works</h2>
            <p className="text-lg text-earthwise-neutral max-w-2xl mx-auto">
              Track, analyze, and improve your environmental impact in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Routine</h3>
              <p className="text-earthwise-neutral-dark">
                Tell us about your daily activities, including travel, food, and energy usage.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">See Your Impact</h3>
              <p className="text-earthwise-neutral-dark">
                Get a detailed breakdown of your carbon footprint and where you can make the biggest difference.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Alternatives</h3>
              <p className="text-earthwise-neutral-dark">
                Receive personalized suggestions for greener alternatives that match your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-earthwise-neutral-dark">Features</h2>
            <p className="text-lg text-earthwise-neutral max-w-2xl mx-auto">
              Everything you need to understand and reduce your environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <Car className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">Travel & Commute</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Track carbon emissions from different transportation methods and find greener alternatives.
                </p>
              </CardContent>
            </Card>

            <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <Coffee className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">Food & Diet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Analyze the environmental impact of your food choices and discover more sustainable options.
                </p>
              </CardContent>
            </Card>

            <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <Lightbulb className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">Energy Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Monitor your household energy consumption and get tips to reduce usage and costs.
                </p>
              </CardContent>
            </Card>

            <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <ShoppingBag className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">Shopping Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Evaluate the environmental impact of your purchases and find eco-friendly products.
                </p>
              </CardContent>
            </Card>

            {/* <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <BarChart className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">Impact Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Visualize your carbon footprint over time and track your progress toward your sustainability goals.
                </p>
              </CardContent>
            </Card> */}

            <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <MessagesSquare className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">AI-Powered Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Get personalized recommendations for reducing your carbon footprint based on your lifestyle.
                </p>
              </CardContent>
            </Card>

            {/* <Card className="card-eco">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-earthwise-green/10 flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-earthwise-green" />
                </div>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-earthwise-neutral">
                  Earn badges and track milestones as you reduce your environmental impact.
                </p>
              </CardContent>
            </Card> */}

            <Card className="bg-gradient-to-br from-earthwise-green-light to-earthwise-green text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/90">
                  More features are on the way! Stay tuned for community challenges, local green events, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-earthwise-blue">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Green Journey?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of others making a positive impact on the environment through simple, everyday choices.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-earthwise-blue hover:bg-earthwise-neutral-light">
              <Link to="/signup">Sign Up Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/calculator">Try the Calculator</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
