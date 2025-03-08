import React, { useState } from 'react'
import { BiDotsVertical } from 'react-icons/bi'
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa'
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5'
import { TiPlus } from 'react-icons/ti'

export default function Task() {
  const [isOpen, setIsOpen] = useState(false)
  const [note, setNote] = useState(false)
  const [titleData, setTitleData] = useState('')
  const [noteData, setNoteData] = useState('')
  const [est, setEst] = useState(1)
  const [tasksData, setTasksData] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  })
  const [editId, setEditId] = useState(null)

  const handleTitle = () => {
    if (editId !== null) {
      const updatedTasks = tasksData.map(task => 
        task.id === editId ? { ...task, title: titleData, note: noteData, est } : task
      )
      setTasksData(updatedTasks)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      setEditId(null)
    } else {
      const newTask = {
        id: Date.now(),
        title: titleData,
        note: noteData,
        est: est
      }
      const newTasks = [...tasksData, newTask]
      setTasksData(newTasks)
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    }
    setTitleData('')
    setNoteData('')
    setEst(1)
    setIsOpen(false)
    setNote(false)
  }

  const handleEdit = (task) => {
    setTitleData(task.title)
    setNoteData(task.note)
    setEst(task.est)
    setEditId(task.id)
    setIsOpen(true)
    setNote(true)
  }

  const handleDelete = (id) => {
    const updatedTasks = tasksData.filter(task => task.id !== id)
    setTasksData(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTitleData('')
    setNoteData('')
    setEst(1)
    setIsOpen(false)
    setNote(false)
  }

  const increment = () => setEst((prev) => (prev < 1 ? Math.min(100, (prev + 0.1).toFixed(1)) : prev + 1))
  const decrement = () => setEst((prev) => (prev > 1 ? prev - 1 : Math.max(0, (prev - 0.1).toFixed(1))))

  return (
    <div className='container mx-auto max-w-[480px] mb-[20px]'>
      <div className='flex items-center justify-between border-b-[2px] border-[rgba(255,255,255,0.6)] pb-[15px]'>
        <h1 className='text-[18px] font-semibold'>Tasks</h1>
        {/* <button className='rounded-[4px] opacity-[0.9] text-[22px] flex items-center justify-center gap-1 cursor-pointer p-[2px] border-none bg-[var(--bgBtn)]'>
          <BiDotsVertical />
        </button> */}
      </div>
      <div className='mt-[25px]'>
        {tasksData.map((task) => (
          <div key={task.id} className='mt-4 w-full bg-[white] stlTask text-[black] rounded-[8px] overflow-hidden  p-[18px_14px]'>
            <div className='text-[rgb(170,170,170)] flex justify-between items-center'>
              <div className='flex items-center gap-[8px]'>
                <FaCheckCircle className="text-[20px]" />
                <p>{task.title}</p>
              </div>
              <div className='flex items-center gap-[12px]'>
                <p>0/{task.est}</p>
                <button onClick={() => handleEdit(task)} className='rounded-[4px] opacity-[0.9] text-[26px] flex items-center justify-center gap-1 cursor-pointer p-[1px] border-[1px] border-[rgb(170,170,170)] '>
                  <BiDotsVertical />
                </button>
              </div>
            </div>
            {task.note && (
              <div className="text-[rgb(96,85,21)] bg-[rgb(252,248,222)] rounded-[8px] text-[15px] p-[10px_12px] mt-4 min-h-[40px] break-words">
                <p>
                  {task.note}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isOpen
        ? <div className='bg-[white] stlTask text-[black] rounded-[8px] mt-[25px] overflow-hidden'>
          <div className='p-[10px_20px_10px]'>
            <input
              value={titleData}
              onChange={(e) => setTitleData(e.target.value)}
              type="text"
              placeholder='What are you working on?'
              className='w-full border-none outline-none mt-[12px] text-[22px] mb-[10px]' />
            <h2 className='text-[14px] text-[rgb(85,85,85)] mt-[8px] mb-[8px]'> Est Pomodoros</h2>
            <div className='flex items-center gap-[8px]'>
              <input
                value={est}
                onChange={(e) => setEst(e.target.value)}
                readOnly
                type="number"
                className='bg-[rgb(239,239,239)] w-[75px] p-[6px_12px] text-[16px] rounded-[6px] focus:outline-none' />
              <button
                onClick={increment}
                className='opacity-[0.9] text-[14px] p-[8px_12px] w-[40px] border-[1px] border-[rgb(223,223,223)] rounded-[4px] shadow-[0px_2px_2px_rgba(0,0,0,0.2)]'>
                <IoCaretUpOutline />
              </button>
              <button
                onClick={decrement}
                className='opacity-[0.9] text-[14px] p-[8px_12px] w-[40px] border-[1px] border-[rgb(223,223,223)] rounded-[4px] shadow-[0px_2px_2px_rgba(0,0,0,0.2)]'>
                <IoCaretDownOutline />
              </button>
            </div>
            {note ? (
              <textarea
                value={noteData}
                onChange={(e) => setNoteData(e.target.value)}
                placeholder='Some notes...'
                className='bg-[rgb(239,239,239)] mt-[15px] w-full rounded-[4px] text-[rgb(85,85,85)] text-[15px] p-[10px_14px] 
  focus:outline-none resize-none overflow-hidden min-h-[80px]'
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              ></textarea>
            ) : (
              <div onClick={() => setNote(!note)} className='w-[80px] leading-0.5 flex items-center justify-start mt-[15px] cursor-pointer text-[rgba(0,0,0,0.4)] opacity-[0.9] text-[14px] border-b-[1px] border-[rgba(0,0,0,0.4)] mb-[25px]'>
                <TiPlus />
                <p>Add Note</p>
              </div>
            )}
          </div>
          <div className={`p-[14px_20px]  bg-[rgb(239,239,239)] flex items-center gap-7 ${editId ? "justify-between" : "justify-end"}`}>
            {editId ?
              <button onClick={() => handleDelete(editId)} className='text-[rgb(136,136,136)] cursor-pointer'>
                Delete
              </button>
              : null
            }
            <div className='   flex justify-end items-center gap-7'>
              <button onClick={() => {
                setIsOpen(false);
                setNote(false);
                setEditId(null);
                setTitleData('');
                setNoteData('');
                setEst(1);
              }} className='text-[rgb(136,136,136)] cursor-pointer '>Cancel</button>

              <button onClick={handleTitle} className='p-[8px_14px] bg-[rgb(34,34,34)] text-[14px] text-[white] rounded-[4px] cursor-pointer'>Save</button>
            </div>
          </div>
        </div>
        : <div onClick={() => setIsOpen(!isOpen)} className='bg-[rgba(0,0,0,0.1)] h-[64px] rounded-[8px] mt-[25px] border-[2px] border-dashed border-[rgba(255,255,255,0.4)] flex items-center justify-center gap-[8px]'>
          <FaPlusCircle className=' opacity-[0.6]' />
          <p className=' opacity-[0.6]'>Add task</p>
        </div>}
    </div>
  )
}