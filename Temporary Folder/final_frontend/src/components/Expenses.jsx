import { useState } from "react";
import "./Edit.jsx";
import SmallForm from "./Edit.jsx";


function Expenses() {
    let initialData = {
        amount: "",
        category: "",
        date: "",
    }

    let [formData, setFormData] = useState(initialData);
    const [selectedExpense, setSelectedExpense] = useState(null);

    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        try {
            let response = await fetch("http://localhost:8080/expenses", {
                method: "POST",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response) throw "Error in response";
            console.log(response);

        } catch (error) {
            console.log(error);
        }

        console.log(formData);
        setFormData(initialData);
    }

    const handleEdit = () => {
        const fakeExpense = {
            expense_id: 1,
            name: "Groceries",
            amount: 1500,
            date: "2025-10-20"
        };
        setSelectedExpense(fakeExpense); // show form
    };


    return (
        <div>
            ADD EXPENSES
            <form
                onSubmit={handleFormSubmit}>

                <label htmlFor="amount">Amount</label>
                <input
                    type="text"
                    id="amount"
                    placeholder="eg. 12000"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                />
                <br /><br />
                <label htmlFor="category">category</label>

                <select
                    name="category"
                    id="category"
                    onChange={handleInputChange}
                    value={formData.category}
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

                <br /><br />

                <label htmlFor="date">date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
                <br /><br />
                <button>Submit Form</button>
                <button type="button" onClick={handleEdit}>Edit</button>

            </form>
            {selectedExpense && (
                <SmallForm
                    expenseData={selectedExpense}
                    onClose={() => setSelectedExpense(null)}
                />
            )}

        </div>
    );
}

export default Expenses;


