import EnergyValue from "./EnergyValue";
import RecipeAdvice from "./RecipeAdvice";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";

import styles from './styles.module.css'
import imgServings from '../../../../assets/images/restaurant.png'
import imgTime from '../../../../assets/images/back-in-time.png'

const RecipeFull = ({recipe}) => {
    return (
        <div className='container'>
            <div className={styles.recipe}>
                <div className={styles.categores}>
                    {recipe.categories.map(category => {
                        return(<p>
                            {category}
                        </p>)
                    })}
                </div>
                <p className={styles.title}>{recipe.name}</p>
                <div className={styles.time}>
                    <div>
                        <img className={styles.icon} src={imgServings} alt=''/>
                        <p>{recipe.ingredients.numberServings} ПОРЦИЙ</p>
                    </div>
                    <div>
                        <img className={styles.icon} src={imgTime} alt=''/>
                        <p>{recipe.time} МИНУТ</p>
                    </div>
                </div>
                {/* Картинка */}
                <div className={styles.author}>
                    <p>Автор: {recipe.author}</p>
                </div>
                <div className={styles.content}>
                    <p>{recipe.content}</p>
                </div>
                <EnergyValue 
                    energyValue = {recipe.energyValue}
                />
                <RecipeIngredients 
                    ingredients = {recipe.ingredients}
                />
                <RecipeSteps 
                    steps = {recipe.steps}
                    time = {recipe.time}
                />
                <RecipeAdvice 
                    advice = {recipe.advice}
                />
            </div>
        </div>
    )
}

export default RecipeFull;