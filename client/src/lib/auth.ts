export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export const AUTH_TOKEN_KEY = "admin-token";
export const VALID_TOKEN = "admin-authenticated";

export class AuthService {
  static getAuthState(): AuthState {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      isAuthenticated: token === VALID_TOKEN,
      token
    };
  }

  static async login(password: string): Promise<boolean> {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          localStorage.setItem(AUTH_TOKEN_KEY, result.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  static logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return this.getAuthState().isAuthenticated;
  }
}
