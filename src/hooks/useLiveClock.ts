import { useState, useEffect } from 'react';

export interface LiveClockData {
  timeStr: string;
  dateStr: string;
  tzStr: string;
  fullTimeStr: string;
}

export function useLiveClock(): LiveClockData {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [tzStr, setTzStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const offsetMin = -now.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offsetMin) / 60);
      const sign = offsetMin >= 0 ? '+' : '-';
      const tz = `GMT${sign}${offsetHours}`;

      setTimeStr(time);
      setTzStr(tz);
      setDateStr(
        now.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }).toUpperCase()
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    timeStr,
    dateStr,
    tzStr,
    fullTimeStr: timeStr && tzStr ? `${timeStr} ${tzStr}` : '',
  };
}
