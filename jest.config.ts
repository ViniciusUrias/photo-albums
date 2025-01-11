import { pathsToModuleNameMapper } from "ts-jest";

export default {
	roots: ["<rootDir>"],
	preset: "ts-jest",
	testEnvironment: "jsdom",
	modulePaths: ["."],
	moduleNameMapper: pathsToModuleNameMapper({
		"@/*": ["./src/*"],
	}),
	transform: {
		".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$": "jest-transform-stub",
	},
};
