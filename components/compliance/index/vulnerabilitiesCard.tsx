import IndexCard from "../../layout/indexCard";

const VulnerabilitiesCard = () => {
    const title = 'Vulnerabilities';
    const description = `View and manage your organization's vulnerabilities.`;
    const link = '/compliance/vulnerabilities';
    const linkDescription = 'Manage Vulnerabilities';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default VulnerabilitiesCard;