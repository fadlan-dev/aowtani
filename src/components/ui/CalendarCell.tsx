import { cn } from '@/libs/utils';
import { IEvent } from '@/types';
import { IconPointFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface CalendarCellProps {
  day: number;
  month: number;
  year: number;
  isToday: boolean;
  isDateSelected: boolean;
  onClick: () => void;
  events?: IEvent[];
}

const CalendarCell: FunctionComponent<CalendarCellProps> = ({
  day,
  isToday,
  isDateSelected,
  onClick,
  events,
}) => {
  return (
    <td
      className={cn(
        'font-normal  p-2 pl-1 border-solid border-transparent rounded',
        day !== 0 && 'bg-white',
        isToday && 'border-primary',
        isDateSelected && 'bg-primary-100'
      )}
      onClick={onClick}
    >
      {day !== 0 && (
        <div className='flex aspect-square flex-col overflow-hidden'>
          <p className={cn('text-end')}>{day}</p>
          <div className='flex flex-col overflow-auto '>
            {(events || []).map((event, idx) => (
              <Link key={idx} href={`/event/${event.id}`}>
                <div className='flex items-center text-sm text-black'>
                  <div className='flex items-center'>
                    <IconPointFilled
                      className='text-red-600 w-4 flex-shrink'
                      color='blue'
                      size={16}
                    />
                  </div>
                  <p className='truncate flex-auto'>{event.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </td>
  );
};

export default CalendarCell;
