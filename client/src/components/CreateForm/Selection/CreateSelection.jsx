import { useEffect, useState } from 'react';
import DatalistInput, { useComboboxControls } from 'react-datalist-input';
import CatalogService from '../../../services/CatalogeService';
import SelectionService from '../../../services/SelectionService';
import SelectionRecipe from './SelectionRecipe';
import styles from './styles.module.css'

const CreateSelection = () => {
    const { setIngredientValue, ingredientValue } = useComboboxControls({ initialValue: '' });
    
    const [recipe, setRecipe] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectionRecipes, setSelectionRecipes] = useState([]);
    useEffect(() => {getRecipesTitles()}, [])

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    async function getRecipesTitles(){
        try{
            const response = await CatalogService.getRecipesTitles()
            const recipes = response.data.recipes[0];
            //console.log(recipes);
            recipes.forEach(function(item) {
                item.value = item.title
            });
            console.log(recipes);
            setRecipes(recipes)   
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    function deleteRecipe(index){
        selectionRecipes.splice(index, 1)
        setSelectionRecipes([...selectionRecipes]);
    }

    async function createSelection(){
        try{
            if(title && content && selectionRecipes){
                const response = await SelectionService.createSelection({selection: {
                    title: title,
                    content: content,
                    recipes: selectionRecipes
                }})
                console.log(response);
            }        
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    return <div className='container'>
        <div className={styles.form}>
            <div className={styles.title}>
                <p>Название</p>
                <input 
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    value={title}
                    type='text'
                    placeholder='Название'/>
            </div>
            {/* Основной текст */}
            <div className={styles.mainText}>
                <p>Основной текст</p>
                <textarea placeholder='Основной текст'
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                ></textarea>
            </div>
            {/* Рецепты из подборки */}
            <div>
                <p>Рецепты</p>
                <div className={styles.recipes}>
                    <div>
                        {selectionRecipes.map((item, index) => {
                            return <SelectionRecipe 
                                key = {item.id}
                                title = {item.title}
                                item = {item}
                                id = {item.id}
                                index = {index}
                                deleteRecipe = {deleteRecipe}
                            />
                        })}
                    </div>
                    <div className={styles.recipes_inputContainer}>
                        <DatalistInput
                            placeholder="Ингредиент"
                            value={ingredientValue}
                            setValue={setIngredientValue}
                            label="Выберите ингредиент"
                            showLabel={true}
                            items={[...recipes]}
                            onSelect={(item) => {
                                setRecipe(item)
                                console.log(item);
                            }}
                        />
                        <button onClick={() => {
                            setSelectionRecipes([...selectionRecipes, recipe])
                        }}>Добавить</button>
                    </div>
                </div>
            </div>
            <button className={styles.createSelection} onClick={() => {
                createSelection();
            }}>Создать</button>
        </div>
    </div>
}

export default CreateSelection;
