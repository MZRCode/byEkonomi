const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
    subCommand: 'kart.sil',
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { user } = interaction;

        await interaction.deferReply({ ephemeral: true });

        const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
        const kartNumara = kart.kartNumara;

        if (!kartNumara) {
            const mzrEmbed = new EmbedBuilder()
            .setTitle('Kart Nasıl Oluştururum?')
            .setDescription('Aşağıdaki **Kart Oluştur** butonuna basarak kredi kartı oluştura bilirsiniz. Bu sayede banka hesabınıza para yatıra bilir ve para çekebilirsiniz.')
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })
    
            const mzrButon = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel('Kart Oluştur')
                .setCustomId('mzrkartolustur')
                .setEmoji('💳')
                .setStyle(ButtonStyle.Success))
  
            return interaction.editReply({ content: '**Mevcut kredi kartın yok!**', embeds: [mzrEmbed], components: [mzrButon] });
          };

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Bilgilendirme!')
        .setDescription('Aşağıdaki **Kart Sil** butonuna tıkladığınızda banka hesabınızdaki **para** ile beraber kartınız **silinecektir**.')
        .setColor('Red')
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

        const mzrButon = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel('Kartını Sil')
            .setCustomId('mzrkartsil')
            .setEmoji('🗑️')
            .setStyle(ButtonStyle.Danger))

        interaction.editReply({ embeds: [mzrEmbed], components: [mzrButon] });
    },
};




































































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
