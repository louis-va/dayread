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

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);

      let result = "";

      if (days > 0) {
        result += `${days} jour${days > 1 ? "s" : ""}`;
      } else {
        result += `${hours} heure${hours > 1 ? "s" : ""}`;
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
