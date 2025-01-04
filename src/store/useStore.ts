import { create } from 'zustand';
import { UserProfile, Chapter } from '../types';

interface State {
  userProfile: UserProfile | null;
  chapters: Chapter[];
  setUserProfile: (profile: UserProfile) => void;
  addChapter: (chapter: Chapter) => void;
  setSubscription: (status: boolean) => void;
}

export const useStore = create<State>((set) => ({
  userProfile: null,
  chapters: [],
  setUserProfile: (profile) => set({ userProfile: profile }),
  addChapter: (chapter) => set((state) => ({ 
    chapters: [...state.chapters, chapter] 
  })),
  setSubscription: (status) => set((state) => ({
    userProfile: state.userProfile ? {
      ...state.userProfile,
      hasSubscription: status
    } : null
  }))
}));