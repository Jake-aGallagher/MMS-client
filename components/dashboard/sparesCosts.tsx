import DashChartComponent from './dashChartComponent';
import { formatNumeric } from './formatNumeric';

const SparesCosts = () => {
    const costsThisMonth = 5250;
    const avgData = { value: -20, flipped: false };

    const mainData = [
        { label: 'June', value: 6000 },
        { label: 'July', value: 4800 },
        { label: 'August', value: 4700 },
        { label: 'September', value: 5300 },
        { label: 'October', value: 5600 },
        { label: 'November', value: 6200 },
    ];
    const text = {
        title: 'Spares Costs',
        mainUnit: '£',
        labels: 'Spares Costs (£)',
        totalString: '',
        afterTotalString: '',
    };

    const { numText, afterText } = formatNumeric(costsThisMonth);
    text.totalString = numText;
    text.afterTotalString = afterText;

    return <DashChartComponent avgData={avgData} mainData={mainData} text={text} />;
};

export default SparesCosts;
