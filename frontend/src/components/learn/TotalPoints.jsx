import "../../components CSS/learn/totalPoints.css";

function TotalPoints() {
    return (
        <div className="totalPoints">
            <h1>Total Points</h1>
            <p>200</p>
            <div className="badges-container">
                <div className="badge">Rookie Saver</div>
                <div className="badge">Smart Spender</div>
            </div>
        </div>
    );
}

export default TotalPoints;