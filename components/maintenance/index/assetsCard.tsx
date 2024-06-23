import IndexCard from '../../layout/indexCard';

const AssetsCard = () => {
    const title = 'Assets';
    const description = `View and manage all Assets within the Asset Tree.\nCreate Jobs and PMs linked to Assets.\nYou can also view and manage all PMs and Logs associated with each asset.`;
    const link = '/maintenance/assets';
    const linkDescription = 'Manage Assets';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default AssetsCard;
