
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Mail, User } from 'lucide-react';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [initials, setInitials] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }

    // Generate initials from email
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      setInitials(emailName.substring(0, 2).toUpperCase());
    }
  }, [isAuthenticated, navigate, user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarFallback className="bg-earthwise-green text-white text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">
            {user.email.split('@')[0]}
          </CardTitle>
          <CardDescription>Account Information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 p-2 border rounded">
            <Mail size={20} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-2 border rounded">
            <User size={20} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium">User ID</p>
              <p className="text-sm text-gray-500">{user.id}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
