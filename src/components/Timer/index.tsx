import { useEffect, useState } from 'react'

//CSS
import style from './Timer.module.scss'

//Components
import Button from '../Button'
import Clock from './Clock'

//utils
import { tempoParaSegundos } from '../../common/utils/time'

//Interfaces
import { ITask } from '../../shared/interfaces/ITask'

interface TimerProps {
    selected: ITask | undefined
    finalizarTarefa: () => void
}
const Timer = ({ selected, finalizarTarefa }: TimerProps) => {

    const [tempo, setTempo] = useState<number>()

    useEffect(() => {
        if (selected?.tempo) {
            return setTempo(tempoParaSegundos(selected.tempo))
        }
    }, [selected])

    const contagemRegressiva = (contador: number = 0) => {
        setTimeout(() => {
            if (contador > 0) {
                setTempo(contador - 1)
                return contagemRegressiva(contador - 1)
            }
            finalizarTarefa()

        }, 1000)
    }

    // const contagemRegressiva2 = (contador: number = 0) => {

    //     let interval;
    //     interval = setInterval(() => {
    //         if (contador > 0) {
    //             setTempo(contador - 1)
    //             return contagemRegressiva(contador - 1)
    //         } else {
    //             finalizarTarefa()
    //         }
            
    //     }, 1000)
        
    //     clearInterval(interval)
    // }

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}> Escolha um card e inicie o cronômetro</p>
            <div className={style.relogioWrapper}>
                <Clock tempo={tempo} />
            </div>
            <Button contagemRegressiva={() => contagemRegressiva(tempo)}>
                Começar!
            </Button>
        </div>
    )
}

export default Timer