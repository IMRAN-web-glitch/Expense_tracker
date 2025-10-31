import "../../components CSS/login/login.css"
import { useState } from 'react'

function SignUp({ toLogIn }) {

    const [formData, setFormData] = useState({
        username: "",
        gender: "",
        password: "",
        phone_no: "",
        country: "",
        email: "",

    });

    const handleInputChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevFormData) => {
            return { ...prevFormData, [fieldName]: fieldValue }
        })
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        try {
            let response = await fetch("http://localhost:8080/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error("Error during sign up:", error);
        }

    }

    return (
        <div className="sign-up">

            <h1 className="login-text">Sign Up</h1>
            <form className="signup" onSubmit={handleFormSubmit}>

                <label htmlFor="username" className="login-form-text">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Eg: John_Doe123"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                
                <label htmlFor="password" className="login-form-text">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter a Password"
                />

                <div className="email_phone">

                <div className="email">    
                <label htmlFor="email" className="login-form-text">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your E-Mail" />
                </div>

                <div className="phone_no">   

                <label htmlFor="phone_no" className="login-form-text">Phone Number</label>
                <input
                    type="text"
                    name="phone_no"
                    id="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    placeholder="Enter your Phone Number"
                />
                </div>
                </div>

                <div className="country_gender">
                <div className="country">   

                <label htmlFor="country" className="login-form-text">Country</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your Country" />
                </div>
                
                <div className="gender">   

                <label htmlFor="gender" className="login-form-text">Gender</label>
                <select
                    name="gender"
                    id="gender"
                    onChange={handleInputChange}
                    value={formData.gender}>
                    <option value="placeholder">Choose your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>
                </div>


                <input type="submit" name="signup-btn" value="Sign Up" />

            </form>
                <div className="switch">
                    <button type="button" onClick={toLogIn}>Log In</button>
                    <button type="button">Sign Up</button>
                </div>
        </div>
    );
}

export default SignUp;