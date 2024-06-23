import IndexCard from '../../layout/indexCard';

const JobsCard = () => {
    const title = 'Jobs';
    const description = `View and manage all jobs / breakdowns / one time tasks.\nUpdate and complete jobs.`;
    const link = '/maintenance/jobs';
    const linkDescription = 'Manage Jobs';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default JobsCard;
