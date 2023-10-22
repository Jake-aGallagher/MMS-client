import DefaultChartCard from '../defaultChartCard';
import { generateColour } from '../generateColour';

interface Props {
    assetDetailsName: string | undefined;
    jobsOfComponents6M: { name: string; value: number }[];
    incompleteForAsset: IncompleteForAsset[];
}

interface IncompleteForAsset {
    type: string;
    count: number;
}

const AssetDetailsDefaultCharts = (props: Props) => {
    const graphData = [
        {
            chartType: 'bar',
            selectValue: 'incomplete',
            selectLabel: 'Incomplete & Overdue',
            chartTitle: `Incomplete & Overdue Jobs for ${props.assetDetailsName}`,
            data: {
                labels: props.incompleteForAsset.map((data) => data.type),
                datasets: [
                    {
                        label: 'Count',
                        data: props.incompleteForAsset.map((data) => data.count),
                        backgroundColor: ['#fcd34d', '#ef4444'],
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
        {
            chartType: 'bar',
            selectValue: 'common_jobs_assets',
            selectLabel: 'Jobs by components',
            chartTitle: `Components of ${props.assetDetailsName} with the most jobs in the last 6 months`,
            data: {
                labels: props.jobsOfComponents6M.map((data) => data.name),
                datasets: [
                    {
                        label: 'Count',
                        data: props.jobsOfComponents6M.map((data) => data.value),
                        backgroundColor: props.jobsOfComponents6M.map((d, index) => generateColour(index)),
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

export default AssetDetailsDefaultCharts;
