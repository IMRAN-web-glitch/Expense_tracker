import {useState} from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import "../../components CSS/login/login.css"

function AuthPage(){

    const [isLogIn,setIsLogIn] = useState(true);

    const toSignUp = () => {
        setIsLogIn(false)
    }

    const toLogIn = () => {
        setIsLogIn(true)
    }
    
    return(
        <div className="container">
            <div className="textbox">
                <h1 className="text">Track Smart. Spend Smarter.<br></br> Finances, Simplified!</h1>
                <p className="text" id="textbox-line2">Securely start your journey on your financial dashboard to gain crystal-clear insight into every transaction and master your budget with smarter, simplified tracking.</p>
            </div>
            <div className='authpage'>
                {isLogIn ? (
                    <LogIn  toSignUp={toSignUp}/>
                ) : (
                    <SignUp toLogIn={toLogIn}/>
                )}
            </div>
        </div>

    )
}

export default AuthPage;

