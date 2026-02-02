import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

function createLoginRateLimit(): RateLimitRequestHandler {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    legacyHeaders: false,
    message: {
      message: 'Too many login attempts, please try again later',
    },
  });
}

export default {
  createLoginRateLimit,
};
