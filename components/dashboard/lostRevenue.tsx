import { useEffect, useState } from 'react';
import DashChartComponent from './dashChartComponent';
import { formatNumeric } from './formatNumeric';
import Loading from '../loading/loading';

const LostRevenue = () => {
    const lostRevenue = 58682;
    const avgData = { value: -4, flipped: false };

    const [loading, setLoading] = useState(true);

    setTimeout(() => setLoading(false), 2000);

    const mainData = [
        { label: 'June', value: 70000 },
        { label: 'July', value: 48000 },
        { label: 'August', value: 27000 },
        { label: 'September', value: 63000 },
        { label: 'October', value: 86000 },
        { label: 'November', value: 82000 },
    ];
    const text = {
        title: 'Lost Revenue',
        mainUnit: '£',
        labels: 'Lost Revenue (£)',
        totalString: '',
        afterTotalString: '',
    };

    const { numText, afterText } = formatNumeric(lostRevenue);
    text.totalString = numText;
    text.afterTotalString = afterText;

    return (
        <>
            {loading ? (
                <div className="w-full h-full bg-secondary rounded-md relative">
                    <Loading />
                </div>
            ) : (
                <DashChartComponent avgData={avgData} mainData={mainData} text={text} />
            )}
        </>
    );
};

export default LostRevenue;
