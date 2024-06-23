import IndexCard from "../../layout/indexCard";

const ComplianceAuditsCard = () => {
    const title = 'Audits';
    const description = `View and manage your organization's compliance audits.`;
    const link = '/compliance/audits';
    const linkDescription = 'Manage Audits';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ComplianceAuditsCard;