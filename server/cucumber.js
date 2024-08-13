/* eslint-disable camelcase */
require('reflect-metadata');

const common = [
	'--require-module ts-node/register' // Load TypeScript module
];

const profile_backend = [
	...common,
	'tests/apps/profile/backend/features/**/*.feature',
	'--require tests/apps/profile/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	profile_backend
};
