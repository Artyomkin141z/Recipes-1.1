import RecipeService from '../../../../services/RecipeService'

import { useEffect, useState } from 'react';
import IngredientForm from '../RecipeIngredient/IngredientForm';
import StepForm from '../RecipeStep/StepForm';
import styles from './styles.module.css'

import exportImg from '../../../../assets/images/export-file.png'
import CreateIngredient from '../../Catalog/CreateIngredient';

import DatalistInput, { useComboboxControls } from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import CatalogService from '../../../../services/CatalogeService';

import { Snackbar, IconButton } from '@mui/material';
import closeImg from '../../../../assets/images/close.png'

const CreateRecipeForm = () => {
    const { setIngredientValue, ingredientValue } = useComboboxControls({ initialValue: '' });
    const [ingredientsInput, setIngredientsInput] = useState([])
    useEffect(() => {getIngredientsValue()}, [])
    const [sent, setSent] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('error');
    const [snackbarClass, setSnackbarClass] = useState();
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpen(false)}
            >
            <img className={'snackbarCloseImg'} src={closeImg} alt='Закрыть'
                onClick={() => setOpen(false)}
            />
            </IconButton>
        </>
    );
    
    async function getIngredientsValue(){
        try{
            const response = await CatalogService.getIngredients()
            const ingredients = response.data.ingredients;
            ingredients.forEach(function(item) {
                item.value = item.ingredient
            });
            setIngredientsInput(ingredients)
            //console.log(ingredients);
        }catch(e){
            console.log(e);
        }finally{

        }
    }


    const recipe = {
        name: '',
        img: '',
        content: '',
        time: 0,
        energyValue: {
            calories: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0
        }, 
        ingredients: {
            numberServings: 1,
            ingredients: []
        },
        steps: [],
        advice: ''
    }
    const collectRecipe = () => {
        recipe.name = name;
        recipe.img = img;
        recipe.time = time;
        recipe.content = content;
        recipe.energyValue.calories = calories;
        recipe.energyValue.carbohydrates = carbohydrates;
        recipe.energyValue.fats = fats;
        recipe.energyValue.proteins = proteins;
        recipe.ingredients.numberServings = numberServings;
        recipe.ingredients.ingredients = ingredients;
        recipe.steps = steps;
        recipe.advice = advice;
        // console.log(recipe);
        return recipe;
    }
    const [isShowCreateIngredientForm, setIsShowCreateIngredientForm] = useState(false);

    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [time, setTime] = useState(0);
    const [content, setContent] = useState('')
    const [calories, setCalories] = useState(0);
    const [proteins, setProteins] = useState(0);
    const [fats, setFats] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [numberServings, setServings] = useState(1);
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([])
    const [advice, setAdvice] = useState('')
    
    const [key, setKey] = useState(1);
    const [allIngredients, setAllIngredients] = useState([]);

    const deleteIngredient = (index) => {
        ingredients.splice(index, 1)
        setIngredients([...ingredients]);
    }
    const deleteStep = (index) => {
        steps.splice(index, 1);
        setSteps([...steps])
    }

    const getIngredients = () => {
        //Получить ингредиенты с сервера
    }

    async function createRecipe(){
        try{
            // if(name && time && content && numberServings && calories && proteins && fats && carbohydrates && ingredients && steps){
                const response = await RecipeService.createRecipe({recipe, token: localStorage.token})
                if(response.status === 200){
                    setOpen(true);
                    setMessage('Рецепт создан');
                    setSnackbarClass('snackbar');
                }
                else{
                    setOpen(true);
                    setMessage('Рецепт не создан');
                    setSnackbarClass('snackbarError');
                }
                
                console.log(response);
            // }        
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    return(
        <div className='container'>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
                action={action}
                className={snackbarClass}
            >
            </Snackbar>
            <div className={styles.form}>
                <CreateIngredient 
                    setIsShowCreateIngredientForm = {setIsShowCreateIngredientForm}
                    isShowCreateIngredientForm = {isShowCreateIngredientForm}
                    setIngredientsInput = {setIngredientsInput}
                    setOpen = {setOpen}
                    setMessage = {setMessage}
                    setSnackbarClass = {setSnackbarClass}
                />
                <div className={styles.title}>
                    <p>Название</p>
                    <input className={sent && !name ? styles.errorInput : ''}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        value={name}
                        type='text'
                        placeholder='Название'/>
                </div>
                {/* Энергетическая ценность и кнопка загрузки изображения */}
                <div className={styles.energyContainer}>
                    {/* <div className={styles.exportTitle}>
                        <img src={exportImg} alt='Загрузить изображение' 
                            onClick={() => {
                                
                            }}
                        />
                        <p>Загрузить изображение</p>
                    </div> */}
                    <div className={styles.energy}>
                            <div>
                                <p>ВРЕМЯ ПРИГОТОВЛЕНИЯ</p>
                                <input className={sent && !time ? styles.errorInput : ''}
                                type='number' min='1' max='1000'
                                    value = {time}
                                    onChange={(e) => {
                                        setTime(e.target.value)
                                    }}
                                ></input>
                                <p>МИН</p>
                            </div>
                            <div>
                                <p>КАЛОРИЙНОСТЬ</p>
                                <input className={sent && !calories ? styles.errorInput : ''}
                                type='number' min='1' max='1000'
                                    value = {calories}
                                    onChange={(e) => {
                                        setCalories(e.target.value)
                                    }}
                                ></input>
                                <p>ККАЛ</p>
                            </div>
                            <div>
                                <p>БЕЛКИ</p>
                                <input className={sent && !proteins ? styles.errorInput : ''}
                                type='number' min='1' max='100'
                                    value = {proteins}
                                    onChange={(e) => {
                                        setProteins(e.target.value)
                                    }}
                                ></input>
                                <p>ГРАММ</p>
                            </div>
                            <div>
                                <p>ЖИРЫ</p>
                                <input className={sent && !fats ? styles.errorInput : ''}
                                type='number' min='1' max='100'
                                    value = {fats}
                                    onChange={(e) => {
                                        setFats(e.target.value)
                                    }}
                                ></input>
                                <p>ГРАММ</p>
                            </div>
                            <div>
                                <p>УГЛЕВОДЫ</p>
                                <input className={sent && !carbohydrates ? styles.errorInput : ''}
                                type='number' min='1' max='100'
                                    value = {carbohydrates}
                                    onChange={(e) => {
                                        setCarbohydrates(e.target.value)
                                    }}
                                ></input>
                                <p>ГРАММ</p>
                            </div>
                        </div>
                </div>
                {/* Основной текст */}
                <div className={styles.mainText}>
                    <p>Основной текст</p>
                    <textarea className={sent && !content ? styles.errorInput : ''}
                    placeholder='Основной текст'
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    ></textarea>
                </div>
                {/* Ингредиенты */}
                <div className={styles.IngredientBlock}>
                    <p>Ингредиенты</p>
                    <div className={styles.Ingredients}>
                        <div className={styles.servings}>
                            <p>Количество порций</p>
                            <input type="number" min="1" max="10"
                                className={sent && !numberServings ? styles.errorInput : ''}
                                onChange={(e) => {
                                    if(e.target.value > 10){
                                        e.target.value = 10
                                    }
                                    else if(e.target.value < 1){
                                        e.target.value = 1
                                    }
                                    setServings(e.target.value);
                                }}
                                value={numberServings}
                            ></input>
                        </div>
                        <div>
                            <ul type="disc">
                                {ingredients.map((item, index) => {  
                                    return <IngredientForm 
                                        key = {item.key}
                                        ingredient = {item.ingredient?.ingredient}
                                        index = {index}
                                        deleteIngredient = {deleteIngredient}
                                        item = {item}
                                    />
                                })}
                            </ul>
                            <div>
                                <DatalistInput
                                    placeholder="Ингредиент"
                                    value={ingredientValue}
                                    setValue={setIngredientValue}
                                    label="Выберите ингредиент"
                                    showLabel={true}
                                    items={[...ingredientsInput]}
                                    onSelect={(item) => {
                                        //console.log(item);
                                        setIngredient(item)
                                        //setIngredientValue({});
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        //if(ingredient.length > 3){
                                            setKey(key + 1);
                                            setIngredients([...ingredients, {
                                                'key': key,
                                                'ingredient': ingredient.ingredient,
                                                'id': ingredient.id
                                            }])
                                            setIngredient('')
                                        //}
                                    }}
                                >Добавить</button>
                                <button
                                    onClick={() => {
                                        setIsShowCreateIngredientForm(true);
                                    }}
                                >Создать ингредиент</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Шаги по приготовлению */}
                <div>
                    <p>Шаги по приготовлению</p>
                    <div className={styles.stepsContainer}>
                        <div className={styles.steps}>
                            {
                                steps.map((item, index) => {
                                    return(<StepForm
                                        key = {item.key}
                                        step = {item}
                                        index = {index}
                                        deleteStep = {deleteStep}
                                    />);
                                })
                            }
                        </div>
                        <div className={styles.addSteps}>
                            <button
                                onClick={() => {
                                    setKey(key + 1)
                                    setSteps([...steps, {'key': key}])
                                }}
                            >Добавить шаг</button>
                        </div>
                    </div>
                </div>
                {/* Совет к рецепту */}
                <div className={styles.advice}>
                    <p>Совет к рецепту</p>
                    <textarea placeholder='Основной текст'
                        value={advice}
                        onChange={(e) => {
                            setAdvice(e.target.value)
                        }}
                    ></textarea>
                </div>
                {/* Сохранить */}
                <div className={styles.saveRecipe}>
                    <button
                        onClick={() => {
                            if(!name || !time || !content || !numberServings || !calories || !proteins || !fats || !carbohydrates || !ingredients){
                                setSent(true);
                                setOpen(true);
                                setMessage('Заполните все обязательные поля');
                                setSnackbarClass('snackbarError');
                            }
                            else{
                                collectRecipe()
                                createRecipe();
                            }
                            // console.log(collectRecipe())
                        }}
                    >Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipeForm;