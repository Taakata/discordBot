let project = require('./project')
let client = new project()

client.on('message', msg => { client.run(client, msg) })
client.start()
