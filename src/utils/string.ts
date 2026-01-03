export function after(string: string, char: string): string {
	const idx = string.indexOf(char);

	return idx === -1 ? "" : string.slice(idx + 1);
}
