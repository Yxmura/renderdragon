
interface CountdownState {
  isVisible: boolean;
  hasEnteredAdminPassword: boolean;
}

// Singleton service to manage countdown state across the app
class CountdownService {
  private static instance: CountdownService;
  private state: CountdownState = {
    isVisible: true, 
    hasEnteredAdminPassword: false
  };

  private constructor() {
    // Load state from localStorage if available
    const savedState = localStorage.getItem('countdownState');
    if (savedState) {
      this.state = JSON.parse(savedState);
    }
  }

  public static getInstance(): CountdownService {
    if (!CountdownService.instance) {
      CountdownService.instance = new CountdownService();
    }
    return CountdownService.instance;
  }

  public getIsVisible(): boolean {
    return this.state.isVisible;
  }

  public setIsVisible(value: boolean): void {
    this.state.isVisible = value;
    this.saveState();
  }

  public getHasEnteredAdminPassword(): boolean {
    return this.state.hasEnteredAdminPassword;
  }

  public setHasEnteredAdminPassword(value: boolean): void {
    this.state.hasEnteredAdminPassword = value;
    this.saveState();
  }

  private saveState(): void {
    localStorage.setItem('countdownState', JSON.stringify(this.state));
  }
}

export default CountdownService;
