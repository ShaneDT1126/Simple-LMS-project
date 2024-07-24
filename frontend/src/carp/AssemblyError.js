export default class AssemblyError {
    constructor(lineNumber = 0, str = "") {
        this.lineNumber = lineNumber;
        this.str = str;
    }

    static getLineNumber() {
        return this.lineNumber;
    }

    static getString() {
        return this.str;
    }

    static setLineNumber(lineNumber) {
        this.lineNumber = lineNumber;
    }

    static setString(str) {
        this.str = str;
    }
}
