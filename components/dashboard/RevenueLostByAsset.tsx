import DashChartComponent from './dashChartComponent';

const RevenueLostByAsset = () => {
    const mainData = [
        { label: 'Corrugator', value: 80000 },
        { label: 'LMC 3', value: 69000 },
        { label: 'LMC 1', value: 60000 },
        { label: 'LMC 2', value: 48000 },
        { label: 'Palletisers', value: 45000 },
        { label: 'Other', value: 82000 },
    ];
    const text = {
        title: 'Lost Revenue by Asset',
        mainUnit: '£',
        labels: 'Lost Revenue (£)',
    };

    return <DashChartComponent mainData={mainData} text={text} />;
};

export default RevenueLostByAsset;
