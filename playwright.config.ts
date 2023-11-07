import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		headless: false,
		browserName: 'firefox',
		launchOptions: {
			firefoxUserPrefs: {
				'dom.events.asyncClipboard.readText': true,
				'dom.events.testing.asyncClipboard': true,
			},
		}
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
