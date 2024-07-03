import TraceResults from '@/carp/TraceResults.js'; // Adjust the path as necessary
import Memory from './Memory';

export default class AssemblyParser {
    constructor() {
        this.breakpoints = [];
        this.breaks = false;
        this.i = 0;
        this.isHex = false;

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
            this.FETCH1();
            this.FETCH2();
            this.FETCH3();
            switch (Memory.contents[this.i]) {
                case this.opcodeNOP:
                    break;
                case this.opcodeLDAC:
                    this.i++;
                    this.LDAC1();
                    this.LDAC2();
                    this.LDAC3();
                    this.LDAC4();
                    this.LDAC5();
                    break;
                case this.opcodeSTAC:
                    this.i++;
                    this.STAC1();
                    this.STAC2();
                    this.STAC3();
                    this.STAC4();
                    this.STAC5();
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
        }
    }

    FETCH1() {
        this.ar_bit = this.pc_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    FETCH2() {
        this.pc_bit += 1;
        this.dr_bit = Memory.contents[this.i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    FETCH3() {
        this.ar_bit = this.pc_bit;
        this.ir_bit = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC1() {
        this.dr_bit = Memory.contents[this.i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC2() {
        this.tr_bit = this.dr_bit;
        this.dr_bit = Memory.contents[this.i];
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC3() {
        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC4() {
        this.dr_bit = Memory.contents[this.i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    LDAC5() {
        this.ac_bit = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC1() {
        this.dr_bit = Memory.contents[this.i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC2() {
        this.tr_bit = this.dr_bit;
        this.dr_bit = Memory.contents[this.i];
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC3() {
        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC4() {
        this.dr_bit = this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    STAC5() {
        Memory.contents[this.i] = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    MVAC() {
        this.r_bit = this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    MOVR() {
        this.ac_bit = this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    JUMP() {
        this.pc_bit = Memory.contents[this.i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    JMPZ() {
        if (this.z_bit == 1) {
            this.pc_bit = Memory.contents[this.i];
        }
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    JPNZ() {
        if (this.z_bit == 0) {
            this.pc_bit = Memory.contents[this.i];
        }
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    ADD() {
        this.ac_bit += this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    SUB() {
        this.ac_bit -= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    INAC() {
        this.ac_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    CLAC() {
        this.ac_bit = 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    AND() {
        this.ac_bit &= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    OR() {
        this.ac_bit |= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    XOR() {
        this.ac_bit ^= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    NOT() {
        this.ac_bit = ~this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    END() {
        TraceResults.addResult("rtlStatement", "End Execution", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
        return;
    }

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
}
