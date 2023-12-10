import DashChartComponent from './dashChartComponent';

const JobsRaised = () => {
    const jobsRaised = 40;
    const avgData = { value: 14, flipped: false };

    const mainData = [
        { label: 'June', value: 70 },
        { label: 'July', value: 48 },
        { label: 'August', value: 27 },
        { label: 'September', value: 63 },
        { label: 'October', value: 86 },
        { label: 'November', value: 82 },
    ];
    const text = {
        title: 'Jobs Raised',
        labels: 'Jobs Raised',
        totalString: jobsRaised.toString(),
    };

    return <DashChartComponent avgData={avgData} mainData={mainData} text={text} />;
};

export default JobsRaised;
