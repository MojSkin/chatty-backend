import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
	public APP_NAME: string | undefined;
	public NODE_ENV: string | undefined;
	public DATABASE_URL: string | undefined;
	public JWT_TOKEN: string | undefined;
	public SECRET_KEY_ONE: string | undefined;
	public SECRET_KEY_TWO: string | undefined;
	public SERVER_PORT: string | undefined;
	public CLIENT_URL: string | undefined;
	public REDIS_HOST: string | undefined;

	constructor() {
		this.APP_NAME = process.env.APP_NAME || 'MojSkin-Chatty';
		this.NODE_ENV = process.env.NODE_ENV || 'local';
		this.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/chattyapp-backend';
		this.JWT_TOKEN = process.env.JWT_TOKEN || undefined;
		this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || undefined;
		this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || undefined;
		this.SERVER_PORT = process.env.SERVER_PORT || undefined;
		this.CLIENT_URL = process.env.CLIENT_URL || undefined;
		this.REDIS_HOST = process.env.REDIS_HOST || undefined;
	}

	public createLogger(name: string): bunyan {
		return bunyan.createLogger({ name, level: 'debug' });
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined.`);
			}
		}
	}
}

export const config: Config = new Config();
