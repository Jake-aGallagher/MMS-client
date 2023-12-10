import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BarChart from '../charts/barChart';

interface Props {
    avgData?: { value: number; flipped: boolean };
    mainData: { label: string; value: number }[];
    text: {
        title: string;
        mainUnit?: string;
        labels: string;
        yAxisLabel?: string;
        totalString?: string;
        afterTotalString?: string;
        removeMonthSoFar?: boolean;
    };
}

const DashChartComponent = (props: Props) => {
    const graphData = {
        labels: props.mainData.map((data) => data.label),
        datasets: [
            {
                label: props.text.labels,
                data: props.mainData.map((data) => data.value),
                backgroundColor: ['#007cff'],
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="w-full h-full bg-secondary rounded-lg p-2 flex flex-col">
            <h1 className="text-lg">{props.text.title}</h1>
            {props.text.totalString ? (
                <div className="text-xl">
                    {props.text.mainUnit}
                    <p className="text-3xl inline-block">{props.text.totalString}</p>
                    {props.text.afterTotalString} {!props.text.removeMonthSoFar ? '(Month so far)' : null}
                </div>
            ) : null}
            {props.avgData ? (
                <div className="text-lg">
                    {props.avgData.value > 0 ? (
                        <p className={`${props.avgData.flipped ? 'text-green' : 'text-red'} inline-block`}>
                            <FontAwesomeIcon icon={faArrowUp} className="mr-1 w-3 inline-block pb-1 " />
                            {props.avgData.value}% <p className="inline-block">above average</p>
                        </p>
                    ) : (
                        <p className={`${props.avgData.flipped ? 'text-red' : 'text-green'} inline-block`}>
                            <FontAwesomeIcon icon={faArrowDown} className="mr-1 w-3 inline-block pb-1 " />
                            {Math.abs(props.avgData.value)}% <p className="inline-block">below average</p>
                        </p>
                    )}
                </div>
            ) : null}

            <div className="w-full h-full flex flex-col justify-center">
                <BarChart data={graphData} dashboard={true} yAxisTitle={props.text.yAxisLabel} />
            </div>
        </div>
    );
};

export default DashChartComponent;
