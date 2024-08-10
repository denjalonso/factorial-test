import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import gql from 'graphql-tag';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from './resolvers';
import { readFileSync } from 'fs';
import cors from 'cors';

import { registerRoutes } from './routes';

const app = express();

let httpServer: http.Server;

const typeDefs = gql(
	readFileSync('schema.graphql', {
		encoding: 'utf-8'
	})
);

const server = new ApolloServer({
	schema: buildSubgraphSchema({ typeDefs, resolvers })
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

export class Server {
	private readonly express: express.Express;
	private readonly port: string;
	private httpServer?: http.Server;

	constructor(port: string) {
		this.port = port;
		this.express = express();
		this.express.use(json());
		this.express.use(urlencoded({ extended: true }));
		this.express.use(helmet.xssFilter());
		this.express.use(helmet.noSniff());
		this.express.use(helmet.hidePoweredBy());
		this.express.use(helmet.frameguard({ action: 'deny' }));
		this.express.use(compress());
		const router = Router();
		router.use(errorHandler());
		this.express.use(router);

		registerRoutes(router);

		router.use((err: Error, req: Request, res: Response, _next: () => void) => {
			console.log(err);
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
		});
	}

	async listen(): Promise<void> {
		return new Promise(resolve => {
			const env = this.express.get('env') as string;
			this.httpServer = this.express.listen(this.port, () => {
				console.log(`  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`);
				console.log('  Press CTRL-C to stop\n');
				resolve();
			});
		});
	}

	getHTTPServer(): Server['httpServer'] {
		return this.httpServer;
	}

	async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close(error => {
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
}

export { start, listen, getHTTPServer, stop };
