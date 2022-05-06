import { Router } from 'express';
import { NodemailerMailProvider } from '../providers/mailProvider/nodemailer/NodemailerMailProvider';
import { PrismaFeedbacksRepository } from '../repositories/prisma/PrismaFeedbackRepository';
import { SubmitFeedbackService } from '../services/SubmitFeedbackService';

export const feedbackRoutes = Router();

feedbackRoutes.post('/', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailProvider = new NodemailerMailProvider();
    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailProvider,
    );

    await submitFeedbackService.execute({
        type, 
        comment,
        screenshot
    });

    return res.status(201).send();
});