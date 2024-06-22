import IndexCard from '../../layout/indexCard';

const TransportCard = () => {
    const title = 'Transport & Logistics (comming soon)';
    const description = 'Manage Transport and Logistics';
    const link = '/supply-chain/transport';
    const linkDescription = 'Manage Transport & Logistics';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default TransportCard;
