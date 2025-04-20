
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { authService } from '@/services/api';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (type === 'signup' && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log(`Attempting to ${type === 'login' ? 'login' : 'register'} with email: ${email}`);
      
      if (type === 'login') {
        // Login user with our API service
        const response = await authService.login(email, password);
        console.log('Login successful:', response);
        
        toast({
          title: "Logged in successfully",
          description: "Welcome to EarthWise Paths!",
        });
      } else {
        // Register user with our API service
        console.log('About to call register API');
        const response = await authService.register(email, password);
        console.log('Register API response:', response);
        
        toast({
          title: "Account created successfully",
          description: "Welcome to EarthWise Paths!",
        });
      }
      
      // Redirect to dashboard after successful login/signup
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      // Add more detailed error logging
      if (error.response) {
        console.error('Server response data:', error.response.data);
        console.error('Server response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      
      // More user-friendly error message
      const errorMsg = error.response?.data?.message || 
                       (error.message === "Network Error" ? 
                        "Cannot connect to server. Please check if the server is running." : 
                        "Something went wrong. Please try again.");
      
      toast({
        title: "Authentication error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-earthwise-blue-light/20 to-earthwise-green-light/30 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg border-earthwise-green-light/30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-earthwise-green rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {type === 'login' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription>
            {type === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Sign up to start tracking your carbon footprint'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 input-eco"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 input-eco"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {type === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 input-eco"
                    required
                  />
                </div>
              </div>
            )}

            {type === 'login' && (
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-earthwise-blue hover:text-earthwise-blue-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-earthwise-green hover:bg-earthwise-green-dark"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : type === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" type="button">
                Google
              </Button>
              <Button variant="outline" className="w-full" type="button">
                Apple
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-600">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link to="/signup" className="text-earthwise-blue hover:text-earthwise-blue-dark font-medium">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-earthwise-blue hover:text-earthwise-blue-dark font-medium">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
