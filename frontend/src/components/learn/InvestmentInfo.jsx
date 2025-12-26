function InvestmentInfo() {
    return(
                    <div className="investment-tracker-container">
                
                <div className="tracker-header">
                    <span className="icon">📈</span>
                    <h1>Investment Growth Tracker</h1>
                </div>

                <div className="tracker-body">
                    <p className="intro-text">
                        Understand how compounding and SIPs can grow your wealth over time.
                    </p>
                    
                    {/* Using simple p tags for list items */}
                    <p className="list-item">
                        Investing helps your money grow faster than saving alone.
                    </p>
                    <p className="list-item">
                        SIPs (Systematic Investment Plans) let you invest a fixed amount monthly.
                    </p>
                    <p className="list-item">
                        Compounding means your returns earn further returns — growth snowballs over time.
                    </p>
                    <p className="list-item">
                        Diversify your investments: FDs (safe), Mutual Funds (moderate risk), Stocks (high risk).
                    </p>

                    {/* Example Box */}
                    <div className="example-box">
                        <p className="example-text">
                            Example: If you invest ₹1000/month for 5 years at 12%, you'll have 
                            about ₹82,400 (₹22,400 gain).
                        </p>
                    </div>

                    {/* Tip Box */}
                    <div className="tip-box">
                        <span className="tip-icon">💡</span>
                        <p className="tip-text">
                            Tip: Start early — a 5-year delay could cost you lakhs due to lost compounding time.
                        </p>
                    </div>



                    {/* Button */}
                    <button className="cta-button">
                        button-click me
                    </button>
                </div>
            </div>

    )
}

export default InvestmentInfo