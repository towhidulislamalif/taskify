import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthenticationContext = createContext();

function Authentication({ children }) {
  const google = new GoogleAuthProvider();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  //   on auth state changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   sign up new users
  const signup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   update a users profile
  const profile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  //   sign in existing users
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, google);
  };

  //   signout
  const signout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signup,
    profile,
    login,
    googleSignin,
    signout,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default Authentication;
