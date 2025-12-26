import { useState,useEffect } from "react";
import "../../components CSS/learn/EmergencyFund.css";
// Abhi isme changes karne hai , but samajh ni aaraha ki kaise karu , toh leave kardiya hai mid m hi

function EmergencyFund(){

    let initialData = {
        months_of_coverage : "",
        recommended_target : "",
        saved_so_far : ""
    }

    let [formData , setFormData] = useState(initialData);
    let [progress , setProgress] = useState(0);
    let [valueGreater, setValueGreater] = useState(false);


    // To show the progress bar
    useEffect(()=>{
        if(Number(formData.saved_so_far) > Number(formData.recommended_target)) {
            setValueGreater(true);
            return;
        } else 
            setValueGreater(false);

        let percentage = (Number(formData.saved_so_far) / Number(formData.recommended_target))*100;
        setProgress(percentage);
    }, [formData]);


    // To handle changes in input field
    function handleInputChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setFormData((prevformData) => {
            return { ...prevformData, [fieldName]: fieldValue }
        });
    }

    // To add amounts 
    function addAmountButton(amount){
        if(Number(formData.saved_so_far) >= Number(formData.recommended_target)) return;
        setFormData((prevformData)=>{
            return {...prevformData , saved_so_far : Number(prevformData.saved_so_far) + Number(amount)}
        });
    }

    // To reset the input data
    function handleReset(){
        console.log("reset")
        setFormData(initialData);
        setProgress(0);
    }

    return(
        <form>

            <div className="emergencyFund" >

                <div className="Emergency-box1">
                <h3>Emergency Fund Builder</h3>

                </div>


                <div className="Emergency-box2">

                <label htmlFor="months_of_coverage">Months of coverage</label>
                <input 
                    type="text" 
                    id="months_of_coverage"
                    placeholder="eg: 3"
                    name="months_of_coverage"
                    value={formData.months_of_coverage}
                    onChange={handleInputChange}
                />

                <br /><br />
                <label htmlFor="recommended_target">Recommended Target (₹)</label>
                <input 
                    type="text" 
                    id="recommended_target"
                    placeholder="eg: ₹48000"
                    name="recommended_target"
                    value={formData.recommended_target}
                    onChange={handleInputChange}
                />

                <br /><br />
                <label htmlFor="saved_so_far">Saved so far (₹)</label>
                <input 
                    type="text" 
                    id="saved_so_far"
                    placeholder="eg: ₹4000"
                    name="saved_so_far"
                    value={formData.saved_so_far}
                    onChange={handleInputChange}
                />

                {valueGreater && <p style={{color:"red"}}>Cannot be more than recommended target</p>}
                <br /><br />
                </div>


                <div className="Emergency-box3">
                <button type="button" onClick={()=>addAmountButton("500")}>Add ₹500 </button>
                <button type="button" onClick={()=>addAmountButton("1000")}>Add ₹1000 </button>
                <button type="button" onClick={handleReset}>Reset </button>
                <br /><br />
                    
                </div>
                <div className="Emergency-box4">

                <input 
                    type="range" 
                    id="progress"
                    value={progress}
                    min="0"
                    max="100"
                    readOnly
                />
                <br />
                <label htmlFor="progress">Progress : {Math.round(progress ? progress : 0)}%</label>
                </div>




            </div>
        </form>
    )
}

export default EmergencyFund;

