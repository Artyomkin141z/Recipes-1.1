import styles from './styles.module.css'

const IngredientForm = (props) => {
    return (
        <li>
            <div className={styles.ingredient}>
                <p>{props.item.ingredient}</p>
                <div className={styles.properties}>
                    <div className={styles.gramm}>
                        <p>Граммы:</p>
                        <input type="number" min="1" max="10000"
                            onChange={(e) => {
                                if(e.target.value < 1){
                                    e.target.value = 1
                                }
                                else if(e.target.value > 10000){
                                    e.target.value = 10000
                                }
                                props.item.gramms = e.target.value.toString();
                            }}
                        ></input>
                    </div>
                    <button
                        onClick={() => {
                            props.deleteIngredient(props.index)
                        }}
                    >Удалить</button>
                </div>
            </div>
        </li>
    )
}

export default IngredientForm;