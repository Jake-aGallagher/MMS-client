import Loading from '../loading/loading';
import DashChartComponent from './dashChartComponent';

interface Props {
    data: {
        thisMonth: number;
        avgData: { value: number; flipped: boolean };
        mainData: { label: string; value: number }[];
    };
    loading: boolean;
    error: boolean;
}

const JobsCompleted = (props: Props) => {
    const text = {
        title: 'Maintenance Tasks Completed',
        labels: 'Maintenance Tasks Completed',
        totalString: props.data?.thisMonth.toString(),
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

export default JobsCompleted;
