let { Client, readdirSync, join } = require("./utils/vars")
require('dotenv').config()

module.exports = class project extends Client {
    constructor() {
    super()
        this.prefix = 'b!'
        this.cmds = []
        this.token = process.env.TOKEN
        this.load(join(__dirname, './commands'))
    }

    print (text, ...tags) {
        return console.log(text, ...tags);
    }

    start () {
        return this.login(this.token);
    }

    interpreter (command) {
        if (!command.name) return false
        if (!command.aliases) return false
        try {
            command.canLoad = true
        } catch (exception) {
            command.canLoad = false
        }
        return command.canLoad;
    }

    add (command) {
        this.interpreter(command) ? this.cmds.push(command) : this.print('O comando \x1b[1m%s \x1b[0mpossuí um erro!\x1b[0m', command.name)
    }

    warn (commandUsed, executed) {
        if (executed.id !== '501370728474476545') return;
        this.print('O comando \x1b[1m%s \x1b[0mfoi executado por \x1b[1m' + executed + '\x1b[0m', commandUsed)
    }

    load (folder) {
        readdirSync(folder).forEach(category => {
            readdirSync(`${folder}/${category}`).forEach(file => {
                let Cmd = require(`${folder}/${category}/${file}`)
                Cmd = new Cmd()
                return this.add(Cmd)
            })
        })
    }

    run (options, msg) {
        if (!msg.guild | msg.author.bot | !msg.content.startsWith(this.prefix)) return;
        let args = msg.content.slice(this.prefix.length).split(/ +/g).slice(1)
        let cmd = this.cmds.filter(command => command.name === args[-1] || command.aliases.includes(args[-1]) != -1)[0]
        if (cmd == null) return;
        this.warn(cmd.name, msg.author.tag)
        return cmd.run(options, msg, args)
    }
    
}
