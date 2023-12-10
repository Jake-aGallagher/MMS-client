import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BaseBarProps {
    data: ChartData<'bar'>;
    yAxisTitle?: string;
    fullScreen?: boolean;
}

interface BarPropsOptions extends BaseBarProps {
    options: ChartOptions<'bar'>;
}

interface BarPropsDash extends BaseBarProps {
    dashboard: boolean;
}

interface BarPropsTitle extends BaseBarProps {
    chartTitle: string;
}

const BarChart = (props: BarPropsOptions | BarPropsDash | BarPropsTitle) => {
    let options;
    if ('options' in props) {
        options = props.options;
    } else if ('dashboard' in props) {
        options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    title: {
                        display: props.yAxisTitle ? true : false,
                        text: props.yAxisTitle,
                    },
                },
            },
        };
    } else if ('chartTitle' in props) {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: props.chartTitle,
                },
            },
        };
    }

    return (
        <>
            {props.fullScreen ? (
                <div className='h-full w-full p-10 rounded-md flex flex-col justify-center items-center'>
                    <Bar data={props.data} options={options} />
                </div>
            ) : (
                <div className={`${'dashboard' in props ? 'flex flex-row justify-center items-center' : 'max-w-xl mt-2 w-full bg-secondary rounded-xl p-2'}`}>
                    <Bar data={props.data} options={options} />
                </div>
            )}
        </>
    );
};

export default BarChart;
