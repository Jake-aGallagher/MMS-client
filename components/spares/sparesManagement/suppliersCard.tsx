import Link from 'next/link';

const SuppliersCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
                <p className="">Manage info about suppliers and the spares they supply</p>
                <button className="rounded-md bg-background hover:bg-secondary h-8 px-4 mt-4 border-2 border-accent hover:border-primary">
                    <Link href="/spares/sparesManagement/suppliers">Manage Suppliers info</Link>
                </button>
            </div>
        </div>
    );
};

export default SuppliersCard;
