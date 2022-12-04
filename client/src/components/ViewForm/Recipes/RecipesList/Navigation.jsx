import styles from './style.module.css'

const Navigation = () => {
    return (
        <div className={styles.navigator}>
            <div className={styles.sorting}>
                <p>Сортировка:</p>
                <p>по релевантности</p>
                {/* <p>по популярности</p>
                <p>по дате добавления</p> */}
            </div>
        </div>
    )
}

export default Navigation;