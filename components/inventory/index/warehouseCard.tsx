import IndexCard from '../../layout/indexCard';

const WarehouseCard = () => {
    const title = 'Warehouse';
    const description = `View and manage Warehouse status.\n`;
    const link = '/inventory/tracking';
    const linkDescription = 'Manage Tracking';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default WarehouseCard;
