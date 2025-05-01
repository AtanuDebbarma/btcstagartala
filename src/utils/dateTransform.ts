import {Timestamp} from 'firebase/firestore';

export function convertFirebaseTimestampToDate(date: Timestamp | null): string {
  if (!date) return '';

  const jsDate = date.toDate(); // Convert Firestore Timestamp to JavaScript Date

  const day = jsDate.getDate().toString().padStart(2, '0'); // Get day with leading zero
  const monthShort = jsDate.toLocaleString('en-US', {month: 'short'}); // Get short month name
  const year = jsDate.getFullYear();

  return `${day}-${monthShort}-${year}`;
}
