import Link from 'next/link';
import FullPage from '../../../../../../components/layout/page/fullPage';
import Toolbar from '../../../../../../components/layout/page/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import LoadingNoDataError from '../../../../../../components/loading/loadingNoDataError';
import ModalBase from '../../../../../../components/layout/modal/modal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTemplateVersion } from '../../../../../../components/settings/audits/templates/versions/useTemplateVersion';
import AuditRowTools from '../../../../../../components/settings/audits/templates/versions/auditRowTools';

interface TopicPayload {
    id: number;
    name: string;
    templateId: number;
    version: number;
    url?: string;
}

interface QuestionPayload {
    id: number;
    name: string;
    topicId: number;
    url?: string;
}

interface ResponsePayload {
    id: number;
    name: string;
    questionId: number;
    url?: string;
}

const TemplateVersion = () => {
    const router = useRouter();
    const templateId = parseInt(router.asPath.split('/')[4]);
    const version = parseInt(router.asPath.split('/')[6]);
    const { templateVersion, topics, loading, error, reload } = useTemplateVersion(templateId, version);
    const published = templateVersion?.published == 1;
    const [modal, setModal] = useState<{ view: boolean; type: string; payload: TopicPayload | QuestionPayload | ResponsePayload }>({
        view: false,
        type: '',
        payload: { id: 0, name: '', templateId: 0, version: 0 },
    });

    const addTopic = () => {
        setModal({ view: true, type: 'addEditTopic', payload: { id: 0, templateId, version, name: '' } });
    };

    const editTopic = (id: number, name: string) => {
        setModal({ view: true, type: 'addEditTopic', payload: { id, templateId, version, name } });
    };

    const deleteTopic = (id: number, name: string) => {
        setModal({ view: true, type: 'deleteTopic', payload: { id, templateId, version, name, url: 'audit/topic' } });
    };

    const addQuestion = (topicId: number) => {
        setModal({ view: true, type: 'addEditQuestion', payload: { id: 0, name: '', topicId } });
    };

    const editQuestion = (id: number, name: string, topicId: number) => {
        setModal({ view: true, type: 'addEditQuestion', payload: { id, name, topicId } });
    };

    const deleteQuestion = (id: number, name: string, topicId: number) => {
        setModal({ view: true, type: 'deleteQuestion', payload: { id, name, topicId, url: 'audit/question' } });
    };

    const addOption = (questionId: number) => {
        setModal({ view: true, type: 'addEditOption', payload: { id: 0, name: '', questionId } });
    };

    const editOption = (id: number, name: string, questionId: number) => {
        setModal({ view: true, type: 'addEditOption', payload: { id, name, questionId } });
    };

    const deleteOption = (id: number, name: string, questionId: number) => {
        setModal({ view: true, type: 'deleteOption', payload: { id, name, questionId, url: 'audit/option' } });
    };

    return (
        <FullPage>
            <Toolbar>
                <Link href={`/settings/audit/templates/${templateId}`} className="tLink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                    <p>Return to Versions</p>
                </Link>
                {!published && (
                    <button onClick={addTopic} className="tLink">
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Topic
                    </button>
                )}
            </Toolbar>
            {modal.view ? (
                <ModalBase
                    modalType={modal.type}
                    payload={{ ...modal.payload }}
                    closeModal={() => [setModal({ view: false, type: '', payload: { id: 0, name: '', templateId: 0, version: 0 } }), reload()]}
                />
            ) : null}
            <LoadingNoDataError loading={loading} error={error}>
                <div className="mt-4 text-center">
                    <h1 className="text-xl">{templateVersion?.title}</h1>
                    <div className="">Status: {published ? 'Published' : 'Editable'}</div>
                    <div className="">Version: {templateVersion?.version}</div>
                </div>
                {topics.map((topic) => (
                    <table key={topic.id} className="mt-4 border border-collapse border-solid border-secondary">
                        <thead className="border border-solid border-secondary bg-secondary">
                            <tr>
                                <th colSpan={4} className="font-normal text-xl">
                                    {topic.title}
                                </th>
                                <th className={`w-10 group ${!published && 'hover:cursor-pointer'}`}>
                                    <div className="w-full h-full flex flex-row justify-center">
                                        {published ? null : (
                                            <AuditRowTools
                                                tools={[
                                                    { label: 'Add Question', icon: faPlus, function: () => addQuestion(topic.id) },
                                                    { label: 'Edit Topic', icon: faPenToSquare, function: () => editTopic(topic.id, topic.title) },
                                                    { label: 'Delete Topic', icon: faTrashCan, function: () => deleteTopic(topic.id, topic.title) },
                                                ]}
                                            />
                                        )}
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="font-normal">Question Type</th>
                                <th className="font-normal">Question</th>
                                <th className="w-10"></th>
                                <th className="font-normal">Options (if applicable)</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {topic.questions?.map((question) => (
                                <tr key={topic.id + '-' + question.id} className="border border-collapse border-solid border-secondary">
                                    <td className="pl-2 border border-collapse border-solid border-secondary">{question.question_type}</td>
                                    <td className="pl-2 ">{question.title}</td>
                                    <td className={`group ${!published && 'hover:cursor-pointer'} border-r border-solid border-secondary w-10`}>
                                        <div className="w-full h-full flex flex-row justify-center">
                                            {published ? null : (
                                                <AuditRowTools
                                                    tools={[
                                                        ...(question.question_type === 'select' || question.question_type === 'multi-select'
                                                            ? [{ label: 'Add Option', icon: faPlus, function: () => addOption(question.id) }]
                                                            : []),
                                                        { label: 'Edit Question', icon: faPenToSquare, function: () => editQuestion(question.id, question.title, topic.id) },
                                                        { label: 'Delete Question', icon: faTrashCan, function: () => deleteQuestion(question.id, question.title, topic.id) },
                                                    ]}
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {question.options?.map((option) => (
                                            <div key={topic.id + '-' + question.id + '-' + option.id} className="pl-2">
                                                {option.title}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="w-10">
                                        {question.options?.map((option) => (
                                            <div key={topic.id + '-' + question.id + '-' + option.id + '_tools'} className={`group ${!published && 'hover:cursor-pointer'}`}>
                                                {published ? null : (
                                                    <AuditRowTools
                                                        tools={[
                                                            { label: 'Edit Option', icon: faPenToSquare, function: () => editOption(option.id, option.title, question.id) },
                                                            { label: 'Delete Option', icon: faTrashCan, function: () => deleteOption(option.id, option.title, question.id) },
                                                        ]}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
            </LoadingNoDataError>
        </FullPage>
    );
};

export default TemplateVersion;
