import styles from './style.module.css'
import closeImg from '../../../assets/images/close.png'

import { Snackbar, IconButton } from '@mui/material';

import React, { useContext, useState } from "react";
import { Context } from '../../..';
import {observer} from 'mobx-react-lite'
import { Link } from 'react-router-dom';

const RegistrForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context)

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
            <img className={'snackbarCloseImg'}src={closeImg} alt='Закрыть'
                onClick={() => setOpen(false)}
            />
            </IconButton>
        </>
    );

    return (
        <div className={styles.form}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
                action={action}
                className={snackbarClass}
            >
            </Snackbar>
            <div className={styles.container}>
                <div className={styles.registr}>
                    <h2>РЕГИСТРАЦИЯ</h2>
                    <div>
                        <p>Имя:</p>
                        <input 
                            onChange={e => setName(e.target.value)}
                            value={name}
                            type='text'
                            placeholder='Имя'
                        />
                    </div>
                    <div>
                        <p>Фамилия:</p>
                        <input 
                            onChange={e => setSurname(e.target.value)}
                            value={surname}
                            type='text'
                            placeholder='Фамилия'
                        />
                    </div>
                    <div>
                        <p>Логин:</p>
                        <input 
                            onChange={e => setLogin(e.target.value)}
                            value={email}
                            type='text'
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <p>Пароль:</p>
                        <input 
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder='Пароль'
                        />
                    </div>
                    <button
                        onClick={() => {
                            let result;
                            store.registration(name, surname, email, password)
                            .then(res => {result = res})
                            .then(() => {
                                if(result.status === 200){
                                    console.log(result);
                                    setOpen(true);
                                    setMessage('Вы успешно зарегистрировались');
                                    setSnackbarClass('snackbar');
                                }
                                else{
                                    console.log(result);
                                    setOpen(true);
                                    setMessage(result.message);
                                    setSnackbarClass('snackbarError');
                                }  
                            })
                        }}
                    >Вперед</button>
                </div>
            </div>
        </div>
    )
}

export default observer(RegistrForm)