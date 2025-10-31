import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./Sidebar";
import Expenses from "./components/expenses/Expenses";
import Goals from "./components/goals/Goals";
import Learn from "./components/learn/Learn";
import WalletSim from "./components/walletSim/WalletSim";
import AuthPage from "./components/login/AuthPage";
import Profile from "./components/profile/Profile";

//Using react-router for sidebar
const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div className="container">
       <div className="page-content">
        <AuthPage/>
        </div>
      </div>
  },
  {
    path: "/dashboard",
    element:
      <div className="container">
        <Sidebar />
        <div className="page-content">
          <Dashboard />
        </div>
      </div>
  },
  {
    path: "/expenses",
    element:
      <div className="container">
        <Sidebar />
        <div className="page-content">
          <Expenses />
        </div>
      </div>
  }, 
  {
    path: "/goals",
    element:
      <div className="container">
        <Sidebar />
        <div className="page-content">
          <Goals />
        </div>
      </div>
  }, 
  {
    path: "/learn",
    element:
      <div className="container">
        <Sidebar />
        <div className="page-content">
          <Learn />
        </div>
      </div>
  },  
  {
    path: "/wallet-sim",
    element:
      <div className="container">
        <Sidebar />
        <div className="page-content">
          <WalletSim />
        </div>
      </div>
  },  
  {
    path: "/profile",
    element:
      <div className="container">
        <Sidebar />
      <div className="page-content">
        <Profile/>
      </div>
      </div>
  },
  {
    path: "*",
    element:
      <div className="container">
        <Sidebar />
        <div className="page-content">
          Page doesn't exist
        </div>
      </div>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

    </>

  );
}

export default App;
