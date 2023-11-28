import {
    addDays,
    differenceInDays,
    lightFormat,
    isAfter,
    isValid,
} from 'date-fns';
import { MAX_DAYS, MAX_DAYS_INTERVAL, TODAY } from '~/constants';

export const useDateFormula = () => {
    // yyyy-mm-dd
    const enterDate = ref('');
    const exitDate = ref('');

    const canExit = computed(() => enterDate.value !== '');

    const expireDate = computed<Date>(() => {
        const entered = new Date(enterDate.value);

        if (!isValid(entered)) return TODAY;

        return addDays(entered, MAX_DAYS_INTERVAL);
    });

    const expireDateFormatted = computed<string>(() => {
        return lightFormat(expireDate.value, 'dd / MM / yyyy');
    });

    const usedDays = computed<number>(() => {
        const entered = new Date(enterDate.value);
        const exited = new Date(exitDate.value);
        const days = differenceInDays(exited, entered);

        return days < 0 ? 0 : days > MAX_DAYS ? MAX_DAYS : days;
    });

    const remainingDays = computed<number>(() => {
        return MAX_DAYS - usedDays.value;
    });

    const isExpired = computed<boolean>(() => {
        return isAfter(TODAY, expireDate.value);
    });

    return {
        enterDate,
        exitDate,
        expireDate,
        expireDateFormatted,
        usedDays,
        remainingDays,
        isExpired,
        canExit,
    };
};
