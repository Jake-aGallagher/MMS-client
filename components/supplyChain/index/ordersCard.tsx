import Link from "next/link";

const OrdersCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">Orders</h2>
                <p className="">Manage current Orders and Create new Orders from Suppliers</p>
                <button className="btnBlue h-8 px-4 mt-4">
                    <Link href="/supply-chain/orders">Manage Orders</Link>
                </button>
            </div>
        </div>
    );
};

export default OrdersCard;