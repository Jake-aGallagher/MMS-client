import Link from 'next/link';

const DeliveriesCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Deliveries</h2>
                <p className="">Add deliveries, manage scheduled deliveries and confirm when deliveries have arrived to automatically update current stock levels with the newly arrived items</p>
                <button className="btnBlue h-8 px-4 mt-4">
                    <Link href="/spares/sparesManagement/deliveries">Manage Deliveries</Link>
                </button>
            </div>
        </div>
    );
};

export default DeliveriesCard;
