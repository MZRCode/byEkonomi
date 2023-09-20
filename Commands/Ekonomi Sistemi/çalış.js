const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const { çalışKazanç } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('çalış')
    .setDescription('1 Saat Çalışarak Saatlik Asgeri Ücret Maaşını Alırsın'),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { user } = interaction;

        const süre = 3.6e+6;
        const sonÇalışma = await mzrdb.fetch(`mzrworktime.${user.id}`);
        const kalanSüre = süre - (Date.now() - sonÇalışma);

        if (sonÇalışma !== null && süre - (Date.now() - sonÇalışma) > 0) {
            return interaction.reply({ content: `> **1** saate bir günlük paranı alabilirsin!\n> Kalan Süre: <t:${Math.floor((Date.now() + kalanSüre) / 1000)}:R>`, ephemeral: true });
        } else {
            const çalış = çalışKazanç;

            const mzrEmbed = new EmbedBuilder()
            .setTitle('Asgari Ücretle 1 Saat Çalıştın!')
            .setDescription(`Yorulmuşundur diye düşünüyorum o yüzden sana paranı veriyorum. **1 Saat** çalışarak **${çalış}TL** kazandın.`)
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

            mzrdb.add(`mzrbakiye.${user.id}`, çalış);
            mzrdb.set(`mzrworktime.${user.id}`, Date.now());
            mzrdb.add(`mzrcalismasure.${user.id}`, 1);
            await interaction.reply({ embeds: [mzrEmbed], ephemeral: false });
        }
    },
};