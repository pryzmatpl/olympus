<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex items-center">
            <book-icon class="h-6 w-6 text-indigo-600" />
            <span class="ml-2 text-xl font-bold text-gray-800">
              Mythical Journey
            </span>
          </router-link>
        </div>
        
        <div v-if="profile" class="flex items-center">
          <img
            :src="profile.avatar.url"
            alt="Avatar"
            class="h-8 w-8 rounded-full"
          />
          <span class="ml-2 text-gray-600">
            {{ profile.westernZodiac }} • {{ profile.chineseZodiac }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { BookIcon } from 'lucide-vue-next';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

export default {
  name: 'NavBar',
  components: {
    BookIcon
  },
  setup() {
    const store = useUserStore();
    const { profile } = storeToRefs(store);
    return { profile };
  }
}
</script>