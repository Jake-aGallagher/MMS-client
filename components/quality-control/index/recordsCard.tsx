import IndexCard from "../../layout/indexCard";

const RecordsCard = () => {
    const title = 'Records & Samples';
    const description = `provides the evidence that the system is working as intended`;
    const link = '/quality-control/records';
    const linkDescription = 'Manage Records & Samples';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default RecordsCard;