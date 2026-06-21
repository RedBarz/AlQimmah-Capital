"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Profile, defaultProfile } from "./engine";

const STORAGE_KEY = "alqimmah.profile.v1";
const ONBOARDED_KEY = "alqimmah.onboarded.v1";

interface ProfileContextValue {
  profile: Profile;
  setProfile: (p: Profile) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
  ready: boolean;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(defaultProfile);
  const [onboarded, setOnboardedState] = useState(false);
  const [ready, setReady] = useState(false);

  // charge depuis le stockage local au démarrage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfileState({ ...defaultProfile, ...JSON.parse(raw) });
      setOnboardedState(localStorage.getItem(ONBOARDED_KEY) === "true");
    } catch {
      /* no-op */
    }
    setReady(true);
  }, []);

  const setProfile = (p: Profile) => {
    setProfileState(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      /* no-op */
    }
  };

  const updateProfile = (patch: Partial<Profile>) => setProfile({ ...profile, ...patch });

  const setOnboarded = (v: boolean) => {
    setOnboardedState(v);
    try {
      localStorage.setItem(ONBOARDED_KEY, String(v));
    } catch {
      /* no-op */
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile, onboarded, setOnboarded, ready }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
