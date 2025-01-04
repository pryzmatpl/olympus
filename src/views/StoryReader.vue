<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div v-if="profile" class="flex items-center space-x-4 mb-6">
        <img
          :src="profile.avatar.url"
          alt="Avatar"
          class="w-20 h-20 rounded-full"
        />
        <div>
          <h2 class="text-2xl font-bold">Your Mythical Journey</h2>
          <p class="text-gray-600">
            {{ profile.westernZodiac }} ♦ {{ profile.chineseZodiac }}
          </p>
        </div>
      </div>

      <div v-for="(chapter, index) in chapters" :key="chapter.id" class="mb-8">
        <h3 class="text-xl font-bold mb-4">{{ chapter.title }}</h3>
        <template v-if="index === 0 && !profile?.hasSubscription">
          <div class="my-4 p-4 bg-gray-100 rounded">
            <p class="mb-4">Subscribe to continue reading</p>
            <div ref="paypalButtonsContainer"></div>
          </div>
        </template>
        <template v-if="index === 0 || profile?.hasSubscription">
          <img
            :src="chapter.imageUrl"
            :alt="chapter.title"
            class="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p class="text-gray-700 leading-relaxed mb-4">
            {{ chapter.content }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="entity in chapter.mythologicalEntities"
              :key="entity"
              class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {{ entity }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { loadScript } from "@paypal/paypal-js";
import { useUserStore } from '../stores/user';
import { generateChapter } from '../services/api';
import { storeToRefs } from 'pinia';

export default {
  name: 'StoryReader',
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const { profile, chapters } = storeToRefs(store);
    const paypalButtonsContainer = ref(null);
    const loading = ref(false);

    const generateNewChapter = async () => {
      if (!profile.value || loading.value) return;
      
      loading.value = true;
      try {
        const newChapter = await generateChapter(profile.value, chapters.value.length + 1);
        store.addChapter(newChapter);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      if (!profile.value) {
        router.push('/');
        return;
      }

      if (chapters.value.length === 0) {
        await generateNewChapter();
      }

      const paypal = await loadScript({ 
        "client-id": "your_paypal_client_id"
      });

      paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: "9.99"
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(() => {
            store.setSubscription(true);
          });
        }
      }).render(paypalButtonsContainer.value);
    });

    watch(() => chapters.value.length, (newLength) => {
      if (profile.value?.hasSubscription && 
          newLength < 30 && 
          new Date().getHours() === 0) {
        generateNewChapter();
      }
    });

    return {
      profile,
      chapters,
      paypalButtonsContainer
    };
  }
}
</script>