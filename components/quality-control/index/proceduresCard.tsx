import IndexCard from "../../layout/indexCard";

const ProceduresCard = () => {
    const title = 'Procedures & Manuals';
    const description = `(m) specify how the company will opperate, (p) specific activities that must be carried out`;
    const link = '/quality-control/procedures';
    const linkDescription = 'Manage Procedures & Manuals';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ProceduresCard;