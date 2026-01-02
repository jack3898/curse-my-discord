export function chance(oneInX: number): boolean {
	return Math.floor(Math.random() * oneInX) === 0;
}

export function pick<T>(arr: T[]): T | undefined {
	return arr[Math.floor(Math.random() * arr.length)];
}
