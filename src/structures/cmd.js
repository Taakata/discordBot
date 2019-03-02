module.exports = class cmd {
    constructor() {
        this.adminOnly = false
        this.markdown = (type, cont) => "```" + type + "\n" + cont + "```"
    }

    canLoad() {
        return true
    }

}
