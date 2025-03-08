import React, { useEffect, useState } from 'react'
import sound1 from "../Sound/sound1.wav"
import sound2 from "../Sound/sound2.wav"
import sound3 from "../Sound/sound3.wav"

export default function Timer({ mode, setMode, bgColor }) {
    const pomodoroTime = localStorage.getItem('pomodoroTime') || 25;
    const shortBreak = localStorage.getItem('shortBreak') || 5;
    const longBreak = localStorage.getItem('longBreak') || 15;
    const alarmSoundSelect = localStorage.getItem('alarmSound') || "Kitchen";
    const [time, setTime] = useState(pomodoroTime * 60);
    const [isRunning, setIsRunning] = useState(false);
    const modes = ["Pomodoro", "Short break", "Long break"];

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prev) => {
                    if (prev === 0) {
                        clearInterval(timer);
                        playSound();
                        switchMode();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const playSound = () => {
        let audio;
        if (alarmSoundSelect === "Kitchen") {
            audio = new Audio(sound1);
        } else if (alarmSoundSelect === "Bell") {
            audio = new Audio(sound2);
        } else if (alarmSoundSelect === "Digital") {
            audio = new Audio(sound3);
        }
        if (audio) audio.play();
    };

    const switchMode = () => {
        setIsRunning(false)
        if (mode === "Pomodoro") {
            setMode("Short break")
            setTime(shortBreak * 60)
        } else if (mode === "Short break") {
            setMode("Long break")
            setTime(longBreak * 60)
        } else if (mode === "Long break") {
            setMode("Pomodoro")
            setTime(pomodoroTime * 60)
        }
    };

    const handelTime = (newMode) => {
        setMode(newMode);
        setIsRunning(false);
        if (newMode === "Pomodoro") setTime(pomodoroTime * 60);
        if (newMode === "Short break") setTime(shortBreak * 60);
        if (newMode === "Long break") setTime(longBreak * 60);
    }
    
    return (
        <div className='container mx-auto'>
            <div className=' max-w-[480px] mx-auto p-[20px_0_30px] mb-[20px] bg-[var(--bgBtn)] rounded-[6px] flex flex-col items-center justify-center gap-2 '>
                <div className='flex items-center justify-center gap-1 max-sm:gap-2 '>
                    {modes.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handelTime(item)}
                            className={`rounded-[4px] p-[4px_12px] max-sm:p-[2px_6px] max-sm:text-[12px] cursor-pointer  ${mode === item ? "bg-[rgba(0,0,0,0.15)] transition-all duration-150  active:translate-y-[2px]" : "transition-all duration-150  active:translate-y-[2px]"}`}>{item}</button>
                    ))}
                </div>
                <div className=''>
                    <h1 className='text-[120px] max-sm:text-[80px] font-bold'>{`${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`}</h1>
                </div>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="bg-[#fff] w-[200px] cursor-pointer rounded-[4px] p-[0px_12px] text-[22px] h-[55px] uppercase font-bold transition-all duration-150  active:opacity-70 shadow-[0px_6px_0px_rgb(235,235,235)] active:shadow-[0px_2px_0px_rgb(235,235,235)] active:translate-y-[4px]"
                    style={{ color: bgColor() }}>
                    {!isRunning ? "Start" : "Stop"}
                </button>
            </div>
            <div className='max-w-[480px] container text-center '>
                <h1 className='opacity-[0.6]'>#{mode === "Pomodoro" ? 5 : 4}</h1>
                <h1 className='text-[18px] opacity-[0.8]'>Time {mode === "Pomodoro" ? "to focus!" : "for a break!"}</h1>
            </div>
        </div>
    )
}