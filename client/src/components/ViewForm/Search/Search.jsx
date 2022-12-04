import { useEffect, useState } from 'react'
import DatalistInput from 'react-datalist-input'
import { Link } from 'react-router-dom';
import CatalogService from '../../../services/CatalogeService';
import styles from './styles.module.css'

const Search = ({setIsShowSearchForm, isShowSearchForm}) => {
    const [ingredient, setIngredient] = useState({id: 0});
    const [ingredients, setIngredients] = useState([]);
    const [searchStr, setSearchStr] = useState('0');
    useEffect(() => {getIngredientsValue()}, [])
    
    async function getIngredientsValue(){
        try{
            const response = await CatalogService.getIngredients()
            const ingredients = response.data.ingredients;
            ingredients.forEach(function(item) {
                item.value = item.ingredient
            });
            // console.log(ingredients)
            setIngredients(ingredients)
        }catch(e){
            console.log(e);
        }finally{

        }
    }

    return (
    <div className={styles.form}
    onClick={(e) => {
        const className = e.target.className;
        if(className.includes('form')){
            setIsShowSearchForm(false)
        }
    }}
    >
        <div className={styles.container}>
            <div className={styles.search}>
                <div>
                    <input 
                    onChange={(e) => {
                        setSearchStr(e.target.value);
                    }}
                    value={searchStr}
                    className={styles.searchInpur}
                    type="text" placeholder="Введите что-нибудь"></input>
                </div>
                <div className={styles.searchIngredientDiv}>
                    <div className={styles.searchIngredient}>
                        <p>Искать по ингредиенту:</p>
                        <div>
                        <DatalistInput
                            placeholder="Ингредиент"
                            showLabel={false}
                            items={[...ingredients]}
                            onSelect={(item) => {
                                //console.log(item);
                                setIngredient(item)
                                //setIngredientValue({});
                            }}
                        />
                        </div>
                    </div>
                    <Link to={`/recipes/${ingredient.id}/${searchStr}`}><button
                    onClick={() => {
                        setIsShowSearchForm(false)
                    }}
                    >Искать</button></Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Search;