import { useEffect, useState } from 'react';
import SelectionService from '../../../services/SelectionService';
import Navigation from '../Recipes/RecipesList/Navigation';
import Selection from './Selection';
import styles from './styles.module.css'

function SelectionList(props) {
    useEffect(() => {getRecipes()}, [])
    
    const [isLoading, setLoading] = useState(true);
    const [selections, setSelections] = useState([])

    async function getRecipes(){
        setLoading(true);
        try{
            const response = await SelectionService.getSelections();
            console.log(response);
            const selections = response.data.selections;
            setSelections(selections)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }
    return(
        <>
            <div className='container'>
                <div className={styles.selections}>
                    <div className={styles.title}>
                        <h1>Подборки</h1>
                        <p>Всего {selections.length} подборок</p>
                    </div>
                    <Navigation />
                    {
                    selections.map((item, index) => {
                        return (<Selection 
                            selection = {item}
                        />)
                    })
                    }
                </div>              
            </div>
        </>
    )
}

export default SelectionList;