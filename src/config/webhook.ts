export const WEBHOOK_CONFIG = {
  URL: 'https://hook.us1.make.com/388ruamlh7u3uppj2p919o98h1gaburb',
  TIMEOUT: 3000, // 3 segundos
  MAX_RETRIES: 2,
  RETRY_DELAY: 500, // 500ms
  TOKEN: '388ruamlh7u3uppj2p919o98h1gaburb'
};

export const WEBHOOK_EVENTS = {
  ALL_DATA: 'all_data'
};

export type WebhookEventType = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];

export interface WebhookResponse {
  success: boolean;
  error?: Error;
  retryCount?: number;
}

export interface WebhookError extends Error {
  status?: number;
  response?: Response;
} 