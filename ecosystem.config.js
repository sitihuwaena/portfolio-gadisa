module.exports = {
    name: "Frontend Next JS",
    script: "bun run start",
    env: {
        "NODE_ENV": "production",
    },
    interpreter: 'bun',
    exec_mode: 'cluster',
    instances: 2,
}