import EnergyValue from "./EnergyValue";
import RecipeAdvice from "./RecipeAdvice";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";

import styles from './styles.module.css'
import imgServings from '../../../../assets/images/restaurant.png'
import imgTime from '../../../../assets/images/back-in-time.png'
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RecipeService from "../../../../services/RecipeService";
import Comments from "../Comments/Comments";

const RecipeFull = ({recipe}) => {
    const {id} = useParams();
    useEffect(() => {checkLikes()}, [])
    const [isLoading, setLoading] = useState(true);
    const [numberLikes, setNumberLikes] = useState();
    const [isLikes, setIsLikes] = useState()

    async function checkLikes(){
        setLoading(true);
        try{
            //console.log('recipe.recipeId', recipe.recipeId)
            const response = await RecipeService.getLikes(id);
            //setUser(response.data.user);
            //const recipes = response.data.recipes;
            //setRecipeList(recipes);
            setNumberLikes(response.data.numberLikes)
            setIsLikes(!!response.data.isLikes)
            console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    async function addLike(n){
        setLoading(true);
        try{
            const response = await RecipeService.addLike(recipe.recipeId);
            //setUser(response.data.user);
            //const recipes = response.data.recipes;
            //setRecipeList(recipes);
            //setNumberLikes(numberLikes + n)
            //setIsLikes(!isLikes)
            console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
    function checkIsMy(){
        if(recipe.isMy){
            return (<div>
                <button>Редактировать</button>
                <button>Удалить</button>
            </div>)
        }
    }
    function likeButton(){
        if(isLikes) {
            return <button onClick={() => {
                addLike()
                setNumberLikes(numberLikes - 1);
                setIsLikes(false);
            }}>Удалить из закладок ({numberLikes})</button>
        }
        else {
            return <button onClick={() => {
                addLike()
                setNumberLikes(numberLikes + 1);
                setIsLikes(true);
            }}>Добавить в закладки ({numberLikes})</button>
        }
    }
    return (
        <div className='container'>
            <div className={styles.recipe}>
                <div>
                    <div>
                        {checkIsMy()}
                    </div>
                    <div>
                        {likeButton()}
                    </div>
                </div>
                <div className={styles.categores}>
                    {/* {recipe?.categories.map(category => {
                        return(<p>
                            {category}
                        </p>)
                    })} */}
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
            <Comments/>   
        </div>
    )
}

export default RecipeFull;