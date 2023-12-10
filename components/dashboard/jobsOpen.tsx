import DashChartComponent from './dashChartComponent';

const JobsOpen = () => {
    const jobsOpen = 18;
    const avgData = { value: 12, flipped: false };

    const mainData = [
        { label: 'Open & not Due', value: 10 },
        { label: 'Open & Overdue', value: 8 },
    ];
    const text = {
        title: 'Jobs Open',
        labels: 'Count',
        totalString: jobsOpen.toString(),
        removeMonthSoFar: true,
    };

    return <DashChartComponent avgData={avgData} mainData={mainData} text={text} />;
};

export default JobsOpen;
