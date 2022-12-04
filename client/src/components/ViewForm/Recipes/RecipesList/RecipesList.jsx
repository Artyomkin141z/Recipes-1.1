import style from './style.module.css'

import Recipe from '../Recipe/Recipe';
import Navigation from './Navigation';
import { useEffect, useState } from 'react';
import RecipeService from '../../../../services/RecipeService';
import { useLocation, useParams } from 'react-router-dom';

function RecipesList({isSerch}){
    const location = useLocation();
    useEffect(() => {getRecipes()}, [])
    useEffect(() => {getRecipes()}, [location])
    
    const [isLoading, setLoading] = useState(true);
    const [recipeList, setRecipeList] = useState([]);
    const {ingredientId, serchStr} = useParams();

    async function getRecipes(){
        setLoading(true);
        try{
            // console.log('Рендеринг');
            // console.log('ingredientId', ingredientId, 'serchStr', serchStr);
            if(ingredientId !== '0' && ingredientId !== undefined || serchStr  !== '0' && serchStr !== undefined){
                const response = await RecipeService.searchRecipes(ingredientId, serchStr);
                //setUser(response.data.user);
                const recipes = response.data.recipes;
                // console.log(recipes);
                setRecipeList(recipes[0]);
            }
            else{
                const response = await RecipeService.getRecipes();
                //setUser(response.data.user);
                const recipes = response.data.recipes;
                setRecipeList(recipes[0]);
                // console.log(recipes);
                //console.log(response.data.user);
            }   
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
            <div className='container'>
                <div className={style.recipes}>
                    <div className={style.title}>
                        <h1>Рецепты</h1>
                        <p>Всего {recipeList.length} рецепта</p>
                    </div>
                    <Navigation />
                    { 
                        recipeList.map((item) => {
                            return (
                                <Recipe 
                                    key = {item.id}
                                    recipe = {item}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default RecipesList;