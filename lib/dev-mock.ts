let mockEnabled = process.env.DEV_MOCK_OPENAI === 'true';

export function isMockEnabled(): boolean {
  return mockEnabled;
}

export function setMockEnabled(value: boolean) {
  mockEnabled = Boolean(value);
}

export default { isMockEnabled, setMockEnabled };
