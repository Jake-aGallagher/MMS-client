import IndexCard from "../../layout/indexCard";

const RisksCard = () => {
    const title = 'Risks';
    const description = `View and manage risks associated with your organization.`;
    const link = '/compliance/risks';
    const linkDescription = 'Manage Risks';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default RisksCard;