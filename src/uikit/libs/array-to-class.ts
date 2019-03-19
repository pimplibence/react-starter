export function arrayToClass(input: string[]): string {
    return (input || []).join(' ').replace('  ', ' ').trim();
}
