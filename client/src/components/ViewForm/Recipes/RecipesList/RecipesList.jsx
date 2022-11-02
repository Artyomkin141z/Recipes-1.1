import style from './style.module.css'

import Recipe from '../Recipe/Recipe';

function RecipesList(){
    const recipes = [
        {
            id: 1,
            title:'Брауни',
            img:'F:\\Учеба\\7 сем\\Курсач\\Recipes\\covers\\брауни.jfif',
            numberIngredints: 6,
            numberServings: 6,
            timePreparing: 40,
            author: 'Anastsia Sheveleva',
            categories: ['Выпечка и десерты', 'Американская кухня'],
        },
        {
            id: 2,
            title:'Сырники из творога',
            img:'F:\\Учеба\\7 сем\\Курсач\\Recipes\\client\\src\\constants\\covers\\сырники.jpg',
            numberIngredints: 5,
            numberServings: 2,
            timePreparing: 30,
            author: 'Food',
            categories: ['Завтраки', 'Русская кухня'],
        },
        {
            id: 3,
            title:'Спагетти карбонара',
            img:'F:\\Учеба\\7 сем\\Курсач\\Recipes\\client\\src\\constants\\covers\\карбонара.jpg',
            numberIngredints: 6,
            numberServings: 2,
            timePreparing: 30,
            author: 'Алексей Скобелев',
            categories: ['Лазанья', 'Итальянская кухня'],
        },
        {
            id: 4,
            title:'Лазанья',
            img:'F:\\Учеба\\7 сем\\Курсач\\Recipes\\client\\src\\constants\\covers\\лазанья.jfif',
            numberIngredints: 6,
            numberServings: 2,
            timePreparing: 30,
            author: 'Алексей Скобелев',
            categories: ['Спаггети', 'Итальянская кухня'],
        }
    ]
    return(
        <>
            <div className='container'>
                <div className={style.recipes}>
                    <h1>Рецепты</h1>
                    <p>Всего 3 рецепта</p>
                    { 
                        recipes.map((item) => {
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