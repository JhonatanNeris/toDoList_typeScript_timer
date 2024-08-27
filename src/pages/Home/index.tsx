import { useState } from 'react'
import Form from '../../components/Form'
import List from '../../components/List'
import Timer from '../../components/Timer'

//CSS
import styles from './Home.module.scss'
import { ITask } from '../../shared/interfaces/ITask'

const Home = () => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [selected, setSelected] = useState<ITask>()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<ITask>()

  const selectTask = (selectedTask: ITask) => {
    
    setSelected(selectedTask)

    setTasks(tasks.map((item) => {
      if (item.id === selectedTask.id) {
        return { ...item, selecionado: true }
      }
      return { ...item, selecionado: false };
    }))

  }

  const finalizarTarefa = () => {
    if(selected){
      setSelected(undefined)
      setTasks(tasks.map((tarefa) => {
        if(tarefa.id === selected.id){
          return {
            ...tarefa,
            selecionado: false,
            completo: true
          }
        }
        return tarefa
      }))
    }
  }

  const excluirTarefa = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id ))
  }

  const editarItem = (item: ITask) => {
    setIsEditing(true)
    setEditingItem(item)
    

  }

  return (
    <div className={styles.HomeStyle}>
      <Form setTasks={setTasks} isEditing={isEditing} editingItem={editingItem} setIsEditing={setIsEditing} setEditingItem={setEditingItem}/>
      <Timer selected={selected} finalizarTarefa={finalizarTarefa}/>
      <List tasks={tasks} selectTask={selectTask} excluirTarefa={excluirTarefa} editarItem={editarItem}/>
    </div>
  )
}

export default Home