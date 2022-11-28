import styles from './styles.module.css'

const SelectionRecipe = (props) => {
    return <div className={styles.reicpSelection}>
        <div className={styles.reicpSelection_title}>
            <p>{props.title}</p>
            <button onClick={() => {
                props.deleteRecipe(props.index)
            }}>Удалить</button>
        </div>
        <textarea placeholder='Описание'
            onChange={(e) => {
                props.item.contentSelection = e.target.value;
            }}
        ></textarea>
    </div>
}

export default SelectionRecipe