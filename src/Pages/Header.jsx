import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiVolume2 } from 'react-icons/fi';
import { IoClose, IoColorWandOutline } from 'react-icons/io5';
import { LuClock9 } from 'react-icons/lu';
import { MdSettings } from 'react-icons/md';

const defaultColors = ["rgb(186,73,73)", "rgb(56,133,138)", "rgb(57,112,151)"];

export default function Header() {
  const pomodoroTimeNew = localStorage.getItem('pomodoroTime') || 25;
  const shortBreakNew = localStorage.getItem('shortBreak') || 5;
  const longBreakNew = localStorage.getItem('longBreak') || 15;
  const storedColors = JSON.parse(localStorage.getItem('colorThemes')) || defaultColors;

  const [isOpen, setIsOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(pomodoroTimeNew || 25);
  const [shortBreak, setShortBreak] = useState(shortBreakNew || 5);
  const [longBreak, setLongBreak] = useState(longBreakNew || 15);
  const [alarmSound, setAlarmSound] = useState('Kitchen');
  const [colorTheme, setColorTheme] = useState(false);
  const [selectedColors, setSelectedColors] = useState(storedColors);

  const handleSave = () => {
    localStorage.setItem('pomodoroTime', pomodoroTime);
    localStorage.setItem('shortBreak', shortBreak);
    localStorage.setItem('longBreak', longBreak);
    localStorage.setItem('alarmSound', alarmSound);
    localStorage.setItem('colorThemes', JSON.stringify(selectedColors));
    setIsOpen(false);
  };
  
  const handleColorSelect = (index, color) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
    setSelectedColors(newColors);
  };

  return (
    <header className="container h-[60px] flex items-center justify-between border-b-[1px] border-b-[rgba(0,0,0,0.1)] mb-[40px]">
      <div className="flex items-center justify-center gap-1 p-[10px_0]">
        <FaCheckCircle className="text-[20px]" />
        <h1 className="text-[20px]">Pomofocus</h1>
      </div>
      <div>
        <button onClick={() => setIsOpen(true)} className="bg-[var(--bgBtn)] rounded-[4px] opacity-[0.9] text-[13px] flex items-center justify-center gap-1 cursor-pointer p-[8px_12px] border-none">
          <MdSettings className="text-[16px]" />
          Settings
        </button>
      </div>
      {isOpen && (
        <div className=" z-50 absolute top-0 left-0 w-full h-screen bg-[#0000007a] text-black flex justify-center items-center">
          <div className="stlTask w-[400px] bg-white rounded-[6px] overflow-hidden ">
            <div className="flex items-center justify-center text-xl text-[rgb(170,170,170)] pb-3 border-b border-b-[rgb(238,238,238)] p-5 relative">
              <p className="font-semibold text-center">SETTING</p>
              <IoClose onClick={() => setIsOpen(false)} className="text-[30px] absolute right-3 top-5 cursor-pointer" />
            </div>
            <div className="mt-4 p-5">
              <h2 className="text-[rgb(170,170,170)] text-md font-semibold flex items-center gap-1">
                <LuClock9 className='text-xl' />
                TIMER
              </h2>
              <p className='text-[rgb(85,85,85)] text-md mt-3'>Time (minutes)</p>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col items-start">
                  <label className="text-[14px] text-[rgb(170,170,170)]">Pomodoro</label>
                  <input
                    type="number"
                    defaultValue={pomodoroTimeNew}
                    onChange={(e) => setPomodoroTime(e.target.value)}
                    className="w-25 text-[rgb(85,85,85)] bg-[rgb(239,239,239)] p-[10px] rounded-md text-start focus:outline-none"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-[14px] text-[rgb(170,170,170)]">Short Break</label>
                  <input
                    type="number"
                    defaultValue={shortBreakNew}
                    onChange={(e) => setShortBreak(e.target.value)}
                    className="w-25 text-[rgb(85,85,85)] bg-[rgb(239,239,239)] p-[10px] rounded-md text-start focus:outline-none"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label className="text-[14px] text-[rgb(170,170,170)]">Long Break</label>
                  <input
                    type="number"
                    defaultValue={longBreakNew}
                    onChange={(e) => setLongBreak(e.target.value)}
                    className="w-25 text-[rgb(85,85,85)] bg-[rgb(239,239,239)] p-[10px] rounded-md text-start focus:outline-none"
                  />
                </div>
              </div>
              <div className='w-full h-[1px] bg-[rgb(223,223,223)] mt-8'></div>
            </div>
            <div className=" px-5">
              <h2 className="text-[rgb(170,170,170)] text-md font-semibold flex items-center gap-1 mb-2">
                <FiVolume2 className='text-2xl' />
                SOUND
              </h2>
              <div className="mt-2 flex justify-between items-center">
                <label className="text-md text-[rgb(85,85,85)] font-semibold ">Alarm Sound</label>
                <select
                  value={alarmSound}
                  onChange={(e) => setAlarmSound(e.target.value)}
                  className="p-2 border rounded-md mt-1 bg-[rgb(235,235,235)] border-none w-32 text-[rgb(120,120,120)] focus:outline-none"
                >
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bell">Bell</option>
                  <option value="Digital">Digital</option>
                </select>
              </div>
              <div className='w-full h-[1px] bg-[rgb(223,223,223)] mt-8'></div>
            </div>
            <div className="mt-7 px-5">
              <h2 className="text-md text-[rgb(170,170,170)] font-semibold flex items-center gap-1 mb-3">
                <IoColorWandOutline className='text-2xl' />
                THEME
              </h2>
              <div className="flex items-center justify-between mt-2">
                <span className="text-md text-[rgb(85,85,85)] ">Color Themes</span>
                <div className="flex gap-2">
                  {selectedColors.map((color, index) => (
                    <div key={index} className={`w-8 h-8 rounded-[8px] cursor-pointer`} style={{ backgroundColor: color }} onClick={() => setColorTheme(true)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 text-end p-5 bg-[rgb(239,239,239)]">
              <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded-md">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {colorTheme && (
        <div className="z-50 absolute top-0 left-0 w-full h-screen bg-[#0000007a] text-black flex justify-center items-center">
          <div className="stlTask w-[450px] bg-white rounded-[6px] overflow-hidden">
            <div className='border-b-1 border-[rgb(229, 229, 229)] p-5 text-center text-xl'>
              <p>Pick colors for Pomodoro, Short Break, and Long Break</p>
            </div>
            <div className='grid grid-cols-5 gap-5 p-5'>
              {defaultColors.concat(["rgb(155,130,56)", "rgb(125,83,162)", "rgb(175,78,145)", "rgb(81,138,88)", "rgb(84,87,100)"]).map((color, index) => (
                <div key={index} onClick={() => handleColorSelect(index % 3, color)} className="w-[4rem] h-[4rem] rounded-[6px] cursor-pointer relative" style={{ backgroundColor: color }}>
                  {selectedColors.includes(color) && (
                    <FaCheckCircle className="absolute top-1 right-1 text-white" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-end p-5 bg-[rgb(239,239,239)]">
              <button onClick={() => setColorTheme(false)} className="bg-black text-white px-6 py-2 rounded-md">OK</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
