const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const weightedRandom = require('weighted-random');
const choices = [
    { option: 'Yazı', weight: 50 },
    { option: 'Tura', weight: 50 }
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cf')
    .setDescription('Yazı Tura Oynarsınız')
    .addIntegerOption(option => option
        .setName('miktar')
        .setDescription('Oynamak İstediğiniz Miktarı Yazınız')
        .setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { user, options } = interaction;

        await interaction.deferReply({ ephemeral: false });

        const bakiye = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        const miktar = options.getInteger('miktar');
        let kazanan;
        let kaybeden;
        let seçilen;

        if (miktar > bakiye || !bakiye) {
            return interaction.editReply({ content: `> Bu kadar paran yok. Kendini zengin sanma!\n> **Mevcut paran:** ${bakiye}TL` });
        };

        const süre = 60000; // 1 dk
        const sonCf = await mzrdb.fetch(`mzrcftime.${user.id}`);
        const kalanSüre = süre - (Date.now() - sonCf);

        if (sonCf !== null && süre - (Date.now() - sonCf) > 0) {
            return interaction.editReply({ content: `> **1** dakikada bir yazu tura oynaya bilirsin!\n> Kalan Süre: <t:${Math.floor((Date.now() + kalanSüre) / 1000)}:R>` });
        } else {
        const botSecimi = weightedRandom(choices.map(choice => choice.weight));
        const botunSectigi = choices[botSecimi].option;

        const kullanıcıSecimi = weightedRandom(choices.map(choice => choice.weight));
        const kullanıcıyaSecilen = choices[kullanıcıSecimi].option;

        if (kullanıcıyaSecilen === 'Yazı') {
            seçilen = '📀'
        } else {
            seçilen = '💿'
        };

        await interaction.editReply({ content: `**${user.username}** **${miktar}TL** oynadı ve **${seçilen}** seçti!\nCoin çeviriliyor... 🪙` });

        if (kullanıcıyaSecilen === 'Yazı') {
            kazanan = '📀';
            kaybeden = '💿';
        } else {
            kazanan = '💿';
            kaybeden = '📀';
        }

        setTimeout(async () => {
        if (kullanıcıyaSecilen === botunSectigi) {
            await interaction.editReply({ content: `**${user.username}** **${miktar}TL** oynadı ve **${seçilen}** seçti!\nCoin çeviriliyor... **${kazanan}** çıktı ve **${miktar * 2}TL** kazandın!` });

            mzrdb.add(`mzrbakiye.${user.id}`, miktar);
            mzrdb.set(`mzrcftime.${user.id}`, Date.now());
        } else {
            await interaction.editReply({ content: `**${user.username}** **${miktar}TL** oynadı ve **${seçilen}** seçti!\nCoin çeviriliyor... **${kaybeden}** çıktı ve **${miktar}TL** kaybettin!` });

            mzrdb.subtract(`mzrbakiye.${user.id}`, miktar);
            mzrdb.set(`mzrcftime.${user.id}`, Date.now());
        };
        }, 3000);
      };
    },
};