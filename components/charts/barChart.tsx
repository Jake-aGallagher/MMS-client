import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BaseBarProps {
    data: ChartData<'bar'>;
}

interface BarPropsOptions extends BaseBarProps {
    options: ChartOptions<'bar'>;
}

interface BarPropsTitle extends BaseBarProps {
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

const BarChart = (props: BarPropsOptions | BarPropsTitle) => {
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
        <div className='max-w-xl w-full bg-secondary rounded-xl p-2 shadow-xl mt-2'>
            <Bar data={props.data} options={options} />
        </div>
    );
};

export default BarChart;
