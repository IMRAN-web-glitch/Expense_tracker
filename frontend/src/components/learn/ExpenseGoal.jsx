import { useState, useEffect } from 'react';
import "../../components CSS/learn/ExpenseGoal.css";

function ExpenseGoal() {

    const [goalAmt, setGoalAmt] = useState(0);
    const [goalDays, setGoalDays] = useState(0);

    const [saved, setSaved] = useState(0);
    const [daysLeft, setDaysLeft] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [resultContent, setResultContent] = useState('');


    const handleSaved = (value) => {
        setSaved((prevSaved) =>
            (prevSaved + value))
    }

    const handleProgress = (value) => {
        setProgressValue((prev) => {
            return (prev + value)
        })
    }

    const handleGoalAmt = (e) => {
        const newAmt = (+e.target.value);
        setGoalAmt(newAmt);
    }

    const handleGoalDays = (e) => {
        const newDays = (+e.target.value);
        setGoalDays(newDays);
        setDaysLeft(newDays);
    }


    useEffect(() => {
        if(goalAmt > 0 && saved >= goalAmt){
            setResultContent("Yay! You have achieved your Goal Amount!");
        }

    },[saved,goalAmt])


        const handleAddBtn = (e) => {

        if (daysLeft === 1) {
        if (saved < goalAmt && progressValue < goalAmt) {
            setResultContent("Oh no, you couldn't achieve your goal on time!");
        } 
    }


        let addNo = +(e.target.className);
        if (goalAmt != 0 && goalDays != 0 && daysLeft > 0 && saved < goalAmt) {
            handleSaved(addNo);
            setDaysLeft((daysLeft) - 1);
            handleProgress(addNo);

        }
        else {
            return;
        }
    }

    return (
        <div className="expenseGoal">
            <h1>Expense Goal Challenge</h1>
            <div className="Expense-box1">
                <div className="goal-target">
                    <span>Set your Goal Amount</span>
                    <input
                        type="number"
                        step="50"
                        placeholder="Enter Goal Amount"
                        name="goalAmt"
                        value={goalAmt}
                        onChange={handleGoalAmt}
                    />
                </div>

                <div className="goal-days">
                    <span>Set your Target No. of Days</span>
                    <input
                        type="number"
                        step="1"
                        placeholder="Enter Target Days"
                        name="goalDays"
                        onChange={handleGoalDays}

                    />
                </div>
            </div>

            <div className="Expense-box2">
                <div className="saved">Saved so far: {saved}</div>
                <div className="daysLeft">Days Left: {daysLeft}</div>
            </div>
            
            <div className="Expense-box3">
                <progress value={progressValue} max={goalAmt}></progress>
            </div>


            <div className="Expense-box4">
                <button className="50" onClick={handleAddBtn}>Add ₹50</button>
                <button className="100" onClick={handleAddBtn}>Add ₹100</button>
                <div className="resultContent">{resultContent}</div>
            </div>

        </div>
    )
}

export default ExpenseGoal;