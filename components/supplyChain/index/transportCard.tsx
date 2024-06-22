import Link from 'next/link';

const TransportCard = () => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">Transport & Logistics (comming soon)</h2>
                <p className="">Manage Transport and Logistics</p>
                <button className="btnBlue opacity-70 hover:bg-background hover:text-black h-8 px-4 mt-4" disabled={true}>
                    {/* <Link href="/supply-chain/transport">Manage Transport & Logistics</Link> */}
                    Manage Transport & Logistics
                </button>
            </div>
        </div>
    );
};

export default TransportCard;
