import {
    addDays,
    differenceInDays,
    differenceInHours,
    differenceInWeeks,
    formatISO,
    parseISO,
    subDays,
} from 'date-fns';

import { DAYS_IN_PREGNANCY } from './constants';

export const getToday = (): string => formatISO(new Date(), { representation: 'date' });

export const getNDaysInTheFuture = (numberOfDays: number): string =>
    formatISO(addDays(new Date(), numberOfDays), { representation: 'date' });

export const getNDaysInThePast = (numberOfDays: number): string =>
    getNDaysInTheFuture(-numberOfDays);

export const isLessThanNDaysInTheFuture = (date: string, numberOfDays: number): boolean =>
    differenceInDays(parseISO(date), new Date()) < numberOfDays;

export const isLessThanNDaysInThePast = (date: string, numberOfDays: number): boolean =>
    differenceInDays(new Date(), parseISO(date)) < numberOfDays;

export const getWeekOfPregnancy = (date: string): number =>
    differenceInWeeks(new Date(), subDays(parseISO(date), DAYS_IN_PREGNANCY + 2)); // TODO: korrekt antall uker?

export const getHoursUntil = (date: string): number =>
    differenceInHours(parseISO(date), new Date());

export const isLessThanNHoursInThePast = (date: string, numberOfHours: number): boolean =>
    differenceInHours(new Date(), new Date(date)) < numberOfHours;
