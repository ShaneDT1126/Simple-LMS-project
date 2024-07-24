<template>
  <div class="bg-gray-800 text-white p-6">
    <h1 class="text-3xl font-bold mb-6">BREAK POINT</h1>
    
    <div class="h-96 overflow-y-auto mb-4 bg-gray-900 p-4 rounded" ref="memoryContentDisplay">
      <!-- Trace result will go here -->
      <pre class="text-sm">{{ breakResult }}</pre>
    </div>
    
    <div class="flex items-center space-x-4">
      <label for="breakInput" class="font-semibold">BREAK INPUT:</label>
      <input 
        id="breakInput"
        type="text" 
        v-model="breakInput"
        placeholder="Input break point here..." 
        class="bg-gray-700 text-white px-4 py-2 rounded-lg flex-grow"
      >
      <button 
        @click="addBreak" 
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
      >
        ADD
      </button>
      <button 
        @click="clearBreaks" 
        class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
      >
        CLEAR
      </button>
    </div>
  </div>
</template>

<script>
import BreakPoint from '@/carp/BreakPoint.js'; // Adjust the path as necessary

export default {
  name: 'BreakPoints',
  data() {
    return {
      breakInput: '',
      breakResult: '',
    }
  },
  methods: {
    addBreak() {
      if (this.breakInput) {
        // Simulating trace execution
        this.breakResult += `break: ${this.breakInput}\n`;
        BreakPoint.AddBreakPoint(this.breakInput);
        this.breakInput = '';
      }
    },
    clearBreaks() {
      BreakPoint.DeleteAllBreakPoints();
      this.breakResult = '';
      this.breakInput = '';
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>