import type { Appointment } from '@/shared/types/appointment';
import dayjs from 'dayjs';

type AppointmentsCalendarProps = {
  appointments: Appointment[];
};

export function AppointmentsCalendar({ appointments }: AppointmentsCalendarProps) {
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).date(1);
  const startDay = firstDayOfMonth.startOf('week');

  const totalCells = 6 * 7;

  const calendarDays = Array.from({ length: totalCells }, (_, i) => {
    const date = startDay.add(i, 'day');
    const appointmentsPerDate = appointments.filter((item) => dayjs(item.date).isSame(date, 'day'));

    return {
      date,
      isCurrentMonth: date.month() === currentMonth,
      appointments: appointmentsPerDate,
    };
  });

  return (
    <div className="grid grid-cols-7 h-full">
      {calendarDays.map((dayObj, idx) => (
        <div key={idx} className="border-r border-b flex flex-col gap-1 p-1">
          <div className="flex flex-col items-center">
            <div className="flex flex-col mb-2 text-center">
              <small className="text-sm">{idx < 7 && dayObj.date.format('ddd')}</small>
              <small className="text-sm text-gray-500">{dayObj.date.date()}</small>
            </div>

            <ul className="flex flex-col gap-1 w-full">
              {dayObj.appointments.map((item) => (
                <li key={item.id}>
                  <div className="w-full rounded-md bg-blue-400 text-white py-1 px-2 text-[12px] hover:bg-blue-500 hover:cursor-pointer transition-colors truncate">
                    {item.type}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
