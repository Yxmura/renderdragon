import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { signIn, signUp } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle captcha success
  const handleCaptchaSuccess = async (token: string) => {
    setLoading(true); // Indicate captcha verification is in progress
    try {
      setCaptchaToken(token); // Store the received token

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-turnstile`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();
      console.log('CAPTCHA verify response:', data);

      if (!res.ok || data.success !== true) {
        toast.error('CAPTCHA verification failed. Please try again.');
        setCaptchaVerified(false); // Ensure state is false on failure
        setCaptchaToken(null); // Clear token on failure
        return;
      }

      toast.success('CAPTCHA verified!');
      setCaptchaVerified(true); // Crucially, set verified to true
    } catch (err) {
      console.error('Error verifying CAPTCHA:', err);
      toast.error('Unexpected error during CAPTCHA verification');
      setCaptchaVerified(false); // Ensure state is false on error
      setCaptchaToken(null); // Clear token on error
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  // Handle captcha error/expire
  const handleCaptchaError = () => {
    toast.error('CAPTCHA expired or failed. Please re-verify.');
    setCaptchaToken(null);
    setCaptchaVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!isLogin && !displayName.trim()) {
      toast.error('Display name is required for signup');
      return;
    }

    // Now, this check accurately reflects the current captcha status
    if (!captchaToken || !captchaVerified) {
      toast.error('Please complete the security verification');
      return;
    }

    setLoading(true);
    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else if (error.message.includes('User already registered')) {
          toast.error('Account already exists. Please sign in instead.');
        } else if (error.message.includes('Signup is disabled')) {
          toast.error('New registrations are currently disabled');
        } else {
          toast.error(error.message || 'Authentication failed');
        }
        // Reset captcha on auth error to force re-verification
        setCaptchaToken(null);
        setCaptchaVerified(false);
        return;
      }

      if (isLogin) {
        toast.success('Welcome back!');
        onOpenChange(false);
      } else {
        toast.success('Account created! Please check your email to verify.');
        onOpenChange(false);
      }

      // Reset form
      setEmail('');
      setPassword('');
      setDisplayName('');
      setCaptchaToken(null);
      setCaptchaVerified(false);
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Something went wrong');
      setCaptchaToken(null);
      setCaptchaVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setDisplayName('');
    setCaptchaToken(null);
    setCaptchaVerified(false);
  };

  // Check if form is valid and ready to submit
  const isFormValid = () => {
    const basicValidation =
      email.trim() &&
      validateEmail(email) &&
      password.length >= 6 &&
      captchaToken && // Ensure token exists
      captchaVerified; // Ensure verification was successful

    if (!isLogin) {
      return basicValidation && displayName.trim();
    }

    return basicValidation;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-corners max-w-md border-2 border-cow-purple">
        <DialogHeader>
          <DialogTitle className="font-vt323 text-center text-2xl">
            {isLogin ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-sm">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pixel-corners pl-10"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <Label htmlFor="displayName" className="font-medium text-sm">
                  Display Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pixel-corners pl-10"
                    placeholder="How others will see you"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-sm">
              Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pixel-corners pl-10 pr-10"
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {!isLogin && (
              <p className="text-xs text-muted-foreground">
                Must be at least 6 characters long
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium text-sm">
              <Shield className="h-4 w-4" />
              Security Verification *
              {captchaVerified && (
                <span className="text-xs text-green-500">✓ Verified</span>
              )}
            </Label>
            <div className="flex justify-center">
              <Turnstile
                key={`${isLogin}-${captchaToken}`} // Force re-render on mode change
                siteKey="0x4AAAAAABgSiniGjeFvoBh-"
                onSuccess={handleCaptchaSuccess}
                onError={handleCaptchaError}
                onExpire={handleCaptchaError}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="submit"
                className="pixel-btn-primary w-full"
                disabled={loading || !isFormValid()} // Use loading state here
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                  />
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </Button>
            </motion.div>
          </AnimatePresence>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={toggleMode}
              className="text-sm text-cow-purple hover:text-cow-purple/80"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;