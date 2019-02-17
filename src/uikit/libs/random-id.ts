export function randomId(): string {
    return `__${Math.random().toString(36).substr(2, 9)}`;
}
