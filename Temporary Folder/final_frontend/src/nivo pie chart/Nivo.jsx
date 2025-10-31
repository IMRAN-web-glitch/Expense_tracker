import { Pie } from '@nivo/pie'


function Nivo() {
    let data = [
        {
            "id": "food",
            "label":"food",
            "value": "20400",
            "color": "hsl(37, 70%, 50%)"
        },
        {
            "id": "utilities",
            "label":"utilities",
            "value": "100300",
            "color": "hsl(100, 70%, 50%)"
        },
        {
            "id": "Shoes",
            "label":"food",
            "value": "20400",
            "color": "hsl(73, 70%, 50%)"
        },
        {
            "id": "Entertainment",
            "label":"Entertainment",
            "value": "3000",
            "color": "hsl(293, 70%, 50%)"
        }
    ]


// (Expense_id, Amount,  Category, Date_of_expense, User_id, Note) 
//         (1, 20000, "food", "2023-10-01", 1, "Went on a dinner with family"),
//     (2, 20400, "other", "2023-10-02", 2, "Did some miscellaneous shopping"),
//         (3, 30020, "food", "2023-10-03", 3, ""),
//         (4, 100300, "utilies", "2023-10-04", 4, "Bought cooker for home"),
//         (5, 3000, "Entertainment", "2023-10-05", 5, "Went to watch movies with friends");


//         {
//             "id": "javascript",
//             "label": "javascript",
//             "value": 257,
//             "color": "hsl(173, 70%, 50%)"
//         },


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
        <div>
            <MyPie data={data} />
            Nivo Chart
        </div>
    );
}

export default Nivo;


