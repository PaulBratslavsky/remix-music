export function getEnv() {
	return {
		MODE: process.env.NODE_ENV,
    STRAPI_API_URL: process.env.STRAPI_API_URL,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	const ENV: ENV
	interface Window {
		ENV: ENV
	}
}
