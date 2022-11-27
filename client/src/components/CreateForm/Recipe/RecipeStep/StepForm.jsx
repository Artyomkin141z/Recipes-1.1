import styles from './styles.module.css'
import uploadImg from '../../../../assets/images/upload.png'

const StepForm = (props) => {
    return (
        <div className={styles.step}>
            <div className={styles.deleteContainer}>
                <p className={styles.stepTitle}>Шаг {props.index+1}</p>
                <button
                    onClick={() => {
                        props.deleteStep(props.index)
                    }}
                >Удалить</button>
            </div>
            <div className={styles.content}>
                {/* <img src={uploadImg} alt='Загрузить изображение'/> */}
                <div>
                    <p>Содержание:</p>
                    <textarea onChange={(e) => {
                        props.step.content = e.target.value
                    }}>
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default StepForm;