export const MockSentimentDocument = {
  text: 'testing text',
  score: 0.884759,
  magnitude: 0.7585,
};
export const MockSentimentModel = {
  create: jest.fn().mockResolvedValue({ ...MockSentimentDocument }),
};
