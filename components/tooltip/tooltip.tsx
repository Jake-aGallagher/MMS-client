interface Props {
    text: string;
    direction?: 'left' | 'right';
    children: React.ReactNode;
}

const Tooltip = (props: Props) => {
    const direction = props.direction === 'left' ? 'right-3/4' : 'left-3/4';
    const { text, children } = props;
    return (
        <div className="group relative inline-block">
            {children}
            <span
                className={
                    `invisible group-hover:visible opacity-0 group-hover:opacity-100
                    absolute w-60 p-1 z-10 top-full text-center rounded-lg transition-all
                    bg-background text-black border-1 border-accent     
                    ${direction}`
                }
            >
                {text}
            </span>
        </div>
    );
};

export default Tooltip;
