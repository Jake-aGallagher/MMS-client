import Link from "next/link";

const SuppliersCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">Suppliers</h2>
                <p className="">Manage info about suppliers and the spares they supply</p>
                <button className="btnBlue h-8 px-4 mt-4">
                    <Link href="/supply-chain/suppliers">Manage Suppliers</Link>
                </button>
            </div>
        </div>
    );
};

export default SuppliersCard;