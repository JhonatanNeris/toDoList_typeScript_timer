import React, { useState, FormEvent, useEffect } from 'react'
import Button from '../Button'

//CSS 
import styles from './Form.module.scss'
import { ITask } from '../../shared/interfaces/ITask'

//UUID
import { v4 as uuidv4 } from 'uuid';

interface FormProps {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
  isEditing: boolean
  editingItem?: ITask
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  setEditingItem: React.Dispatch<React.SetStateAction<ITask | undefined>>
}

const Form = ({ setTasks, isEditing, editingItem, setIsEditing, setEditingItem }: FormProps) => {

  const [task, setTask] = useState('')
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    if (isEditing && editingItem) {
      setTask(editingItem.tarefa);
      setTime(editingItem.tempo);
    }
  }, [isEditing, editingItem]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEditing && editingItem) {
      setTasks((oldTasks) => (
        oldTasks.map((item) => (
          item.id === editingItem.id ? { ...item, tarefa: task, tempo: time } : item
        ))
      ))
    } else {
      setTasks((oldTasks) => [...oldTasks, {
        tarefa: task,
        tempo: time,
        selecionado: false,
        completo: false,
        id: uuidv4()
      }])
    }

    
    setTask('')
    setTime('00:00:00')
    setIsEditing(false)
    setEditingItem(undefined)

  }

  return (
    <form className={styles.newTask} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor='task'>
          Adicione uma nova tarefa
        </label>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} name="task" id="task" placeholder='Adicione uma nova tarefa' required />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='time'>
          Tempo
        </label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} step="1" name="time" id="time" min="00:00:00" max="00:01:30" required />
      </div>
      <Button type='submit'>
        {isEditing ? 'Atualizar' : 'Adicionar'}
      </Button>

    </form>
  )
}

export default Form