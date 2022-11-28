import styles from './styles.module.css'

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SelectionService from '../../../../services/SelectionService';
import SelectionRecipe from './SelectionRecipe';
import heart0 from '../../../../assets/images/heart0.png'
import heart1 from '../../../../assets/images/heart1.png'
import deleteImg from '../../../../assets/images/trash.png'


const SelectionFull = () => {
    const {id} = useParams();
    useEffect(() => {getSelection()}, [])
    useEffect(() => {checkLikes()}, [])

    const [isLoading, setLoading] = useState(true);
    const [selection, setSelection] = useState({selection: {}, selectionsRecipes: []})
    const [isLikes, setIsLikes] = useState()
    const [numberLikes, setNumberLikes] = useState();
    
    async function getSelection(){
        setLoading(true);
        try{
            const response = await SelectionService.getSelection(id);
            console.log(response.data);
            //console.log(response.data.user);
            setSelection(response.data);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    async function checkLikes(){
        setLoading(true);
        try{
            const response = await SelectionService.getLikes(id);

            setNumberLikes(response.data.numberLikes)
            setIsLikes(!!response.data.isLikes)
            console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    function checkIsMy(){
        if(selection.selection.isMy){
            return (<div className={styles.redactForm}>
                {/* <button>Редактировать</button> */}
                <div onClick={() => {
                    deleteSelection()
                }}><img src={deleteImg} alt=''/></div>
            </div>)
        }
    }
    async function deleteSelection(){
        setLoading(true);
        try{
            const response = await SelectionService.deleteSelection(id);
            //console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
    function likeButton(){
        if(isLikes) {
            return <div onClick={() => {
                addLike()
                setNumberLikes(numberLikes - 1);
                setIsLikes(false);
            }} className={styles.heartButton}>
                <img src={heart1} alt='' />
                <p>{numberLikes}</p>
            </div>
        }
        else {
            return <div onClick={() => {
                addLike()
                setNumberLikes(numberLikes + 1);
                setIsLikes(true);
            }} className={styles.heartButton}>
                <img src={heart0} alt='' />
                <p>{numberLikes}</p>
            </div>
        }
    }
    async function addLike(n){
        setLoading(true);
        try{
            const response = await SelectionService.addLike(selection.selection.id);

            //console.log(response.data);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    return <div className='container'>
    <div className={styles.selection}>
        <div className={styles.buttons}>
            <div>
                {checkIsMy()}
            </div>
            <div>
                {likeButton()}
            </div>
        </div>
        <p className={styles.title}>{selection.selection.title}</p>
        {/* Картинка */}
        <div className={styles.author}>
            <p>Автор: {selection.selection.name + ' ' + selection.selection.surname}</p>
        </div>
        <div className={styles.content}>
            <p>{selection.selection.content}</p>
        </div>
        {selection.selectionsRecipes.map((recipe) => {
            recipe.author = recipe.name + ' ' + recipe.surname
            recipe.timePreparing = recipe.time;
            recipe.numberServings = recipe.numbers_servings;
            recipe.id = recipe.recipes_id;
            return <SelectionRecipe 
                recipe = {recipe}
            />
        })}
    </div>
    {/* <Comments/>    */}
</div>
}

export default SelectionFull;