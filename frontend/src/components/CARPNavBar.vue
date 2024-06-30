<template>
  <div class="bg-gray-900 text-white min-h-screen p-6 flex">
    <!-- Left Section -->
    <div class="w-1/3 pr-6">
      <div class="mb-6">
        <div class="mb-4">
          <span class="mr-2">Current CPU Status:</span>
          <span class="text-red-500 font-bold">{{ cpuStatus }}</span>
        </div>
        <div class="mb-4">
          <div>Current RTL Statement:</div>
          <div class="text-gray-400">{{ rtlStatement }}</div>
        </div>
        <div class="mb-4">
          <div>Current Memory Location:</div>
          <div class="text-4xl mb-2">{{ currentMemoryLocation }}</div>
        </div>
      </div>
      
      <textarea 
        v-model="inputCode" 
        class="w-full h-64 bg-gray-800 text-white p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-600 mb-4"
        placeholder="Input code here..."
      ></textarea>
      
      <button @click="assembleCode" class="w-full bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
        ASSEMBLE
      </button>
    </div>
    <MemoryView/>
  </div>
</template>

<script>
import MemoryView from '../views/carp/MemoryView.vue';
export default {
  name: 'CARPNavBar',
  components: {
    MemoryView,
  },
  data() {
    return {
      cpuStatus: 'Idle',
      rtlStatement: '',
      currentMemoryLocation: 0,
      inputCode: '',
    }
  },
  methods: {
    assembleCode() {
      // Placeholder logic to assemble the code
      console.log('Assembling code:', this.inputCode);
    },
  }
}
</script>
