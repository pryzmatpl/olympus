import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    chapters: []
  }),
  actions: {
    setProfile(profile) {
      this.profile = profile;
    },
    addChapter(chapter) {
      this.chapters.push(chapter);
    },
    setSubscription(status) {
      if (this.profile) {
        this.profile.hasSubscription = status;
      }
    }
  }
});