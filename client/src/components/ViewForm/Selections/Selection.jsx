import { Link } from 'react-router-dom';
import styles from './styles.module.css'

const Selection = ({selection}) => {
    console.log(selection)
    return <div className={styles.selection}>
        <div className={styles.selectionTitle}>
            <Link to={`/selection/${selection.id}`}><p className={styles.selectionTitleP}>{selection.title}</p></Link>
            <p className={styles.author}>Автор: {selection.name + ' ' + selection.surname}</p>
        </div>
        <div  className={styles.selectionContent}>
            <p>{selection.content}</p>
        </div>
    </div>
}

export default Selection;