import AssemblySourceProgram from '@/carp/AssemblySourceProgram.js'; // Adjust the path as necessary
import AssemblyInstructions from '@/carp/AssemblyInstructions.js'; // Adjust the path as necessary
import AssemblyResults from '@/carp/AssemblyResults.js'; // Adjust the path as necessary
import AssemblyError from '@/carp/AssemblyError.js'; // Adjust the path as necessary
import Memory from '@/carp/Memory.js'; // Adjust the path as necessary
export default class Assembler {
    static NOP = "NOP";
    static LDAC = "LDAC";
    static STAC = "STAC";
    static MVAC = "MVAC";
    static MOVR = "MOVR";
    static JUMP = "JUMP";
    static JMPZ = "JMPZ";
    static JPNZ = "JPNZ";
    static ADD = "ADD";
    static SUB = "SUB";
    static INAC = "INAC";
    static CLAC = "CLAC";
    static AND = "AND";
    static OR = "OR";
    static XOR = "XOR";
    static NOT = "NOT";
    static END = "END";
    
    static ORG = "ORG";
    static DB = "DB";
    static DW = "DW";
    
    Assemble(source, location) {
        const code = new AssemblySourceProgram(source);
        let memoryCounter = location;
        const assemblyErrorList = [];
        let errorCount = 0;

        for (let lineIndex = 1; lineIndex <= code.sourceLineLength(); lineIndex++) {
            const line = code.getSourceLineByLineNumber(lineIndex);
            console.log(line);

            if (line && line.sourceTokenLength() > 0) {
                const tokens = line.getSourceTokenStringArray();
                let offset = 0;
                if (this.IsLabel(tokens[0])) {
                    offset = 1;
                }
                console.log("Token: " + tokens[0 + offset]);
                if (tokens[0 + offset].toUpperCase() === Assembler.ORG) {
                    console.log("ORG");
                    if (tokens.length - offset < 2) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: ORG expects one operand`));
                    } else if (tokens.length - offset > 2) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: ORG does not accept more than one operand`));
                    } else if (!AssemblyInstructions.isAddress(tokens[1 + offset])) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[1 + offset]}: Specified address is invalid`));
                    }
                } else if (tokens[0 + offset].toUpperCase() === Assembler.DB) {
                    console.log("DB");
                    if (tokens.length - offset < 2) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: DB expects one operand`));
                    } else if (tokens.length - offset > 2) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: DB does not accept more than one operand`));
                    } else if (AssemblyInstructions.toByteShort(tokens[1 + offset]) == -1) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[1 + offset]}: Specified byte constant is invalid`));
                    }
                } else if (tokens[0 + offset].toUpperCase() === Assembler.DW) {
                    console.log("DW");
                    if (tokens.length - offset < 2) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: DW expects one operand`));
                    } else if (tokens.length - offset > 2) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: DW does not accept more than one operand`));
                    } else if (AssemblyInstructions.toWordInteger(tokens[1 + offset]) == -1) {
                        errorCount++;
                        assemblyErrorList.push(new AssemblyError(
                            lineIndex, `LINE ${lineIndex}::  ${tokens[1 + offset]}: Specified word constant is invalid`));
                    }
                } else if (AssemblyInstructions.isMnemonic(tokens[0 + offset])) {
                    console.log("Mnemonic");
                    if (AssemblyInstructions.expectsOperands(tokens[0 + offset]) === 1) {
                        if (tokens.length - offset < 2) {
                            errorCount++;
                            assemblyErrorList.push(new AssemblyError(
                                lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset].toUpperCase()}: expects one operand`));
                        } else if (tokens.length - offset > 2) {
                            errorCount++;
                            assemblyErrorList.push(new AssemblyError(
                                lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset].toUpperCase()}: does not accept more than one operand`));
                        } else if (!AssemblyInstructions.isAddress(tokens[1 + offset]) && !this.LabelExists(tokens[1 + offset], code)) {
                            errorCount++;
                            assemblyErrorList.push(new AssemblyError(
                                lineIndex, `LINE ${lineIndex}::  ${tokens[1 + offset].toUpperCase()}: Specified address is invalid`));
                        }
                    } else {
                        if (tokens.length - offset > 1) {
                            errorCount++;
                            assemblyErrorList.push(new AssemblyError(
                                lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset].toUpperCase()}: does not accept any operands`));
                        }
                    }
                } else {
                    errorCount++;
                    assemblyErrorList.push(new AssemblyError(
                        lineIndex, `LINE ${lineIndex}::  ${tokens[0 + offset]}: Specified mnemonic is invalid`));
                }
            }
        }

        if (errorCount !== 0) {
            // Error handling here
        } else {
            // If no errors exist, assemble program
            for (let lineIndex = 1; lineIndex <= code.sourceLineLength(); lineIndex++) {
                const line = code.getSourceLineByLineNumber(lineIndex);
                if (line && line.toString() !== "" && line.sourceTokenLength() > 0) {
                    const tokens = line.getSourceTokenStringArray();
                    let offset = 0;
                    if (this.IsLabel(tokens[0])) {
                        offset = 1;
                    }

                    if (tokens[0 + offset].toUpperCase() === Assembler.ORG) {
                        memoryCounter = AssemblyInstructions.toAddressInteger(tokens[1 + offset]);
                    } else if (tokens[0 + offset].toUpperCase() === Assembler.DB) {
                        const byteShort = AssemblyInstructions.toByteShort(tokens[1 + offset]);
                        Memory.Write(memoryCounter, byteShort);
                        memoryCounter++;
                    } else if (tokens[0 + offset].toUpperCase() === Assembler.DW) {
                        const wordCode = AssemblyInstructions.toWordCode(AssemblyInstructions.toWordInteger(tokens[1 + offset]));
                        Memory.Write(memoryCounter, wordCode[0]);
                        Memory.Write(memoryCounter + 1, wordCode[1]);
                        memoryCounter += 2;
                    } else {
                        code.setSourceLineAddressByLineNumber(memoryCounter, lineIndex);
                        Memory.Write(memoryCounter, AssemblyInstructions.toMnemonicCode(tokens[0 + offset]));

                        if (AssemblyInstructions.expectsOperands(tokens[0 + offset]) === 1) {
                            let addressCode;
                            if (this.LabelExists(tokens[1 + offset], code)) {
                                addressCode = AssemblyInstructions.toAddressCode(this.GetLabelAddress(tokens[1 + offset], code));
                            } else {
                                addressCode = AssemblyInstructions.toAddressCode(AssemblyInstructions.toAddressInteger(tokens[1 + offset]));
                            }
                            Memory.Write(memoryCounter + 1, addressCode[0]);
                            Memory.Write(memoryCounter + 2, addressCode[1]);
                            memoryCounter += 2;
                        }
                        memoryCounter++;
                    }
                }
            }
        }

        const assemblyErrors = assemblyErrorList;
        return new AssemblyResults(assemblyErrors, code);
    }

    IsLabel(token) {
        return token.indexOf(':') !== -1 && token.indexOf(':') === token.length - 1 && token.length > 1;
    }

    LabelExists(label, code) {
        for (let lineIndex = 1; lineIndex <= code.sourceLineLength(); lineIndex++) {
            const line = code.getSourceLineByLineNumber(lineIndex);
            if (line && line.getLabel().toLowerCase() === label.toLowerCase() + ":") {
                return true;
            }
        }
        return false;
    }

    GetLabelAddress(label, code) {
        if (this.LabelExists(label, code)) {
            let memoryCounter = 0;
            for (let lineIndex = 1; lineIndex <= code.sourceLineLength(); lineIndex++) {
                const line = code.getSourceLineByLineNumber(lineIndex);
                if (line && line.getLabel().toLowerCase() === label.toLowerCase() + ":") {
                    return memoryCounter;
                }

                if (line && line.sourceTokenLength() > 0) {
                    const tokens = line.getSourceTokenStringArray();
                    let offset = 0;
                    if (this.IsLabel(tokens[0])) {
                        offset = 1;
                    }

                    if (tokens[0 + offset].toUpperCase() === Assembler.ORG) {
                        memoryCounter = AssemblyInstructions.toAddressInteger(tokens[1 + offset]);
                    } else if (tokens[0 + offset].toUpperCase() === Assembler.DB) {
                        memoryCounter++;
                    } else if (tokens[0 + offset].toUpperCase() === Assembler.DW) {
                        memoryCounter += 2;
                    } else {
                        code.setSourceLineAddressByLineNumber(memoryCounter, lineIndex);

                        if (AssemblyInstructions.ExpectsOperands(tokens[0 + offset]) === 1) {
                            memoryCounter += 2;
                        }
                        memoryCounter++;
                    }
                }
            }
        }
        return -1;
    }
}
