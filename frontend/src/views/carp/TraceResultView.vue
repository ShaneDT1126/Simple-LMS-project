<template>
  <div class="bg-gray-800 text-white p-6" :class="{ 'fixed inset-0 z-50 overflow-auto': fullScreen }">
    <h1 class="text-3xl font-bold mb-6">TRACE RESULT</h1>
    
    <div :class="['bg-gray-900 mb-4 rounded-lg overflow-auto relative', fullScreen ? 'flex-grow' : 'h-96']">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <div class="overflow-auto h-full">
        <pre class="whitespace-pre p-4 inline-block min-w-full">{{ traceResult }}</pre>
      </div>
      <button 
        v-if="fullScreen"
        @click="minimizeScreen" 
        class="absolute top-4 right-4 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
      >
        MINIMIZE
      </button>
    </div>
    
    <div class="flex justify-end space-x-4">
      <button 
        v-if="!fullScreen"
        @click="toggleFullScreen" 
        class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
      >
        FULL SCREEN
      </button>
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
      traceResult: '',
      fullScreen: false,
      loading: false
    }
  },
  methods: {
    async viewResult() {
      this.loading = true;
      this.traceResult = '';

      // Simulate an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (TraceResults.results.length === 0) {
        console.log('No results to display.');
        this.traceResult = 'No results to trace...';
      } else {
        TraceResults.results.forEach(result => {
          this.traceResult += result.toString() + '\n';
        });
        console.log('Trace results updated:', this.traceResult);
      }

      this.loading = false;
    },
    clearResult() {
      this.traceResult = '';
      TraceResults.removeAllStatements();
      console.log('Cleared trace result');
    },
    toggleFullScreen() {
      this.fullScreen = true;
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    },
    minimizeScreen() {
      this.fullScreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        this.fullScreen = false;
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener('fullscreenchange', () => {});
  }
}
</script>

<style scoped>
.whitespace-pre {
  white-space: pre;
}
</style>