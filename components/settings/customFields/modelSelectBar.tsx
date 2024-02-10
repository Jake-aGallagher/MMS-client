import { Dispatch, SetStateAction } from 'react';

interface Props {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
}

const ModelSelectBar = (props: Props) => {
    return (
        <div className="flex flex-row justify-evenly border-solid border-1 border-primary h-8 mt-5 rounded-md overflow-hidden">
            <button
                onClick={() => props.setActiveTab('property')}
                className={`w-full hover:bg-accent hover:text-background transition-all ${props.activeTab == 'property' ? 'bg-accent text-background' : null}`}
            >
                Property
            </button>
            <button
                onClick={() => props.setActiveTab('job')}
                className={`w-full hover:bg-accent hover:text-background transition-all ${props.activeTab == 'job' ? 'bg-accent text-background' : null}`}
            >
                Job
            </button>
            <button onClick={() => props.setActiveTab('pm')} className={`w-full hover:bg-accent hover:text-background transition-all ${props.activeTab == 'pm' ? 'bg-accent text-background' : null}`}>
                PM
            </button>
            <button
                onClick={() => props.setActiveTab('asset')}
                className={`w-full hover:bg-accent hover:text-background transition-all ${props.activeTab == 'asset' ? 'bg-accent text-background' : null}`}
            >
                Asset
            </button>
            <button
                onClick={() => props.setActiveTab('spare')}
                className={`w-full hover:bg-accent hover:text-background transition-all ${props.activeTab == 'spare' ? 'bg-accent text-background' : null}`}
            >
                Spares
            </button>
            <button
                onClick={() => props.setActiveTab('delivery')}
                className={`w-full hover:bg-accent hover:text-background transition-all ${props.activeTab == 'delivery' ? 'bg-accent text-background' : null}`}
            >
                Delivery
            </button>
        </div>
    );
};

export default ModelSelectBar;
