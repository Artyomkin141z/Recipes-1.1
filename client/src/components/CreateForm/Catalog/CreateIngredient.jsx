import styles from './style.module.css'
import closeImg from '../../../assets/images/close.png'
import { useState } from 'react'
import RecipeService from '../../../services/RecipeService';
import CatalogService from '../../../services/CatalogeService';

const CreateIngredient = ({isShowCreateIngredientForm, setIsShowCreateIngredientForm, setIngredientsInput, setOpen, setMessage, setSnackbarClass}) => {
    const [ingredient, setIngredient] = useState();
    const [isLoading, setLoading] = useState(true);
    
    async function createIngredient(ingredient){
        setLoading(true);
        try{
            const response = await CatalogService.addIngredient(ingredient);
            console.log(response)
            if(response.data.message === 'ok'){
                setOpen(true);
                setMessage(`${ingredient} добавлен`);
                setSnackbarClass('snackbar');
            }
            else{
                setOpen(true);
                setMessage(`${ingredient} уже есть в каталоге`);
                setSnackbarClass('snackbarError');
            }
            const ingredients = response.data.ingredients;
            ingredients.forEach(function(item) {
                item.value = item.ingredient
            });
            setIngredientsInput(ingredients);
            // console.log(response.data.ingredients);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    if(isShowCreateIngredientForm){
        return (
            <div className={styles.form}
                onClick={(e) => {
                const className = e.target.className;
                    if(className.includes('form')){
                        setIsShowCreateIngredientForm(false)
                    }
                }}
            >
                <div className={styles.container}>
                    <img className={styles.close} src={closeImg} alt='Закрыть'
                        onClick={() => setIsShowCreateIngredientForm(false)}
                    />
                    <div className={styles.AAAAAA}>
                        <div className={styles.input}>
                            <div>
                                <p>Введите ингредиент:</p>
                                <input 
                                    onChange={e => setIngredient(e.target.value)}
                                    value={ingredient}
                                    type='text'
                                    placeholder='Название ингредиента'
                                />
                            </div>
                            <button
                                onClick={() => {
                                    //console.log(ingredient)
                                    createIngredient(ingredient);
                                }}
                            >Создать</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateIngredient