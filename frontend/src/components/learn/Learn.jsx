import "../../components CSS/learn/learn.css";
// import InteractiveLessons from './InteractiveLessons'
// import Lessons from './Lessons'
// import TotalPoints from './TotalPoints'

import InterestCalculator from "./InterestCalculator";
import ExpenseGoal from "./ExpenseGoal";
import EmergencyFund from "./EmergencyFund";
import Investment from "./Investment";
import LoanRepayment from "./LoanRepayment";
import InvestmentInfo from "./InvestmentInfo";
import EmergencyInfo from "./EmergencyInfo";



function Learn() {
    return (
        <div className="learn">
            <h1>Learn With the Virtual Wallet Lab</h1>


        <div className="learn-contents"> 
            <EmergencyFund/>
            <EmergencyInfo/>
            <Investment/>
            <InvestmentInfo/>
            <InterestCalculator/> 
            <ExpenseGoal/>
            <LoanRepayment/>

        </div>

        </div>
    )
}

export default Learn;
