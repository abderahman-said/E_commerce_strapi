import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Simulate API call - replace with actual API
            const response = await mockLogin(email, password);
            
            setUser(response.user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            // Simulate API call - replace with actual API
            const response = await mockRegister(userData);
            
            setUser(response.user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const value = {
        user,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Mock API functions - replace with actual API calls
const mockLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                resolve({
                    token: 'mock-jwt-token',
                    user: {
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                    }
                });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1000);
    });
};

const mockRegister = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userData.email && userData.password && userData.name) {
                resolve({
                    token: 'mock-jwt-token',
                    user: {
                        id: Date.now(),
                        name: userData.name,
                        email: userData.email,
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                    }
                });
            } else {
                reject(new Error('Please fill in all fields'));
            }
        }, 1000);
    });
};
