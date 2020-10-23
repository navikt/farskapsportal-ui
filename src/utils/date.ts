import {
    addDays,
    differenceInDays,
    differenceInWeeks,
    formatISO,
    isFuture,
    isToday,
    parseISO,
    subDays,
} from 'date-fns';

import { DAYS_OF_PREGNANCY } from './constants';

export const getToday = (): string => formatISO(new Date(), { representation: 'date' });

export const getNDaysAhead = (numberOfDays: number): string =>
    formatISO(addDays(new Date(), numberOfDays), { representation: 'date' });

export const isTodayOrAfter = (date: string): boolean =>
    isFuture(parseISO(date)) || isToday(parseISO(date));

export const isLessThanNDaysAhead = (date: string, numberOfDays: number): boolean =>
    differenceInDays(parseISO(date), new Date()) < numberOfDays;

export const getWeekOfPregnancy = (date: string): number =>
    differenceInWeeks(new Date(), subDays(parseISO(date), DAYS_OF_PREGNANCY - 1)) + 1;
