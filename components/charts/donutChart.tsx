import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BaseDonutProps {
    data: ChartData<'doughnut'>;
}

interface DonutPropsOptions extends BaseDonutProps {
    options: ChartOptions<'doughnut'>;
}

interface DonutPropsTitle extends BaseDonutProps {
    chartTitle: string;
}

// Default Options
/* options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: props.chartTitle,
        },
    },
}; */

const DonutChart = (props: DonutPropsOptions | DonutPropsTitle) => {
    let options;
    if ('options' in props) {
        options = props.options;
    } else if ('chartTitle' in props) {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: props.chartTitle,
                },
            },
        };
    }

    return (
        <div className='max-w-xl w-full bg-secondary rounded-md p-2 shadow-md mt-2'>
            <Doughnut data={props.data} options={options} />
        </div>
    );
};

export default DonutChart;