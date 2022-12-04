import styles from './style.module.css'
import userImg from '../../../../assets/images/userNoImg.png'

import { useContext, useEffect, useState } from 'react';
import RecipeService from '../../../../services/RecipeService';
import { useParams } from 'react-router-dom';
import { Context } from '../../../..';

import { Snackbar, IconButton } from '@mui/material';
import closeImg from '../../../../assets/images/close.png'

const Comments = ({userId}) => {
    const {store} = useContext(Context)
    const {id} = useParams();
    const [comment, setComment] = useState();
    const [comments, setComments] = useState([])
    useEffect(() => {getRecipeComments()}, [])

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
            // console.log(comments);
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    async function deleteUserRecipeCommment(id){
        try{
            const response = await RecipeService.deleteUserRecipeCommment(id)
            const comments = response.data.comments
            //setIngredientsInput(ingredients)
            setComments(comments)
            // console.log(comments);
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    function setDeleteButton(id, comId) {  
        if(store.user === id) {
            return <button onClick={() => {deleteUserRecipeCommment(comId)}}>Удалить</button>
        }
    }

    return <div className={styles.comments}>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
        action={action}
        className={snackbarClass}
    ></Snackbar>
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
                if(localStorage.isAuth === 'true'){
                    if(comment) {
                        addRecipeComment();
                    }
                    else{
                        setOpen(true);
                        setMessage('Напишите что-нибудь');
                        setSnackbarClass('snackbarError');
                    }
                }
                else{
                    setOpen(true);
                    setMessage('Авторизуйтесь');
                    setSnackbarClass('snackbarError');
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
                <div className={styles.deleteButton}>{setDeleteButton(comment.commentator_id, comment.id)}</div>
            </div>
            )
        })}
        </div>
    </div>
}

export default Comments;