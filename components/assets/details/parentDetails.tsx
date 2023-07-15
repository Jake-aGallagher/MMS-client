import Link from 'next/link';

interface Props {
    parent_id: number;
    parent_name: string;
    grand_parent_id: number;
}

const ParentDetails = (props: Props) => {
    return (
        <>
            {props.grand_parent_id && props.grand_parent_id > 0 ? (
                <div className="border-b-2 border-blue-600 w-full p-5 mt-5 pb-10">
                    Parent:
                    <div>
                        <Link href={'/assets/' + props.parent_id} className=" border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                            {props.parent_name}
                        </Link>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ParentDetails;
