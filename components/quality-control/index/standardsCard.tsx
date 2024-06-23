import IndexCard from '../../layout/indexCard';

const StandardsCard = () => {
    const title = 'Standards';
    const description = `Manage the standards / expectations / requirements that are used to control the quality of the products`;
    const link = '/quality-control/standards';
    const linkDescription = 'Manage Standards';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default StandardsCard;
