import "../../components CSS/expenses/addExpense.css";
import { useState } from "react";


function Addexpense({ setrefresh, refresh }) {
    let initialData = {
        Amount: "",
        Category: "",
        Date_of_expense: "",
        Note: ""
    }

    let [formData, setFormData] = useState(initialData);


    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        // userID is hard-coded , this will actually be fetched from body.params
        let userID = localStorage.getItem("User_id")
        // let userID= 6
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${userID}/expenses`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
                },
                body: JSON.stringify(formData)
            });
            if (!response) throw "Error in response";
            console.log(response);

            // Authorization : Bearer accessToken
            setrefresh(!refresh);

        } catch (error) {
            console.log(error);
        }

        console.log(formData);
        setFormData(initialData);
    }



    return (
        <form onSubmit={handleFormSubmit}>
            <div className="addExpense">

                Add Expense <br /><br />

                <label htmlFor="Amount">Amount</label>
                <input
                    type="text"
                    id="Amount"
                    placeholder="eg. 12000"
                    name="Amount"
                    value={formData.Amount}
                    onChange={handleInputChange}
                />
                &nbsp;

                <label htmlFor="Category">category</label>
                <select
                    name="Category"
                    id="Category"
                    onChange={handleInputChange}
                    value={formData.Category}
                >
                    <option value="Category">Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Books">Books</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Misc.">Misc.</option>
                </select>

                &nbsp;&nbsp;

                <label htmlFor="date">date</label>
                <input
                    type="date"
                    id="Date_of_expense"
                    name="Date_of_expense"
                    value={formData.Date_of_expense}
                    onChange={handleInputChange}
                />


                <br /><br />

                <div style={{ display: "flex" }}>
                    <label htmlFor="Note">Note</label>
                    <input
                        type="text"
                        id="Note"
                        name="Note"
                        value={formData.Note}
                        onChange={handleInputChange}
                    />&nbsp;
                    <button >Add</button>&nbsp;
                    {/* <button>Edit</button>&nbsp; */}
                </div>

            </div>
        </form>
    );
}

export default Addexpense;
