import styles from './styles.module.css'

const Message = (props) => {
    return(
        <div className={styles.message}>
            {window.message}
        </div>
    )
}

export default Message;