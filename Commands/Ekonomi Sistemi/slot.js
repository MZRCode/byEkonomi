const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const { slotLimit } = require('../../config.json');

const slotItems = ['🔥', '💳', '💸', '💰', '🏆'];
const winRates = {
    '🔥': 2,
    '💳': 2,
    '💸': 2,
    '💰': 2,
    '🏆': 2
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slot')
        .setDescription('Slot Oynarsınız')
        .addIntegerOption(option => option
            .setName('miktar')
            .setDescription('Slot Oynamak İstediğin Miktarı Yaz')
            .setRequired(true)),
        /**
         * @param {ChatInputCommandInteraction} interaction 
         * @param {Client} client 
         */
    async execute(interaction, client) {
        const { user, options } = interaction;

        await interaction.deferReply({ ephemeral: false });

        const bakiye = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        let miktar = options.getInteger('miktar');
        let win = false;

        if (miktar > bakiye || !bakiye) {
            return interaction.editReply({ content: `> Bu kadar paran yok. Kendini zengin sanma!\n> **Mevcut paran:** ${bakiye}TL` });
        };

        if (miktar < slotLimit) {
            return interaction.editReply({ content: `> **${miktar}TL** ne kanka ya fakire paramı veriyorsun?\n> **Minimum Miktar:** ${slotLimit}TL` });
        };

        const slotResult = [];
        for (let i = 0; i < 3; i++) {
            const randomEmoji = slotItems[Math.floor(Math.random() * slotItems.length)];
            slotResult.push(randomEmoji);
        };

        const resultMessage = slotResult.join(' | ');

        let para;
        if (slotResult[0] === slotResult[1] || slotResult[1] === slotResult[2]) {
            const symbol = slotResult[0] === slotResult[1] ? slotResult[0] : slotResult[1];
            para = miktar * winRates[symbol];
            win = true;
        } else if (slotResult[0] === slotResult[1] && slotResult[1] === slotResult[2]) {
            para = miktar * winRates[slotResult[0]];
            win = true;
        }

        if (win) {
            let slotsEmbed1 = new EmbedBuilder()
                .setTitle(`Slot Machine's`)
                .setDescription(`\`${resultMessage}\`\n\nYEYY **${para}TL** kazandın!`)
                .setColor("Green")

            await interaction.editReply({ embeds: [slotsEmbed1] });
            mzrdb.add(`mzrbakiye.${user.id}`, para);
        } else {
            let slotsEmbed = new EmbedBuilder()
                .setTitle(`Slot Machine's`)
                .setDescription(`\`${resultMessage}\`\n\nOOF **${miktar}TL** kaybettin!`)
                .setColor("Red")

            await interaction.editReply({ embeds: [slotsEmbed] });
            mzrdb.subtract(`mzrbakiye.${user.id}`, miktar);
        }
    },
};