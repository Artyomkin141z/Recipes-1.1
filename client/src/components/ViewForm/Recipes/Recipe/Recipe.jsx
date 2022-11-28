import style from './style.module.css';
import img from '../../../../assets/images/bibimbap.png'
import imgServings from '../../../../assets/images/restaurant.png'
import imgTime from '../../../../assets/images/back-in-time.png'
import { Link } from 'react-router-dom';

function Recipe(props){
    //console.log(props.recipe.categories)
    return(
        <div className={style.recipe}>
            <img src={img} alt=''/>
            <div className={style.information}>
                <div className={style.categories}>
                    {/* {props.recipe.categories.map((category) => {
                        return (<a href='/'>
                            {category}
                        </a>)
                    })} */}
                </div>
                <a href={'/recipe/'+props.recipe.id} className={style.title}>{props.recipe.title}</a>
                <p className={style.author}>Автор: {props.recipe.author}</p>
                <div className={style.servings}>
                    <p className={style.ingredients}>{props.recipe.numberIngredints} ингредиентов</p>
                    <div>
                        <div>
                            <img src={imgServings} alt=''/>
                            <p className={style.numberServings}>{props.recipe.numberServings} порций</p>
                        </div>
                        <div>
                            <img src={imgTime} alt=''/>
                            <p className={style.timePreparing}>{props.recipe.timePreparing} минут</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe;