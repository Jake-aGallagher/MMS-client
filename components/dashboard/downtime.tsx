import DashChartComponent from './dashChartComponent';

const Downtime = () => {
    const downtime = '186 h 45 m';
    const avgData = { value: 3, flipped: false };

    const mainData = [
        { label: 'June', value: 6000 },
        { label: 'July', value: 4800 },
        { label: 'August', value: 4700 },
        { label: 'September', value: 5300 },
        { label: 'October', value: 5600 },
        { label: 'November', value: 6200 },
    ];
    const text = {
        title: 'Downtime',
        labels: 'Downtime (mins)',
        yAxisLabel: 'minutes',
        totalString: downtime,
    };
    return <DashChartComponent avgData={avgData} mainData={mainData} text={text} />;
};

export default Downtime;
