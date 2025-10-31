import "../../components CSS/goals/goalItem.css";
function GoalItem(){
    return(
        <div className="goalItem">
            <h1>Buy Laptop</h1>
            <p>Target: 2000</p>
            <div className='progress-container'>
                <div className='progress-bar'></div>
            </div>
            <p>Saved</p>
            <input type="text" name="amount" placeholder="Enter Amount"/>
            <button>Submit</button> 
        </div>
    );
}

export default GoalItem;
