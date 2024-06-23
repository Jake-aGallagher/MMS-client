import Loading from '../../loading/loading';
import DashChartComponent from './dashChartComponent';

interface Props {
    data: {
        thisMonth: number;
        mainData: { label: string; value: number }[];
    };
    loading: boolean;
    error: boolean;
}

const JobsOpen = (props: Props) => {
    const text = {
        title: 'Open Mainentance Tasks',
        labels: 'Count',
        totalString: props.data?.thisMonth.toString(),
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

export default JobsOpen;
