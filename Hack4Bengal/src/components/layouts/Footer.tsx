
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Facebook, Github, Sprout } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-earthwise-neutral-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-earthwise-green-light" />
              <span className="text-xl font-bold text-white">EcoCheck</span>
            </div>
            <p className="text-earthwise-neutral-light mb-4">
              Helping you make sustainable choices for a greener future, one step at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-earthwise-green-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-earthwise-green-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-earthwise-green-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-earthwise-green-light transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-earthwise-green-light">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-earthwise-green-light transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-earthwise-green-light transition-colors">About Us</Link></li>
              <li><Link to="/dashboard" className="hover:text-earthwise-green-light transition-colors">Dashboard</Link></li>
              <li><Link to="/calculator" className="hover:text-earthwise-green-light transition-colors">Carbon Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-earthwise-green-light">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-earthwise-green-light transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-earthwise-green-light transition-colors">Carbon Facts</a></li>
              <li><a href="#" className="hover:text-earthwise-green-light transition-colors">Green Tips</a></li>
              <li><a href="#" className="hover:text-earthwise-green-light transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-earthwise-green-light">Contact</h3>
            <ul className="space-y-2">
              <li>contact@ecocheck.com</li>
              <li>+91 1234567890</li>
              <li>Poddar Vihar</li>
              <li>Haldiram</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-earthwise-neutral-light">
          <div className="flex flex-col md:flex-row justify-between">
            <p>&copy; {new Date().getFullYear()} EcoCheck. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-earthwise-green-light transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-earthwise-green-light transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-earthwise-green-light transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
