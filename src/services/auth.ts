import { api } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private user: User | null = null;

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    this.user = response.user;
    return response;
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post('/auth/signup', data);
    this.user = response.user;
    return response;
  }

  async loginWithProvider(provider: 'google' | 'github'): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        `${import.meta.env.VITE_API_URL}/auth/${provider}`,
        `${provider} Login`,
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        reject(new Error('Popup blocked. Please allow popups for this site.'));
        return;
      }

      let popupClosed = false;

      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== import.meta.env.VITE_API_URL) return;

        if (event.data.type === 'auth_success') {
          cleanup();
          this.user = event.data.user;
          resolve({ user: event.data.user, token: event.data.token });
        }
        if (event.data.type === 'auth_error') {
          cleanup();
          reject(new Error(event.data.error));
        }
      };

      const checkClosed = setInterval(() => {
        if (popup.closed && !popupClosed) {
          popupClosed = true;
          cleanup();
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);

      const cleanup = () => {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
      };

      window.addEventListener('message', handleMessage);
    });
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout', {});
    this.user = null;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      if (this.user) {
        return this.user;
      }

      const response = await api.get('/auth/me');
      this.user = response.user;
      return this.user;
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        return null;
      }
      throw error;
    }
  }

  clearUser(): void {
    this.user = null;
  }
}

export const authService = new AuthService();