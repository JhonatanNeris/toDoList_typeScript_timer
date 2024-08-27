//React imports
import { ReactElement } from 'react'

//CSS
import styles from './Button.module.scss'

interface BotaoProps {
    children?: ReactElement | string
    type?: 'button' | 'submit' | 'reset' | undefined
    contagemRegressiva?: () => void
  } 

const Button = ({children, type = 'button', contagemRegressiva}: BotaoProps) => {
    return (
        <button className={styles.button} type={type} onClick={contagemRegressiva}>{children}</button>
    )
}

export default Button