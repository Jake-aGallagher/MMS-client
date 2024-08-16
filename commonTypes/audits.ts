export interface AuditTopic {
    id: number;
    title: string;
    sort_order: number;
    questions: AuditQuestion[];
}

export interface AuditQuestion {
    id: number;
    question_type: string;
    title: string;
    sort_order: number;
    topic_id: number;
    options?: AuditOption[];
    response?: AuditResponse;
}

export interface AuditOption {
    id: number;
    question_id: number;
    title: string;
}

export interface AuditResponse {
    responseId: number;
    responseValue: string;
}