import { vi } from 'vitest';

vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
	onBreadcrumbClick: () => undefined,
	setBreadcrumbs: () => undefined,
	onLanguageSelect: () => undefined,
	setAvailableLanguages: () => undefined,
	injectDecoratorClientSide: () => undefined,
}));

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
	configurable: true,
	writable: true,
	value: vi.fn().mockImplementation((type: string) => {
		if (type === '2d') {
			return {
				measureText: (text: string) => ({ width: text?.length ?? 0 }),
				fillText: () => undefined,
				strokeText: () => undefined,
				clearRect: () => undefined,
				fillRect: () => undefined,
				strokeRect: () => undefined,
				beginPath: () => undefined,
				moveTo: () => undefined,
				lineTo: () => undefined,
				closePath: () => undefined,
				stroke: () => undefined,
				fill: () => undefined,
				arc: () => undefined,
				save: () => undefined,
				restore: () => undefined,
				setTransform: () => undefined,
				canvas: document.createElement('canvas'),
				font: '',
				textAlign: 'start',
				textBaseline: 'alphabetic',
			};
		}

		return null;
	}),
});

