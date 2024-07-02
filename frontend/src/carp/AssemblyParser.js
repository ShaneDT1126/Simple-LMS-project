import TraceResults from '@/carp/TraceResults.js'; // Adjust the path as necessary
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

        this.memorycode = Memory.contents;

        this.instructadv1 = 0;
        this.instructadv2 = 0;

        this.IOint = 0;
        this.IO = "00000000";
        this.ar_bit = 0x00000000;
        this.pc_bit = 0x00000000;
        this.dr_bit = 0x00000000;
        this.tr_bit = 0x00000000;
        this.ir_bit = 0x00000000;
        this.r_bit = 0x00000000;
        this.ac_bit = 0x00000000;
        this.z_bit = 0;
    }

    static startAnimation(memoryStartLocation, memorycode) {
        for (let i = memoryStartLocation; i < memorycode.length; i++) {
            this.FETCH1(memorycode, i);
            this.FETCH2(memorycode, i);
            this.FETCH3(memorycode, i);
            switch (memorycode[i]) {
                case this.opcodeNOP:
                    this.NOP();
                    break;
                case this.opcodeLDAC:
                    i++;
                    this.LDAC1(memorycode, i);
                    this.LDAC2(memorycode, i);
                    this.LDAC3(memorycode, i);
                    this.LDAC4(memorycode, i);
                    this.LDAC5(memorycode, i);
                    break;
                case this.opcodeSTAC:
                    i++;
                    this.STAC1(memorycode, i);
                    this.STAC2(memorycode, i);
                    this.STAC3(memorycode, i);
                    this.STAC4(memorycode, i);
                    this.STAC5(memorycode, i);
                    break;
                case this.opcodeMVAC:
                    this.MVAC();
                    break;
                case this.opcodeMOVR:
                    this.MOVR();
                    break;
                case this.opcodeJUMP:
                    i++;
                    this.JUMP(memorycode, i);
                    break;
                case this.opcodeJMPZ:
                    i++;
                    this.JMPZ(memorycode, i);
                    break;
                case this.opcodeJPNZ:
                    i++;
                    this.JPNZ(memorycode, i);
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
                    console.log("Instruction Does not Exist");
                    break;
            }
        }
    }

    static FETCH1(memorycode, i) {
        this.ar_bit = this.pc_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static FETCH2(memorycode, i) {
        this.pc_bit += 1;
        this.dr_bit = memorycode[i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static FETCH3(memorycode, i) {
        this.ar_bit = this.pc_bit;
        this.ir_bit = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC1(memorycode, i) {
        this.dr_bit = memorycode[i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC2(memorycode, i) {
        this.tr_bit = this.dr_bit;
        this.dr_bit = memorycode[i];
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC3(memorycode, i) {
        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC4(memorycode, i) {
        this.dr_bit = memorycode[i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC5(memorycode, i) {
        this.ac_bit = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC1(memorycode, i) {
        this.dr_bit = memorycode[i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC2(memorycode, i) {
        this.tr_bit = this.dr_bit;
        this.dr_bit = memorycode[i];
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC3(memorycode, i) {
        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC4(memorycode, i) {
        this.dr_bit = this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC5(memorycode, i) {
        memorycode[i] = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static MVAC() {
        this.r_bit = this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static MOVR() {
        this.ac_bit = this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static JUMP(memorycode, i) {
        this.pc_bit = memorycode[i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static JMPZ(memorycode, i) {
        if (this.z_bit == 1) {
            this.pc_bit = memorycode[i];
        }
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static JPNZ(memorycode, i) {
        if (this.z_bit == 0) {
            this.pc_bit = memorycode[i];
        }
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static ADD() {
        this.ac_bit += this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static SUB() {
        this.ac_bit -= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static INAC() {
        this.ac_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static CLAC() {
        this.ac_bit = 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static AND() {
        this.ac_bit &= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static OR() {
        this.ac_bit |= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static XOR() {
        this.ac_bit ^= this.r_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static NOT() {
        this.ac_bit = ~this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static END() {
        TraceResults.addResult("rtlStatement", "End Execution", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
        return;
    }
}
