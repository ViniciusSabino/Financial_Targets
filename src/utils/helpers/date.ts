import { Months } from '../enums/date';

export interface DateInfo {
    month: Months;
    year: number;
}

const getMonthNameByNumber = (number: number): Months =>
    ({
        1: Months.JANUARY,
        2: Months.FEBRUARY,
        3: Months.MARCH,
        4: Months.APRIL,
        5: Months.MAY,
        6: Months.JUNE,
        7: Months.JULY,
        8: Months.AUGUST,
        9: Months.SEPTEMBER,
        10: Months.OCTOBER,
        11: Months.NOVEMBER,
        12: Months.DECEMBER,
    }[number] || Months.JANUARY);

const getCurrentMonth = (): number => new Date().getMonth();

const getCurrentMonthName = (): Months => {
    const monthNumber = getCurrentMonth();

    return getMonthNameByNumber(monthNumber + 1);
};

const getCurrentYear = (): number => new Date().getFullYear();

export { getCurrentMonth, getCurrentMonthName, getMonthNameByNumber, getCurrentYear };
