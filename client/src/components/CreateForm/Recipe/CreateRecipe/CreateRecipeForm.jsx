import RecipeService from '../../../../services/RecipeService'

import { useState } from 'react';
import IngredientForm from '../RecipeIngredient/IngredientForm';
import StepForm from '../RecipeStep/StepForm';
import styles from './styles.module.css'

import exportImg from '../../../../assets/images/export-file.png'

const CreateRecipeForm = () => {
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
        return recipe;
    }

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
            const response = await RecipeService.createRecipe(recipe)
            console.log(response);
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    return(
        <div className='container'>
            <div className={styles.form}>
                <div className={styles.title}>
                    <p>Название</p>
                    <input 
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        value={name}
                        type='text'
                        placeholder='Название'/>
                </div>
                {/* Энергетическая ценность и кнопка загрузки изображения */}
                <div className={styles.energyContainer}>
                    <div className={styles.exportTitle}>
                        <img src={exportImg} alt='Загрузить изображение' 
                            onClick={() => {
                                
                            }}
                        />
                        <p>Загрузить изображение</p>
                    </div>
                    <div className={styles.energy}>
                            <div>
                                <p>ВРЕМЯ ПРИГОТОВЛЕНИЯ</p>
                                <input type='number' min='1' max='1000'
                                    value = {time}
                                    onChange={(e) => {
                                        setTime(e.target.value)
                                    }}
                                ></input>
                                <p>МИН</p>
                            </div>
                            <div>
                                <p>КАЛОРИЙНОСТЬ</p>
                                <input type='number' min='1' max='1000'
                                    value = {calories}
                                    onChange={(e) => {
                                        setCalories(e.target.value)
                                    }}
                                ></input>
                                <p>ККАЛ</p>
                            </div>
                            <div>
                                <p>БЕЛКИ</p>
                                <input type='number' min='1' max='100'
                                    value = {proteins}
                                    onChange={(e) => {
                                        setProteins(e.target.value)
                                    }}
                                ></input>
                                <p>ГРАММ</p>
                            </div>
                            <div>
                                <p>ЖИРЫ</p>
                                <input type='number' min='1' max='100'
                                    value = {fats}
                                    onChange={(e) => {
                                        setFats(e.target.value)
                                    }}
                                ></input>
                                <p>ГРАММ</p>
                            </div>
                            <div>
                                <p>УГЛЕВОДЫ</p>
                                <input type='number' min='1' max='100'
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
                    <textarea placeholder='Основной текст'
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
                                        ingredient = {item.ingredient}
                                        index = {index}
                                        deleteIngredient = {deleteIngredient}
                                        item = {item}
                                    />
                                })}
                            </ul>
                            <div>
                                <input 
                                    onChange={(e) => {
                                        setIngredient(e.target.value)
                                    }}
                                    value={ingredient}
                                    type='text'
                                    placeholder='Ингредиент'
                                    list='ingredient'
                                />
                                <datalist id="ingredient">
                                    <option value="Чебурашка"></option>
                                    <option value="Крокодил Гена"></option>
                                    <option value="Шапокляк"></option>
                                </datalist>
                                <button
                                    onClick={() => {
                                        if(ingredient.length > 3){
                                            setKey(key + 1);
                                            setIngredients([...ingredients, {
                                                'key': key,
                                                'ingredient': ingredient
                                            }])
                                            setIngredient('')
                                        }
                                    }}
                                >Добавить</button>
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
                            console.log(collectRecipe())
                            createRecipe();
                        }}
                    >Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipeForm;