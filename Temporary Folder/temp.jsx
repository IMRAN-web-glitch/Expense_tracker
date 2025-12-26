let formData = {
    "name" : "tanya",
    "age" : 19,
    "college" : "hansraj"
}


async function handleFormSubmit() {
        try {
            let response = await fetch(`http:localhost:8080/login`, {
                method: "POST",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);
            console.log(data.accesstoken);
            console.log(data.User_id);

            localStorage.setItem("accesstoken",data.accesstoken);
            localStorage.setItem("User_id",data.User_id);

        } catch (error) {
            console.log(error);
        }
    }
