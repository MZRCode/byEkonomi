const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bilgi')
    .setDescription('Kendi Bilginizi ve ya Başkasının Bilgisine Bakarsınız')
    .addUserOption(option => option
        .setName('kullanıcı')
        .setDescription('Bilgisine Bakacağın Kullanıcıyı Etiketle')
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
        const vergisi = mzrdb.get(`mzrvergi.${kullanıcı.id}`) || 0;
        const çalışmaSüresi = mzrdb.get(`mzrcalismasure.${kullanıcı.id}`) || 0;
        const cüzdanındaki = mzrdjs.shortNumber(bakiyesi);
        const bankaHesabında = mzrdjs.shortNumber(bankaHesap);
        const toplamPara = mzrdjs.shortNumber(bakiyesi + bankaHesap);
        const toplamVergi = mzrdjs.shortNumber(vergisi);

        const mzrEmbed = new EmbedBuilder()
        .setAuthor({ name: `Kullanıcının Bilgileri`, iconURL: kullanıcı.displayAvatarURL(), url: `https://discord.com/users/${user.id}` })
        .addFields(
            { name: '💼 Cüzdanında', value: `${cüzdanındaki} TL`, inline: true },
            { name: '💳 Banka Hesabında', value: `${bankaHesabında} TL`, inline: true },
            { name: '💰 Toplam', value: `${toplamPara} TL`, inline: true },
            { name: '💎 Toplam Ödediği Vergi', value: `${toplamVergi} TL`, inline: true },
            { name: '⏰ Toplam Çalışma Süresi', value: `${çalışmaSüresi} Saat`, inline: true },
        )
        .setColor('Blurple')
        .setTimestamp()
        .setFooter({ text: kullanıcı.username, iconURL: kullanıcı.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false })
        } else {
        const bakiyen = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        const bankaHesabın = mzrdb.get(`mzrbankbakiye.${user.id}`) || 0;
        const vergin = mzrdb.get(`mzrvergi.${user.id}`) || 0;
        const çalışmaSüren = mzrdb.get(`mzrcalismasure.${user.id}`) || 0;
        const cüzdanındaki = mzrdjs.shortNumber(bakiyen);
        const bankaHesabında = mzrdjs.shortNumber(bankaHesabın);
        const toplamPara = mzrdjs.shortNumber(bakiyen + bankaHesabın);
        const toplamVergi = mzrdjs.shortNumber(vergin);

        const mzrEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Bilgilerinin', iconURL: user.displayAvatarURL(), url: `https://discord.com/users/${user.id}` })
        .addFields(
            { name: '💼 Cüzdanında', value: `${cüzdanındaki} TL`, inline: true },
            { name: '💳 Banka Hesabında', value: `${bankaHesabında} TL`, inline: true },
            { name: '💰 Toplam', value: `${toplamPara} TL`, inline: true },
            { name: '💎 Toplam Ödediği Vergi', value: `${toplamVergi} TL`, inline: true },
            { name: '⏰ Toplam Çalışma Süren', value: `${çalışmaSüren} Saat`, inline: true },
        )
        .setColor('Blurple')
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false })
        };
    },
};