import { isValid, lightFormat, parse } from 'date-fns';
import { DATE_FORMAT } from './constants';

export const parseDate = (dateStr: string, fallback: Date): Date => {
    const date = parse(dateStr, DATE_FORMAT, new Date());

    return isValid(date) ? date : fallback;
};

export const formatDate = (date: Date): string => {
    return lightFormat(date, DATE_FORMAT);
};
