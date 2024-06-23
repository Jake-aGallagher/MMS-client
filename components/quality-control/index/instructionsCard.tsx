import IndexCard from "../../layout/indexCard";

const InstructionsCard = () => {
    const title = 'Work Instructions';
    const description = `written instructions that specify how a particular task is to be carried out`;
    const link = '/quality-control/instructions';
    const linkDescription = 'Manage Work Instructions';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default InstructionsCard;