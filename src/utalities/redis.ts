import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

const conn = async()=>{
    await redisClient.connect();
    // await redisClient.set('key', 'value');
    // const value = await redisClient.get('key');
    // await redisClient.disconnect();
}
conn();

export default redisClient;