const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Yardım Menüsünü Gösterir"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
    const { user } = interaction;

    const mzrEmbed = new EmbedBuilder()
    .setTitle("Yardım Menüm")
    .setDescription('Aşağıdaki butonları kullanarak komutlarımı öğrene bilir ve kullanabilirsiniz.')
    .setTimestamp()
    .setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("Blurple")

    let mzrYardım = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel('Ekonomi')
        .setCustomId('mzrekonomicmd-' + user.id)
        .setStyle(ButtonStyle.Success)
        .setEmoji('1100093504312586310'))

    .addComponents(
        new ButtonBuilder()
        .setLabel('Banka ve Para')
        .setCustomId('mzrbankveparacmd-' + user.id)
        .setStyle(ButtonStyle.Success)
        .setEmoji('1100093504312586310'))

    .addComponents(
        new ButtonBuilder()
        .setLabel('Kurucu')
        .setCustomId('mzrkurucucmd-' + user.id)
        .setStyle(ButtonStyle.Primary)
        .setEmoji('1144018885704679444'))

    .addComponents(
        new ButtonBuilder()
        .setLabel('Kullanıcı')
        .setCustomId('mzrusercmd-' + user.id)
        .setStyle(ButtonStyle.Primary)
        .setEmoji('904102980536643614'))

    let mzrButon = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel('Davet Et')
        .setStyle(ButtonStyle.Link)
        .setEmoji('899716843709812777')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))

    await interaction.reply({ embeds: [mzrEmbed], components: [mzrYardım, mzrButon], ephemeral: false });
    },
};
