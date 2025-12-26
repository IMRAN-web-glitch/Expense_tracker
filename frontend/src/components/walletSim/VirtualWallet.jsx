import "../../components CSS/walletSim/virtualWallet.css";
import {useState} from 'react'


function VirtualWallet({addData,resetData}) {
    
    let   [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");   
    const [spendType,setSpendType] = useState(""); 
    let date;

    const handleDate = () => {
        date = new Date
        date = date.toDateString();
        
    }

    const updateBalance = (spendType, amount) => {
        if(spendType === "Earn" || spendType === "Save"){
            setBalance((prevBalance) => {
                return(prevBalance+amount)
            })
        }
        else if(spendType === "Spend"){
            try{
                if(+(balance-amount) > 0){
                    setBalance((prevBalance) => {
                        return(prevBalance-amount)})
                }
                else{
                    throw new Error("Insufficient Balance!");
                }
            } catch(error){
                alert(error)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        if(!amount){
            return;
        }
        handleDate();



        addData({date,spendType,amount,note}); 
        updateBalance(spendType, amount);
        //restore to previous 

        setAmount(0);
        setNote("");
        spendType = "";
        date = "";
        
    } 

    return (
        <div className="virtualWallet">
            <div className="sub-sec">
                <h1>Virtual Wallet</h1>
                <button className="reset"
                onClick={
                    () => resetData()
                }>Reset</button>
            </div>
            <h2>Balance: {balance}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="walletAmount" placeholder="Amount" 
                value={amount} 
                className="amount-box"
                onChange = {(e) => 
                setAmount(+(e.target.value))}
                />
                <input type="text" name="walletNote" placeholder="Note (optional)"
                value = {note}
                onChange = {(e) =>
                    setNote(e.target.value)
                }
                />
                <div className="form-buttons">
                    <input type="submit" name="earn"
                    className="earn" 
                    value="Earn" 
                    onClick = {(e) =>
                        setSpendType(e.target.value)}
                    />

                    <input type="submit" name="spend" 
                    className="spend" 

                    value="Spend" 
                    onClick = {(e) =>
                        setSpendType(e.target.value)}
                    />

                    <input type="submit" name="save" 
                    className="save" 

                    value="Save"
                    onClick = {(e) =>
                        setSpendType(e.target.value)}
                    />

                </div>
            </form>

        </div>
    );
}

export default VirtualWallet;