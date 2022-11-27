import styles from './styles.module.css'
import arrow from '../../../../assets/images/down-arrow.png'
import { useEffect, useState } from 'react'
import RecipeService from '../../../../services/RecipeService'
import { Link } from 'react-router-dom'

const UserBookmarks = () => {
    useEffect(() => {getUserRecipesBookmarks()}, [])
    const [isLoading, setLoading] = useState(true);
    const [recipeList, setRecipeList] = useState([]);

    async function getUserRecipesBookmarks(){
        setLoading(true);
        try{
            const response = await RecipeService.getUserRecipesBookmarks();
            //setUser(response.data.user);
            const recipes = response.data.recipes;
            setRecipeList(recipes);
            //console.log(response);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    return <>
    <div className={styles.recipes}>
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
    </>
}

export default UserBookmarks