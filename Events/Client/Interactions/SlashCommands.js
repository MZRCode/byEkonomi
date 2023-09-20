const { ChatInputCommandInteraction, Client } = require("discord.js");
const { DeveloperID } = require("../../../config.json")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const { user, options } = interaction;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({  content: "Bu komut artık kullanılmıyor!", ephemeral: true });

        if(command.developer && user.id !== DeveloperID)
        return interaction.reply({ content: "Bu komutu kullana bilmek için **Bot Sahibim** olmalısın!", ephemeral: true });

        const subCommand = options.getSubcommand(false);
        if(subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if (!subCommandFile) {
                console.error("SubComamnd dosyasını bulamadım!");
                return interaction.reply({ content: "Bu komut artık kullanılmıyor!", ephemeral: true });
            }
            subCommandFile.execute(interaction, client);
        } else command.execute(interaction, client);
    }
}















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
