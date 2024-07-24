<template>
    <!-- Right Section -->
      <div class="bg-gray-800 p-6 rounded">
        <h1 class="text-3xl font-bold mb-6">MEMORY VIEW</h1>
        <div class="h-96 overflow-y-auto mb-4 bg-gray-900 p-4 rounded relative" ref="memoryContentDisplay">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <!-- Memory content will be dynamically updated here -->
          <div v-if="!loading">
            {{ memoryContent }}
          </div>
        </div>
        <div class="flex justify-between">
          <button @click="viewMemory" class="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">VIEW</button>
          <button @click="clearMemory" class="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">CLEAR</button>
          <div>
            <span class="mr-2">Convert To</span>
            <button @click="convertTo('HEX')" class="bg-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">HEX</button>
            <button @click="convertTo('BINARY')" class="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">BINARY</button>
          </div>
        </div>
      </div>
</template>

<script>
// Import the Memory class
import Memory from '@/carp/Memory.js'; // Adjust the path as necessary

export default {
  name: 'MemoryView',
  data() {
    return {
      memoryContent: '',
      isHex: false,
      loading: false
    }
  },
  methods: {
    clearMemory() {
      // Clear memory content and reset memory location
      Memory.Clear();
      this.memoryContent = '';
      this.currentMemoryLocation = 0;
      Memory.UpdateMemoryTextBox(this.$refs.memoryContentDisplay, this.isHex);
    },
    convertTo(format) {
      console.log(`Converting to ${format}`);
      this.isHex = format === 'HEX';
      // Implement conversion logic here if needed
      Memory.UpdateMemoryTextBox(this.$refs.memoryContentDisplay, this.isHex);
    },
    async viewMemory() {
      this.loading = true;
      // Simulate an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Memory.UpdateMemoryTextBox(this.$refs.memoryContentDisplay, this.isHex);
      this.loading = false;
    }
  }
}
</script>
