import "../../components CSS/walletSim/history.css";

function History({data,resetData}) {

    return (
        <div className="history">
            <h1>History</h1>
            <table>
                <thead>
                <tr>
                    <th className="heading">Date</th>
                    <th className="heading">Type</th>
                    <th className="heading">Amount</th>
                    <th className="heading">Note</th>
                </tr>
                </thead>
                <tbody>
                    {
                        (data.length === 0) ? (
                            <tr>
                            <td colSpan='4'>No data yet</td> 
                            </tr> )
                        :
                        (
                            data.map((value,index) => {
                                return(
                                <tr key={index}> 
                                    <td>{value.date}</td> 
                                    <td>{value.spendType}</td>
                                    <td>{value.amount}</td>
                                    <td>{value.note}</td>
                                </tr>

                                )
                            })
                        )
                                                    
                    }            
                    
                </tbody>
            </table>

        </div>
    );
}

export default History;