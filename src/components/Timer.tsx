import Container from './UI/Container.tsx';
import { useTimer, type Timer as TimerProps } from '../store/timer-context.tsx';
import { useEffect, useRef, useState } from 'react';

export default function Timer({name, duration}: TimerProps) {
  const { isRunning } = useTimer();
  const [ remainingTime, setRemainingTime ] = useState(duration * 1000);
  const interval = useRef<number | null>(null);

  if ( remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;
    if(isRunning){
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0){
            return prevTime;
          }
          return prevTime - 50;
        })
      }, 50);
      interval.current = timer
    }else if (interval.current){
      clearInterval(interval.current);
    }
    return () => clearInterval(timer);
  },[isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime}/>
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
