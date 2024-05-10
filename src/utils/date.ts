import { DateTime } from 'luxon';

export const getToday = () => DateTime.now().startOf('day').toISO();
export const getNDaysLater = (n: number) => DateTime.now().plus({ days: n }).startOf('day').toISO();
