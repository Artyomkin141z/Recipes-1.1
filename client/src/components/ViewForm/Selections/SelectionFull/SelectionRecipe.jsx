import styles from './styles.module.css'

import { useEffect, useState } from "react";
import Recipe from "../../Recipes/Recipe/Recipe";

const SelectionRecipe = ({recipe}) => {
    return <div>
        <Recipe
            key = {recipe.recipes_id} 
            recipe = {recipe}
        />
        <p className={styles.contentSelectionsRecipe}>{recipe.content}</p>
    </div>
}

export default SelectionRecipe;