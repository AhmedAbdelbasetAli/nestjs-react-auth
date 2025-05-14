export type AuthState = {
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};


export type AuthError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
};