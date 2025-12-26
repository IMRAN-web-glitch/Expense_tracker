import "../../components CSS/learn/InterestCalculator.css";

import {useState} from 'react'

function InterestCalculator(){

    const [result, setResult] = useState(0);
    const [amount, setAmount] = useState(0);

    const [formData, setFormData] = useState({
        principle: 0,
        timePeriod: 0,
        rate: 0,
        interestType: "",

    });

    const handleInputChange = (e) => {
        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        setFormData((prevData) => {
            return {...prevData, [fieldName]: fieldValue}
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        

        if(formData.interestType === 'simpleInterest'){
            setResult((+formData.principle * +formData.rate * +formData.timePeriod)/100);
            setAmount(result+(+formData.principle))
        }

        if(formData.interestType === 'compoundInterest'){
            e.preventDefault();
            setAmount(+formData.principle * Math.pow(1 + (+formData.rate) / 100, +formData.timePeriod));        }
    
        }

    return(
        <div className="interestCalculator">
            <h1>Interest Calculator </h1>
            <div className="Interest-body">
            <form onSubmit={handleFormSubmit}>
            <div className="Interest-main">

            
                <div className="principle-div">
                    <label htmlFor="principle">Principle</label>
                    <input
                        required
                        type="number"
                        step="50"
                        name="principle"
                        value={formData.principle}
                        onChange={handleInputChange}
                        />

                </div>

                <div className='rate-div'>
                    <label htmlFor='timePeriod'>Time Period</label>
                    <input
                        required
                        type="number"
                        name='timePeriod'
                        value={formData.timePeriod}
                        onChange={handleInputChange}
                        />
                </div>

                <div className='interest-div'>
                    <label htmlFor='rate'>Rate of Interest</label>
                    <input
                        required
                        type='number'
                        name='rate'
                        value={formData.rate}
                        onChange={handleInputChange}
                    />
                </div>
             </div>
                <div className='interestType-div'>
                    <label htmlFor='interestType'>Type of Interest</label>
                        <select
                        required
                        name="interestType"
                        id="interestType"
                        onChange={handleInputChange}
                        value={formData.interestType}
                        >
                            <option value="placeholder">Select Interest</option>
                            <option value="simpleInterest">Simple Interest</option>
                            <option value="compoundInterest">Compund Interest</option>
                        </select>
                    
                

                <input type="submit" value="Calculate" id="calculate" />
                </div>
                
            </form>
        </div>
           <div className="result-info">
            Total Amount : {Math.round(amount*100)/100}
           </div>
        </div>
    )
}

export default InterestCalculator;