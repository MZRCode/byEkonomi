const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');
const maden = ['Demir', 'Altın', 'Elmas'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kaz')
        .setDescription('Maden Kazarsınız'),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { user } = interaction;

        await interaction.deferReply({ ephemeral: false });

        const kazmalar = mzrdb.get(`mzrkazma.${user.id}`) || {};
        const buKazma = kazmalar.kazma || 'Kazman Yok!';
        let süreDK;

        if (buKazma === 'Demir Kazma') {
            süreDK = 5; // 5 dk
        } else if (buKazma === 'Elmas Kazma') {
            süreDK = 4; // 4 dk
        }

        const süre = süreDK * 60 * 1000;
        const sonKazma = await mzrdb.fetch(`mzrkaztime.${user.id}`);
        const kalanSüre = süre - (Date.now() - sonKazma);

        if (buKazma === 'Kazman Yok!') {
            interaction.editReply({ content: '> Kazman olmadan kıramazsın!' });
        };

        if (sonKazma !== null && süre - (Date.now() - sonKazma) > 0) {
            return interaction.editReply({ content: `> **${süreDK}** dakikada bir dilene bilirsin!\n> Kalan Süre: <t:${Math.floor((Date.now() + kalanSüre) / 1000)}:R>` });
        } else {

            const bakiye = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
            let para;

            if (buKazma === 'Demir Kazma') {

                para = mzrdjs.random(10, 15)
                interaction.editReply({ content: '> **Demir Kazma** ile kırmaya başladın...' });
                mzrdb.set(`mzrkaztime.${user.id}`, Date.now());
                setTimeout(() => {
                    interaction.editReply({ content: `> Toplam **${para}TL** değerinde maden çıkardın ve sattın!` });
                    mzrdb.add(`mzrbakiye.${user.id}`, para);
                }, 10 * 1000);

            } else if (buKazma === 'Elmas Kazma') {

                para = mzrdjs.random(10, 15)
                interaction.editReply({ content: '> **Elmas Kazma** ile kırmaya başladın...' });
                mzrdb.set(`mzrkaztime.${user.id}`, Date.now());
                setTimeout(() => {
                    interaction.editReply({ content: `> Toplam **${para}TL** değerinde maden çıkardın ve sattın!` });
                    mzrdb.add(`mzrbakiye.${user.id}`, para);
                }, 5 * 1000);
            }
        };
    },
};