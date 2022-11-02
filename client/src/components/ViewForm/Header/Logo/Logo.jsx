import styles from './style.module.css'

import logo from '../../../../assets/images/donut.png'

function Logo() {
    return(
        <div className={styles.logo}>
            <img className={styles.img} src={logo} alt='logo' />
            <p className={styles.p}>Food</p>
        </div>
    )
}
export default Logo;