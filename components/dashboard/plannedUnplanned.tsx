import DashChartComponent from './dashChartComponent';

const PlannedUnplanned = () => {
    const mainData = [
        { label: 'Planned', value: 13 },
        { label: 'Unplanned', value: 5 },
    ];
    const text = {
        title: 'Open Planned & Unplanned Jobs',
        labels: 'Count',
    };

    return <DashChartComponent mainData={mainData} text={text} />;
};

export default PlannedUnplanned;
