const Toolbar = (props: any) => {
    return <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">{props.children}</div>;
};

export default Toolbar;
