import IndexCard from "../../layout/indexCard";

const ReviewsCard = () => {
    const title = 'Reviews';
    const description = `View and manage your organization's reviews.`;
    const link = '/compliance/reviews';
    const linkDescription = 'Manage Reviews';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ReviewsCard;