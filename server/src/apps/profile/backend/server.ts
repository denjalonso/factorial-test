import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchemaSync } from 'type-graphql';
import cors from 'cors';

import { registerRoutes } from './rest/routes';
import container from './dependency-injection';
import { UserResolver } from './graphql/resolvers/UserResolver';
import path from 'node:path';

const app = express();

let httpServer: http.Server;

const schema = buildSchemaSync({
	resolvers: [UserResolver],
	container: {
		get: cls => container.get(cls.name)
	},
	emitSchemaFile: path.resolve(__dirname, 'graphql/schema/schema.graphql'),
	validate: false
});

const server = new ApolloServer({
	schema
});

async function start() {
	await server.start();
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.hidePoweredBy());
	app.use(helmet.frameguard({ action: 'deny' }));
	app.use(compress());

	const router = Router();
	router.use(errorHandler());
	app.use(router);

	registerRoutes(router);

	router.use((err: Error, req: Request, res: Response, _next: () => void) => {
		console.log(err);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
	});

	app.use('/graphql', cors(), express.json(), expressMiddleware(server));
}

async function listen(port: string): Promise<void> {
	return new Promise(resolve => {
		const env = app.get('env') as string;
		httpServer = app.listen(port, () => {
			console.log(`  Mock Backend App is running at http://localhost:${port} in ${env} mode`);
			console.log('  Press CTRL-C to stop\n');
			resolve();
		});
	});
}

function getHTTPServer(): http.Server {
	return httpServer;
}

async function stop(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (httpServer) {
			httpServer.close(error => {
				if (error) {
					reject(error);

					return;
				}

				resolve();
			});
		}

		resolve();
	});
}

export { start, listen, getHTTPServer, stop };
