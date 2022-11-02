import {Outlet } from 'react-router-dom';
import UserNavbar from '../components/ViewForm/User/UserNavbar/UserNavbar';

import styles from './styles/profile.module.css'

function Profile() {
    return(
        <div className='container'>
            <div className={styles.profile}>
                <UserNavbar />
                <Outlet />
            </div>
        </div>
    )
}

export default Profile;