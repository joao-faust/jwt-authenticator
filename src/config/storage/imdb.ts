import { RedisClientType, createClient as createRedisClient } from 'redis';

let client: RedisClientType;

async function getClient(): Promise<RedisClientType> {
  if (!client) {
    client = createRedisClient();

    client.on('error', (err) => {
      console.log('Redis client error', err);
    });

    await client.connect();
    console.log('Redis client is ready');
  }

  return client;
}

export default {
  getClient,
};
