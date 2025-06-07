// src/pages/Account.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Mail, Trash2, KeyRound } from 'lucide-react';

const Account = () => {
  const { user, signOut } = useAuth();
  // `loading` from useProfile indicates if the initial profile data is being fetched
  const { profile, loading: profileLoading, updateProfile, deleteAccount } = useProfile();
  const navigate = useNavigate();
  // `updating` state controls the loading/disabling of update/delete buttons
  const [updating, setUpdating] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Initialize formData with empty strings; it will be populated by useEffect
  const [formData, setFormData] = useState({
    display_name: '',
    first_name: '',
    last_name: '',
  });

  // Effect to populate formData when profile data loads or changes
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
      });
    }
  }, [profile]); // Dependency array: re-run whenever the 'profile' object changes

  // Redirect if not authenticated (or if user just logged out after deletion)
  if (!user) {
    navigate('/');
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true); // Disable button and show loading

    const result = await updateProfile(formData);
    if (result?.success) {
      toast.success('Profile updated successfully!');
      // The useEffect will automatically update formData if useProfile refetches the profile.
    } else {
      // Accessing 'error' property is now safe if useProfile is typed correctly
      toast.error(result?.error || 'Failed to update profile.');
    }

    setUpdating(false); // Re-enable button
  };

  const handlePasswordReset = async () => {
    if (!user?.email) {
      toast.error('No email address found for your account.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) {
        // Throw error to be caught by the catch block below
        throw error;
      }

      setResetEmailSent(true);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: unknown) { // Use 'unknown' for type safety
      console.error('Error sending reset email:', error);
      if (error instanceof Error) {
        // Safely access error.message if it's an Error instance
        toast.error(error.message);
      } else {
        toast.error('Failed to send reset email. An unexpected error occurred.');
      }
    }
  };

  const handleDeleteAccount = async () => {
    setUpdating(true); // Disable button and show loading for deletion
    const result = await deleteAccount();
    if (result?.success) {
      // Sign out and navigate only if deletion was successful
      await signOut();
      toast.success('Account deleted successfully!');
      navigate('/');
    } else {
      // Accessing 'error' property is now safe if useProfile is typed correctly
      toast.error(result?.error || 'Failed to delete account.');
    }
    setUpdating(false); // Re-enable button
  };

  // Display a loading indicator while profile data is being fetched
  if (profileLoading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-cow-purple/5 flex flex-col justify-center items-center">
        <p className="text-xl font-vt323 text-cow-purple">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-cow-purple/5">
      <Navbar />

      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-8 text-center">
            <h1 className="mb-4 font-vt323 text-4xl text-cow-purple">
              Account Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="danger">Danger Zone</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="pixel-corners">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and display preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="pixel-corners bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed. Contact support if needed.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="display_name">Display Name</Label>
                        <Input
                          id="display_name"
                          value={formData.display_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              display_name: e.target.value,
                            })
                          }
                          placeholder="How others see you"
                          className="pixel-corners"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              first_name: e.target.value,
                            })
                          }
                          placeholder="Your first name"
                          className="pixel-corners"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              last_name: e.target.value,
                            })
                          }
                          placeholder="Your last name"
                          className="pixel-corners"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={updating || profileLoading} // Disable if updating or initial profile loading
                      className="pixel-btn-primary"
                    >
                      {updating ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="pixel-corners">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <KeyRound className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">
                        Password Reset
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Send a password reset email to your registered email
                        address.
                      </p>
                      <Button
                        onClick={handlePasswordReset}
                        disabled={resetEmailSent || updating} // Also disable if updating
                        variant="outline"
                        className="pixel-corners"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {resetEmailSent ? 'Email Sent!' : 'Send Reset Email'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="danger">
              <Card className="pixel-corners border-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Trash2 className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-red-600">
                        Delete Account
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="pixel-corners">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="pixel-corners">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently
                              delete your account and remove all your data from
                              our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="pixel-corners">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="pixel-corners bg-red-600 hover:bg-red-700"
                              disabled={updating} // Disable during deletion process
                            >
                              {updating ? 'Deleting...' : 'Delete Account'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;