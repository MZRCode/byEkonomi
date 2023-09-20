const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bakiye')
    .setDescription('Kendi Paranıza ve ya Başkasının Parasına Bakarsınız')
    .addUserOption(option => option
        .setName('kullanıcı')
        .setDescription('Parasına Bakacağın Kullanıcıyı Etiketle')
        .setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { user, options } = interaction;

        const kullanıcı = options.getUser('kullanıcı');

        if (kullanıcı) {
        const bakiyesi = mzrdb.get(`mzrbakiye.${kullanıcı.id}`) || 0;
        const bankaHesap = mzrdb.get(`mzrbankbakiye.${kullanıcı.id}`) || 0;
        const cüzdanındaki = mzrdjs.shortNumber(bakiyesi);
        const bankaHesabında = mzrdjs.shortNumber(bankaHesap);
        const toplamPara = mzrdjs.shortNumber(bakiyesi + bankaHesap);

        const mzrEmbed = new EmbedBuilder()
        .setAuthor({ name: `Kullanıcı Bakiye Bilgileri`, iconURL: kullanıcı.displayAvatarURL(), url: `https://discord.com/users/${user.id}` })
        .addFields(
            { name: '💼 Cüzdanında', value: `${cüzdanındaki} TL`, inline: true },
            { name: '💳 Banka Hesabında', value: `${bankaHesabında} TL`, inline: true },
            { name: '💰 Toplam', value: `${toplamPara} TL`, inline: true },
        )
        .setColor('Blurple')
        .setTimestamp()
        .setFooter({ text: kullanıcı.username, iconURL: kullanıcı.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false })
        } else {
        const bakiyen = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        const bankaHesabın = mzrdb.get(`mzrbankbakiye.${user.id}`) || 0;
        const cüzdanındaki = mzrdjs.shortNumber(bakiyen);
        const bankaHesabında = mzrdjs.shortNumber(bankaHesabın);
        const toplamPara = mzrdjs.shortNumber(bakiyen + bankaHesabın);

        const mzrEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Bakiye Bilgilerinin', iconURL: user.displayAvatarURL(), url: `https://discord.com/users/${user.id}` })
        .addFields(
            { name: '💼 Cüzdanında', value: `${cüzdanındaki} TL`, inline: true },
            { name: '💳 Banka Hesabında', value: `${bankaHesabında} TL`, inline: true },
            { name: '💰 Toplam', value: `${toplamPara} TL`, inline: true },
        )
        .setColor('Blurple')
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false })
        };
    },
};