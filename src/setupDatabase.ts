import mongoose from 'mongoose';
import Logger from 'bunyan';
import * as process from 'process';
import { config } from './config';

const log: Logger = config.createLogger('database');

export default () => {
	const connect = () => {
		mongoose
			.connect(`${config.DATABASE_URL}`)
			.then((res) => {
				log.info('Database is connected successfully.');
			})
			.catch((err) => {
				log.error('DB Connection error:', err);
				return process.exit(1);
			});
	};

	connect();

	mongoose.connection.on('disconnected', connect);
};
