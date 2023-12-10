import DashChartComponent from './dashChartComponent';

const JobsCompleted = () => {
    const jobsCompleted = 43;
    const avgData = { value: 9, flipped: true };

    const mainData = [
        { label: 'June', value: 70 },
        { label: 'July', value: 48 },
        { label: 'August', value: 27 },
        { label: 'September', value: 63 },
        { label: 'October', value: 86 },
        { label: 'November', value: 82 },
    ];
    const text = {
        title: 'Jobs Completed',
        labels: 'Jobs Completed',
        totalString: jobsCompleted.toString(),
    };

    return <DashChartComponent avgData={avgData} mainData={mainData} text={text} />;
};

export default JobsCompleted;
