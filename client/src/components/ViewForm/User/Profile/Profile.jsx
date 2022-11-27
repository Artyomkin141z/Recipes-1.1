import styles from './styles.module.css'
import userNoImg from '../../../../assets/images/userNoImg.png'
import exitImg from '../../../../assets/images/exit.png'
import { Context } from '../../../..'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../../../services/UserService'

const Profile = () => {
    const {store} = useContext(Context)
    const [user, setUser] = useState('');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {getUser()}, [])

    async function getUser(){
        setLoading(true);
        try{
            const response = await UserService.getMyInform();
            setUser(response.data.user);
            //console.log(response.data.user);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

    if(isLoading){
        return(
            <div>Загрузка...</div>
        )
    }

    return(
        <div className='container'>
            <div className={styles.profile}>
                <div className={styles.personInf}>
                    <img className={styles.userImg} src={userNoImg} alt='Какой-то замечательный повар'/>
                    <div>
                        <p className={styles.name}>{user.name + ' ' + user.surname}</p>
                        <p className={styles.login}>{user.login}</p>
                    </div>  
                </div>
                <Link to = '/'>
                    <div onClick={() => {
                        store.logout()
                    }}>
                        <img className={styles.exit} src={exitImg} alt='Выйти'/>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Profile;