"use client";
import { ICalendar, IEvent } from "@/types";
import { Button, Select } from "@mantine/core";
import React, { useCallback, useState } from "react";
import CalendarCell from "./CalendarCell";
import { cn } from "@/libs/utils";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Link from "next/link";

import thLocale from "@fullcalendar/core/locales/th";

interface CalendarProps {
  className?: string;
  onDateClick?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ className, onDateClick }) => {
  //   const events = [{ title: "Meeting", start: new Date(), end: new Date() }];

  function renderEventContent(eventInfo: any) {
    return (
      <Link href={`/event/${eventInfo.event.id}`}>
        <span className="text-white px-1">{eventInfo.event.title}</span>
      </Link>
    );
  }

  const { data: events } = useQuery({
    queryKey: ["events-query"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_API_HOST}/tani_events.json`
      );

      const response = data.map((item: IEvent) => {
        let startDate = dayjs(item.start_date).format("YYYY-MM-DD");
        let endDate = dayjs(item.end_date).format("YYYY-MM-DD");
        if(startDate !== endDate){
          startDate = dayjs(item.start_date).format("YYYY-MM-DD HH:mm:ss")
          endDate = dayjs(item.end_date).format("YYYY-MM-DD HH:mm:ss")
        }
        return {
          id: item.id,
          title: item.name,
          start: startDate,
          end: endDate,
        };
      });

      return response;
    },
  });


  return (
    <div className={cn("w-full", className)}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // weekends={false}
        events={events}
        eventContent={renderEventContent}
        locale={thLocale}
        viewClassNames="bg-white"
      />
    </div>
  );
};

export default Calendar;
