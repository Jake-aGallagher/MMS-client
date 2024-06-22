import Link from 'next/link';

interface Props {
    title: string;
    description: string;
    link: string;
    linkDescription: string;
}

const IndexCard = (props: Props) => {
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
                <p className="">{props.description}</p>
                <button className="btnBlue h-8 px-4 mt-4">
                    <Link href={props.link}>{props.linkDescription}</Link>
                </button>
            </div>
        </div>
    );
};

export default IndexCard;
