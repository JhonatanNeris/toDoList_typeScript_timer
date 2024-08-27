//CSS
import styles from './List.module.scss'
import Item from './Item'
import { ITask } from '../../shared/interfaces/ITask'

interface ListProps {
    tasks: ITask[]
    selectTask: (selectedTask: ITask) => void
    excluirTarefa: (id: string) => void
    editarItem: (item: ITask) => void
}

const List = ({ tasks, selectTask, excluirTarefa, editarItem }: ListProps) => {

    return (
        <aside className={styles.listaTarefas}>
            <h2> Tarefas do dia </h2>
            <ul>
                {tasks.length > 0 && tasks.map((item) => (
                    <Item key={item.id} {...item} selectTask={selectTask} excluirTarefa={excluirTarefa} editarItem={editarItem} />

                ))}
            </ul>

        </aside>
    )
}

export default List