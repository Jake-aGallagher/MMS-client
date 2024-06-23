import IndexCard from "../../layout/indexCard";

const CompliancePoliciesCard = () => {
    const title = 'Policies';
    const description = `View and manage your organization's compliance policies.`;
    const link = '/compliance/policies';
    const linkDescription = 'Manage Policies';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default CompliancePoliciesCard;