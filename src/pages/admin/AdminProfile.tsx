
import { useState } from 'react';
import { 
  Edit, 
  Share, 
  Eye, 
  EyeOff, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const AdminProfile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  
  const handleSaveChanges = () => {
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
  };

  const handleUploadNew = () => {
    toast({
      title: "Upload profile picture",
      description: "Please select an image file to upload.",
    });
  };

  const handleEdit = () => {
    toast({
      title: "Edit profile",
      description: "You can now edit your profile information.",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Admin role</h1>
      
      <h2 className="text-xl font-medium mt-6 mb-4">About section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium">Profile</h3>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3">
                <img 
                  src="/avatar.png" 
                  alt="Wade Warren" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="text-lg font-medium">Wade Warren</h4>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                wade.warren@example.com
                <Button variant="ghost" size="sm" className="ml-1 p-0 h-auto">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16M8 5V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V5M8 5H16M12 10V16M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="mb-5">
              <h5 className="text-sm font-medium mb-2">Linked with Social media</h5>
              <div className="flex space-x-2 justify-center">
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <img src="/google.svg" alt="Google" className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                  <img src="/twitter.svg" alt="Twitter" className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M9 12H12M15 12H12M12 12V9M12 12V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Social media
            </Button>
          </CardContent>
        </Card>
        
        {/* Profile Update Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium">Profile Update</h3>
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img 
                  src="/avatar.png" 
                  alt="Wade Warren" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={handleUploadNew}
                >
                  Upload New
                </Button>
                <Button variant="outline">Delete</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input defaultValue="Wade" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input defaultValue="Warren" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Input 
                  type={showCurrentPassword ? "text" : "password"} 
                  defaultValue="************" 
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <div className="relative">
                  <Input 
                    defaultValue="(406) 555-0120" 
                    className="pl-[4.5rem]"
                  />
                  <div className="absolute left-0 top-0 h-full flex items-center border-r px-3">
                    <span className="flex items-center">
                      <img src="/us-flag.svg" alt="US" className="h-5 w-5 mr-1" />
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth</label>
                <div className="relative">
                  <Input 
                    defaultValue="12- January- 1999" 
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <Input defaultValue="wade.warren@example.com" />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486" />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Credit Card</label>
              <div className="relative">
                <Input 
                  defaultValue="843-4359-4444" 
                  className="pl-[3.5rem]"
                />
                <div className="absolute left-0 top-0 h-full flex items-center border-r px-3">
                  <div className="flex">
                    <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                    <div className="w-6 h-4 bg-yellow-400 rounded-sm -ml-3"></div>
                  </div>
                </div>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Biography</label>
              <textarea 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                rows={3}
                placeholder="Enter a biography about you"
              ></textarea>
              <div className="flex justify-end mt-1">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                </Button>
                <Button variant="ghost" size="sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 15L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Change Password Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">Change Password</h3>
              <Button 
                variant="link" 
                size="sm" 
                className="text-blue-500 p-0 h-auto"
              >
                Need help
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9C15 10.5 13.5 11.25 12 12.75V14.25M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <div className="relative">
                <Input 
                  type={showCurrentPassword ? "text" : "password"} 
                  placeholder="Enter password" 
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                variant="link" 
                size="sm" 
                className="text-blue-500 p-0 h-auto mt-1"
              >
                Forgot Current Password? Click here
              </Button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <div className="relative">
                <Input 
                  type={showNewPassword ? "text" : "password"} 
                  placeholder="Enter password" 
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Re-enter Password</label>
              <div className="relative">
                <Input 
                  type={showReEnterPassword ? "text" : "password"} 
                  placeholder="Enter password" 
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                >
                  {showReEnterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={handleSaveChanges}
            >
              Save Change
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
