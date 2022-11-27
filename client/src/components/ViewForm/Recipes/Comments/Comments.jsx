import styles from './style.module.css'
import userImg from '../../../../assets/images/userNoImg.png'

import { useContext, useEffect, useState } from 'react';
import RecipeService from '../../../../services/RecipeService';
import { useParams } from 'react-router-dom';
import { Context } from '../../../..';

const Comments = ({userId}) => {
    const {store} = useContext(Context)
    const {id} = useParams();
    const [comment, setComment] = useState();
    const [comments, setComments] = useState([])
    useEffect(() => {getRecipeComments()}, [])

    async function addRecipeComment(){
        try{
            const response = await RecipeService.addRecipeComment(comment, id)
            const comments = response.data.comments
            //setIngredientsInput(ingredients)
            setComments(comments)
            
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    async function getRecipeComments(){
        try{
            const response = await RecipeService.getRecipeComments(id)
            const comments = response.data.comments
            //setIngredientsInput(ingredients)
            setComments(comments)
            console.log(comments);
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    function setDeleteButton(id) {  
        if(store.user === id) {
            return <button>Удалить</button>
        }
    }

    return <div className={styles.comments}>
        <h2>Комментарии</h2>
        <div className={styles.addComment}>
            <div>
                <textarea placeholder='Добавьте комментарий'
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                ></textarea>
            </div>
            <button onClick={() => {
                if(comment) {
                    addRecipeComment();
                }
            }}>Добавить комментарий</button>
        </div>
        <div>
        {comments.map((comment) => {
            return (
            <div className={styles.DIV}>
                <div className={styles.comment}>
                    <img src={userImg} alt=''/>
                    <div>
                        <p className={styles.commentatorName}>{comment.name + ' ' + comment.surname}</p>
                        <p>{comment.comment}</p>
                    </div>
                </div>
                <div className={styles.deleteButton}>{setDeleteButton(comment.commentator_id)}</div>
            </div>
            )
        })}
        </div>
    </div>
}

export default Comments;