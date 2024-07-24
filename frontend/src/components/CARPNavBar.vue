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
    <div class="w-2/3 pl-6">
    <div class="flex justify-between items-center mb-3">
      <button 
        @click="chooseOption('Memory')" 
        :class="[
          'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500',
          selectedOption === 'Memory' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
        ]"
      >Memory and IO</button>
      <button 
        @click="chooseOption('BreakPoint')" 
        :class="[
          'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500',
          selectedOption === 'BreakPoint' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
        ]"
      >Breakpoints</button>
      <button 
        @click="chooseOption('TraceResult')" 
        :class="[
          'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500',
          selectedOption === 'TraceResult' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
        ]"
      >Trace Results</button>
      <button 
        @click="chooseOption('System')" 
        :class="[
          'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500',
          selectedOption === 'System' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
        ]"
      >View System</button>
    </div>
    <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import MemoryView from '../views/carp/MemoryView.vue';
import BreakPointView from '../views/carp/BreakPointView.vue';
import TraceResultView from '../views/carp/TraceResultView.vue';
import SystemView from '../views/carp/SystemView.vue';
import Assembler from '@/carp/Assembler';
import AssemblyParser from '@/carp/AssemblyParser';
import TraceResults from '@/carp/TraceResults';
import Memory from '@/carp/Memory.js'; // Adjust the path as necessary
import Notification from '@/carp/Notification.js'; // Adjust the path as necessary

export default {
  name: 'CARPNavBar',
  components: {
    MemoryView,
    BreakPointView,
    TraceResultView,
    SystemView
  },
  data() {
    return {
      cpuStatus: 'Idle',
      rtlStatement: '',
      currentMemoryLocation: 0,
      inputCode: '',
      currentView: MemoryView, // Set initial view
      selectedOption: 'Memory'
    }
  },
  methods: {
    assembleCode() {
      // Placeholder logic to assemble the code
      const assembler = new Assembler();
      const results = assembler.Assemble(this.inputCode,this.currentMemoryLocation);
      const errors = results.getErrors();
      if (errors.length > 0) {
          console.log("Assembly Errors:");
          errors.forEach(error => {
              console.log(`Line ${error.getLine()}: ${error.getMessage()}`);
              Notification.messageBox(`Line ${error.getLine()}: ${error.getMessage()}`);
          });
      } else {
          console.log("Assembly completed successfully with no errors.");
          Notification.messageBox('Assembly completed successfully with no errors.');
      }
      const assemblyParser = new AssemblyParser();
      assemblyParser.startAnimation(this.currentMemoryLocation);
      // Accessing the latest result from TraceResults
      if (TraceResults.results.length > 0) {
        const latestResult = TraceResults.results[TraceResults.results.length - 1];
        const resultMessage = "AR: " + assemblyParser.spaceInserter(latestResult.ar,"ar")
          + "\nPC: " + assemblyParser.spaceInserter(latestResult.pc,"pc")
          + "\nDR: " + assemblyParser.spaceInserter(latestResult.dr,"dr")
          + "\nTR: " + assemblyParser.spaceInserter(latestResult.tr,"tr")
          + "\nIR: " + assemblyParser.spaceInserter(latestResult.ir,"ir")
          + "\nR: " + assemblyParser.spaceInserter(latestResult.r,"r")
          + "\nAC: " + assemblyParser.spaceInserter(latestResult.ac,"ac")
          + "\nZ: " + assemblyParser.spaceInserter(latestResult.z,"z")

        console.log(resultMessage);
        Notification.messageBox('Output: \n' + resultMessage);

      } else {
        console.log("No results available");
        Notification.messageBox("No results available");
      }
    },
    chooseOption(name) {
      switch (name) {
        case 'Memory':
          this.currentView = MemoryView;
          this.selectedOption = 'Memory';
          break;
        case 'BreakPoint':
          this.currentView = BreakPointView;
          this.selectedOption = 'BreakPoint';
          break;
        case 'TraceResult':
          this.currentView = TraceResultView;
          this.selectedOption = 'TraceResult';
          break;
        case 'System':
          this.currentView = SystemView;
          this.selectedOption = 'System';
          break;
      }
    }
  }
}
</script>
