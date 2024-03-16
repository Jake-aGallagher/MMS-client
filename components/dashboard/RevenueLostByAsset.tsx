import Loading from '../loading/loading';
import DashChartComponent from './dashChartComponent';

interface Props {
    data: {
        mainData: { label: string; value: number }[];
    };
    loading: boolean;
    error: boolean;
}

const RevenueLostByAsset = (props: Props) => {
    const text = {
        title: 'Lost Revenue by Asset (6 Months)',
        mainUnit: '£',
        labels: 'Lost Revenue (£)',
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

export default RevenueLostByAsset;
