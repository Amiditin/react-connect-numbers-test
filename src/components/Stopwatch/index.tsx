import React from 'react';

interface StopwatchProps {
  interval: number;
  status: 'paused' | 'started' | 'stopped';
  getTime: (time: number) => any;
}

export const Stopwatch: React.FC<StopwatchProps> = ({ interval, status, getTime }) => {
  const [timer, setTimer] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timer>();

  React.useEffect(() => {
    const handleStart = () => {
      setTimer(0);
      timerRef.current = setInterval(() => {
        setTimer((timer) => timer + interval / 1000);
      }, interval);
    };

    const handleFinish = () => {
      clearInterval(timerRef.current);
      getTime(+timer.toFixed(1));
    };

    switch (status) {
      case 'started':
        handleStart();
        break;
      case 'stopped':
        handleFinish();
        break;
      default:
        setTimer(0);
        clearInterval(timerRef.current);
        break;
    }
  }, [interval, status]);

  return <span> {timer.toFixed(1)} </span>;
};
