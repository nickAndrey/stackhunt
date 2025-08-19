import { Popover, PopoverContent, PopoverTrigger } from '@/design-system/components/ui/popover';
import type { AppointmentWithParticipants } from '@/shared/types/appointment_v2';
import clsx from 'clsx';
import dayjs from 'dayjs';
import type { useAppointmentsCalendar } from './hooks/useAppointmentsCalendar';

type AppointmentsCalendarProps = ReturnType<typeof useAppointmentsCalendar> & {
  onAppointmentClick: (appointment: AppointmentWithParticipants) => void;
  onDayClick: (dayObj: { date: dayjs.Dayjs; appointments: AppointmentWithParticipants[] }) => void;
};

export function AppointmentsCalendar({
  calendarDays,
  onAppointmentClick,
  onDayClick,
}: AppointmentsCalendarProps) {
  return (
    <div className="grid grid-cols-7 grid-rows-6 h-full">
      {calendarDays.map((dayObj, idx) => (
        <div
          key={idx}
          className="border-r border-b flex flex-col gap-1 p-1 hover:bg-gray-50 transition-colors"
          onClick={() => onDayClick(dayObj)}
        >
          <div className="flex flex-col items-center">
            <div className="flex flex-col mb-2 text-center">
              <small className="text-sm">{idx < 7 && dayObj.date.format('ddd')}</small>
              <small
                className={clsx(
                  'text-sm text-gray-500 w-[25px] h-[25px] rounded-full flex items-center justify-center',
                  dayObj.isCurrentDay ? 'bg-gray-200 ' : ''
                )}
              >
                {dayObj.date.date()}
              </small>
            </div>

            <ul className="flex flex-col gap-1 w-full">
              {dayObj.appointments.slice(0, 2).map((item) => (
                <li key={item.id}>
                  <div
                    className="w-full rounded-md bg-blue-400 text-white py-1 px-2 text-[12px] hover:bg-blue-500 hover:cursor-pointer transition-colors truncate"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick(item);
                    }}
                  >
                    {item.type}
                  </div>
                </li>
              ))}
              {dayObj.appointments.length > 2 && (
                <li>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        className="w-full rounded-md py-1 px-2 text-[12px] hover:bg-gray-400 hover:text-white hover:cursor-pointer transition-colors truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {`And ${dayObj.appointments.slice(2).length} more ...`}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[200px]">
                      <div className="flex flex-col mb-2 text-center items-center gap-1">
                        <small className="text-sm">{dayObj.date.format('ddd')}</small>
                        <small
                          className={
                            'text-sm text-gray-500 w-[25px] h-[25px] rounded-full flex items-center justify-center bg-gray-200'
                          }
                        >
                          {dayObj.date.date()}
                        </small>
                      </div>

                      <ul className="flex flex-col gap-1 w-full">
                        {dayObj.appointments.slice(2).map((item) => (
                          <li key={item.id}>
                            <div
                              className="w-full rounded-md bg-blue-400 text-white py-1 px-2 text-[12px] hover:bg-blue-500 hover:cursor-pointer transition-colors truncate"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAppointmentClick(item);
                              }}
                            >
                              {item.type}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
