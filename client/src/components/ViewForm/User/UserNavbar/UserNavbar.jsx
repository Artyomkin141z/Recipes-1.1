import { Link } from 'react-router-dom';
import styles from './styles.module.css'

const UserNavbar = () => {
    return(
        <div className={styles.menu}>
            <Link to='/user/bookmarks'>Закладки</Link>
            <Link to='/user/recipes'>Рецепты</Link>
            <Link>Подборки</Link>
            <Link to='/user'>Профиль</Link>
        </div>
    )
}

export default UserNavbar;