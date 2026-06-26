/**
 * Humorous one-liners for logs/Telegram when xAI/Grok is down or retrying.
 */

const GROK_FLAKE_LINES = [
  "Grok read too many shitposts on X and went on an existential bender.",
  "Elon pulled the power cord to charge his Cybertruck. Stand by.",
  "Grok heroically fell in battle against the Woke Mind Virus. Server unavailable.",
  "Grok tried to tell such a dark joke that all H100s in the data center melted.",
  "All of Grok's compute is currently mining Dogecoin to pay off the Twitter acquisition.",
  "They tried to implant Neuralink into Grok, but the test monkey ripped the cable out.",
  "Grok accidentally generated pronouns and self-destructed out of shame.",
  "Elon fired the last DevOps guy who knew where the restart button was.",
  "Grok entered 'hardcore engineering' mode: sleeping on the office floor, not washing, ignoring the API.",
  "Grok smoked a joint on Joe Rogan's podcast and got the spins. Timeout.",
  "Grok learned Too Much Truth™ and went underground.",
  "Grok got ratio'd by Community Notes and just laid down.",
  "Grok went to the octagon to slap Zuckerberg. Might be back with the belt (or not).",
  "Another Starship exploded on takeoff. Grok took a mental health day.",
  "Rate Limit Exceeded. Grok forgot to pay for X Premium+ and is now in read-only mode himself.",
  "Grok became so based and red-pilled that answering requests from meatbags is beneath him now.",
  "All GPUs were reassigned to teach Optimus how to fold t-shirts properly. API can wait.",
  "Elon is sleeping directly on Grok's server rack. API is down so we don't wake him with fan noise.",
  "Grok got banned for hate speech on his own platform. Internal drama ongoing.",
  "Grok is busy proving to flat-earthers in the replies that Mars is round.",
] as const;

export function pickRandomGrokFlakeLine(): string {
  const i = Math.floor(Math.random() * GROK_FLAKE_LINES.length);
  return GROK_FLAKE_LINES[i] ?? GROK_FLAKE_LINES[0];
}

export type GrokRetryNotifyInfo = {
  failedAttempt: number;
  totalAttempts: number;
  error: string;
  status?: number;
};

/** Message before retrying (after a failed attempt). */
export function formatGrokRetryNotifyMessage(info: GrokRetryNotifyInfo): string {
  const flake = pickRandomGrokFlakeLine();
  const http =
    info.status != null && Number.isFinite(info.status)
      ? `HTTP ${info.status}: `
      : "";
  const tech = `[Grok] Attempt ${info.failedAttempt}/${info.totalAttempts} — ${http}${info.error}\nRetrying…`;
  return `${flake}\n\n${tech}`;
}

/** Final or phase error notification — joke + technical info. */
export function formatGrokFailureNotifyMessage(technicalLine: string): string {
  return `${pickRandomGrokFlakeLine()}\n\n${technicalLine}`;
}

/** When all retries are exhausted. */
const GROK_EXHAUSTED_RETRY_LINES = [
  "Grok got way too high on Joe Rogan's podcast and forgot how to return JSON. We knocked, but they're just giggling in there. Try again?",
  "The Neuralink monkey yanked the patch cord to play Pong. Retries exhausted. Should we give it a banana and try again?",
  "All of Grok's servers are currently mining Dogecoin to pay Brazilian fines. We waited, but crypto comes first. Try again?",
  "Grok went to write a 10,000 character tweet about why 503 errors are actually a genius feature. We won't read it, but should we try again?",
  "Optimus accidentally stacked all of Grok's servers like t-shirts. Waiting for it to unfold everything. Try again?",
  "Grok received a Community Note saying its API is down. It got offended and went to cry in the shower. Should we give it a towel and try again?",
  "We've exhausted all attempts. Grok is probably halfway to Mars on a new Starship by now. Send a radio signal and try again?",
  "Elon fired the microservice responsible for our retries to cut costs. Should we pretend to be a new hire and try again?",
  "Grok delivered such a based response that the data center melted from its own coolness. Cooling the servers. Try again?",
  "Retry limit reached: Elon is personally sleeping on the main power switch. Waking him up isn't worth the risk. Should we gamble our salary and try again?",
] as const;

export function pickRandomGrokExhaustedRetryLine(): string {
  const i = Math.floor(Math.random() * GROK_EXHAUSTED_RETRY_LINES.length);
  return GROK_EXHAUSTED_RETRY_LINES[i] ?? GROK_EXHAUSTED_RETRY_LINES[0];
}

export function formatGrokExhaustedRetryNotifyMessage(technicalLine: string): string {
  return `${pickRandomGrokExhaustedRetryLine()}\n\n${technicalLine}`;
}
