export const formatINR = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatINRCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/** Today's date as YYYY-MM-DD in the browser's local timezone (not UTC). */
export const todayISO = (): string => new Date().toLocaleDateString('en-CA');

/** YYYY-MM-DD, `days` from now, local timezone. */
export const isoAfterDays = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-CA');
};

/** Shift a YYYY-MM-DD string by `days`, timezone-safe (parses at local noon). */
export const shiftISO = (iso: string, days: number): string => {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-CA');
};

export const formatDateTime = (iso?: string): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
