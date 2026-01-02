export function pick<T>(arr: T[]): T | undefined {
	return arr[Math.floor(Math.random() * arr.length)];
}
