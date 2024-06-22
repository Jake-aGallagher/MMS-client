import Link from "next/link";
import IndexCard from "../../layout/indexCard";

const OrdersCard = () => {
    const title = 'Orders';
    const description = 'Manage current Orders and Create new Orders from Suppliers';
    const link = '/supply-chain/orders';
    const linkDescription = 'Manage Orders';
    return <IndexCard title={title} description={description} link={link} linkDescription={linkDescription} />;
};

export default OrdersCard;