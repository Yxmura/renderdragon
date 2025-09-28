import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import AccountPageSkeleton from "@/components/skeletons/AccountPageSkeleton";
import { supabase } from "@/integrations/supabase/client";

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const { profile, updateProfile, loading: profileLoading } = useProfile();
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Load profile data from multiple sources with proper priority
  useEffect(() => {
    if (user) {
      // Priority: 1. Profile database, 2. User metadata, 3. Email username
      const nameFromProfile = profile?.display_name;
      const nameFromMetadata = user.user_metadata?.display_name;
      const nameFromEmail = user.email?.split("@")[0] || "";

      setDisplayName(nameFromProfile || nameFromMetadata || nameFromEmail);
      setFirstName(profile?.first_name || user.user_metadata?.first_name || "");
      setLastName(profile?.last_name || user.user_metadata?.last_name || "");
    }
  }, [user, profile]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 cow-grid-bg">
          <div className="container mx-auto px-4">
            <AccountPageSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Update both the profile database and user metadata
      const result = await updateProfile({
        display_name: displayName,
        first_name: firstName,
        last_name: lastName,
      });

      if (result.success) {
        // Also update user metadata for immediate reflection
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            display_name: displayName,
            first_name: firstName,
            last_name: lastName,
          },
        });

        if (metadataError) {
          console.error("Failed to update user metadata:", metadataError);
          // Don't fail the whole operation if metadata update fails
          toast.success(
            "Profile updated successfully! Some changes may take a moment to reflect everywhere.",
          );
        } else {
          // Refresh the user to get updated metadata
          // Add small delay to ensure metadata sync
          await new Promise((resolve) => setTimeout(resolve, 500));
          await refreshUser();
          toast.success("Profile updated successfully!");
        }
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred while updating your profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        toast.success("Signed out successfully");
      } else {
        toast.error("Failed to sign out. Please try again.");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("An error occurred while signing out.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get the current display name to show (priority: profile > metadata > email username)
  const getCurrentDisplayName = () => {
    return (
      profile?.display_name ||
      user.user_metadata?.display_name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const currentDisplayName = getCurrentDisplayName();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>My Account - Renderdragon</title>
        <meta
          name="description"
          content="Manage your Renderdragon account settings and profile information."
        />
      </Helmet>

      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <User className="h-8 w-8 text-cow-purple" />
              <h1 className="text-4xl md:text-5xl font-vt323">
                My <span className="text-cow-purple">Account</span>
              </h1>
            </div>

            <Card className="pixel-corners border-2 border-cow-purple/20">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        user.user_metadata?.avatar_url || profile?.avatar_url
                      }
                    />
                    <AvatarFallback className="bg-cow-purple text-white font-bold text-lg">
                      {getInitials(currentDisplayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-vt323">
                      {currentDisplayName}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="pt-6">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-vt323 text-cow-purple">
                      Profile Information
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="How others will see you"
                        className="pixel-corners"
                      />
                      <p className="text-xs text-muted-foreground">
                        This name will be displayed throughout the site instead
                        of your email address.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Your first name"
                          className="pixel-corners"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Your last name"
                          className="pixel-corners"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-vt323 text-cow-purple">
                      Account Details
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                        <span>{user.email}</span>
                      </div>

                      {user.created_at && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Member since:</span>
                          <span>
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Display Name:</span>
                        <span>{currentDisplayName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="pixel-btn-primary"
                    >
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSignOut}
                      className="pixel-corners border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
