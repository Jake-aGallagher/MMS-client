import IndexCard from '../../layout/indexCard';

const PMsCard = () => {
    const title = 'PMs';
    const description = 'View and manage all Planned Maintenance Tasks';
    const link = '/maintenance/pms';
    const linkDescription = 'Manage PMs';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default PMsCard;
