import styles from './styles.module.css'
import createImg from '../../../../assets/images/page.png'
import arrow from '../../../../assets/images/down-arrow.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RecipeService from '../../../../services/RecipeService'
import SelectionService from '../../../../services/SelectionService'

const UserRecipes = () => {
    useEffect(() => {getUserSelection()}, [])
    const [isLoading, setLoading] = useState(true);
    const [selections, setSelectionList] = useState([]);

    async function getUserSelection(){
        setLoading(true);
        try{
            const response = await SelectionService.getUserSelection();
            //setUser(response.data.user);
            const selections = response.data.selections;
            setSelectionList(selections);
            // console.log(selections);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className={styles.recipes}>
            <div className={styles.createRecipe}>
                <p>Создать подборку</p>
                <Link to='/create/selection'><img src={createImg} alt='Создать рецепт'/></Link>
            </div>
            <div className={styles.userRecipes}>
                <p>Подборки</p>
                <img src={arrow} alt=''/>
            </div>
            <div>
                {
                    selections.map((selection) => {
                        return (<div className={styles.userRecipe}>
                            <Link to={`/selection/${selection.selection_id}`}>
                                <p className={styles.title}>{selection.title}</p>
                            </Link>
                            <div className={styles.userRecipediv}>
                                <div>
                                    <p>Количество рецептов: </p>
                                    <p className={styles.userRecipediv_p}>{selection.numberRecipes}</p>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default UserRecipes;