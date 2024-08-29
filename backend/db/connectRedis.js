//here at this point what you need to do is install WSL (Windows Subsystem for Linex) on your windows pc.
//run redis-server 
//after server has started now you can use the connection or create the connection

const redis = require('redis');

const client = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379,
        reconnectStrategy: (retries) => {
            console.log("Retry strategy called");
            return Math.min(retries * 50, 2000); // exponential backoff strategy
        }
    }
});

client.on('connect', () => {
    console.log("Connected to Redis");
});

client.on('reconnecting', () => {
    console.log("Redis client is reconnecting");
});

client.on('end', () => {
    console.log("Redis client connection has ended");
});

client.on('error', (err) => {
    console.log("Redis error: " + err);
});

// Handling async connection
(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
    }
})();

module.exports = { client };
