import {start, listen, getHTTPServer, stop} from './server';
import http from "http";

export class ProfileBackendApp {
	async start(): Promise<void> {
		const port = process.env.PORT ?? '8080';
		await start()

		return await listen(port);
	}

	get httpServer(): http.Server | undefined {
		return getHTTPServer();
	}

	async stop(): Promise<void> {
		return stop();
	}
}
