import { useTimer } from "../store/timer-context";
import Timer from "./Timer";

export default function Timers() {
  const {timers} = useTimer()
  return <ul>
    {timers.map((timer) => (
      <li key={timer.name}>
        <Timer {...timer}/>
      </li>
    ))}
  </ul>;
}
