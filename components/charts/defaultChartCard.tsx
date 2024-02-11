import { useState } from 'react';
import BarChart from './barChart';

interface Props {
    graphData: {
        chartType: string;
        selectValue: string;
        selectLabel: string;
        chartTitle: string;
        data: {
            labels: string[];
            datasets: {
                label: string;
                data: number[];
                backgroundColor: string[];
                borderColor: string;
                borderWidth: number;
            }[];
        };
    }[];
}

const DefaultChartCard = (props: Props) => {
    const [graph, setGraph] = useState(props.graphData[0].selectValue);

    const chart = () => {
        const chartDetails = props.graphData.find((item) => item.selectValue == graph);
        if (chartDetails?.chartType == 'bar') {
            return <BarChart data={chartDetails.data} chartTitle={chartDetails.chartTitle} />;
        } else {
            return null;
        }
    };

    return (
        <div className="w-full max-w-xl bg-secondary rounded-md shadow-md flex flex-col">
            <select className="mt-1 mx-auto bg-secAlt p-1 rounded-md" onChange={(e) => setGraph(e.target.value)}>
                {props.graphData.map((item) => (
                    <option key={'chart_item_' + item.selectValue} value={item.selectValue}>
                        {item.selectLabel}
                    </option>
                ))}
            </select>
            {chart()}
        </div>
    );
};

export default DefaultChartCard;
