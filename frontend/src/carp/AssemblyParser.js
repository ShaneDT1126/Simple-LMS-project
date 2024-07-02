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

    static startAnimation(memoryStartLocation) {
        for (this.i = memoryStartLocation; this.i < this.memorycode.length; this.i++) {
            this.FETCH1();
            this.FETCH2();
            this.FETCH3();
            switch (this.memorycode[this.i]) {
                case this.opcodeNOP:
                    this.NOP();
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
                    console.log("Instruction Does not Exist");
                    break;
            }
        }
    }

    static resetRegisters() {
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

    static FETCH1() {
        this.ar_bit = this.pc_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static FETCH2() {
        this.pc_bit += 1;
        this.dr_bit = this.memorycode[this.i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static FETCH3() {
        this.ar_bit = this.pc_bit;
        this.ir_bit = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC1() {
        this.dr_bit = this.memorycode[this.i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC2() {
        this.tr_bit = this.dr_bit;
        this.dr_bit = this.memorycode[this.i];
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC3() {
        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC4() {
        this.dr_bit = this.memorycode[this.i];
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static LDAC5() {
        this.ac_bit = this.dr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC1() {
        this.dr_bit = this.memorycode[this.i];
        this.ar_bit += 1;
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC2() {
        this.tr_bit = this.dr_bit;
        this.dr_bit = this.memorycode[this.i];
        this.pc_bit += 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC3() {
        this.ar_bit = this.dr_bit | this.tr_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC4() {
        this.dr_bit = this.ac_bit;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static STAC5() {
        this.memorycode[this.i] = this.dr_bit;
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

    static JUMP() {
        const position = this.memorycode[this.i] - 1;
        if (position >= 0 && position < this.memorycode.length) {
            TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
            this.i = position;
        } else {
            console.log("Invalid memory line JUMP");
        }
    }

    static JMPZ() {
        if (this.z_bit === 1) {
            const position = this.memorycode[this.i] - 1;
            TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
            this.i = position;
        } else {
            TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
        }
    }

    static JPNZ() {
        if (this.z_bit === 0) {
            const position = this.memorycode[this.i] - 1;
            TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
            this.i = position;
        } else {
            TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
        }
    }

    static NOP() {
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static END() {
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static ADD() {
        this.ac_bit += this.r_bit;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static SUB() {
        this.ac_bit -= this.r_bit;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static INAC() {
        this.ac_bit += 1;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static CLAC() {
        this.ac_bit = 0;
        this.z_bit = 1;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static AND() {
        this.ac_bit &= this.r_bit;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static OR() {
        this.ac_bit |= 1;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static XOR() {
        this.ac_bit ^= 1;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static NOT() {
        this.ac_bit = ~this.ac_bit;
        this.z_bit = (this.ac_bit === 0) ? 1 : 0;
        TraceResults.addResult("rtlStatement", "Data Movement", this.ar_bit, this.pc_bit, this.dr_bit, this.tr_bit, this.ir_bit, this.r_bit, this.ac_bit, this.z_bit);
    }

    static spaceInserter(reg, regname) {
        let binaryString;
        if (regname === "ar" || regname === "pc") {
            binaryString = reg.toString(2).padStart(16, '0');
        } else if (regname === "z") {
            binaryString = reg.toString();
        } else {
            binaryString = reg.toString(2).padStart(8, '0');
        }

        const groupSize = 4;
        for (let i = groupSize; i < binaryString.length; i += (groupSize + 1)) {
            binaryString = binaryString.slice(0, i) + " " + binaryString.slice(i);
        }
        return binaryString;
    }

    static binaryStringToInt(binaryString) {
        const cleanedBinaryString = binaryString.replace(/ /g, '');
        return parseInt(cleanedBinaryString, 2);
    }
}
