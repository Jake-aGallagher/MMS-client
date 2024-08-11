import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';

interface TabContentProps {
    id: string;
    label: string;
    children: React.ReactNode;
}

interface TabsetProps {
    children: React.ReactElement<TabContentProps>[];
}

const Tabset: React.FC<TabsetProps> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(children[0].props.id);
    const tabListRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (id: string) => {
        setSelectedTab(id);
        const tabElement = document.getElementById(id);
        if (tabElement && tabListRef.current) {
            tabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    };

    const scrollTabs = (direction: 'left' | 'right') => {
        if (tabListRef.current) {
            const scrollAmount = direction === 'left' ? -100 : 100;
            tabListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full mt-4">
            <div className="h-10 mb-4 mx-auto w-full max-w-2xl flex flex-row bg-secondary">
                <div className="flex flex-row justify-center items-center p-1">
                    <button onClick={() => scrollTabs('left')} className="w-8 bg-background hover:bg-secAlt transition-all h-8 rounded-sm flex flex-row justify-center">
                        <FontAwesomeIcon icon={faAnglesLeft} className="w-4" />
                    </button>
                </div>
                <div ref={tabListRef} className="w-full flex flex-row justify-start items-center gap-4 mx-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                    {children.map((tab) => (
                        <button key={tab.props.id} id={tab.props.id} onClick={() => handleTabClick(tab.props.id)} className={`text-nowrap ${selectedTab === tab.props.id ? 'text-primary' : ''}`}>
                            {tab.props.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-row justify-center items-center p-1">
                    <button onClick={() => scrollTabs('right')} className="w-8 bg-background hover:bg-secAlt transition-all h-8 rounded-sm flex flex-row justify-center">
                        <FontAwesomeIcon icon={faAnglesRight} className="w-4" />
                    </button>
                </div>
            </div>
            <div className="">{React.Children.map(children, (child) => (React.isValidElement(child) && child.props.id === selectedTab ? child : null))}</div>
        </div>
    );
};

export default Tabset;
