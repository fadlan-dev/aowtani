import { ICalendar, IEvent } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Calendar from "@/components/ui/fullcalendar";

type Props = {};
const Page = ({}: Props) => {
  return (
    <div className="pt-12 mb-24">
      <center>
        <h1>ปฎิทินกิจกรรม</h1>
        <p>กิจกรรมดีๆ ที่ไม่ควรพลาด</p>
        <div className="container max-w-3xl">
          <Calendar />
        </div>
      </center>
    </div>
  );
};

export default Page;
