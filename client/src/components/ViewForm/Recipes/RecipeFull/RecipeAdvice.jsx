import styles from './styles.module.css'

const RecipeAdvice = ({advice}) => {
    return (<div  className={styles.advice}>
        <p className={styles.titleAdvice}>СОВЕТ К РЕЦЕПТУ</p>
        <p>{advice}</p>
    </div>)
}

export default RecipeAdvice;