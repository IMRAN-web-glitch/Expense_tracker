import { useState } from "react";

function Investment(){
    
    let initialData = {
        monthly_investment : "",
        years : "",
        expected_annual_return : "",
    }
    
    const [plan,setPlan] = useState("");
    let [formData , setFormData] = useState(initialData);
    const [resultDisplay, setResultDisplay] = useState('');
    // To handle changes in input field
    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }


    // To submit the formData
    function handleButtonCalculate(e){
        let finalResult = 0;
        e.preventDefault();

        let p = +formData.monthly_investment;
        let r = +formData.expected_annual_return / 100; 
        let t = +formData.years;
        let n = 12;

        if(plan === "fd"){
            finalResult = p * ((1 + (r / 4)) ** (t * 4))
            setResultDisplay(finalResult.toFixed(2))
        }

        else if(plan === "ppf"){
            finalResult = (p*(((1+r/n)** (n*t)-1)/(r/n)));
            setResultDisplay(finalResult.toFixed(2))
        }
        else if(plan === "mf"){
            finalResult =   p * (((1 + r / n) ** (n * t) - 1) / (r / n)) * (1 + r / n);
            setResultDisplay(finalResult.toFixed(2));
        }
        else
            return;
        

    }

    const handlePlanChange = (e) =>{
        let newVal = e.target.value
        setPlan(newVal);
        console.log(newVal);

    }

    // To reset the formData
    function handleResetButton(){
        setFormData(initialData);

    }
    
    return(
        <form>
            <div className="investment " >
                <div className="investment-box1 ">
                <h3>Investment Growth (SIP Simulator)</h3>           
                </div>

                <div className="investment-box3 invest-input">
                    <label htmlFor="monthly_investment">Monthly Invest (₹)</label>
                <input 
                    type="text" 
                    id="monthly_investment"
                    placeholder="eg: 10000"
                    name="monthly_investment"
                    value={formData.monthly_investment}
                    onChange={handleInputChange}
                    className=""
                />
                <br />

                </div>
                <div className="investment-box4 invest-input">
                    
                <label htmlFor="years">Years</label>
                <input 
                    type="text" 
                    id="years"
                    placeholder="eg: 3"
                    name="years"
                    value={formData.years}
                    onChange={handleInputChange}
                />

                <br />

                <label htmlFor="expected_annual_return">Expected Annual Rate (%)</label>
                <input 
                    type="text" 
                    id="expected_annual_return"
                    placeholder="eg: 8%"
                    name="expected_annual_return"
                    value={formData.expected_annual_return}
                    onChange={handleInputChange}
                />
                </div>
                <div className="investment-box5 invest-input">
                    
                <label htmlFor="plan">Select Plan</label>
                <select
                    name="plan"
                    id="plan"
                    onChange={handlePlanChange}>
                        <option id="plan" name="placeholder">Select Plan</option>
                        <option id="plan" name="fd" value="fd">Fixed Deposit</option>
                        <option id="plan" name="ppf" value="ppf">Public Provident Fund</option>
                        <option id="plan" name="mf" value="mf">Mutual Fund</option>

                    </select>

                    <div className="resultDisplay">Resulting Amount: {resultDisplay}</div>

                <br />
                
                </div>                

                <div className="investment-box5 ">

                <button type="button" onClick={handleButtonCalculate}>Calculate</button>
                <button type="button" onClick={handleResetButton}>Reset</button>
                    
                </div>



            </div>
        </form>

    

    )
}

export default Investment;

