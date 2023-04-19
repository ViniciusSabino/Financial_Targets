import { Months } from '../../enums/date';
import { getCurrentMonth, getCurrentMonthName, getCurrentYear, getMonthNameByNumber } from '../date';

describe('Utils/Helpers', () => {
    describe('Date', () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date(2023, 2, 1));
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        describe('getMonthNameByNumber', () => {
            test('should return a month in string when given a valid month number', () => {
                const monthName: Months = getMonthNameByNumber(12);

                expect(monthName).toEqual(Months.DECEMBER);
            });

            test('should return "JANUARY" when given an invalid month number', () => {
                const monthName: Months = getMonthNameByNumber(13);

                expect(monthName).toEqual(Months.JANUARY);
            });
        });

        describe('getCurrentMonth', () => {
            test('should return month number based on current date', () => {
                const month = getCurrentMonth();

                expect(month).toEqual(2);
            });
        });

        describe('getCurrentMonthName', () => {
            test('should return the name of the current month', () => {
                const month = getCurrentMonthName();

                expect(month).toEqual(Months.FEBRUARY);
            });
        });

        describe('getCurrentYear', () => {
            test('should return the current year', () => {
                const year = getCurrentYear();

                expect(year).toEqual(2023);
            });
        });
    });
});
