import { useState, useEffect, createContext, useContext } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js"; // Import AuthError for better typing
import { supabase } from "@/integrations/supabase/client";

// Define the return type for auth operations for better type safety
interface AuthResult {
  success: boolean;
  error?: string; // Optional error message
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  // Updated signUp signature
  signUp: (
    email: string,
    password: string,
    displayName: string,
    firstName: string,
    lastName: string,
    captchaToken: string | null,
  ) => Promise<AuthResult>;
  // Updated signIn signature
  signIn: (
    email: string,
    password: string,
    captchaToken: string | null,
  ) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>; // SignOut now returns an AuthResult
  signInWithGitHub: () => Promise<AuthResult>;
  signInWithDiscord: () => Promise<AuthResult>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // UPDATED signUp function
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    firstName: string,
    lastName: string,
    captchaToken: string | null,
  ): Promise<AuthResult> => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        captchaToken: captchaToken || undefined, // Pass captcha token
        data: {
          // Pass custom user metadata here
          display_name: displayName,
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  // UPDATED signIn function
  const signIn = async (
    email: string,
    password: string,
    captchaToken: string | null,
  ): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken: captchaToken || undefined, // Pass captcha token
      },
    });

    if (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  // UPDATED signOut function
  const signOut = async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  // Helper function to extract username from email
  const getUsernameFromEmail = (email: string | null | undefined): string => {
    if (!email) return "User";
    return email.split("@")[0] || "User";
  };

  const signInWithGitHub = async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error("GitHub sign in error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const signInWithDiscord = async (): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error("Discord sign in error:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const refreshUser = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error("Failed to refresh user:", error);
    } else {
      console.log("User refreshed successfully:", data.user);
      setSession(data.session);
      setUser(data.user ?? null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGitHub,
        signInWithDiscord,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
