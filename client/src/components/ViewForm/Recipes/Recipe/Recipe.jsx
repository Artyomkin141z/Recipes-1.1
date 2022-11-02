import style from './style.module.css';


function Recipe(props){
    return(
        <div className={style.recipe}>
            <img src={props.recipe.img} alt=''/>
        </div>
    )
}

export default Recipe;