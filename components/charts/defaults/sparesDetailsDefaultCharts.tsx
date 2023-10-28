import DefaultChartCard from "../defaultChartCard";
import { generateColour } from "../generateColour";

interface Props {
    sparesDetailsName: string | undefined;
    used6M: { month: string; value: number }[];
}


const SparesDetailsDefaultCharts = (props: Props) => {
    const graphData = [
        {
            chartType: 'bar',
            selectValue: 'used',
            selectLabel: 'Used in the Last 6 Months',
            chartTitle: `Times ${props.sparesDetailsName} used in last 6 Months`,
            data: {
                labels: props.used6M.map((data) => data.month),
                datasets: [
                    {
                        label: 'number used',
                        data: props.used6M.map((data) => data.value),
                        backgroundColor: props.used6M.map((d, index) => generateColour(index)),
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
    ];
    return (
        <div className="mt-2 xl:ml-4 w-full pl-0 xl:pl-4">
            <DefaultChartCard graphData={graphData} />
        </div>
    );
};

export default SparesDetailsDefaultCharts;
