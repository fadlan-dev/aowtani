import { cn } from '@/libs/utils';
import { IconPointFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface CalendarCellProps {
  day: number;
  month: number;
  year: number;
  isToday: boolean;
  isDateSelected: boolean;
  onClick: () => void;
}

const CalendarCell: FunctionComponent<CalendarCellProps> = ({
  day,
  month,
  year,
  isToday,
  isDateSelected,
  onClick,
}) => {
  const date = new Date(`${month + 1} ${day}  ${year}`);
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
            {dayjs(date).isToday() &&
              new Array(6).fill('').map((event, idx) => (
                <Link
                  key={idx}
                  href={`/calendar/${idx + 1}`}
                  className='flex items-center text-sm text-black'
                >
                  <IconPointFilled size={16} /> {`Event ${idx + 1}`}
                </Link>
              ))}
          </div>
        </div>
      )}
    </td>
  );
};

export default CalendarCell;
