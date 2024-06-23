import IndexCard from "../../layout/indexCard";

const PolicyCard = () => {
    const title = 'Policy';
    const description = `Specify the organisations overall direction and objectives to which organisation must strive`;
    const link = '/quality-control/policy';
    const linkDescription = 'Manage Policies';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default PolicyCard;