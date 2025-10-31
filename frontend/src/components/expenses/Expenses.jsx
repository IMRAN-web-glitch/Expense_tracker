import Addexpense from "./Addexpense";
import ExpenseList from "./ExpenseList";
import SpendingByCategory from "./SpendingByCategory";
import "../../components CSS/expenses/expenses.css";

function Expenses() {
    return (
        <div >
            <h2> Expenses</h2>

            <Addexpense />
            <ExpenseList />
            <SpendingByCategory />

        </div>
    );
}

export default Expenses;