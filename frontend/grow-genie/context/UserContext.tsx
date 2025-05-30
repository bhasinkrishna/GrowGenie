import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user data interface
interface User {
  name: string;
  plants: string[];
  location: string;
  avatar: string | null; // Avatar can be null until uploaded
  additionalInfo?: string; // Optional additional information (if any)
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (updatedFields: Partial<User>) => void; // Function to update user information
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component to wrap your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to update specific fields in the user data
  const updateUser = (updatedFields: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updatedFields });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
