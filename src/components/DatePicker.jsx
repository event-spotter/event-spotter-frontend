import * as React from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

function DatePicker({onDateChanged}) {

  const API_URL = import.meta.env.VITE_API_URL;
  const { eventId } = useParams();
  const [date, setDate] = React.useState(null);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    if (onDateChanged) {
      onDateChanged(selectedDate);
    }
  };

  React.useEffect(() => {
    if (eventId && date) {
      axios
      .put((`${API_URL}/api/events/${eventId}`), { date })
      .then((response) => {
        console.log("Event date updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating event date:", error);
      });
    }
  }, [eventId, date, API_URL]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
