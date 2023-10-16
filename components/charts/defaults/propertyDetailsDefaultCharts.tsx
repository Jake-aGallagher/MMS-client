import DefaultChartCard from "../defaultChartCard";
import { generateColour } from "../generateColour";

interface Props {
    propertyDetailsName: string | undefined;
    incompleteJobs: IncompleteJobs[];
    raised5Months: { month: string; value: number }[];
}

interface IncompleteJobs {
    type: string;
    count: number;
}

const PropertyDetailsDefaultCharts = (props: Props) => {
    const graphData = [
        {
            chartType: 'bar',
            selectValue: 'incomplete',
            selectLabel: 'Incomplete & Overdue',
            chartTitle: `Incomplete & Overdue Jobs for ${props.propertyDetailsName}`,
            data: {
                labels: props.incompleteJobs.map((data) => data.type),
                datasets: [
                    {
                        label: 'Count',
                        data: props.incompleteJobs.map((data) => data.count),
                        backgroundColor: ['#fcd34d', '#ef4444'],
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
        {
            chartType: 'bar',
            selectValue: 'raised',
            selectLabel: 'Raised in the Last 5 Months',
            chartTitle: `Jobs raised in last 5 Months for ${props.propertyDetailsName}`,
            data: {
                labels: props.raised5Months.map((data) => data.month),
                datasets: [
                    {
                        label: 'Raised Jobs Count',
                        data: props.raised5Months.map((data) => data.value),
                        backgroundColor: props.raised5Months.map((d, index) => generateColour(index)),
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

export default PropertyDetailsDefaultCharts;
