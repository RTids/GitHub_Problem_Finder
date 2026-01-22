import rateLimit from 'express-rate-limit';

export const createLimiter = (windowMinutes: number, maxRequests: number) =>
	rateLimit({
		windowMs: windowMinutes * 60 * 1000,
		max: maxRequests,
		standardHeaders: true,
		legacyHeaders: false,
		message: { error: 'Too many requests. Please try again later.' },
	});

export const issueLimiter = createLimiter(1, 5); // 10 requests per 1 minute
