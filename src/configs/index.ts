export type AppConfig = typeof import('./app');
export type AIConfig = typeof import('./ai');
export const APP_CONFIG = 'CONFIGURATION(APP)';
export const AI_CONFIG = 'CONFIGURATION(AI)';

enum Config {
  App = 'APP',
  AI = 'AI',
}

export default Config;
