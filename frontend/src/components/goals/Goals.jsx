import "../../components CSS/goals/goals.css";
import CreateGoals from "./CreateGoals"
import YourGoals from "./YourGoals";


function Goals() {
    return (
        <div className="goals">
            <CreateGoals />
            <YourGoals />
        </div>
    );
}
export default Goals;
