<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
    <div class="p-8">
      <div class="flex items-center mb-6">
        <calendar-icon class="h-6 w-6 text-indigo-600 mr-2" />
        <h2 class="text-2xl font-bold text-gray-800">Begin Your Mythical Journey</h2>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            When were you born?
          </label>
          <input
            type="date"
            required
            v-model="birthday"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <label class="block text-sm font-medium text-gray-700">
            Choose your mythical name
          </label>
          <input
            type="text"
            required
            v-model="inputName"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Your Journey
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CalendarIcon } from 'lucide-vue-next';
import { useUserStore } from '../stores/user';
import { getWesternZodiac, getChineseZodiac } from '../utils/zodiac';
import { generateAvatar } from '../services/api';

export default {
  name: 'BirthdayForm',
  components: {
    CalendarIcon
  },
  setup() {
    const birthday = ref('');
    const inputName = ref('');
    const router = useRouter();
    const store = useUserStore();

    const handleSubmit = async () => {
      const birthdayDate = new Date(birthday.value);
      const name = inputName.value;
      const westernZodiac = getWesternZodiac(birthdayDate);
      const chineseZodiac = getChineseZodiac(birthdayDate);
      
      const avatar = await generateAvatar(westernZodiac, chineseZodiac);
      
      store.setProfile({
        birthday: birthdayDate,
        name: name,
        westernZodiac,
        chineseZodiac,
        avatar,
        hasSubscription: false
      });
      
      router.push('/story');
    };

    return {
      birthday,
      name,
      handleSubmit
    };
  }
}
</script>