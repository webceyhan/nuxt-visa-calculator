import {
    addDays,
    lightFormat,
    isAfter,
    differenceInCalendarDays,
} from 'date-fns';
import { MAX_DAYS_PER_VISIT, MAX_DAYS_INTERVAL, TODAY } from '~/constants';

interface Visit {
    enterDate: Date;
    exitDate: Date;
    minDate: Date;
    maxDate: Date;
}

export const useVisits = () => {
    // STATE
    const visits = reactive<Visit[]>([
        {
            // first visit
            enterDate: addDays(TODAY, 0),
            exitDate: addDays(TODAY, 1),
            minDate: addDays(TODAY, -MAX_DAYS_INTERVAL),
            maxDate: addDays(TODAY, MAX_DAYS_PER_VISIT),
        },
    ]);

    // GETTERS
    const firstVisit = computed<Visit>(() => visits[0]);
    const lastVisit = computed<Visit>(() => visits[visits.length - 1]);

    const expireDate = computed<Date>(() => {
        return addDays(firstVisit.value.enterDate, MAX_DAYS_INTERVAL);
    });

    const usedDays = computed<number>(() => {
        const days = visits.reduce((acc, { exitDate, enterDate }) => {
            return acc + differenceInCalendarDays(exitDate, enterDate);
        }, 0);

        if (days > MAX_DAYS_PER_VISIT) {
            return MAX_DAYS_PER_VISIT;
        }

        return days < 0 ? 0 : days;
    });

    const remainingDays = computed<number>(() => {
        return MAX_DAYS_PER_VISIT - usedDays.value;
    });

    const expireDateStr = computed<string>(() => {
        return lightFormat(expireDate.value, 'dd / MM / yyyy');
    });

    const isExpired = computed<boolean>(() => {
        return isAfter(TODAY, expireDate.value);
    });

    const canAddVisit = computed<boolean>(() => {
        // cannot add visit if remaining days is 0
        if (remainingDays.value === 0) return false;

        // cannot add visit if expired
        if (isExpired.value) return false;

        return true;
    });

    const canRemoveVisit = computed<boolean>(() => {
        return visits.length > 1;
    });

    // ACTIONS
    const addNextVisit = (): void => {
        const minDate = addDays(lastVisit.value.exitDate, 0);
        const maxDate = addDays(minDate, MAX_DAYS_PER_VISIT);
        const enterDate = addDays(minDate, 0);
        const exitDate = addDays(minDate, 1);

        visits.push(<Visit>{ enterDate, exitDate, minDate, maxDate });
    };

    const removeLastVisit = (): void => {
        visits.pop();
    };

    return {
        visits,
        usedDays,
        remainingDays,
        expireDateStr,
        isExpired,
        lastVisit,
        addNextVisit,
        removeLastVisit,
        canAddVisit,
        canRemoveVisit,
    };
};
