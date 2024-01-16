import { useState, useEffect } from "react";

interface TimeElapsedProps {
  startTime: Date;
}

const TimeElapsedComponent = ({ startTime }: TimeElapsedProps) => {
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const startDate = new Date(startTime).getTime();
      const currentDate = new Date().getTime();

      const timeDifference = currentDate - startDate;

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let result = "";

      if (days > 0) {
        result += `${days} jour${days > 1 ? "s" : ""}`;
      } else if (hours > 0) {
        result += `${hours} heure${hours > 1 ? "s" : ""}`;
      } else if (minutes > 0) {
        result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else {
        result += `${seconds} seconde${seconds > 1 ? "s" : ""}`;
      }

      setTimeElapsed(result);
    };

    calculateTimeElapsed();

    // Update every hour
    const interval = setInterval(calculateTimeElapsed, 3600000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [startTime]);

  return <div>{timeElapsed}</div>;
};

export default TimeElapsedComponent;
