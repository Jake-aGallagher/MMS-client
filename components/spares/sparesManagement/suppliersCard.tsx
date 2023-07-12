import Link from 'next/link';

const SuppliersCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
                <p className="">Manage info about suppliers and the spares they supply</p>
                <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4 mt-4 border-2 border-blue-600 hover:border-transparent">
                    <Link href="/spares/sparesManagement/suppliers">Manage Suppliers info</Link>
                </button>
            </div>
        </div>
    );
};

export default SuppliersCard;
