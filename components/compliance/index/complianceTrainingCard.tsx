import IndexCard from "../../layout/indexCard";

const ComplianceTrainingCard = () => {
    const title = 'Training';
    const description = `View and manage your organization's compliance training.`;
    const link = '/compliance/training';
    const linkDescription = 'Manage Training';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ComplianceTrainingCard;