import { useState } from "react";

function LoanRepayment(){

    let initialData = {
        loan_amount : "",
        annual_interest : "",
        tenure : ""
    }

    let [formData , setFormData] = useState(initialData);


    // To handle changes in input field
    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }

    // To reset the input data
    function handleReset(){
        setFormData(initialData);
    }

    function handleCalclateEMI(){

    }

    return(
        <form>

            <div className="loan_repayment" >
                <h3>Loan Repayment Simulator</h3>

                <label htmlFor="loan_amount">Loan Amount (₹)</label>
                <input 
                    type="text" 
                    id="loan_amount"
                    placeholder="eg: 50000"
                    name="loan_amount"
                    value={formData.loan_amount}
                    onChange={handleInputChange}
                />

                <br /><br />

                <label htmlFor="annual_interest">Annual Interest (%)</label>
                <input 
                    type="text" 
                    id="annual_interest"
                    placeholder="eg: 9"
                    name="annual_interest"
                    value={formData.annual_interest}
                    onChange={handleInputChange}
                />

                <br /><br />

                <label htmlFor="tenure">Saved so far (₹)</label>
                <input 
                    type="text" 
                    id="tenure"
                    placeholder="eg: 24"
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleInputChange}
                />

                <br /><br />
                
                <button type="button" onClick={handleCalclateEMI}>Calculate EMI </button>
                <button type="button" onClick={handleReset}>Reset </button>


            </div>
        </form>
    )
}

export default LoanRepayment;

