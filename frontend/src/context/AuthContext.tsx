import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user || '');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = (username: string, jwtToken: string) => {
    setUser(username);
    setToken(jwtToken);
    navigate('/profile'); // Redirect to profile after login
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
