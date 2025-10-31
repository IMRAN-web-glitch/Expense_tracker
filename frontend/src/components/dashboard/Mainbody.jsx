import SmallBoxes from "./SmallBoxes";
import LargeBoxes from "./LargeBoxes";
import "../../components CSS/dashboard/mainBody.css";
import Badges from "./Badges";

function Mainbody() {
    return (
        <div>
            <div className="smallBoxContainer">
                <SmallBoxes info="Total spent : 600" />
                <SmallBoxes info="Goals : 1" />
                <SmallBoxes info="Saved towards goals : 600" />
                <SmallBoxes info="Learn points : 400" />
            </div>
           
            <div className="largeBoxContainer">
                <LargeBoxes info="Spending by category" />
                <LargeBoxes info="Monthly Spending" />
            </div>

            <div>
                <Badges />
            </div>
            
        </div>
    );
}

export default Mainbody;

