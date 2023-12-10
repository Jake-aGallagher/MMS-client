import DashChartComponent from './dashChartComponent';

const IncidentsOfNoSpares = () => {
    const incidents = 3;
    const avgData = { value: -33, flipped: false };

    const mainData = [
        { label: 'June', value: 5 },
        { label: 'July', value: 4 },
        { label: 'August', value: 5 },
        { label: 'September', value: 3 },
        { label: 'October', value: 6 },
        { label: 'November', value: 4 },
    ];
    const text = {
        title: 'Incidents of no Spares being available',
        labels: 'Count',
        totalString: incidents.toString(),
    };

    return <DashChartComponent avgData={avgData} mainData={mainData} text={text} />;
};

export default IncidentsOfNoSpares;
