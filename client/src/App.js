//import { observable } from 'mobx';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from '.';
//import LoginForm from './components/LoginForm/LoginForm';
import {observer} from 'mobx-react-lite'
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Selections from './pages/Selections';
import RegistrForm from './components/Auth/RegistrForm/RegistrForm';
import Header from './components/ViewForm/Header/Header/Header.jsx';
import Message from './components/InformationForms/MessageInf/Message';
import Profile from './pages/Profile';
import UserProfile from './components/ViewForm/User/Profile/Profile.jsx'
import UserRecipes from './components/ViewForm/User/UserRecipes/UserRecipes';
import CreateRecipe from './pages/CreateRecipe';
import Recipe from './pages/Recipe';
import UserBookmarks from './components/ViewForm/User/UserBookmarks/UserBookmarks';
import UserSelections from './components/ViewForm/User/UserSelections/UserSelections';
import CreateSelection from './components/CreateForm/Selection/CreateSelection';
import Selection from './pages/Selection';

function App() {
  const {store} = useContext(Context)

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  }, [store])

  if(store.isLoading){
    return <div>Загрузка...</div>
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header isAuth = {store.isAuth}/>
        <Message />
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipes/:ingredientId/:serchStr' element={<Recipes isSerch = {true}/>} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/selections' element={<Selections />} />
          <Route path='/selection/:id' element={<Selection />} />
          <Route path='/registration' element={<RegistrForm />} />
          <Route path='/user' element={<Profile />}>
            <Route path='' element={<UserProfile />}/>
            <Route path='recipes' element={<UserRecipes />} />
            <Route path='bookmarks' element={<UserBookmarks />} />
            <Route path='selections' element={<UserSelections />} />
          </Route>
          <Route path='/create/recipe' element={<CreateRecipe />}/>
          <Route path='/create/selection' element={<CreateSelection />}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default observer(App);
