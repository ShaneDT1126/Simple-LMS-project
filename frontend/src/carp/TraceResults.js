export default class TraceResults {
    static results = [];
    static resultsStatements = [];
  
    static addResult(rtl, datamove, ar, pc, dr, tr, ir, r, ac, z) {
      this.results.push(new Results(rtl, datamove, ar, pc, dr, tr, ir, r, ac, z));
    }
  
    static getAllStatements() {
      this.resultsStatements = this.results.map(r => r.toString());
      return this.resultsStatements;
    }
  
    static removeAllStatements() {
      this.results.length = 0;
      this.resultsStatements.length = 0;
    }
  
    static updateTraceResults(trace) {
      trace.clear();
      if (this.results.length === 0) {
        trace.text = "No results to trace....";
      } else {
        trace.text = "Trace Results: \n";
        this.results.forEach(r => {
          trace.text += r.toString() + "\n";
        });
        trace.text += "\n";
      }
    }
  }
  
  class Results {
    constructor(rtl, datamove, ar, pc, dr, tr, ir, r, ac, z) {
      this.rtl = rtl;
      this.datamove = datamove;
      this.ar = ar;
      this.pc = pc;
      this.dr = dr;
      this.tr = tr;
      this.ir = ir;
      this.r = r;
      this.ac = ac;
      this.z = z;
    }
  
    toString() {
      const columnWidth = 9;
      return `RTL: ${this.rtl.padEnd(columnWidth)}, \n` +
             `DataMove: ${this.datamove.padEnd(columnWidth)}, \n` +
             `AR: ${this.spaceInserter(this.ar, 'ar')}, ` +
             `PC: ${this.spaceInserter(this.pc, 'pc')}, ` +
             `DR: ${this.spaceInserter(this.dr, 'dr')}, ` +
             `TR: ${this.spaceInserter(this.tr, 'tr')}, ` +
             `IR: ${this.spaceInserter(this.ir, 'ir')}, ` +
             `R: ${this.spaceInserter(this.r, 'r')}, ` +
             `AC: ${this.spaceInserter(this.ac, 'ac')}, ` +
             `Z: ${this.z}`;
    }
  
    spaceInserter(reg, regname) {
      let binaryString;
      if (regname === 'ar' || regname === 'pc') {
        binaryString = reg.toString(2).padStart(16, '0');
      } else if (regname === 'z') {
        binaryString = reg.toString();
      } else {
        binaryString = reg.toString(2).padStart(8, '0');
      }
  
      const groupSize = 4;
      for (let i = groupSize; i < binaryString.length; i += groupSize + 1) {
        binaryString = binaryString.slice(0, i) + ' ' + binaryString.slice(i);
      }
  
      return binaryString;
    }
  }
  
  // Usage example (assuming `trace` is an object with a `clear` and `text` property):
  const trace = {
    text: "",
    clear() {
      this.text = "";
    }
  };
  
  TraceResults.addResult("RTL Example", "Data Movement Example", 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 1);
  TraceResults.updateTraceResults(trace);
  console.log(trace.text);
  