import crypto from "crypto";

export function getDeterministicPercent(
    input: string
): number {
    const hash = crypto
        .createHash('sha256')
        .update(input)
        .digest('hex');
    const hashInt = parseInt(hash.slice(0, 8), 16);

    return hashInt % 100;
}