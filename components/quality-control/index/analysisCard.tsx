import IndexCard from "../../layout/indexCard";

const AnalysisCard = () => {
    const title = 'Analysis';
    const description = `Analysis tools to help you understand the data you have collected and make informed decisions based on that data`;
    const link = '/quality-control/analysis';
    const linkDescription = 'Analysis Tools';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default AnalysisCard;