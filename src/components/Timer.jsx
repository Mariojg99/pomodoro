import React, { useContext, useEffect, useRef, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayBtn from './PlayBtn';
import '../styles/Timer.css'
import PauseBtn from './PauseBtn';
import Settings from './Settings';
import SettingsContext from './SettingsContext';

const mist = '#00ffbf';
const blue = '#00a8eb';

const Timer = () => {
    const settingsInfo = useContext(SettingsContext);

    const [pause, setPause] = useState(true);
    const [mode, setMode] = useState('work')
    const [seconds, setSeconds] = useState(0);

    const secondsRef = useRef(seconds);
    const pauseRef = useRef(pause);
    const modeRef = useRef(mode);


    const tick = () => {
        secondsRef.current--;
        setSeconds(secondsRef.current);
    }

    useEffect(() => {

        const switchMode = () => {
            const nextMode = modeRef.current === 'work'
                ? 'break'
                : 'work';
            const nextSeconds = (nextMode === 'work'
                ? settingsInfo.workMin
                : settingsInfo.breakMin
            ) * 60;
            setMode(nextMode);
            modeRef.current = nextMode;

            setSeconds(nextSeconds);
            secondsRef.current = nextSeconds;
        }

        secondsRef.current = settingsInfo.workMin * 60;
        setSeconds(secondsRef.current);

        const interval = setInterval(() => {
            if (pauseRef.current) {
                return;
            }
            if (secondsRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);

    }, [settingsInfo]);

    const totalSeconds = mode === 'work'
        ? settingsInfo.workMin * 60
        : settingsInfo.breakMin * 60;
    let percentage = Math.round(seconds / totalSeconds * 100) ;

    const mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;

    return (
        <div className='container-timer'>
            <CircularProgressbar
                value={percentage}
                text={mins + ':' + secs}
                styles={buildStyles({
                    textColor: '#eee',
                    pathColor: mode === 'work' ? blue : mist,
                    tailColor:'rgba(255,255,255,.2)',
                })} />

            <div className='container-buttons'>
                {
                    pause
                        ? <PlayBtn onClick={() => { setPause(false); pauseRef.current = false; }} />
                        : <PauseBtn onClick={() => { setPause(true); pauseRef.current = true; }} />
                }

            </div>
            <Settings />
        </div>
    )
}

export default Timer;