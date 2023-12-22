import Loading from '../loading/loading';
import DashChartComponent from './dashChartComponent';

interface Props {
    data: {
        mainData: { label: string; value: number }[];
    };
    loading: boolean;
    error: boolean;
}

const BreakdownVsPlanned = (props: Props) => {
    const text = {
        title: 'Open Breakdowns vs Planned',
        labels: 'Count',
        removeMonthSoFar: true,
    };

    return (
        <>
            {props.loading ? (
                <div className="w-full h-full bg-secondary rounded-md relative">
                    <Loading />
                </div>
            ) : (
                <DashChartComponent mainData={props.data.mainData} text={text} />
            )}
        </>
    );
};

export default BreakdownVsPlanned;
