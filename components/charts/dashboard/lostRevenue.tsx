import DashChartComponent from './dashChartComponent';
import Loading from '../../loading/loading';

interface Props {
    data: {
        thisMonth: number;
        avgData: { value: number; flipped: boolean };
        mainData: { label: string; value: number }[];
    };
    loading: boolean;
    error: boolean;
}

const LostRevenue = (props: Props) => {
    const text = {
        title: 'Lost Revenue',
        mainUnit: '£',
        labels: 'Lost Revenue (£)',
        totalString: props.data?.thisMonth.toString(),
        afterTotalString: '',
    };

    return (
        <>
            {props.loading ? (
                <div className="w-full h-full bg-secondary rounded-md relative">
                    <Loading />
                </div>
            ) : (
                <DashChartComponent avgData={props.data.avgData} mainData={props.data.mainData} text={text} />
            )}
        </>
    );
};

export default LostRevenue;
