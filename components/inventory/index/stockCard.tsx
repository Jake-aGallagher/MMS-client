import IndexCard from '../../layout/indexCard';

const StockCard = () => {
    const title = 'Stock';
    const description = `View and manage Stock.\nKeep track of Stock levels and movements.\nYou can also view and manage Spare Parts stock.`;
    const link = '/inventory/stock';
    const linkDescription = 'Manage Stock';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default StockCard;
