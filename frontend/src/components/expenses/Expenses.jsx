import Addexpense from "./Addexpense";
import ExpenseList from "./ExpenseList";
import SpendingByCategory from "./SpendingByCategory";
import "../../components CSS/expenses/expenses.css";
import {useState} from 'react'


function Expenses() {
    const [refresh, setRefresh] = useState(false);
    return (
        <div className="Expenses-mainbody">
            <h3> Expenses</h3>

            <Addexpense setrefresh={setRefresh} refresh={refresh} />
            <ExpenseList refresh={refresh} setrefresh={setRefresh} />
            <SpendingByCategory refresh={refresh} setrefresh={setRefresh} />

        </div>
    ); 
}

export default Expenses;