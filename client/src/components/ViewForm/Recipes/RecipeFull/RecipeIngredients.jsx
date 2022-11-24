import styles from './styles.module.css'

const RecipeIngredients = ({ingredients}) => {
    return(<div className={styles.ingredients}>
        <div className={styles.ingredints_title}>
            <p>ИНГРЕДИЕНТЫ</p>
            <p>ПОРЦИИ: {ingredients.numberServings}</p>
        </div>
        <div>
            {ingredients.ingredients.map(ingredient => {
                return(<div className={styles.ingredient}>
                    <p>{ingredient.ingredient}</p>
                    <p>{ingredient.gramms} г</p>
                </div>)
            })}
        </div>
    </div>)
}

export default RecipeIngredients;