const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function goToPreviousMonth(monthDisplayed: any, setMonthDisplayed: any, setStartDay: any) {
    const newMonthDisplayed = {
        month: monthDisplayed.month - 1,
        year: monthDisplayed.year
    };
    if(newMonthDisplayed.month === 0) {
        newMonthDisplayed.month = 12;
        newMonthDisplayed.year -= 1;
    }
    setMonthDisplayed(newMonthDisplayed);
    setStartDay(getFirstWeekdayOfMonth(newMonthDisplayed.month, newMonthDisplayed.year));
}

export function goToNextMonth(monthDisplayed: any, setMonthDisplayed: any, setStartDay: any) {
    const newMonthDisplayed = {
        month: monthDisplayed.month + 1,
        year: monthDisplayed.year
    };
    if(newMonthDisplayed.month === 13) {
        newMonthDisplayed.month = 1;
        newMonthDisplayed.year += 1;
    }
    setMonthDisplayed(newMonthDisplayed);
    setStartDay(getFirstWeekdayOfMonth(newMonthDisplayed.month, newMonthDisplayed.year));
}

export function getMonthName(month: number) {
    return months[month];
}

export function getFirstWeekdayOfMonth(month: number, year: number) {
    const date = new Date(`${getMonthName(month)} 1, ${year} 00:00:00`);
    return date.getDay();
}

export function getNumberOfDaysOfMonth(month: number, year: number) {
    const date = new Date(year, month, 0);
    return date.getDate();
}

export function newShade (hexColor: string, magnitude: number, isCalendarDay: boolean) {
    if(!isCalendarDay) {
        return '#8e9490';
    }

    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

export function getLastWeekDependingOnCurrentDay() {
    const concatDays = [...days, ...days];
    const nextDayAfterToday = new Date().getDay() + 1;
    return concatDays.slice(nextDayAfterToday, nextDayAfterToday + 7);
}

export function getDayByIndex(index: number) {
    return days[index];
}