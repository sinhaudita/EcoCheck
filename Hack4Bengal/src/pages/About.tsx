
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { Leaf, Globe, Users, Trophy, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-earthwise-green-light to-earthwise-green py-16 md:py-24 text-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EarthWise Paths</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our mission is to empower individuals to make environmentally conscious choices without sacrificing their lifestyle.
            </p>
          </div>
        </div>
        
        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-earthwise-neutral-dark">Our Story</h2>
                <p className="text-lg mb-4 text-earthwise-neutral">
                  EarthWise Paths began with a simple question: "How can we make sustainable living accessible to everyone?"
                </p>
                <p className="mb-4 text-earthwise-neutral">
                  We realized that many people want to reduce their environmental impact but don't know where to start or believe it requires drastic lifestyle changes. Our team of environmental scientists, data analysts, and tech enthusiasts came together to create a solution.
                </p>
                <p className="mb-4 text-earthwise-neutral">
                  By combining accurate carbon footprint tracking with practical, personalized suggestions, we're making it easier for anyone to make greener choices that fit their unique lifestyle and preferences.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="rounded-xl bg-earthwise-green/10 p-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-earthwise-green rounded-full">
                        <Globe className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-4">Our Vision</h3>
                    <p className="text-center">
                      A world where sustainable living is the default, not the exception, achieved through small, manageable changes that add up to significant impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-earthwise-neutral-light">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-earthwise-neutral-dark">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="card-eco">
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                      <Leaf className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                    <p className="text-earthwise-neutral">
                      We believe in balancing environmental protection with practical, everyday living.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-eco">
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
                    <p className="text-earthwise-neutral">
                      Environmental action should be accessible to everyone, regardless of background or resources.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-eco">
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Impact</h3>
                    <p className="text-earthwise-neutral">
                      We focus on solutions that create measurable, meaningful environmental benefits.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-eco">
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-earthwise-green rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
                    <p className="text-earthwise-neutral">
                      We empower people with knowledge and tools to make informed environmental choices.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-earthwise-neutral-dark">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold">Dr. Jane Smith</h3>
                <p className="text-earthwise-green mb-2">Environmental Scientist</p>
                <p className="text-earthwise-neutral">
                  With over 15 years in climate research, Jane brings scientific rigor to our carbon calculations.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold">Alex Chen</h3>
                <p className="text-earthwise-green mb-2">Data Scientist</p>
                <p className="text-earthwise-neutral">
                  Alex develops our AI algorithms that power personalized sustainability recommendations.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold">Sam Johnson</h3>
                <p className="text-earthwise-green mb-2">UX Designer</p>
                <p className="text-earthwise-neutral">
                  Sam ensures our platform is intuitive and accessible for users of all tech-comfort levels.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-earthwise-blue text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>contact@earthwisepaths.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p>123 Green Street, Earth City, EC 12345</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
