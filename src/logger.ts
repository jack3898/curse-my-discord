import { type } from "arktype";
import winston from "winston";
import Transport from "winston-transport";

const { combine, timestamp } = winston.format;

const Level = type.enumerated(
	"info",
	"warn",
	"error",
	"verbose",
	"debug",
	"silly",
);

const FormatSchema = type({
	level: Level,
	message: "string",
	timestamp: "string.date.iso",
});

export type FormatSchema = typeof FormatSchema.infer;

class MemoryTransport extends Transport {
	private logs: (typeof FormatSchema.infer)[] = [];
	private maxLogs = 100;

	override log(info: winston.Logform.TransformableInfo, next: () => void) {
		setImmediate(() => {
			this.emit("logged", info);

			const parsed = FormatSchema.assert(info);

			this.logs.push(parsed);
			this.logs = this.logs.slice(-this.maxLogs);

			next();
		});
	}

	getTail(tail = Infinity) {
		return this.logs.slice(-tail);
	}
}

const memoryTransportSingleton = new MemoryTransport();

export function getTail(tail?: number) {
	return memoryTransportSingleton.getTail(tail);
}

export const logger = winston.createLogger({
	level: "verbose",
	format: combine(timestamp(), winston.format.simple()),
	transports: [
		new winston.transports.Console({
			format: combine(winston.format.printf((info) => logFormat(info))),
		}),
		memoryTransportSingleton,
	],
});

export function logFormat(info: winston.Logform.TransformableInfo): string {
	const parsed = FormatSchema.assert(info);

	return `[${parsed.level}] ${parsed.timestamp}: ${parsed.message}`;
}
