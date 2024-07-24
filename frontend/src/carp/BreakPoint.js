import Notification from '@/carp/Notification.js'; // Adjust the path as necessary
export default class BreakPoint {
    static breakpointList = [];

    static AddBreakPoint(input) {
        let result = parseInt(input);
        if (input && this.isDigitsRegex(input) && result < 65536 && result >= 0 && !BreakPoint.breakpointList.includes(result)) {
            BreakPoint.breakpointList.push(result);
        } else {
            console.debug('Please enter a valid breakpoint.');
            Notification.messageBox('Please enter a valid breakpoint.');
        }
    }

    static DeleteAllBreakPoints() {
        // Clear the breakpointList array
        BreakPoint.breakpointList = [];
    
        // Remove all child elements from breakPointAddressList
        while (BreakPoint.breakpointList.firstChild) {
            BreakPoint.breakPointAddressList.removeChild(BreakPoint.breakPointAddressList.firstChild);
        }
    
        console.debug('All breakpoints have been cleared.');
        Notification.messageBox('All breakpoints have been cleared.');
    }
    

    static GetBreakPoints() {
        return BreakPoint.breakpointList;
    }

    static isDigitsRegex(text) {
        return /^\d+$/.test(text);
    }

    static PauseOrStopAnimation(input) {
        for (let i = 0; i < BreakPoint.breakpointList.length; i++) {
            if(i==input){
                return true;
            }
        }
        return false;
    }
}
