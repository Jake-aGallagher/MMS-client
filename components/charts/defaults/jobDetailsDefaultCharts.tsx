import DefaultChartCard from '../defaultChartCard';
import { generateColour } from '../generateColour';

interface Props {
    JobName: string | undefined;
    timeDetails: { first: string; last: string; time: number }[];
}

const JobDetailsDefaultCharts = (props: Props) => {
    const jobTime = {
        creation: new Date('2023-05-10'),
        due: new Date('2023-05-20'),
        now: new Date()
    }

    let endDate = jobTime.due;
    let latest = 'due';
    if (jobTime.now > jobTime.due) {
        endDate = jobTime.now;
        latest = 'now';
    }



    const graphData = [
        {
            chartType: 'bar',
            selectValue: 'logged_time',
            selectLabel: 'Time Logged',
            chartTitle: `Time logged on ${props.JobName} (Mins)`,
            data: {
                labels: props.timeDetails.map((user) => user.first + ' ' + user.last),
                datasets: [
                    {
                        label: 'Time Logged (Mins)',
                        data: props.timeDetails.map((user) => user.time),
                        backgroundColor: props.timeDetails.map((user, index) => generateColour(index)),
                        borderColor: 'black',
                        borderWidth: 1,
                    },
                ],
            },
        },
    ];
    return (
        <div className="mt-2 xl:ml-4 w-full pl-0 xl:pl-4">
            <DefaultChartCard graphData={graphData} />
        </div>
    );
};

export default JobDetailsDefaultCharts;
