<template>
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-bold mb-4">Character Attributes</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(value, stat) in stats" :key="stat" class="stat-container">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-gray-600 capitalize">{{ stat }}</span>
            <span class="text-sm font-bold text-indigo-600">{{ value }}/100</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-indigo-600 rounded-full h-2 transition-all duration-500"
              :style="{ width: `${value}%` }"
            ></div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="text-lg font-semibold mb-2">Class Affinity</h4>
        <p class="text-gray-700">{{ classType }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CharacterStats',
    props: {
      stats: {
        type: Object,
        required: true
      },
      classType: {
        type: String,
        required: true
      }
    }
  }
  </script>