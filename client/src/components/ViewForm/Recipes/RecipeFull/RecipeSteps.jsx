import imgTime from '../../../../assets/images/back-in-time.png'
import styles from './styles.module.css'

const RecipeSteps = ({time, steps}) => {
    return(<div>
        <div>
            <div className={styles.ingredints_title}>
                <p>ИНСТРУКЦИЯ ПРИГОТОВЛЕНИЯ</p>
                <div className={styles.steps_time}>
                    <img className={styles.icon} src={imgTime} alt='' />
                    <p>{time} МИНУТ</p>
                </div>
            </div>
            <div>{steps.map((step, index) => {
                return(<div className={styles.step}>
                    <p>ШАГ {index+1}</p>
                    <p>{step.content}</p>
                </div>)
            })}</div>
        </div>
    </div>)
}

export default RecipeSteps;