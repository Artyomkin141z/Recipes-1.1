import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeFull from "../components/ViewForm/Recipes/RecipeFull/RecipeFull";
import RecipeService from "../services/RecipeService";

const Recipe = () => {
    //let recipe = {}
    const {id} = useParams();
    useEffect(() => {getRecipe(id)}, [])
    const [isLoading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState({
        isMy: false,
        recipeId: '',
        name: '',
        img: '',
        author: 1,
        categories: [],
        content: '',
        time: 0,
        energyValue: {
            calories: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0
        }, 
        ingredients: {
            numberServings: '',
            ingredients: []
        },
        steps: [],
        advice: '',
        feedback: ''
    })
    

    async function getRecipe(id){
        setLoading(true);
        try{
            const response = await RecipeService.getRecipe(id);
            console.log(response.data);
            const recipe = response.data.recipe;
            setRecipe(recipe);
            console.log(recipe);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
    return (
        <>
            <RecipeFull 
                recipe = {recipe}
            />
        </>
    )
}

export default Recipe;