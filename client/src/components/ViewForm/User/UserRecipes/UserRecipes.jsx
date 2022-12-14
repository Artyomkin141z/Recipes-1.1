import styles from './styles.module.css'
import createRecipeImg from '../../../../assets/images/createRecipe.png'
import arrow from '../../../../assets/images/down-arrow.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RecipeService from '../../../../services/RecipeService'

const UserRecipes = () => {
    useEffect(() => {getUserRecipes()}, [])
    const [isLoading, setLoading] = useState(true);
    const [recipeList, setRecipeList] = useState([]);

    async function getUserRecipes(){
        setLoading(true);
        try{
            const response = await RecipeService.getUserRecipes();
            //setUser(response.data.user);
            const recipes = response.data.recipes;
            setRecipeList(recipes);
            //console.log(recipes);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
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
            <div>
                {
                    recipeList.map((recipe) => {
                        return (<div className={styles.userRecipe}>
                            <Link to={`/recipe/${recipe.recipes_id}`}>
                                <p className={styles.title}>{recipe.title}</p>
                            </Link>
                            <div className={styles.userRecipediv}>
                                <div>
                                    <p>Время приготовления: </p>
                                    <p className={styles.userRecipediv_p}>{recipe.time}</p>
                                    <p>мин</p>
                                </div>
                                <div>
                                    <p>Порций: </p>
                                    <p className={styles.userRecipediv_p}>{recipe.numbers_servings}</p>
                                </div>
                                <div>
                                    <p>Ингредиентов: </p>
                                    <p className={styles.userRecipediv_p}>{recipe.numberIngredints}</p>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default UserRecipes;