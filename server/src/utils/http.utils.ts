export function getUpstreamStatus(error: unknown): number | undefined {
    if (typeof error === "object" && error !== null && "status" in error) {
        const status = (error as { status: unknown }).status;
        return typeof status === "number" ? status : undefined;
    }
    return undefined;
}