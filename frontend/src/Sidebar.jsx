import { NavLink } from "react-router-dom";
import "./sidebar.css";


function Sidebar() {
    return (
        <div className="main">
            <ul>
                <li> <NavLink to="/dashboard">Dashboard</NavLink> </li>
                <li> <NavLink to="/expenses">Expenses</NavLink> </li>
                <li> <NavLink to="/goals">Goals</NavLink> </li>
                <li> <NavLink to="/learn">Learn</NavLink> </li>
                <li> <NavLink to="/wallet-sim">Wallet-sim</NavLink> </li>
                <li> <NavLink to="/profile">Profile</NavLink> </li>

            </ul>
        </div>
    );
}

export default Sidebar; 