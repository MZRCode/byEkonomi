const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { DestekSunucuLink } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Beni Davet Et"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const mzrButon = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel('Davet Et')
            .setStyle(ButtonStyle.Link)
            .setEmoji('899716843709812777')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))

            .addComponents(
            new ButtonBuilder()
            .setLabel('Topluluk Sunucusu')
            .setStyle(ButtonStyle.Link)
            .setEmoji('904316800840380448')
            .setURL(`${DestekSunucuLink}`))
            
            const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} Botuna Destek Ver`)
            .setDescription(`**${client.user.username}** Botunu kullanarak sunucunuza düzen katıp büyüte bilirsiniz.`)
            .setColor('Green')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))

            await interaction.reply({ embeds: [embed], components: [mzrButon], ephemeral: true })
        }
}