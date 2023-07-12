import Link from 'next/link';

const DeliveriesCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Deliveries</h2>
                <p className="">Add deliveries, manage scheduled deliveries and confirm when deliveries have arrived to automatically update current stock levels with the newly arrived items</p>
                <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                    <Link href="/spares/sparesManagement/deliveries">Manage Deliveries</Link>
                </button>
            </div>
        </div>
    );
};

export default DeliveriesCard;
