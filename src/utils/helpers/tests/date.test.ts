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
            test('deveria retornar um mês em string quando informado um número de mês válido', () => {
                const monthName: Months = getMonthNameByNumber(12);

                expect(monthName).toEqual(Months.DECEMBER);
            });

            test('deveria retornar "JANUARY" quando informado um número de mês inválido', () => {
                const monthName: Months = getMonthNameByNumber(13);

                expect(monthName).toEqual(Months.JANUARY);
            });
        });

        describe('getCurrentMonth', () => {
            test('deveria retornar o número do mês com base na data atual', () => {
                const month = getCurrentMonth();

                expect(month).toEqual(2);
            });
        });

        describe('getCurrentMonthName', () => {
            test('deveria retornar o nome do mês atual', () => {
                const month = getCurrentMonthName();

                expect(month).toEqual(Months.FEBRUARY);
            });
        });

        describe('getCurrentYear', () => {
            test('deveria retornar o ano atual', () => {
                const year = getCurrentYear();

                expect(year).toEqual(2023);
            });
        });
    });
});
