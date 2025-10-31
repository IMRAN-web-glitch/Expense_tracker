import "../../components CSS/goals/createGoals.css";
import { useState } from "react";

function CreateGoals() {

    const [formData, setFormData] = useState({
        Title: "",
        Amount: "",
        Target_date: "",
        Saved: ""
    });

    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const userId = 1; // Replace with actual user ID as needed
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}/goal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response) throw "Error in response";
            console.log(response);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
        console.log(formData);
        setFormData({
            Title: "",
            Amount: "",
            Target_date: "",
            Saved: ""
        });
    }


    return (
        <div className="createGoals">
            <h1>Create Goal</h1>
            <form onSubmit={handleFormSubmit}>

                <div className="sub-box">
                    <div className="sub-box-inside">
                        <label htmlFor="Title">Title</label>
                        <input type="text" id='Title'
                            name="Title"
                            value={formData.Title}
                            onChange={handleInputChange} placeholder="Goal Title (eg:-buy laptop)" />
                    </div>
                    <div className="sub-box-inside">
                        <label htmlFor="Amount">Amount</label>
                        <input
                            type="text"
                            id='Amount'
                            name="Amount"
                            value={formData.Amount}
                            onChange={handleInputChange} placeholder="Target Amount" />
                    </div>
                    <div className="sub-box-inside">
                        <label htmlFor="Target_date">Target date</label>
                        <input
                            type="date"
                            id='Target_date'
                            name="Target_date"
                            value={formData.Target_date}
                            onChange={handleInputChange} placeholder="Target Date" />
                    </div>

                    <div className="sub-box-inside">
                        <label htmlFor="Saved">Saved</label>
                        <input
                            type="text"
                            id='Saved'
                            name="Saved"
                            value={formData.Saved}
                            onChange={handleInputChange} placeholder="Saved" />
                    </div >
                    <div className="sub-box-inside ">
                        <button >Add goal</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default CreateGoals;