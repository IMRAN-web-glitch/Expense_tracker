import { useState } from "react";
import "./Edit.css";

function SmallForm({ expenseData, onClose }) {
  const [formData, setFormData] = useState({
    Expense_id: expenseData.expense_id,
    Category: expenseData.name,
    Amount: expenseData.amount, 
    Date_of_expense: expenseData.date,
  });
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSave() {
    try {
      onClose(); // close form
      let response = await fetch(`http://localhost:8080/expenses/${formData.expense_id}`, {
        method: "PUT",
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw "Error in response";
      const data = await response.json();
      console.log("Data saved to DATABASE", data);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="smallForm">
        <h3>Edit Expense</h3>

        <label>Expense ID</label>
        <input
          type="text"
          name="Expense_id"
          value={formData.Expense_id}
          disabled
          style={{ cursor: "not-allowed", backgroundColor: "#eee" }}
        />

        <label>Category</label>
        <input
          type="text"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
        />

        <label>Amount</label>
        <input
          type="number"
          name="Amount"
          value={formData.Amount}
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
