import styles from './styles.module.css'
import createRecipeImg from '../../../../assets/images/createRecipe.png'
import arrow from '../../../../assets/images/down-arrow.png'
import { Link } from 'react-router-dom'

const UserRecipes = () => {
    return(
        <div className={styles.recipes}>
            <div className={styles.createRecipe}>
                <p>Создать рецепт</p>
                <Link to='/create/recipe'><img src={createRecipeImg} alt='Создать рецепт'/></Link>
            </div>
            <div className={styles.userRecipes}>
                <p>Рецепты</p>
                <img src={arrow} alt=''/>
            </div>
        </div>
    )
}

export default UserRecipes;