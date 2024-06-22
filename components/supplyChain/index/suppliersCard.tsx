import IndexCard from '../../layout/indexCard';

const SuppliersCard = () => {
    const title = 'Suppliers';
    const description = 'Manage info about suppliers and the spares they supply';
    const link = '/supply-chain/suppliers';
    const linkDescription = 'Manage Suppliers';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default SuppliersCard;
