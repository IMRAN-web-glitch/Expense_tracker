import "../../components CSS/expenses/expenseList.css";
import { useState, useEffect } from "react";
import SmallForm from "./Edit.jsx";


function ExpenseList({ setrefresh, refresh }) {
    const [data, setData] = useState([])
    const [selectedExpense, setSelectedExpense] = useState(null)

    // Only called once
    async function fetchdata() {
        let userID = localStorage.getItem("User_id")
        // let userID = 1;
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${userID}/expenses`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
                },
            })

            let data = await response.json()
            console.log(data)
            setData(data)

        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

     async function handleDelete(exp) {
        // event.preventDefault();
        // userID is hard-coded , this will actually be fetched from body.params
        // let userID= localStorage.getItem("User_id")

        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${exp.User_id}/expenses/${exp.Expense_id}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("accesstoken")}`
                },
                body: JSON.stringify(exp)
            });
            if (!response) throw "Error in response";
            console.log(response);

            // Authorization : Bearer accessToken
            setrefresh(!refresh);

        } catch (error) {
            console.log(error);
        }

    }

    const handleEdit = (exp) => {
        setSelectedExpense(exp); // show form
        console.log(exp)
    };


    useEffect(() => {
        fetchdata()
    }, [refresh])

    return (
        <div className="expenseList">
            <h3>Expenses List</h3>
            <table>
                <thead>
                    <tr>
                        {/* <th className="listElement">Expense ID</th> */}
                        <th className="listElement">Edit</th>
                        <th className="listElement">Category</th>
                        <th className="listElement">Amount</th>
                        <th className="listElement">Date of Expense</th>
                        <th className="listElement">Note(optional)</th>
                        <th className="listElement">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((element) => {
                            return (
                                <tr key={element.Expense_id}>
                                    <td onClick={() => handleEdit(element)} style={{cursor: "pointer"}}> <i className="fa-solid fa-pen-to-square"></i> </td>
                                    <td> {`${element.Category}`} </td>
                                    <td> {`${element.Amount}`} </td>
                                    <td> {` ${element.Date_of_expense}`} </td>
                                    <td> {element.Note ? element.Note : "--"} </td>
                                    <td onClick={() => handleDelete(element)} style={{cursor: "pointer"}}> <span className="material-symbols-outlined">delete</span> </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            {selectedExpense && (
                <SmallForm
                    expenseData={selectedExpense}
                    onClose={() => setSelectedExpense(null)}
                    setrefresh={setrefresh}
                />
            )}
        </div>
    );
}

export default ExpenseList;