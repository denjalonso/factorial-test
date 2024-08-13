import 'reflect-metadata';
import { ProfileBackendApp } from './ProfileBackendApp';

try {
	new ProfileBackendApp().start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on('uncaughtException', err => {
	console.log('uncaughtException', err);
	process.exit(1);
});
