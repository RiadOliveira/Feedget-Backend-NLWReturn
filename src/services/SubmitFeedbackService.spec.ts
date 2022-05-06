import { SubmitFeedbackService } from "./SubmitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
);

const testParams = {
    type: 'BUG',
    comment: 'example comment',
    screenshot: 'data:image/png;base64adsdasdasdds'
}

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(
            submitFeedbackService.execute(testParams)
        ).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalledWith(testParams);
        expect(sendMailSpy).toHaveBeenCalledWith({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${testParams.type}</p>`,
                `<p>Comentário: ${testParams.comment}</p>`,
                `</div>`
            ].join('\n')
        });
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedbackService.execute({
            ...testParams,
            type: '',
        })).rejects.toThrow(new Error('Type is required.'));
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedbackService.execute({
            ...testParams,
            comment: '',
        })).rejects.toThrow(new Error('Comment is required.'));
    });

    it('should not be able to submit a feedback with invalid screenshot', async () => {
        await expect(submitFeedbackService.execute({
            ...testParams,
            screenshot: 'screenshot.png'
        })).rejects.toThrow(new Error('Invalid screenshot format.'));
    });
});