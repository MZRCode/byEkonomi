const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const { günlükKazanç } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('günlük')
    .setDescription('Günlük Asgari Ücret Paranızı Alırsınız'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { user } = interaction;

        const süre = 8.64e+7;
        const sonGünlük = await mzrdb.fetch(`mzrgünlük.${user.id}`);
        const kalanSüre = süre - (Date.now() - sonGünlük);

        if (sonGünlük !== null && süre - (Date.now() - sonGünlük) > 0) {
            return interaction.reply({ content: `> **24** Saate bir günlük paranı alabilirsin!\n> **Kalan Süre:** <t:${Math.floor((Date.now() + kalanSüre) / 1000)}:R>`, ephemeral: true });
        } else {
            const gunluk = günlükKazanç;

            const mzrEmbed = new EmbedBuilder()
            .setTitle('Asgari Ücretli Maaşını Aldın!')
            .setDescription(`Asgari ücretde çalışıyorsun dostum çok para bekleme! **${gunluk}TL** veriyorum hadi tamam.`)
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

            mzrdb.add(`mzrbakiye.${user.id}`, gunluk);
            mzrdb.set(`mzrgünlük.${user.id}`, Date.now());
            await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
        }
    },
};