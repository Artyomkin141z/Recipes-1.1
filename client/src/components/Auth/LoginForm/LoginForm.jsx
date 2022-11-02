import styles from './style.module.css'
import closeImg from '../../../assets/images/close.png'

import React, { useContext, useState } from "react";
import { Context } from "../../..";
import {observer} from 'mobx-react-lite'
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context)

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
                                    }
                                    //console.log('status', status)
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
        </div>
    )
}

export default observer(LoginForm)