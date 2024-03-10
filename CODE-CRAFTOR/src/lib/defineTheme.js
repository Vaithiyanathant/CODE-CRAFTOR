/** @format */

import { loader } from "@monaco-editor/react";

// Import theme JSON files statically
import Active4D from "monaco-themes/themes/Active4D.json";
import AllHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
import Amy from "monaco-themes/themes/Amy.json";
import BirdsOfParadise from "monaco-themes/themes/Birds of Paradise.json";
// Import other themes similarly

import Blackboard from "monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "monaco-themes/themes/Clouds Midnight.json";
import Clouds from "monaco-themes/themes/Clouds.json";


const monacoThemes = {
	active4d: Active4D,
	"all-hallows-eve": AllHallowsEve,
	amy: Amy,
	"Birds of Paradise": BirdsOfParadise,
	Blackboard,
	"Brilliance Black": BrillianceBlack,
	"Brilliance Dull": BrillianceDull,
	"Chrome DevTools": ChromeDevTools,
	"Clouds Midnight": CloudsMidnight,
	Clouds,
};

const defineTheme = (theme) => {
	return new Promise((resolve) => {
		loader.init().then(() => {
			const themeData = monacoThemes[theme];
			if (themeData) {
				monaco.editor.defineTheme(theme, themeData);
			}
			resolve();
		});
	});
};

export { defineTheme };
