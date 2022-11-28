import styles from './styles.module.css'
import arrow from '../../../../assets/images/down-arrow.png'
import { useEffect, useState } from 'react'
import RecipeService from '../../../../services/RecipeService'
import { Link } from 'react-router-dom'
import SelectionService from '../../../../services/SelectionService'

const UserBookmarks = () => {
    useEffect(() => {getUserRecipesBookmarks()}, [])
    useEffect(() => {getUserSelectionsBookmarks()}, [])
    const [isLoading, setLoading] = useState(true);
    const [recipeList, setRecipeList] = useState([]);
    const [selections, setSelectionList] = useState([]);

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

    async function getUserSelectionsBookmarks(){
        setLoading(true);
        try{
            const response = await SelectionService.getUserSelectionsBookmarks();
            //setUser(response.data.user);
            const selections = response.data.selections;
            setSelectionList(selections);
            console.log(selections);
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
        <div className={styles.userRecipes}>
            <p>Подборки</p>
            <img src={arrow} alt=''/>
        </div>
        <div>
            {
                selections.map((selection) => {
                    return (<div className={styles.userRecipe}>
                        <Link to={`/selection/${selection.selection_id}`}>
                            <p className={styles.title}>{selection.title}</p>
                        </Link>
                        <div className={styles.userRecipediv2}>
                            <div>
                                <p>Количество рецептов: </p>
                                <p className={styles.userRecipediv_p}>{selection.numberRecipes}</p>
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