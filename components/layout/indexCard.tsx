import Link from 'next/link';

interface Props {
    title: string;
    description: string;
    link: string;
    linkDescription: string;
}

const IndexCard = (props: Props) => {
    const splitDescription = props.description.split('\n');
    const description = splitDescription.map((line) => {
        return (
            <p className="mb-1" key={line}>{line}</p>
        );
    });
    return (
        <div className="px-10 pt-5">
            <div className="bg-background p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
                <div>{description}</div>
                <button className="btnBlue h-8 px-4 mt-4">
                    <Link href={props.link}>{props.linkDescription}</Link>
                </button>
            </div>
        </div>
    );
};

export default IndexCard;
