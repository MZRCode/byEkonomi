const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const { vergiMiktar } = require('../../../config.json');

module.exports = {
    subCommand: 'para.gönder',
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { user, options } = interaction;

        const kullanıcı = options.getUser('kullanıcı');
        const miktar = options.getNumber('miktar');
        const bakiye = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        const vergiHesapla = vergiMiktar.toString().padStart(2, '0');
        const odencekVergi = `0.${vergiHesapla}`
        console.log(odencekVergi);
        const vergiMiktarı = Math.floor(miktar * odencekVergi);
        let gercekVergiMiktari = 0;

        if (miktar > bakiye || !bakiye) {
            return interaction.reply({ content: `> Cüzlanında bu kadar para yok!\n> **Mevcut paran:** ${bakiye}TL`, ephemeral: true });
        };

        const süre = 60 * 1000;
        const sonYazma = await mzrdb.fetch(`mzrparatime.${user.id}`);
        const kalanSüre = süre - (Date.now() - sonYazma);
        if (sonYazma !== null && süre - (Date.now() - sonYazma) > 0) return interaction.reply({ content: `> **1** Dakikada bir para gönderebilirsin!\n> **Kalan Süre:** <t:${Math.floor((Date.now() + kalanSüre) / 1000)}:R>`, ephemeral: true });

        if (vergiMiktarı !== 0) {
            gercekVergiMiktari = vergiMiktarı;
            mzrdb.add(`mzrvergi.${user.id}`, gercekVergiMiktari);
        };

        mzrdb.subtract(`mzrbakiye.${user.id}`, miktar);
        mzrdb.add(`mzrbakiye.${kullanıcı.id}`, miktar - gercekVergiMiktari);
        mzrdb.set(`mzrparatime.${user.id}`, Date.now());

        const mzrEmbed = new EmbedBuilder()
        .setAuthor({ name: `${kullanıcı.username} Kullanıcısına Para Gönderdin!`, iconURL: kullanıcı.displayAvatarURL() })
        .setDescription(`${kullanıcı} kullanıcısına **${miktar.toFixed(0)}TL** gönderdin. Vergi olarak **${gercekVergiMiktari.toFixed(0)}TL** kesildi.\n\n> **Vergi Oranı:** %${vergiMiktar}`)
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL() });

        await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
    },
};


















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
