import styles from './style.module.css'
import closeImg from '../../../assets/images/close.png'

import { Snackbar, IconButton } from '@mui/material';

import React, { useContext, useState } from "react";
import { Context } from "../../..";
import {observer} from 'mobx-react-lite'
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    const [login, setLogin] = useState('');
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
            <img className={'snackbarCloseImg'} src={closeImg} alt='Закрыть'
                onClick={() => setOpen(false)}
            />
            </IconButton>
        </>
    );

    return (
        <div className={styles.form}
            onClick={(e) => {
                const className = e.target.className;
                if(className.includes('form')){
                    props.setState(false)
                }
            }}
        >
            <div className={styles.container}>
                <img className={styles.close} src={closeImg} alt='Закрыть'
                    onClick={() => props.setState(false)}
                />
                <div className={styles.login}>
                    <div>
                        <p>Логин:</p>
                        <input 
                            onChange={e => setLogin(e.target.value)}
                            value={login}
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
                            let status;
                            store.login(login, password)
                                .then(res => {status = res})
                                .then(() => {
                                    if(status === 200){
                                        props.setState(false)
                                        setOpen(true);
                                        setMessage('Вы успешно авторизовались');
                                        setSnackbarClass('snackbar');
                                    }
                                    else{
                                        console.log('status', status)
                                        setOpen(true);
                                        setMessage(status.message);
                                        setSnackbarClass('snackbarError');
                                    }
                                })
                        }}
                    >Войти</button>
                    <Link
                        to='/registration'
                        onClick={() => {
                            props.setState(false)
                        }}
                    >Регистрация</Link>
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
                action={action}
                className={snackbarClass}
            >
            </Snackbar>
        </div>
    )
}

export default observer(LoginForm)