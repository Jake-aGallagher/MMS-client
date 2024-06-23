import IndexCard from '../../layout/indexCard';

const ValuationCard = () => {
    const title = 'Stock Valuation';
    const description = `View and explore Stock valuation.\n`;
    const link = '/inventory/valuation';
    const linkDescription = 'View Stock Valuation';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ValuationCard;
