import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../contexts/InterviewContext";
import { leadingZeroFormatter } from "../utils/NumberFormatter";

export function InterviewTimer() {
  const { beginTime } = useContext(TimerContext);
  const [ totalTime, setTotalTime] = useState<number>(0);
  const [ hours, setHours ] = useState("00");
  const [ minutes, setMinutes ] = useState("00");
  const [ seconds, setSeconds ] = useState("00");

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime(Date.now() - beginTime);
      const time = Date.now() - beginTime;
      setHours(leadingZeroFormatter(Math.floor(time / 1000 / 3600), 2));
      setMinutes(leadingZeroFormatter(Math.floor(time / 1000 % 3600 / 60), 2));
      setSeconds(leadingZeroFormatter(Math.floor(time / 1000 % 60), 2));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="interview-timer-container">
        <AccessTimeIcon />
        <p>{hours}:{minutes}:{seconds}</p>
      </div>
    </>
  )
}