import { faArrowUp, faArrowDown, faUpRightAndDownLeftFromCenter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BarChart from '../charts/barChart';
import { useState } from 'react';

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
    const [expanded, setExpanded] = useState(false);

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
        <>
            {expanded ? (
                <>
                    <div className="absolute left-0 top-0 h-full w-full flex flex-col justify-center items-center z-30">
                        <div onClick={() => setExpanded(false)} className="absolute h-full w-full opacity-80 bg-black z-40"></div>
                        <div className="w-5/6 h-5/6 bg-secondary rounded-md flex flex-col justify-center z-50">
                            <div className='flex flex-row justify-center items-center relative pt-5'>
                                <h1 className="text-lg">{props.text.title}</h1>
                                <FontAwesomeIcon icon={faXmark} onClick={() => setExpanded(false)} className="absolute right-5 w-5 hover:text-accent hover:cursor-pointer transition-all" />
                            </div>
                            <BarChart data={graphData} dashboard={true} yAxisTitle={props.text.yAxisLabel} fullScreen={true} />
                        </div>
                    </div>
                </>
            ) : null}
            <div className="w-full h-full bg-secondary rounded-lg p-2 flex flex-col">
                <div className="flex flex-row">
                    <h1 className="text-lg">{props.text.title}</h1>
                    <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} onClick={() => setExpanded(true)} className="mx-auto mr-1 w-3 hover:text-accent hover:cursor-pointer transition-all" />
                </div>

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
        </>
    );
};

export default DashChartComponent;
