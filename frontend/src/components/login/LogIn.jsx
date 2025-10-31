import "../../components CSS/login/login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn({ toSignUp }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    async function handleFormSubmit(event) {
        event.preventDefault();
        try {
            let response = await fetch(`https://hz6wg8cv-8080.inc1.devtunnels.ms/login`, {
                method: "POST",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data.message);
            if (response.ok && data.success) {
                navigate("/dashboard");
            } else {

                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
        console.log("Form submitted", formData);
    }

    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }


    return (
        <div className="log-in">
            <div className="login-text">
                <h1>Welcome Back!</h1>
                <p id="login-para">Log in to Access Your Financial Dashboard.</p>
            </div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username" className="login-form-text">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="eg. john_doe"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <label htmlFor="email" className="login-form-text">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="eg. john@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="password" className="login-form-text">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <input type="submit" name="login-btn" value="Log In" />

                <p id="signup-para">Don't have an account? Sign up below.</p>
            </form>
            <div className="switch">
                <button>Log In</button>
                <button type="button" onClick={toSignUp}>Sign Up</button>
            </div>

        </div>
    );

}

export default LogIn;