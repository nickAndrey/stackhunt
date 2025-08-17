import type { Appointment } from '@/shared/types/appointment';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

type Params = {
  appointments: Appointment[];
};

export function useAppointmentsCalendar({ appointments }: Params) {
  const [currentDate, setCurrentDate] = useState(dayjs()); // tracks current month/year

  const { calendarDays, currentMonth, currentYear } = useMemo(() => {
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).date(1);
    const startDay = firstDayOfMonth.startOf('week');

    const totalCells = 6 * 7;

    const calendarDays = Array.from({ length: totalCells }, (_, i) => {
      const date = startDay.add(i, 'day');
      const appointmentsPerDate = appointments.filter((item) =>
        dayjs(item.date).isSame(date, 'day')
      );

      return {
        date,
        isCurrentMonth: date.month() === currentMonth,
        isCurrentDay: date.isSame(dayjs(), 'day'),
        appointments: appointmentsPerDate,
      };
    });

    return {
      calendarDays,
      currentMonth: currentDate.format('MMMM'),
      currentYear,
    };
  }, [currentDate, appointments]);

  const setNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, 'month'));
  };

  const setPrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  };

  return { calendarDays, currentMonth, currentYear, setNextMonth, setPrevMonth };
}
