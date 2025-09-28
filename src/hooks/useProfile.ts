
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string | null;
  display_name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      // Transform the data to match our interface, handling missing fields
      const profileData: UserProfile = {
        id: data.id,
        email: data.email,
        display_name: data.display_name || null,
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      // Transform the data to match our interface, handling missing fields
      const profileData: UserProfile = {
        id: data.id,
        email: data.email,
        display_name: data.display_name || null,
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setProfile(profileData);
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) throw error;
      
      toast.success('Account deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account. Please contact support.');
      return { success: false };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    deleteAccount,
    refetch: fetchProfile,
  };
};
