import IndexCard from '../../layout/indexCard';

const LogsCard = () => {
    const title = 'Logs';
    const description = `View and manage all Logs.\nCreate and adjust Log Templates.`;
    const link = '/maintenance/logs';
    const linkDescription = 'Manage Logs';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default LogsCard;
