import "../../components CSS/expenses/expenseList.css";

function ExpenseList() {
    return (
        <div className="expenseList">
            ExpenseList
            <table>
                <thead>
                    <tr>
                        <th className="listElement">Date</th>
                        <th className="listElement">Category</th>
                        <th className="listElement">Note</th>
                        <th className="listElement">Amount</th>
                    </tr>
                </thead>
                
            </table>
        </div>
    );
}

export default ExpenseList;