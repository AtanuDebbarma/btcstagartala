import type {Timestamp} from 'firebase/firestore';

export function convertFirebaseTimestampToDate(
  date: Timestamp | {_seconds: number; _nanoseconds: number} | null,
): string {
  if (!date) return '';

  let jsDate: Date;

  // Handle Firestore Timestamp object
  if (date && typeof date === 'object' && 'toDate' in date) {
    jsDate = date.toDate();
  }
  // Handle plain timestamp object from backend (server timestamp)
  else if (
    date &&
    typeof date === 'object' &&
    '_seconds' in date &&
    '_nanoseconds' in date
  ) {
    jsDate = new Date(date._seconds * 1000);
  }
  // Fallback
  else {
    return '';
  }

  const day = jsDate.getDate().toString().padStart(2, '0');
  const monthShort = jsDate.toLocaleString('en-US', {month: 'short'});
  const year = jsDate.getFullYear();

  return `${day}-${monthShort}-${year}`;
}
