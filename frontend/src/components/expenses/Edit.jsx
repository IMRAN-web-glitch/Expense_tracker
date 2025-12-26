import { useState } from "react";
import "../../components CSS/expenses/Edit.css";


function SmallForm({ expenseData, onClose, setrefresh }) {
  const [formData, setFormData] = useState({
    Expense_id: expenseData.Expense_id,
    Category: expenseData.Category,
    Amount: expenseData.Amount,
    Date_of_expense: expenseData.Date_of_expense,
    Note: expenseData.Note,
    User_id: expenseData.User_id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSave() {
    try {
      onClose(); // close form
      let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${formData.User_id}/expenses/${formData.Expense_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw "Error in response";
      const data = await response.json();
      console.log("Data saved to DATABASE", data);

      setrefresh(e => !e)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="smallForm">
        <h3>Edit Expense</h3>


        <label htmlFor="Category">category</label>
        <select
          name="Category"
          id="Category"
          onChange={handleChange}
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

        <label>Amount</label>
        <input
          type="number"
          name="Amount"
          value={formData.Amount}
          onChange={handleChange}
        />

        <label>Note</label>
        <input
          type="text"
          name="Note"
          value={formData.Note ? formData.Note : ""}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="Date_of_expense"
          value={formData.Date_of_expense}
          onChange={handleChange}
        />

        <div className="buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SmallForm;
