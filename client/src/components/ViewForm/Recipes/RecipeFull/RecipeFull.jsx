import EnergyValue from "./EnergyValue";
import RecipeAdvice from "./RecipeAdvice";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";

import styles from './styles.module.css'
import imgServings from '../../../../assets/images/restaurant.png'
import imgTime from '../../../../assets/images/back-in-time.png'
import deleteImg from '../../../../assets/images/trash.png'

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import RecipeService from "../../../../services/RecipeService";
import Comments from "../Comments/Comments";


import heart0 from '../../../../assets/images/heart0.png'
import heart1 from '../../../../assets/images/heart1.png'

const RecipeFull = ({recipe}) => {
    const {id} = useParams();
    useEffect(() => {checkLikes()}, [])
    const [isLoading, setLoading] = useState(true);
    const [numberLikes, setNumberLikes] = useState();
    const [isLikes, setIsLikes] = useState()

    function printAdvice(){
        if(recipe.advice){
            return (
                <RecipeAdvice 
                    advice = {recipe.advice}
                />
            )
        }
    }

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

    async function addLike(){
        setLoading(true);
        try{
            const response = await RecipeService.addLike(recipe.recipeId);
            console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    async function deleteRecipe(){
        setLoading(true);
        try{
            const response = await RecipeService.deleteRecipe(recipe.recipeId);
            //console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    function checkIsMy(){
        if(recipe.isMy){
            return (<div className={styles.redactForm}>
                {/* <button>Редактировать</button> */}
                <div onClick={() => {
                    deleteRecipe()
                }}><img src={deleteImg} alt=''/></div>
            </div>)
        }
    }
    function likeButton(){
        if(isLikes) {
            return <div onClick={() => {
                addLike()
                setNumberLikes(numberLikes - 1);
                setIsLikes(false);
            }} className={styles.heartButton}>
                <img src={heart1} alt='' />
                <p>{numberLikes}</p>
            </div>
        }
        else {
            return <div onClick={() => {
                addLike()
                setNumberLikes(numberLikes + 1);
                setIsLikes(true);
            }} className={styles.heartButton}>
                <img src={heart0} alt='' />
                <p>{numberLikes}</p>
            </div>
        }
    }
    return (
        <div className='container'>
            <div className={styles.recipe}>
                <div className={styles.buttons}>
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
                {printAdvice()}
            </div>
            <Comments/>   
        </div>
    )
}

export default RecipeFull;