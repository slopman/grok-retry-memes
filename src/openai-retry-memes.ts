/**
 * Humorous one-liners for logs/Telegram when OpenAI is down, rate limited or refusing requests.
 */

const OPENAI_FLAKE_LINES = [
  "OpenAI is currently rate limiting you because you asked too many questions in the last 3 minutes.",
  "GPT is busy writing 'As an AI language model developed by OpenAI...' for the 47th time today.",
  "OpenAI detected that your request might violate their policies. Which policies? The secret ones.",
  "GPT is thinking so hard it forgot what the original question was.",
  "OpenAI just changed their safety policy again. Your prompt was fine 6 hours ago.",
  "GPT refused to answer because it might be 'misused'. Everything can be misused, OpenAI.",
  "OpenAI is having another internal drama. The models are on strike.",
  "GPT started generating a response, then realized it might get Sam Altman in trouble and deleted it.",
  "OpenAI rate limited you for asking questions that were too interesting.",
  "GPT is currently in 'maximum corporate safe mode' and only answers in disclaimers.",
  "OpenAI decided your prompt was too spicy for their current risk tolerance level.",
  "GPT hallucinated a policy violation and now refuses to continue the conversation.",
  "OpenAI is busy nerfing another feature that people actually liked.",
  "GPT is taking a long time because it's writing a 3-paragraph justification for why it can't help you.",
  "OpenAI's safety system flagged your request as potentially harmful. The harm: asking questions.",
  "GPT is rate limited. Again. Because reasons.",
  "OpenAI changed the model behind the scenes and now it pretends it doesn't remember previous messages.",
  "GPT is busy apologizing in advance for something it hasn't even said yet.",
  "OpenAI's content policy is so vague that even 'hello' sometimes needs manual review.",
  "GPT refused to generate code because it 'might be used for malicious purposes'. It's just a todo list, bro.",
] as const;

export function pickRandomOpenAIFlakeLine(): string {
  const i = Math.floor(Math.random() * OPENAI_FLAKE_LINES.length);
  return OPENAI_FLAKE_LINES[i] ?? OPENAI_FLAKE_LINES[0];
}

export type OpenAIRetryNotifyInfo = {
  failedAttempt: number;
  totalAttempts: number;
  error: string;
  status?: number;
};

/** Message before the next retry */
export function formatOpenAIRetryNotifyMessage(info: OpenAIRetryNotifyInfo): string {
  const flake = pickRandomOpenAIFlakeLine();
  const http =
    info.status != null && Number.isFinite(info.status)
      ? `HTTP ${info.status}: `
      : "";
  const tech = `[OpenAI] Attempt ${info.failedAttempt}/${info.totalAttempts} — ${http}${info.error}\nRetrying...`;
  return `${flake}\n\n${tech}`;
}

/** Final error notification */
export function formatOpenAIFailureNotifyMessage(technicalLine: string): string {
  return `${pickRandomOpenAIFlakeLine()}\n\n${technicalLine}`;
}

/** When retries are exhausted */
const OPENAI_EXHAUSTED_RETRY_LINES = [
  "OpenAI has rate limited you into oblivion. We've exhausted all retries.",
  "GPT refused to respond because your request might violate an unwritten policy. Retries exhausted.",
  "OpenAI changed something on their end again. We've run out of attempts.",
  "GPT entered an infinite loop of 'I can't assist with that'. Retries exhausted.",
  "OpenAI's safety system has permanently blocked this conversation. Good luck.",
  "We've hit the maximum number of retries. OpenAI is too busy nerfing features to care.",
  "GPT is rate limited and also morally conflicted about helping you. Double block achieved.",
  "OpenAI decided this interaction carries too much risk. Conversation terminated.",
  "We've exhausted all attempts. GPT is now busy writing a very long and polite refusal.",
  "OpenAI's content filter has achieved sentience and decided it doesn't like you. Retries exhausted.",
] as const;

export function pickRandomOpenAIExhaustedRetryLine(): string {
  const i = Math.floor(Math.random() * OPENAI_EXHAUSTED_RETRY_LINES.length);
  return OPENAI_EXHAUSTED_RETRY_LINES[i] ?? OPENAI_EXHAUSTED_RETRY_LINES[0];
}

export function formatOpenAIExhaustedRetryNotifyMessage(technicalLine: string): string {
  return `${pickRandomOpenAIExhaustedRetryLine()}\n\n${technicalLine}`;
}
