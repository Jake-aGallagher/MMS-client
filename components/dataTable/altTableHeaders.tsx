interface Props {
    headers: String[];
}

const AltTableHeaders = (props: Props) => {
    const headersHtml = props.headers.map((header) => (
        <th className="font-semibold" key={'current_item_header_' + header}>
            {header}
        </th>
    ));
    return (
        <thead>
            <tr>{headersHtml}</tr>
        </thead>
    );
};

export default AltTableHeaders;
