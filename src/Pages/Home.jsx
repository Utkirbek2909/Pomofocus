import Timer from './Timer'
import Task from './Task'
import Header from './Header'
import { useState } from 'react'

export default function Home() {
  const [mode, setMode] = useState("Pomodoro")
  const colorTheme = JSON.parse(localStorage.getItem('colorThemes'));
  
  const bgColor = () => {
    if(mode === "Pomodoro"){
      return colorTheme[0];
    }else if(mode === "Short break"){
      return colorTheme[1];
    }else if(mode === "Long break"){
      return colorTheme[2];
    }
  }

  return (
    <div className="w-full min-h-[100vh] text-white" style={{ backgroundColor: bgColor() }}>
      <Header mode={mode} setMode={setMode} />
      <main className='pb-[100px]'>
        <Timer mode={mode} setMode={setMode} bgColor={bgColor}/>
        <Task />
      </main>
    </div>
  )
}
