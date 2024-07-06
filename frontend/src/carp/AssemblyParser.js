import TraceResults from '@/carp/TraceResults.js'; // Adjust the path as necessary
import Memory from '@/carp/Memory.js'; // Adjust the path as necessary
import BreakPoint from '@/carp/BreakPoint.js'; // Adjust the path as necessary
export default class AssemblyParser {
    constructor() {
        this.breakpoints = [];
        this.breaks = false;
        this.i = 0;
        this.isHex = false;
        this.rtlStatement = "";
        this.dataMovement = "";
        // Visualization Opcodes
        this.opcodeNOP = 0x00;
        this.opcodeLDAC = 0x01;
        this.opcodeSTAC = 0x02;
        this.opcodeMVAC = 0x03;
        this.opcodeMOVR = 0x04;
        this.opcodeJUMP = 0x05;
        this.opcodeJMPZ = 0x06;
        this.opcodeJPNZ = 0x07;
        this.opcodeADD = 0x08;
        this.opcodeSUB = 0x09;
        this.opcodeINAC = 0x0a;
        this.opcodeCLAC = 0x0b;
        this.opcodeAND = 0x0c;
        this.opcodeOR = 0x0d;
        this.opcodeXOR = 0x0e;
        this.opcodeNOT = 0x0f;
        this.opcodeEND = 0xff;

        this.IOint = 0n;
        this.IO = "00000000";
        this.ar_bit = 0;
        this.pc_bit = 0;
        this.dr_bit = 0;
        this.tr_bit = 0;
        this.ir_bit = 0;
        this.r_bit = 0;
        this.ac_bit = 0;
        this.z_bit = 0;
    }

    startAnimation(memoryStartLocation) {
        this.i = memoryStartLocation;
        for (; this.i < Memory.contents.length; this.i++) {
            if (BreakPoint.PauseOrStopAnimation(this.i)) {
                this.rtlStatement = "BREAK";
                this.dataMovement = `Breakpoint reached at address ${this.i}`;
                TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                break;
            }

            this.FETCH1();
            if (BreakPoint.PauseOrStopAnimation(this.i)) {
                this.rtlStatement = "BREAK";
                this.dataMovement = `Breakpoint reached at address ${this.i}`;
                TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                break;
            }
            this.FETCH2();
            if (BreakPoint.PauseOrStopAnimation(this.i)) {
                this.rtlStatement = "BREAK";
                this.dataMovement = `Breakpoint reached at address ${this.i}`;
                TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                break;
            }
            this.FETCH3();
            if (BreakPoint.PauseOrStopAnimation(this.i)) {
                this.rtlStatement = "BREAK";
                this.dataMovement = `Breakpoint reached at address ${this.i}`;
                TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                break;
            }
            switch (Memory.contents[this.i]) {
                case this.opcodeNOP:
                    break;
                case this.opcodeLDAC:
                    this.i++;
                    this.LDAC1();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.LDAC2();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.LDAC3();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.LDAC4();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.LDAC5();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    break;
                case this.opcodeSTAC:
                    this.i++;
                    this.STAC1();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.STAC2();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.STAC3();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.STAC4();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    this.STAC5();
                    if (BreakPoint.PauseOrStopAnimation(this.i)) {
                        this.rtlStatement = "BREAK";
                        this.dataMovement = `Breakpoint reached at address ${this.i}`;
                        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                        break;
                    }
                    break;
                case this.opcodeMVAC:
                    this.MVAC();
                    break;
                case this.opcodeMOVR:
                    this.MOVR();
                    break;
                case this.opcodeJUMP:
                    this.i++;
                    this.JUMP();
                    break;
                case this.opcodeJMPZ:
                    this.i++;
                    this.JMPZ();
                    break;
                case this.opcodeJPNZ:
                    this.i++;
                    this.JPNZ();
                    break;
                case this.opcodeADD:
                    this.ADD();
                    break;
                case this.opcodeSUB:
                    this.SUB();
                    break;
                case this.opcodeINAC:
                    this.INAC();
                    break;
                case this.opcodeCLAC:
                    this.CLAC();
                    break;
                case this.opcodeAND:
                    this.AND();
                    break;
                case this.opcodeOR:
                    this.OR();
                    break;
                case this.opcodeXOR:
                    this.XOR();
                    break;
                case this.opcodeNOT:
                    this.NOT();
                    break;
                case this.opcodeEND:
                    this.END();
                    return;
                default:
                    console.log("Instruction " + Memory.contents[this.i] + " Does not Exist");
                    return;
            }
            if (BreakPoint.PauseOrStopAnimation(this.i)) {
                this.rtlStatement = "BREAK";
                this.dataMovement = `Breakpoint reached at address ${this.i}`;
                TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
                break;
            }
        }
    }
    //#region Animations
    FETCH1() {
        this.rtlStatement = "Fetch 1";
        this.dataMovement = "AR <- PC";

        this.ar_bit = this.pc_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    FETCH2() {
        this.rtlStatement = "Fetch 2";
        this.dataMovement = "DR <- M, PC <- PC+1";

        this.pc_bit += 1;
        this.dr_bit = Memory.contents[this.i];
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    FETCH3() {
        this.rtlStatement = "Fetch 3";
        this.dataMovement = "IR <- DR, AR <- PC";
        
        this.ar_bit = this.pc_bit;
        this.ir_bit = this.dr_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC1() {
        this.rtlStatement = "LDAC 1";
        this.dataMovement = "DR <- M, PC <- PC + 1, AR <- AR + 1";

        this.dr_bit = Memory.contents[this.i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC2() {
        this.rtlStatement = "LDAC 2";
        this.dataMovement = "TR <- DR, DR <- M, PC = PC + 1";

        this.tr_bit = this.dr_bit;
        this.dr_bit = Memory.contents[this.i];
        this.pc_bit += 1;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC3() {
        this.rtlStatement = "LDAC 3";
        this.dataMovement = "AR <- DR | TR";

        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC4() {
        this.rtlStatement = "LDAC 4";
        this.dataMovement = "DR <- M";

        this.dr_bit = Memory.contents[this.i];
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC5() {
        this.rtlStatement = "LDAC 5";
        this.dataMovement = "AC <- DR";

        this.ac_bit = this.dr_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC1() {
        this.rtlStatement = "STAC 1";
        this.dataMovement = "DR <- M, PC <- PC + 1, AR <- AR + 1";

        this.dr_bit = Memory.contents[this.i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC2() {
        this.rtlStatement = "STAC 2";
        this.dataMovement = "TR <- DR, DR <- M, PC <- PC + 1";

        this.tr_bit = this.dr_bit;
        this.dr_bit = Memory.contents[this.i];
        this.pc_bit += 1;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC3() {
        this.rtlStatement = "STAC 3";
        this.dataMovement = "AR <- DR | TR";

        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC4() {
        this.rtlStatement = "STAC 4";
        this.dataMovement = "DR <- AC";

        this.dr_bit = this.ac_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC5() {
        this.rtlStatement = "STAC 5";
        this.dataMovement = "M <- DR";

        Memory.contents[this.i] = this.dr_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    MVAC() {
        this.rtlStatement = "MVAC";
        this.dataMovement = "R <- AC";

        this.r_bit = this.ac_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    MOVR() {
        this.rtlStatement = "MOVR";
        this.dataMovement = "AC <- R";

        this.ac_bit = this.r_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    JUMP() {
        this.rtlStatement = "JUMP";
        this.dataMovement = "";

        this.pc_bit = Memory.contents[this.i];
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    JMPZ() {
        this.rtlStatement = "JMPZ";
        this.dataMovement = "";

        if (this.z_bit == 1) {
            this.pc_bit = Memory.contents[this.i];
        }
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    JPNZ() {
        this.rtlStatement = "JPNZ";
        this.dataMovement = "";

        if (this.z_bit == 0) {
            this.pc_bit = Memory.contents[this.i];
        }
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    ADD() {
        this.rtlStatement = "ADD";
        this.dataMovement = "AC <- AC + R";

        this.ac_bit += this.r_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    SUB() {
        this.rtlStatement = "SUB";
        this.dataMovement = "AC <- AC - R";
        
        this.ac_bit -= this.r_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    INAC() {
        this.rtlStatement = "INC";
        this.dataMovement = "AC <- AC + 1";

        this.ac_bit += 1;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    CLAC() {
        this.rtlStatement = "CLAC";
        this.dataMovement = "AC <- 0, Z <- 1";

        this.ac_bit = 0;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    AND() {
        this.rtlStatement = "AND";
        this.dataMovement = "AC <- AC & R";

        this.ac_bit &= this.r_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    OR() {
        this.rtlStatement = "OR";
        this.dataMovement = "AC <- AC | R";

        this.ac_bit |= this.r_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    XOR() {
        this.rtlStatement = "XOR";
        this.dataMovement = "AC <- AC ^ R";

        this.ac_bit ^= this.r_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    NOT() {
        this.rtlStatement = "NOT";
        this.dataMovement = "AC <- ~AC";

        this.ac_bit = ~this.ac_bit;
        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    END() {
        this.rtlStatement = "END";
        this.dataMovement = "END";

        TraceResults.addResult(this.rtlStatement, this.dataMovement, this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
        return;
    }
    //#endregion
    
    //#region Miscellaneous
    resetRegisters() {
        this.IOint = 0n;
        this.IO = "00000000";
        this.ar_bit = 0;
        this.pc_bit = 0;
        this.dr_bit = 0;
        this.tr_bit = 0;
        this.ir_bit = 0;
        this.r_bit = 0;
        this.ac_bit = 0;
        this.z_bit = 0;
    }

    spaceInserter(reg, regname) {
        let binaryString;
        if (regname === "ar" || regname === "pc") {
            binaryString = reg.toString(2).padStart(16, '0');
        } else if (regname === "z") {
            binaryString = reg.toString();
        } else {
            binaryString = reg.toString(2).padStart(8, '0');
        }

        const groupSize = 4;
        return binaryString.replace(/(.{4})/g, '$1 ').trim();
    }

    binaryStringToInt(binaryString) {
        const cleanedBinaryString = binaryString.replace(/\s/g, '');
        return parseInt(cleanedBinaryString, 2);
    }
    //#endregion
}
