export default class AssemblyResults {
    constructor(errors, source) {
        this.errors = errors || [];
        this.source = source;
    }

    static getErrors() {
        return this.errors;
    }

    static getErrorCount() {
        return this.errors.length;
    }

    static getSource() {
        return this.source;
    }
}
