import styles from './style.module.css'
import userImg from '../../../../assets/images/userNoImg.png'

import Logo from '../Logo/Logo';
import Login from '../Login/Login';

import bookmark from '../../../../assets/images/bookmark.png'
import searcIcon from '../../../../assets/images/search.png'
import {useState } from 'react';
import { showLoginForm } from '../../../../services/LoginFormService';
//import { Context } from '../..';
import { Link } from 'react-router-dom';
import Search from '../../Search/Search';

const Header = (props) => {
    const [isShowLoginForm, setIsShowLoginForm] = useState(false);
    const [isShowSearchForm, setIsShowSearchForm] = useState(false);
    //const {store} = useContext(Context)

    const checkAuth = () => {
        if(props.isAuth){
            return (
                <div className={styles.rigth}>
                    <div className={styles.search}
                    onClick={() => {
                        setIsShowSearchForm(true)
                    }}
                    >
                        <img src={searcIcon} alt='' />
                        <p>Поиск</p>
                    </div>
                    <Link to='/user/bookmarks'>
                        <div className={styles.book}>
                            <img className={styles.bookmark} src={bookmark} alt=''/>
                            <p>Мои закладки</p>
                        </div>
                    </Link>
                    <Link to='/user'>
                        <img className={styles.userImg} src={userImg} alt='Повар'/>
                    </Link>
                </div>  
            )
        }
        else{
            return (
                <div className={styles.rigth}>
                    <div className={styles.search}>
                        <img src={searcIcon} alt='' />
                        <p>Поиск</p>
                    </div>
                    <div onClick={() => setIsShowLoginForm(true)}>
                        <Login />
                    </div>
                </div>  
            )
        }
    }

    function showSearchForm(isShowSearchForm, setIsShowSearchForm){
        if(isShowSearchForm) {
            return <Search 
                isShowSearchForm = {isShowSearchForm}
                setIsShowSearchForm = {setIsShowSearchForm}
            />
        }
    }

    return(
        <div className={styles.form}>
            {showSearchForm(isShowSearchForm, setIsShowSearchForm)}
            <div className={styles.header}>
                {showLoginForm(isShowLoginForm, setIsShowLoginForm)}
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Logo />
                        <a href='/recipes'>Рецепты</a>
                        <a href='/selections'>Подборки</a>
                    </div>
                    {checkAuth()}
                </div>        
            </div>
        </div>
    )
}
export default Header;