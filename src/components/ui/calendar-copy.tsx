'use client';
import { ICalendar, IEvent } from '@/types';
import { Button, Select } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import CalendarCell from './CalendarCell';
import { cn } from '@/libs/utils';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface CalendarProps {
  className?: string;
  onDateClick?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ className, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: number | null) => {
    if (day !== null) {
      const clickedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      setSelectedDate(clickedDate);
      if (onDateClick) {
        onDateClick(clickedDate);
      }
    }
  };

  //   const goToPrevMonth = () => {
  //     setCurrentMonth(
  //       new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
  //     );
  //   };

  //   const goToNextMonth = () => {
  //     setCurrentMonth(
  //       new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  //     );
  //   };

  const handleMonthChange = (month: string) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), +month, 1));
  };

  const handleYearChange = (year: string) => {
    setCurrentMonth(new Date(+year, currentMonth.getMonth(), 1));
  };

  const generateMonths = () =>
    Array.from({ length: 12 }, (_, index) => ({
      value: `${index}`,
      label: new Date(currentMonth.getFullYear(), index, 1).toLocaleString(
        'th-TH',
        { month: 'long' }
      ),
    }));

  const generateYears = () =>
    Array.from({ length: 10 }, (_, index) => ({
      value: `${currentMonth.getFullYear() - 5 + index}`,
      label: `${currentMonth.getFullYear() - 5 + index}`,
    }));

  const isToday = (day: number, month: number, year: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      day === today.getDate()
    );
  };

  const isDateSelected = (day: number, month: number, year: number) =>
    (selectedDate &&
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      day === selectedDate.getDate()) ||
    false;

  function generateCalendarMatrix(year: number, month: number): ICalendar[][] {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let currentDay = 1;
    const matrix: ICalendar[][] = [];

    for (let i = 0; i < 6; i++) {
      const week: { date: number; month: number; year: number }[] = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || currentDay > daysInMonth) {
          // Fill with zeros for days before the first day of the month and after the last day
          week.push({ date: 0, month, year });
        } else {
          week.push({ date: currentDay, month, year });
          currentDay++;
        }
      }
      matrix.push(week);
    }
    return matrix;
  }

  const { data: events } = useQuery({
    queryKey: ['events-query', currentMonth],
    queryFn: async () => {
      const sdate = dayjs(
        `${currentMonth.getFullYear()} ${currentMonth.getMonth() + 1} 1`,
        'YYYY MM DD'
      ).format('YYYY-MM-DD');
      const edate = dayjs(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
        'YYYY MM DD'
      ).format('YYYY-MM-DD');
      const { data } = await axios.get(
        `${process.env.NEXT_API_HOST}/tani_events.json?start_date=${sdate}&end_date=${edate}`
      );
      return data as IEvent[];
    },
  });

  const getEvent = useCallback(
    (day: number) => {
      if (day === 0) {
        return [];
      }
      const filteredEvents = events?.filter((event) => {
        const tody = `${currentMonth.getFullYear()}-${
          currentMonth.getMonth() + 1
        }-${day}`;
        const start_date = dayjs(event.start_date).format('YYYY-MM-DD');
        const end_date = dayjs(event.end_date).format('YYYY-MM-DD');
        return dayjs(tody).isBetween(start_date, dayjs(end_date), 'day', '[]');
      });
      return (
        (filteredEvents || []).sort((a, b) => {
          return (
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
          );
        }) || []
      );
    },
    [events, currentMonth]
  );

  return (
    <div className={cn('w-full', className)}>
      <div className='flex items-center justify-end gap-2'>
        <Select
          className='w-32'
          value={`${currentMonth.getMonth()}`}
          data={generateMonths()}
          onChange={(month) => handleMonthChange(month as string)}
        />
        <Select
          className='w-28'
          value={`${currentMonth.getFullYear()}`}
          data={generateYears()}
          onChange={(year: string) => handleYearChange(year)}
        />
        <Button
          variant='default'
          onClick={() => {
            setCurrentMonth(new Date());
          }}
        >
          เดือนนี้
        </Button>
      </div>
      <table className='w-full mt-4 table-fixed'>
        <thead>
          <tr>
            <th className='font-normal p-2'>อาทิตย์</th>
            <th className='font-normal'>จันทร์</th>
            <th className='font-normal'>อังคาร</th>
            <th className='font-normal'>พุธ</th>
            <th className='font-normal'>พฤหัสบดี</th>
            <th className='font-normal'>ศุกร์</th>
            <th className='font-normal'>เสาร์</th>
          </tr>
        </thead>
        <tbody>
          {generateCalendarMatrix(
            currentMonth.getFullYear(),
            currentMonth.getMonth()
          ).map((month, i) => (
            <tr key={i}>
              {month.map((weeks, j) => (
                <CalendarCell
                  key={j}
                  day={weeks.date}
                  month={weeks.month}
                  year={weeks.year}
                  isToday={isToday(weeks.date, weeks.month, weeks.year)}
                  isDateSelected={isDateSelected(
                    weeks.date,
                    weeks.month,
                    weeks.year
                  )}
                  events={getEvent(weeks.date)}
                  onClick={() =>
                    weeks.date !== 0 && handleDateClick(weeks.date)
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
