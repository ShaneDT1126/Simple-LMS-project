<template>
  <div class="bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-bold mb-6">TRACE RESULT</h1>
    
    <div class="h-96 bg-gray-800 mb-6 rounded-lg overflow-y-auto">
      <!-- Trace result will go here -->
      <pre>{{ traceResult }}</pre>
    </div>
    
    <div class="flex justify-end space-x-4">
      <button 
        @click="viewResult" 
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
      >
        VIEW
      </button>
      <button 
        @click="clearResult" 
        class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg"
      >
        CLEAR
      </button>
    </div>
  </div>
</template>

<script>
import TraceResults from '@/carp/TraceResults.js'; // Adjust the path as necessary

export default {
  name: 'TraceResult',
  data() {
    return {
      traceResult: ''
    }
  },
  methods: {
    viewResult() {
      // Clear existing trace results
      this.traceResult = '';

      // Iterate through TraceResults and update traceResult
      if (TraceResults.results.length === 0) {
        console.log('No results to display.');
        this.traceResult = 'No results to trace...';
      } else {
        TraceResults.results.forEach(result => {
          this.traceResult += result.toString() + '\n';
        });
        console.log('Trace results updated:', this.traceResult);
      }
    },
    clearResult() {
      // Logic to clear the trace result
      this.traceResult = '';
      TraceResults.removeAllStatements(); // Clear results in TraceResults
      console.log('Cleared trace result');
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
