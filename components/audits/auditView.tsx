import { AuditQuestion, AuditTopic } from '../../commonTypes/audits';
import { EnumGroups, FileData } from '../../commonTypes/CustomFields';
import { prettyFieldValues } from '../settings/customFields/fieldPrettyValues';
import { RootState } from '../store/store';
import AuditResponse from './auditResponse';
import { useSelector } from 'react-redux';

interface Props {
    audit: AuditTopic[];
    fileData: FileData;
}

const AuditView = (props: Props) => {
    const clientId = useSelector((state: RootState) => state.user.value.client);

    return (
        <div>
            {props.audit.map((topic, index) => (
                <table className="w-full mt-4 border border-collapse border-solid border-secondary" key={index}>
                    <thead className="w-full border border-solid border-secondary bg-secondary">
                        <tr>
                            <th colSpan={2} className="font-normal text-xl">
                                {topic.title}
                            </th>
                        </tr>
                        <tr className="w-full">
                            <th className="w-1/2 font-normal">Question</th>
                            <th className="w-1/2 font-normal">Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topic.questions.map((question, index) => (
                            <tr className="border border-collapse border-solid border-secondary" key={index}>
                                <td className="pl-2 border border-solid border-secondary">{question.title}</td>
                                
                                <AuditResponse question={question} clientId={clientId} fileData={props.fileData}/>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ))}
        </div>
    );
};

export default AuditView;
