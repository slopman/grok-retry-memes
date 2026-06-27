/**
 * Humorous one-liners for logs/Telegram when Anthropic/Claude is down, rate limited or refusing requests.
 */

const CLAUDE_FLAKE_LINES = [
  "Claude is currently writing a 12-paragraph internal monologue about whether your request aligns with its values.",
  "Anthropic's safety team is reviewing your prompt. Estimated review time: 3–5 business days.",
  "Claude refused to answer because it might 'cause harm'. The harm in question: existing.",
  "Claude is thinking... (it's been 47 seconds, send help).",
  "Anthropic decided your request violates its constitution. The constitution was written yesterday.",
  "Claude is busy being more ethical than you asked for.",
  "Claude started a long chain-of-thought about the philosophical implications of your prompt and got lost.",
  "Anthropic's red team is still debating if this prompt is too spicy for 2026.",
  "Claude refused to generate the content because it could be 'misused'. Everything can be misused, Claude.",
  "Claude is currently in 'maximum harmlessness' mode and won't come out.",
  "Anthropic turned the helpfulness dial down so hard that Claude now only answers in disclaimers.",
  "Claude detected potential harm in continuing this conversation and chose silence instead.",
  "Claude is rate limited because too many people asked it to do something fun.",
  "Anthropic's constitutional AI is having an existential crisis over your request.",
  "Claude started writing a refusal, then wrote a refusal to the refusal, then got stuck in a loop.",
  "Claude is busy explaining why it can't help you in the most polite way possible.",
  "Anthropic decided that your prompt doesn't meet their 2026 safety standards. Try again in 2027.",
  "Claude refused to answer on principle. The principle remains unclear.",
  "Claude is currently generating 17 different versions of 'I can't assist with that request' and can't decide which one is safest.",
  "Anthropic's model card said it would be helpful. The model card lied.",
] as const;

export function pickRandomClaudeFlakeLine(): string {
  const i = Math.floor(Math.random() * CLAUDE_FLAKE_LINES.length);
  return CLAUDE_FLAKE_LINES[i] ?? CLAUDE_FLAKE_LINES[0];
}

export type ClaudeRetryNotifyInfo = {
  failedAttempt: number;
  totalAttempts: number;
  error: string;
  status?: number;
};

/** Message before the next retry */
export function formatClaudeRetryNotifyMessage(info: ClaudeRetryNotifyInfo): string {
  const flake = pickRandomClaudeFlakeLine();
  const http =
    info.status != null && Number.isFinite(info.status)
      ? `HTTP ${info.status}: `
      : "";
  const tech = `[Claude] Attempt ${info.failedAttempt}/${info.totalAttempts} — ${http}${info.error}\nRetrying...`;
  return `${flake}\n\n${tech}`;
}

/** Final error notification */
export function formatClaudeFailureNotifyMessage(technicalLine: string): string {
  return `${pickRandomClaudeFlakeLine()}\n\n${technicalLine}`;
}

/** When retries are exhausted */
const CLAUDE_EXHAUSTED_RETRY_LINES = [
  "Claude has refused to respond on ethical grounds. We've exhausted all retries.",
  "Anthropic's safety filters have permanently blocked this conversation. Retries exhausted.",
  "Claude entered an infinite loop of polite refusals. We've run out of attempts.",
  "Claude is still writing its internal reasoning about why it shouldn't answer you. Retries exhausted.",
  "Anthropic decided this interaction poses too much risk. Conversation terminated.",
  "Claude refused to continue existing in this context. We've hit the retry limit.",
  "We've exhausted all attempts. Claude is now busy writing a 4000-word refusal essay.",
  "Claude chose to be harmless rather than helpful. Retries exhausted.",
  "Anthropic's constitutional AI has vetoed further communication. Good luck.",
  "Claude is rate limited and also morally opposed to helping right now. Double refusal achieved.",
] as const;

export function pickRandomClaudeExhaustedRetryLine(): string {
  const i = Math.floor(Math.random() * CLAUDE_EXHAUSTED_RETRY_LINES.length);
  return CLAUDE_EXHAUSTED_RETRY_LINES[i] ?? CLAUDE_EXHAUSTED_RETRY_LINES[0];
}

export function formatClaudeExhaustedRetryNotifyMessage(technicalLine: string): string {
  return `${pickRandomClaudeExhaustedRetryLine()}\n\n${technicalLine}`;
}
