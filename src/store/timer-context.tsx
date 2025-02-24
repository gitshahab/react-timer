import {createContext, useContext, useReducer, type ReactNode} from "react";

export type Timer = {
    name: string,
    duration: number
}

type TimerState = {
    isRunning: boolean,
    timers: Timer[]
}

const initialState: TimerState = {
    isRunning: true,
    timers: []
}

type TimerContextVal = TimerState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void
}

const TimersContext = createContext<TimerContextVal | null>(null);

type ProviderProps = {
    children: ReactNode
}

type StartTimer = {
    type: "START_TIMER"
}

type StopTimer = {
    type: "STOP_TIMER"
}

type AddTimer = {
    type: "ADD_TIMER",
    payload: Timer
}

type Action = StartTimer | StopTimer | AddTimer

function timerReducer (state: TimerState, action: Action): TimerState{
    if ( action.type === "START_TIMER" ) {
        return {...state, isRunning: true}
    }
    if (action.type === "STOP_TIMER" ) {
        return {...state, isRunning: false}
    }
    if (action.type === "ADD_TIMER") {
        return {
            ...state, 
            timers: [
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration
                }
            ]
        }
    }
    return state
}

export default function TimerContextProvider ({children}: ProviderProps) {
    const [timerstate, dispatch] = useReducer(timerReducer, initialState)

    const ctx: TimerContextVal = {
        timers: timerstate.timers,
        isRunning: timerstate.isRunning,
        addTimer: (timerData) => {
            dispatch({type: "ADD_TIMER", payload: timerData})
        },
        startTimers: () => {
            dispatch({type: "START_TIMER"})
        },
        stopTimers: () => {
            dispatch({type: "STOP_TIMER"})
        }
    }
    return <TimersContext.Provider value={ctx}>
        {children}
    </TimersContext.Provider>
}


export const useTimer = () => {
    const timerConsumer = useContext(TimersContext);
    if(timerConsumer === null){
        throw new Error("useTimer is used outside of provider");
    }
    return timerConsumer
}