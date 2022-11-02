import LoginForm from "../components/Auth/LoginForm/LoginForm"

const showLoginForm = (state, setState) => {
    if(state){
        return <LoginForm 
            setState={setState}
        />
    }
}

export {showLoginForm}