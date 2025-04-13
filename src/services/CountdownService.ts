
interface CountdownState {
  isVisible: boolean;
  hasEnteredAdminPassword: boolean;
  lastVerifiedTime: number;
  bypassAttempts: number;
}

// Singleton service to manage countdown state across the app
class CountdownService {
  private static instance: CountdownService;
  private state: CountdownState = {
    isVisible: true, 
    hasEnteredAdminPassword: false,
    lastVerifiedTime: 0,
    bypassAttempts: 0
  };
  private readonly PASSWORD_HASH = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"; // SHA-256 of "admin"

  private constructor() {
    // Load state from localStorage if available
    const savedState = localStorage.getItem('countdownState');
    if (savedState) {
      try {
        this.state = JSON.parse(savedState);
        
        // Verify state integrity
        this.verifyStateIntegrity();
      } catch (e) {
        // If JSON parse fails or verification fails, reset to default state
        this.resetState();
      }
    }
    
    // Add mutation observer to detect DOM tampering
    this.setupMutationObserver();
  }

  public static getInstance(): CountdownService {
    if (!CountdownService.instance) {
      CountdownService.instance = new CountdownService();
    }
    return CountdownService.instance;
  }

  public getIsVisible(): boolean {
    // Ensure integrity before returning value
    this.verifyStateIntegrity();
    return this.state.isVisible;
  }

  public setIsVisible(value: boolean): void {
    // Only allow setting to false if admin password has been entered
    if (!value && !this.state.hasEnteredAdminPassword) {
      this.incrementBypassAttempts();
      return;
    }
    
    this.state.isVisible = value;
    this.saveState();
  }

  public getHasEnteredAdminPassword(): boolean {
    this.verifyStateIntegrity();
    return this.state.hasEnteredAdminPassword;
  }

  public verifyAdminPassword(password: string): boolean {
    // Hash the provided password using SHA-256
    const hashedPassword = this.hashPassword(password);
    
    if (hashedPassword === this.PASSWORD_HASH) {
      this.state.hasEnteredAdminPassword = true;
      this.state.isVisible = false;
      this.state.lastVerifiedTime = Date.now();
      this.saveState();
      return true;
    }
    
    this.incrementBypassAttempts();
    return false;
  }

  public isLaunchReady(targetDate: Date): boolean {
    return new Date().getTime() > targetDate.getTime();
  }

  private incrementBypassAttempts(): void {
    this.state.bypassAttempts++;
    
    // If too many bypass attempts, force the countdown to stay visible
    if (this.state.bypassAttempts > 5) {
      this.state.isVisible = true;
      this.saveState();
      
      // Reset after a while
      setTimeout(() => {
        this.state.bypassAttempts = 0;
        this.saveState();
      }, 60000);
    }
    
    this.saveState();
  }

  private hashPassword(password: string): string {
    // Simple implementation using text encoder and crypto API
    // In a real app, use a proper crypto library
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      return crypto.subtle.digestSync('SHA-256', data)
        .then(hash => {
          return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        });
    } catch (e) {
      // Fallback for environments without crypto.subtle
      console.error('Crypto API not available:', e);
      return '';
    }
  }

  private saveState(): void {
    this.state.lastVerifiedTime = Date.now();
    localStorage.setItem('countdownState', JSON.stringify(this.state));
  }

  private resetState(): void {
    this.state = {
      isVisible: true,
      hasEnteredAdminPassword: false,
      lastVerifiedTime: Date.now(),
      bypassAttempts: 0
    };
    this.saveState();
  }

  private verifyStateIntegrity(): void {
    // If it's been more than a day since we last verified, reset
    const ONE_DAY = 86400000; // milliseconds
    if (Date.now() - this.state.lastVerifiedTime > ONE_DAY) {
      this.resetState();
      return;
    }
    
    // Check for impossible state combinations
    if (!this.state.isVisible && !this.state.hasEnteredAdminPassword) {
      // Someone tried to manually bypass by editing localStorage
      this.resetState();
    }
  }

  private setupMutationObserver(): void {
    // Only run in browser environment
    if (typeof window !== 'undefined' && typeof MutationObserver !== 'undefined') {
      // Create an observer instance
      const observer = new MutationObserver((mutations) => {
        // Look for removal of countdown element
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
            // Check if our countdown overlay was removed
            const wasCountdownRemoved = Array.from(mutation.removedNodes).some(
              (node) => (node as Element).id === 'countdown-overlay'
            );
            
            if (wasCountdownRemoved && !this.state.hasEnteredAdminPassword) {
              this.incrementBypassAttempts();
              
              // Re-add the countdown after a short delay
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          }
        });
      });
      
      // Observer configuration
      const config = { childList: true, subtree: true };
      
      // Start observing the document body
      observer.observe(document.body, config);
    }
  }
}

export default CountdownService;
