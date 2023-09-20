const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('envanter')
    .setDescription('Envanterinize Bakarsınzı'),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { user } = interaction;

        await interaction.deferReply({ ephemeral: false });

        const kazmalar = mzrdb.get(`mzrkazma.${user.id}`) || {};
        const buKazma = kazmalar.kazma || 'Kazman Yok!';
        const kazmaFiyat = kazmalar.fiyat || '0';

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Envanter')
        .addFields(
            { name: '⛏️ Mevcut Kazma', value: `${buKazma}`, inline: true },
            { name: '💸 Mevcut Kazma Fiyatı', value: `${kazmaFiyat}`, inline: true },
        )
        .setColor('Blurple')
        .setTimestamp()
        .setFooter({ text: 'discord.gg/mzrdev', iconURL: user.displayAvatarURL() })

        interaction.editReply({ embeds: [mzrEmbed] });
    },
};