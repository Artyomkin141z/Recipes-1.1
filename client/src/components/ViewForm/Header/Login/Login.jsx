import styles from './style.module.css'

import icon from '../../../../assets/images/chef.png'

function Login() {
    return(
        <div className={styles.login}>
            <img className={styles.img} src={icon} alt='icon' />
            <p>Войти</p>
        </div>
    )
}
export default Login;