import DefaultChartCard from "../defaultChartCard";
import { generateColour } from "../generateColour";

interface Props {
    propertyDetailsName: string | undefined;
    incompleteJobs: IncompleteJobs[];
    raised6M: { month: string; value: number }[];
    sparesUsed6M: { month: string; value: number }[];
    mostUsed6M: { name: string; quantity: number }[];
    sparesCost6M: { month: string; value: number }[];
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
            selectLabel: 'Raised in the Last 6 Months',
            chartTitle: `Jobs raised in last 6 Months for ${props.propertyDetailsName}`,
            data: {
                labels: props.raised6M.map((data) => data.month),
                datasets: [
                    {
                        label: 'Raised Jobs',
                        data: props.raised6M.map((data) => data.value),
                        backgroundColor: props.raised6M.map((d, index) => generateColour(index)),
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
        {
            chartType: 'bar',
            selectValue: 'spares_used',
            selectLabel: 'Spares used in the last 6 Months',
            chartTitle: `Spares used in the last 6 Months for ${props.propertyDetailsName}`,
            data: {
                labels: props.sparesUsed6M.map((data) => data.month),
                datasets: [
                    {
                        label: 'Spares Used',
                        data: props.sparesUsed6M.map((data) => data.value),
                        backgroundColor: props.sparesUsed6M.map((d, index) => generateColour(index)),
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
        {
            chartType: 'bar',
            selectValue: 'most_used',
            selectLabel: 'Most used Spares in the last 6 Months',
            chartTitle: `Most used Spares in the last 6 Months for ${props.propertyDetailsName}`,
            data: {
                labels: props.mostUsed6M.map((data) => data.name),
                datasets: [
                    {
                        label: 'Spares Used',
                        data: props.mostUsed6M.map((data) => data.quantity),
                        backgroundColor: props.mostUsed6M.map((d, index) => generateColour(index)),
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
        {
            chartType: 'bar',
            selectValue: 'spares_cost',
            selectLabel: 'Spares costs for the last 6 Months',
            chartTitle: `Cost of spares used in the last 6 Months for ${props.propertyDetailsName} (£)`,
            data: {
                labels: props.sparesCost6M.map((data) => data.month),
                datasets: [
                    {
                        label: 'Cost (£)',
                        data: props.sparesCost6M.map((data) => data.value),
                        backgroundColor: props.sparesCost6M.map((d, index) => generateColour(index)),
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
