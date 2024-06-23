import IndexCard from '../../layout/indexCard';

const ForecastingCard = () => {
    const title = 'Forecasting';
    const description = `Forecast usage and future stock requirements.\n`;
    const link = '/inventory/forecasting';
    const linkDescription = 'View Forecasting';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ForecastingCard;
