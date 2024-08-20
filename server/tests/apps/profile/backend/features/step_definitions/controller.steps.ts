import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import { ProfileBackendApp } from '../../../../../../src/apps/profile/backend/ProfileBackendApp';
import container from "../../../../../../src/apps/profile/backend/dependency-injection";
import { EnvironmentArranger } from '../../../../../contexts/shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let application: ProfileBackendApp;
let _response: request.Response;
let environmentArranger: EnvironmentArranger;

Given('I send a GET request to {string}', (route: string) => {
	_request = request(application.httpServer).get(route);
});

Given('I send a graphql request with query and variables:', (mutation: string) => {
	const queryData = JSON.parse(mutation);
	console.log(queryData);
	_request = request(application.httpServer).post('/graphql').send(queryData);
});

Then('the response status code should be {int}', async (status: number) => {
	_response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
	_request = request(application.httpServer)
		.put(route)
		.send(JSON.parse(body) as object);
});

Then('the response should be empty', () => {
	assert.deepStrictEqual(_response.body, {});
});

Then('the response should be', (data: string) => {
	assert.deepStrictEqual(_response.body, JSON.parse(data));
});

BeforeAll(async () => {
	environmentArranger = await container.get<Promise<EnvironmentArranger>>('Profile.EnvironmentArranger');
	await environmentArranger.arrange();

	application = new ProfileBackendApp();
	await application.start();
});

AfterAll(async () => {
	await environmentArranger.close();

	await application.stop();
});
