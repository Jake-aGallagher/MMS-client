import IndexCard from '../../layout/indexCard';

const ProductsCard = () => {
    const title = 'Products';
    const description = `View and manage all Products.\n`;
    const link = '/inventory/products';
    const linkDescription = 'Manage Products';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default ProductsCard;
