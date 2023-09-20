const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName('para-sil')
    .setDescription('Kullanıcıdan Para Silersiniz')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addUserOption(option => option
        .setName('kullanıcı')
        .setDescription('Para Sileceğin Kullanıcıyı Etiketle')
        .setRequired(true))
    .addNumberOption(option => option
        .setName('miktar')
        .setDescription('Ne Kadar Para Sileceksin?')
        .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction) {
        const { options } = interaction;

        const kullanıcı = options.getUser('kullanıcı');
        const para = options.getNumber('miktar');
        const silinen = mzrdjs.shortNumber(para);

        mzrdb.subtract(`mzrbakiye.${kullanıcı.id}`, para);

        const bakiyesi = mzrdb.get(`mzrbakiye.${kullanıcı.id}`) || 0;

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Para Sildin!')
        .setDescription(`${kullanıcı} isimli kullanıcıdan başarıyla **${silinen}TL** sildin! Mevcut parası **${bakiyesi}TL** oldu.`)
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: `${kullanıcı.username} isimli kullanıcı üzüldü`, iconURL: kullanıcı.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed] })
    },
};













































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
