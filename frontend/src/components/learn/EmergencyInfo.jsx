function EmergencyInfo(){
    return(
                <div className="emergency-fund-container">
                <div className="fund-header">
                    <span className="fund-icon">💰</span>
                    <h1>Emergency Fund Builder</h1>
                </div>

                <div className="fund-body">
                    <p className="intro-text">
                        Be ready for unexpected expenses by creating a safety net for yourself.
                    </p>
                    
                    <p className="info-text">
                        An emergency fund covers 3–6 months of essential expenses like rent, food, and bills.
                    </p>
                    <p className="info-text">
                        It prevents you from taking loans or using credit cards during emergencies.
                    </p>
                    <p className="info-text">
                        Start small: Save even ₹500–₹1000 monthly — consistency matters more than size.
                    </p>
                    <p className="info-text">
                        Ideal place to keep it: savings account or short-term FD for easy access.
                    </p>

                    {/* Example Box */}
                    <div className="example-box-emergency">
                        <p className="example-text-emergency">
                            Example: If your monthly expense = ₹12,000, target <br/>
                            ₹36,000–₹72,000 as your emergency fund.
                        </p>
                    </div>

                    {/* Tip Box */}
                    <div className="tip-box-emergency">
                        <span className="tip-icon-emergency">💡</span>
                        <p className="tip-text-emergency">
                            Tip: Automate your savings by setting up a monthly transfer to a dedicated emergency account.
                        </p>
                    </div>


                    {/* Button */}
                    <button className="cta-button-emergency">
                        Open Emergency Fund Simulator
                    </button>
                </div>
            </div>
    

    )
}

export default EmergencyInfo