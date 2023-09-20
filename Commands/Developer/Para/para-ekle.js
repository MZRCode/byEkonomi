const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName('para-ekle')
    .setDescription('Kullanıcıya Para Eklersiniz')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addUserOption(option => option
        .setName('kullanıcı')
        .setDescription('Para Ekleyeceğin Kullanıcıyı Etiketle')
        .setRequired(true))
    .addNumberOption(option => option
        .setName('miktar')
        .setDescription('Kaç Para Ekliceksin?')
        .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user, options } = interaction;

        const kullanıcı = options.getUser('kullanıcı');
        const para = options.getNumber('miktar');
        const bakiyesi = mzrdb.get(`mzrbakiye.${kullanıcı.id}`) || 0;
        const eklenen = mzrdjs.shortNumber(para);

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Para Ekledin!')
        .setDescription(`${kullanıcı} isimli kullanıcıya başarıyla **${eklenen}TL** ekledin! Mevcut parası **${bakiyesi + para}TL** oldu.`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${kullanıcı.username} isimli kullanıcıa artık mutlu`, iconURL: kullanıcı.displayAvatarURL() })

          mzrdb.add(`mzrbakiye.${kullanıcı.id}`, para);

        await interaction.reply({ embeds: [mzrEmbed] })
    },
};














































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
