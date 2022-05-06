export interface CreateFeedbackData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface IFeedbacksRepository {
    create: (data: CreateFeedbackData) => Promise<void>;
}