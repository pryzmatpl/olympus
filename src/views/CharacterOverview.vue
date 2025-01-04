<template>
    <div class="max-w-4xl mx-auto p-4">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <avatar-viewer :model-url="profile.avatar.model3dUrl" />
          <div class="mt-6">
            <character-stats 
              :stats="characterStats.stats"
              :class-type="characterStats.classType"
            />
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Character Overview</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Zodiac Signs</h3>
              <p class="text-gray-600">
                Western: {{ profile.westernZodiac }}<br>
                Chinese: {{ profile.chineseZodiac }}
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Class</h3>
              <p class="text-gray-600">{{ characterStats.classType }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Story Progress</h3>
              <p class="text-gray-600">{{ chapters.length }} chapters completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '../stores/user';
  import { useCharacterStore } from '../store/character';
  import { storeToRefs } from 'pinia';
  import AvatarViewer from '../components/AvatarViewer.vue';
  import CharacterStats from '../components/CharacterStats.vue';
  
  export default {
    name: 'CharacterOverview',
    components: {
      AvatarViewer,
      CharacterStats
    },
    setup() {
      const userStore = useUserStore();
      const characterStore = useCharacterStore();
      const { profile, chapters } = storeToRefs(userStore);
      const characterStats = storeToRefs(characterStore);
  
      // Initialize character stats if not already set
      if (!characterStats.stats.value.strength && profile.value) {
        characterStore.setStats(profile.value.westernZodiac, profile.value.chineseZodiac);
      }
  
      return {
        profile,
        chapters,
        characterStats
      };
    }
  }
  </script>