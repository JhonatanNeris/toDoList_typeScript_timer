//CSS
import { ITask } from '../../../shared/interfaces/ITask'
import styles from './Item.module.scss'

//Icons
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

interface ItemProps extends ITask {
    selectTask: (selectedTask: ITask) => void
    excluirTarefa: (id: string) => void
    editarItem: (item: ITask) => void
}

const Item = ({ tarefa, tempo, selecionado, completo, id, selectTask, excluirTarefa, editarItem }: ItemProps) => {

    const executarExcluir = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        excluirTarefa(id)
    }
    
    const executarEditar = (e: React.MouseEvent, item: ITask) => {
        e.stopPropagation();
        editarItem(item)
    }

    return (
        <li className={`${styles.item} ${selecionado ? styles.itemSelecionado : ''} ${completo ? styles.itemCompletado : ''}`} onClick={() => !completo && selectTask({
            tarefa,
            tempo,
            selecionado,
            completo,
            id
        })}>
            <div className={styles.info}>
                <h3>
                    {tarefa}
                </h3>
                <span>
                    {tempo}
                </span>
            </div>
            <div className={styles.actions}>
                {!completo && <span className={styles.deleteIcon} onClick={(e) => executarEditar(e, {
                    tarefa,
                    tempo,
                    selecionado,
                    completo,
                    id
                })}><FaEdit size={34} /></span>}
                {!completo && <span className={styles.deleteIcon} onClick={(e) => executarExcluir(id, e)}><FaTrashAlt size={32} /></span>}
                {completo && <span className={styles.concluido} aria-label='tarefa finalizada'></span>}
            </div>
        </li>
    )
}

export default Item