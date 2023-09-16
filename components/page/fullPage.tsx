const FullPage = (Props: any) => {
    return <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">{Props.children}</div>;
};

export default FullPage;
