import {useState} from 'react'
import "../../components CSS/walletSim/walletSim.css";
import History from "./History";
import VirtualWallet from "./VirtualWallet";

function WalletSim() {

    const [rows, setRows] = useState([]);
    const whenAddData = (newRow) => {
        setRows((prevRows) => {
            return [...prevRows, newRow]
        })
    }
    const resetData = () => {
        setRows([]);
    }
    return (
        <div>
            {/* <VirtualWallet addData = {whenAddData} resetData={resetData}/> */}
            <History data={rows}/>

        </div>
    );
}

export default WalletSim;