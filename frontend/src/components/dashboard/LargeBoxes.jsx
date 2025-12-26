import "../../components CSS/dashboard/largeBoxes.css";
import { useEffect, useState } from "react";
import { Pie } from '@nivo/pie';

function LargeBoxes({ info }) {
    const [data, setData] = useState([]);

    async function fetchdata() {
        let userID = localStorage.getItem("User_id")
        
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}user/${userID}/pieChart`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`
                },
            })

            let datafetched = await response.json()
            console.log(datafetched)

            setData(datafetched)
            console.log(data)

        } catch (error) {
            console.log("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])


    const MyPie = ({ data }) => {
        return <Pie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            width={400}
            height={400}
            innerRadius={0.5}
            padAngle={0.6}
            cornerRadius={2}
            activeOuterRadiusOffset={8}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    symbolShape: 'circle'
                }
            ]}
        />
    }

    return (
        <div className="largeBoxes">
            {info}
            <br />
            <MyPie data={data} />

        </div>
    );
}

export default LargeBoxes;
