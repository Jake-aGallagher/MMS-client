import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Props {
    tools: {label: string; icon: IconDefinition; function: (param?: any) => void}[]
}

const AuditRowTools = (props: Props) => {
    const toolsIconRef = useRef<any>(null);
    const overlayRef = useRef<any>(null);
    const [showTools, setShowTools] = useState(false);

    const handleToolsClick = () => {
        setShowTools((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (toolsIconRef.current && !toolsIconRef.current.contains(event.target) && overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowTools(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-row justify-center">
            <div onClick={handleToolsClick} ref={toolsIconRef} className="group flex flex-row justify-center relative w-10 py-1 rounded-md hover:cursor-pointer">
                <FontAwesomeIcon icon={faEllipsisVertical} className="h-5 parent group-hover:text-primary transition-all" />
                {showTools && (
                    <div
                        ref={overlayRef}
                        className="absolute top-4 -left-36 rounded-b-md rounded-tl-md z-20 border-primary border-1 p-2 flex flex-col bg-background w-40 shadow-2xl font-normal transition-all"
                    >
                        {props.tools.map((tool, index) => (
                            <button onClick={tool.function} key={Math.floor(Math.random() * 1000) + '_' + index} className="flex flex-row justify-start hover:text-primary transition-all">
                                <FontAwesomeIcon icon={tool.icon} className="h-5" />
                                &nbsp;{tool.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditRowTools;
