import { vi } from 'vitest';

vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
	onBreadcrumbClick: () => undefined,
	setBreadcrumbs: () => undefined,
	onLanguageSelect: () => undefined,
	setAvailableLanguages: () => undefined,
	injectDecoratorClientSide: () => undefined,
}));
