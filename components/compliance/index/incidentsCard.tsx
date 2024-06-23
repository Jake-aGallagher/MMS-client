import IndexCard from "../../layout/indexCard";

const IncidentsCard = () => {
    const title = 'Incidents';
    const description = `View and manage your organization's compliance incidents.`;
    const link = '/compliance/incidents';
    const linkDescription = 'Manage Incidents';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default IncidentsCard;