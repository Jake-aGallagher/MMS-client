import DetailsBox from "../../detailsBox/detailsBox"

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string | null;
    notes: string | null;
    location: string;
    quant_remain: number;
    supplier: string;
    reorder_freq: string;
    reorder_num: number;
    running_low: number;
    avg_usage: number;
    cost: number;
}

interface Props {
    sparesDetails?: Spare
}

const SparesDetailsRender = (props: Props) => {
    const spareConfig = {
        id: props.sparesDetails?.id,
        fields: [
            { label: 'Part Number', value: props.sparesDetails?.part_no },
            { label: 'Name', value: props.sparesDetails?.name },
            { label: 'Manufacturers Part Number', value: props.sparesDetails?.man_part_no },
            { label: 'Manufacturers Part Name', value: props.sparesDetails?.man_name },
            { label: 'Location', value: props.sparesDetails?.location },
            { label: 'Quantity Remaining', value: props.sparesDetails?.quant_remain },
            { label: 'Supplier', value: props.sparesDetails?.supplier },
            { label: 'Reorder Frequency', value: props.sparesDetails?.reorder_freq },
            { label: 'Reorder Amount', value: props.sparesDetails?.reorder_num },
            { label: 'Avg Usage per Month', value: props.sparesDetails?.avg_usage },
            { label: 'Cost per Item', value: props.sparesDetails?.cost },
            { label: 'Next Delivery Due', value: 'needs implimenting' },
            { label: 'Next Delivery Quantity Expected', value: 'needs implimenting' },
        ],
    };
    return (
        <div className="flex flex-col xl:flex-row">
            <div className="w-full h-full flex flex-row">
            <DetailsBox data={spareConfig} />
            <div className=" p-6 flex flex-col w-full">
                <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                    <b>Description: </b>
                    {props.sparesDetails?.description}
                </div>
                <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                    <b>Notes: </b>
                    {props.sparesDetails?.notes}
                </div>
            </div>
        </div>
        </div>
    )
}

export default SparesDetailsRender