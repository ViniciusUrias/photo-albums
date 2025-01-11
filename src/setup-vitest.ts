import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
window.HTMLElement.prototype.setPointerCapture = vi.fn();
window.URL.createObjectURL = vi.fn();
afterEach(() => {
	cleanup();
});

vi.mock("zustand");
const ResizeObserverMock = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
