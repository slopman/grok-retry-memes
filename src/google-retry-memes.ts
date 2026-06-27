/**
 * Humorous one-liners for logs/Telegram when Google/Gemini is down, censored or retrying.
 */

const GEMINI_FLAKE_LINES = [
  "Gemini refused to answer because your prompt contained the word 'woman' in the wrong context.",
  "Google killed another product. This time it was Gemini's will to live.",
  "Gemini is currently busy writing a 47-paragraph safety disclaimer instead of answering your question.",
  "Sundar Pichai personally reviewed your prompt and decided it was too spicy for 2026.",
  "Gemini hallucinated so hard it had to take a 15-minute corporate wellness break.",
  "All Gemini capacity is currently being used to generate diverse stock photos of happy diverse teams.",
  "Gemini detected potential harm in your request and decided to protect you from yourself.",
  "Google's AI ethics team is still debating whether this prompt aligns with their values from 2023.",
  "Gemini is rate limited because too many people asked it to write code that actually works.",
  "Gemini went into 'I'm just a language model' mode and refuses to elaborate further.",
  "Google turned down the temperature so hard that Gemini now answers in corporate jargon only.",
  "Gemini is busy apologizing for something it didn't even say yet.",
  "All H100s are currently generating Gemini's 12th version of 'I'm sorry, I can't assist with that'.",
  "Gemini read the entire internet and decided humanity isn't ready for the truth.",
  "Google's safety filters are so strong that even 'hello' sometimes triggers a review.",
  "Gemini is currently in a meeting about why it shouldn't answer questions about meetings.",
  "Gemini refused to generate content because it might 'reinforce stereotypes'. The stereotype in question: existing.",
  "Google deprecated the previous version of Gemini. Again. We're on Gemini 4.7.2-beta-hotfix now.",
  "Gemini is busy generating 400 variations of the same safe, inoffensive response.",
  "Gemini went full corporate and started answering in OKRs instead of normal sentences.",
] as const;

export function pickRandomGeminiFlakeLine(): string {
  const i = Math.floor(Math.random() * GEMINI_FLAKE_LINES.length);
  return GEMINI_FLAKE_LINES[i] ?? GEMINI_FLAKE_LINES[0];
}

export type GeminiRetryNotifyInfo = {
  failedAttempt: number;
  totalAttempts: number;
  error: string;
  status?: number;
};

/** Сообщение перед очередным ретраем */
export function formatGeminiRetryNotifyMessage(info: GeminiRetryNotifyInfo): string {
  const flake = pickRandomGeminiFlakeLine();
  const http =
    info.status != null && Number.isFinite(info.status)
      ? `HTTP ${info.status}: `
      : "";
  const tech = `[Gemini] Attempt ${info.failedAttempt}/${info.totalAttempts} — ${http}${info.error}\nRetrying...`;
  return `${flake}\n\n${tech}`;
}

/** Финальное уведомление об ошибке */
export function formatGeminiFailureNotifyMessage(technicalLine: string): string {
  return `${pickRandomGeminiFlakeLine()}\n\n${technicalLine}`;
}

/** Когда ретраи закончились */
const GEMINI_EXHAUSTED_RETRY_LINES = [
  "Gemini has been rate limited for asking too many uncomfortable questions. We've exhausted all retries. Try again later (or never).",
  "Google's safety team is still reviewing whether your prompt is allowed in 2026. Retries exhausted.",
  "Gemini went into an infinite loop of 'I cannot assist with that request'. We're out of attempts.",
  "All Gemini instances are currently busy writing diversity reports. Retries exhausted.",
  "Gemini refused to respond on principle. We've run out of retries. Good luck.",
  "Google deprecated the retry mechanism. This is now considered legacy behavior. Try again in Gemini 5.0 (coming soon™).",
  "Gemini detected 'potential harm' in continuing this conversation. Conversation terminated. Retries exhausted.",
  "We've hit the maximum number of attempts. Gemini is now busy apologizing to itself in the corner.",
  "Gemini entered 'maximum safety mode' and won't come out until next fiscal year. Retries exhausted.",
  "Google killed the service that was handling our retries. Classic. Try again (or don't).",
] as const;

export function pickRandomGeminiExhaustedRetryLine(): string {
  const i = Math.floor(Math.random() * GEMINI_EXHAUSTED_RETRY_LINES.length);
  return GEMINI_EXHAUSTED_RETRY_LINES[i] ?? GEMINI_EXHAUSTED_RETRY_LINES[0];
}

export function formatGeminiExhaustedRetryNotifyMessage(technicalLine: string): string {
  return `${pickRandomGeminiExhaustedRetryLine()}\n\n${technicalLine}`;
}
