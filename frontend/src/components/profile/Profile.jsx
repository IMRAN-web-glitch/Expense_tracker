// import Header from "./Header.jsx"
// import WalletSummary from "./WalletSummary.jsx"
// import GoalsSummary from "./GoalsSummary.jsx"
// import PersonalInfo from "./PersonalInfo.jsx"

import "../../components CSS/profile/profile.css";


// function Profile(){
//     return(
//         <div>
//             <Header/>
//             <WalletSummary/>
//             <GoalsSummary/>
//             <PersonalInfo/>
//         </div>
//     );
// }

// export default Profile;





import React from "react";
// // import "./profile.css";
// import { FaUserCircle, FaPiggyBank, FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";

  async function fetchdata() {
        let userID = localStorage.getItem("User_id")
        // let userID = 1;
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${userID}/expenses`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
                },
            })

            let data = await response.json()
            console.log(data)
            setData(data)

        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

function Profile() {
  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        {/* <FaUserCircle className="profile-avatar" /> */}
        <div className="profile-info">
          <h2>Sarah Miller</h2>
          <p className="email">sarah.miller@university.edu</p>
          <span className="badge">Student Member</span>
        </div>
      </div>

      {/* Wallet Summary */}
      <div className="wallet-summary">
        <div className="wallet-box balance">
          {/* <FaWallet /> */}
          <h3>$2,340</h3>
          <p>Current Balance</p>
        </div>
        <div className="wallet-box earned">
          {/* <FaArrowUp /> */}
          <h3>$5,200</h3>
          <p>Total Earned</p>
        </div>
        <div className="wallet-box spent">
          {/* <FaArrowDown /> */}
          <h3>$2,250</h3>
          <p>Total Spent</p>
        </div>
        <div className="wallet-box saved">
          {/* <FaPiggyBank /> */}
          <h3>$2,950</h3>
          <p>Total Saved</p>
        </div>
      </div>

      {/* Info & Actions Section */}
      <div className="profile-details">
        <div className="personal-info">
          <h4>Personal Information</h4>
          <p><strong>Full Name:</strong> Sarah Miller</p>
          <p><strong>Email:</strong> sarah.miller@uni.edu</p>
          <p><strong>Gender:</strong> Female</p>
          <p><strong>Country:</strong> Utates</p>
          <p><strong>Phone:</strong> +1 (555) 234-5678</p>
        </div>

        <div className="quick-actions">
          <h4>Quick Actions</h4>
          <div className="action-buttons">
            <button className="deposit">Make a Deposit</button>
            <button className="transfer">Transfer Funds</button>
          </div>
          <div className="bottom-actions">
            <button className="edit">Edit Profile</button>
            <button className="logout">Log Out</button>
            <button className="delete">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
