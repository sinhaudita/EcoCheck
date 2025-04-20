
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sprout, User, Leaf } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Get username from email (or use email if no username)
  const username = user?.email ? user.email.split('@')[0] : '';
  const initials = username ? username.substring(0, 2).toUpperCase() : '';

  return (
    <nav className="bg-white shadow-sm py-4 px-6 md:px-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-earthwise-green" />
          <span className="text-xl font-bold text-earthwise-green-dark">EcoCheck</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-earthwise-neutral-dark hover:text-earthwise-green transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-earthwise-neutral-dark hover:text-earthwise-green transition-colors">
            About
          </Link>
          <Link to="/dashboard" className="text-earthwise-neutral-dark hover:text-earthwise-green transition-colors">
            Dashboard
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-earthwise-neutral-dark">Hello, {username}</span>
              <Button asChild variant="ghost" className="p-2">
                <Link to="/profile">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-earthwise-green text-white text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button asChild variant="outline" className="border-earthwise-green text-earthwise-green hover:bg-earthwise-green-light hover:text-white">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-earthwise-green hover:bg-earthwise-green-dark">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white z-10 shadow-md">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 text-earthwise-neutral-dark hover:text-earthwise-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 text-earthwise-neutral-dark hover:text-earthwise-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 text-earthwise-neutral-dark hover:text-earthwise-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2 px-4 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-earthwise-green text-white text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-earthwise-neutral-dark">Hello, {username}</span>
                </div>
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-earthwise-green text-earthwise-green w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/profile">View Profile</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-earthwise-green text-earthwise-green w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-earthwise-green hover:bg-earthwise-green-dark w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
