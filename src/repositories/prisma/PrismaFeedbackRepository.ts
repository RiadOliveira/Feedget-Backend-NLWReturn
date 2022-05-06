import { prisma } from "../../prisma";
import { CreateFeedbackData, IFeedbacksRepository } from "../IFeedbacksRepository";

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
    public async create({type, comment, screenshot}: CreateFeedbackData): Promise<void> {
        await prisma.feedback.create({
            data: {
                type, 
                comment, 
                screenshot,
            }
        });
    };
}