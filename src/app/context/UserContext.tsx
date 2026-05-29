import { createContext, useContext, useState, ReactNode } from 'react';
import { mockRestaurants, Restaurant, Review } from '../data/restaurants';

interface User {
  name: string;
  email: string;
  allergies: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
  addReview: (restaurantId: string, review: Review) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);

  const addRestaurant = (restaurant: Restaurant) => {
    setRestaurants(prev => [...prev, restaurant]);
  };

  const addReview = (restaurantId: string, review: Review) => {
    setRestaurants(prev =>
      prev.map(r =>
        r.id === restaurantId
          ? { ...r, reviews: [...r.reviews, review] }
          : r
      )
    );
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user, restaurants, addRestaurant, addReview }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
