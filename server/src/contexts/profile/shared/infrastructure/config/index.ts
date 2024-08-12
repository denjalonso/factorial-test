import convict from 'convict';

const profileConfig = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development', 'staging', 'test'],
		default: 'default',
		env: 'NODE_ENV'
	},
	typeorm: {
		host: {
			doc: 'The database host',
			format: String,
			env: 'TYPEORM_HOST',
			default: 'localhost'
		},
		port: {
			doc: 'The database port',
			format: Number,
			env: 'TYPEORM_PORT',
			default: 5432
		},
		username: {
			doc: 'The database username',
			format: String,
			env: 'TYPEORM_USERNAME',
			default: 'parrot'
		},
		password: {
			doc: 'The database password',
			format: String,
			env: 'TYPEORM_PASSWORD',
			default: 'parroty'
		},
		database: {
			doc: 'The database name',
			format: String,
			env: 'TYPEORM_DATABASE',
			default: 'profile-backend-dev'
		}
	}
});

profileConfig.loadFile([__dirname + '/default.json', __dirname + '/' + profileConfig.get('env') + '.json']);

export default profileConfig;
