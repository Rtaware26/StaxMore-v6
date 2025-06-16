import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { formatDistanceToNowStrict, isPast, isBefore, addHours } from 'date-fns';

const AEST_TIMEZONE = 'Australia/Sydney';

export const convertAESTToLocal = (aestTime: string): Date => {
  if (!aestTime) {
    return new Date(NaN); // Returns an Invalid Date object
  }
  return toZonedTime(aestTime, AEST_TIMEZONE);
};

export const formatTimeForDisplay = (date: Date, timezone: string): string => {
  if (isNaN(date.getTime())) {
    return 'N/A'; // Return a placeholder if the date is invalid
  }
  return formatInTimeZone(date, timezone, 'PPP p (zzz)'); // e.g., Oct 26, 2023 10:00 AM (GMT+11:00)
};

export const getCompetitionStatus = (
  registrationOpenAEST: string,
  registrationCloseAEST: string,
  startTimeAEST: string,
  endTimeAEST: string
) => {
  const now = new Date();
  const registrationOpen = toZonedTime(registrationOpenAEST, AEST_TIMEZONE);
  const registrationClose = toZonedTime(registrationCloseAEST, AEST_TIMEZONE);
  const startTime = toZonedTime(startTimeAEST, AEST_TIMEZONE);
  const endTime = toZonedTime(endTimeAEST, AEST_TIMEZONE);

  if (isPast(endTime)) {
    return 'completed';
  } else if (isBefore(now, registrationOpen)) {
    return 'upcoming-registration';
  } else if (isBefore(now, registrationClose)) {
    return 'registration-open';
  } else if (isBefore(now, startTime)) {
    return 'registration-closed';
  } else if (isBefore(now, endTime)) {
    return 'active';
  }
  return 'unknown';
};

export const getCountdown = (targetTimeAEST: string): string => {
  const now = new Date();
  const targetTime = toZonedTime(targetTimeAEST, AEST_TIMEZONE);

  if (isPast(targetTime)) {
    return 'Ended';
  } else {
    return formatDistanceToNowStrict(targetTime, { addSuffix: true });
  }
};

export const getRegistrationCountdown = (registrationCloseAEST: string): string => {
  const now = new Date();
  const registrationClose = toZonedTime(registrationCloseAEST, AEST_TIMEZONE);

  if (isPast(registrationClose)) {
    return 'Closed';
  } else {
    return formatDistanceToNowStrict(registrationClose, { addSuffix: true });
  }
}; 