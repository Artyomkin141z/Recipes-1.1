import styles from './style.module.css'

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

    return (
        <div className={styles.form}>
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
                        onClick={() => {store.registration(name, surname, email, password)}}
                    >Вперед</button>
                </div>
            </div>
        </div>
    )
}

export default observer(RegistrForm)