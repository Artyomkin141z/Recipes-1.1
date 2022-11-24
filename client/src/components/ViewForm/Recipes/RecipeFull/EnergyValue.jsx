import styles from './styles.module.css'

const EnergyValue = ({energyValue}) => {
    return (<div className={styles.energyValue}>
        <p className={styles.energy_title}>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА 100г</p>
        <div className={styles.energy}>
            <div>
                <p>КАЛОРИЙНОСТЬ</p>
                <p>{energyValue.calories}</p>
                <p>ККАЛ</p>
            </div>
            <div>
                <p>БЕЛКИ</p>
                <p>{energyValue.proteins}</p>
                <p>ГРАММ</p>
            </div>
            <div>
                <p>ЖИРЫ</p>
                <p>{energyValue.fats}</p>
                <p>ГРАММ</p>
            </div>
            <div>
                <p>УГЛЕВОДЫ</p>
                <p>{energyValue.carbohydrates}</p>
                <p>ГРАММ</p>
            </div>
        </div>
    </div>)
}

export default EnergyValue