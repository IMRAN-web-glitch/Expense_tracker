import Header from "./Header.jsx"
import WalletSummary from "./WalletSummary.jsx"
import GoalsSummary from "./GoalsSummary.jsx"
import PersonalInfo from "./PersonalInfo.jsx"



function Profile(){
    return(
        <div>
            <Header/>
            <WalletSummary/>
            <GoalsSummary/>
            <PersonalInfo/>
        </div>
    );
}

export default Profile;