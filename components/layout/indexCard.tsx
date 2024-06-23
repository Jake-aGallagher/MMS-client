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
        <div className="pl-10 pt-5 w-96">
            <div className="bg-background h-full p-6 rounded-md shadow-md flex flex-col">
                <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
                <div>{description}</div>
                <button className="btnBlue h-8 px-4 mt-auto">
                    <Link href={props.link}>{props.linkDescription}</Link>
                </button>
            </div>
        </div>
    );
};

export default IndexCard;
