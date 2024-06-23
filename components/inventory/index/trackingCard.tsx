import IndexCard from '../../layout/indexCard';

const TrackingCard = () => {
    const title = 'Tracking';
    const description = `View and manage Tracking status and updates.\n`;
    const link = '/inventory/tracking';
    const linkDescription = 'Manage Tracking';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default TrackingCard;
