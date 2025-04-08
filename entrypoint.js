#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const readline = require("node:readline");

const ROOT_DIRECTORY = __dirname;

const EXCLUDED_DIRECTORIES = ["node_modules", ".git", "dist"];

async function promptSelection(options, promptText) {
	const r1 = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	console.log(`\n${promptText}:\n`);
	options.forEach((option, index) => console.log(`${index + 1}. ${option}`));
	return new Promise((resolve) => {
		r1.question("\nChoose an option: ", (choice) => {
			r1.close();
			const index = Number.parseInt(choice) - 1;
			resolve(index >= 0 && index < options.length ? options[index] : null);
		});
	});
}

(async () => {
	try {
		const dirs = fs
			.readdirSync(ROOT_DIRECTORY)
			.filter(
				(directory) =>
					fs.statSync(path.join(ROOT_DIRECTORY, directory)).isDirectory() &&
					!EXCLUDED_DIRECTORIES.includes(directory),
			);
		if (!dirs.length) {
			throw new Error("No directories found.");
		}

		const selectedDirectory = await promptSelection(dirs, "Select a directory");
		if (!selectedDirectory) {
			throw new Error("Invalid directory selection");
		}

		const directoryPath = path.join(ROOT_DIRECTORY, selectedDirectory);
		const jsFiles = fs
			.readdirSync(directoryPath)
			.filter((file) => file.endsWith(".js") && !file.startsWith("."));

		if (!jsFiles.length) {
			throw new Error(`No .js files in "${selectedDirectory}".`);
		}

		const selectedFile = await promptSelection(
			jsFiles,
			`Select a file in ${selectedDirectory}`,
		);

		if (!selectedFile) {
			throw new Error("Invalid file selection.");
		}

		const filePath = path.join(directoryPath, selectedFile);
		console.log(`\n>> Starting: nodemon ${filePath}\n`);
		spawn("nodemon", [filePath], { stdio: "inherit" });
	} catch (error) {
		console.error(`\nError: ${error.message}`);
		process.exit(1);
	}
})();
