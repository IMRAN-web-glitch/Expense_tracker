import "../../components CSS/learn/learn.css";
import InteractiveLessons from './InteractiveLessons'
import Lessons from './Lessons'
import TotalPoints from './TotalPoints'

function Learn() {
    return (
        <div className="learn">
            <InteractiveLessons/>
            <Lessons/>
            <TotalPoints/>


        </div>
    );
}

export default Learn;