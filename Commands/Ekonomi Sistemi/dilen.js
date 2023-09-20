const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');
const kişi = ['MZR', 'YouTuber', 'Streamer', 'Yazılımıcı', 'Grafik Tasarımcısı', 'Editör'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dilen')
        .setDescription('Dilenerek Para Kazanabilirsin'),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { user } = interaction;

        await interaction.deferReply({ ephemeral: false });

        const süre = 5 * 60 * 1000; // 5dk
        const sonDilenme = await mzrdb.fetch(`mzrdilenmetime.${user.id}`);
        const kalanSüre = süre - (Date.now() - sonDilenme);

        if (sonDilenme !== null && süre - (Date.now() - sonDilenme) > 0) {
            return interaction.editReply({ content: `> **5** dakikada bir dilene bilirsin!\n> Kalan Süre: <t:${Math.floor((Date.now() + kalanSüre) / 1000)}:R>` });
        } else {
            const randomKişi = kişi[Math.floor(Math.random() * kişi.length)];

            let title = "";
            let description = "";
            let color = 'Green';
            let dilen = 0;

            if (randomKişi === 'MZR') {
                dilen = mzrdjs.random(10, 15);
                mzrdb.add(`mzrbakiye.${user.id}`, dilen);
                title = "Whattt MZR Sana Para Verdi!!!"
                description = `Üzülme ben geldim seni kurtarmaya al bu **${dilen}TL**'yi gününü iyi geçir :)`;
                color = 'Green';
            } else {
                dilen = mzrdjs.random(5, 10);
                mzrdb.add(`mzrbakiye.${user.id}`, dilen);
                title = 'Güzel Bir Adam Sana Para Verdi :)'
                description = `Senin yerinde bizde olabilirdik kardeşim **${dilen}TL** varmış onu veriyorum.`;
                color = 'Blue';
            }

            const mzrEmbed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setTimestamp()
                .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

            mzrdb.set(`mzrdilenmetime.${user.id}`, Date.now());
            await interaction.editReply({ embeds: [mzrEmbed] });
        };
    },
};