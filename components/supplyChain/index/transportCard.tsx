import Link from "next/link";

const TransportCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">Transport & Logistics</h2>
                <p className="">Manage Transport and Logistics</p>
                <button className="btnBlue h-8 px-4 mt-4">
                    <Link href="/supply-chain/transport">Manage Transport & Logistics</Link>
                </button>
            </div>
        </div>
    );
};

export default TransportCard;