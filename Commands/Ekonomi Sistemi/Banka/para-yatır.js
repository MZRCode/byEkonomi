const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

module.exports = {
    subCommand: 'para.yatır',
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { user, options } = interaction;

        await interaction.deferReply({ ephemeral: true })

        const miktar = options.getNumber('miktar');
        const bakiye = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        const banka = mzrdb.get(`mzrbankbakiye.${user.id}`) || 0;
        const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
        const kartNumara = kart.kartNumara;
        const kartCVC = kart.cvc;
        const kartSonKullanım = kart.sonKullanım;
        const yatırılan = mzrdjs.shortNumber(miktar);
        const güncelBakiye = mzrdjs.shortNumber(bakiye - miktar);
        const güncelBankaPara = mzrdjs.shortNumber(banka + miktar);

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

        if (miktar > bakiye || !bakiye) {
            return interaction.editReply({ content: `> Cüzlanında bu kadar para yok!\n> **Mevcut paran:** ${bakiye}TL`, ephemeral: true });
        };

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Para Bankaya Yatırıldı!')
        .addFields(
            { name: '💸 Yatırılan Para Miktarı', value: `${yatırılan}`, inline: true },
            { name: '💰 Güncel Bakiye', value: `${güncelBakiye}`, inline: true },
            { name: '💰 Güncel Bankadaki Para', value: `${güncelBankaPara}`, inline: true },
            { name: '💳 Kartın Numarası', value: `${kartNumara}`, inline: true },
            { name: '💳 Kart CVC', value: `${kartCVC}`, inline: true },
            { name: '💳 Kartın Son Kullanım Tarihi', value: `${kartSonKullanım}`, inline: true },
            { name: '🙍‍♂️ Kartın Sahibi', value: `${user}`, inline: true },
        )
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })

        await interaction.editReply({ embeds: [mzrEmbed], ephemeral: true });

        mzrdb.add(`mzrbankbakiye.${user.id}`, miktar);
        mzrdb.subtract(`mzrbakiye.${user.id}`, miktar);
    },
};



















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
