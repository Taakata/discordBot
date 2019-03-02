let cmd = require('../../structures/cmd')

module.exports = class extends cmd {
    constructor() {
    super()
        this.name = 'eval'
        this.aliases = ['ev', 'code']
    }

    async run (client, msg, args) {
        if (msg.author.id !== '501370728474476545') return;
        let code = args.join(" ").replace(/^```(js|javascript ?\n)?|```$/gi, "")
        let out = eval(code)
        msg.channel.send(this.markdown("js", out))
    }

}
