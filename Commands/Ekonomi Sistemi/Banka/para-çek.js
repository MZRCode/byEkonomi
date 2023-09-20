const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

module.exports = {
    subCommand: 'para.çek',
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { user, options } = interaction;

        await interaction.deferReply({ ephemeral: true });

        const miktar = options.getNumber('miktar');
        const bakiye = mzrdb.get(`mzrbakiye.${user.id}`) || 0;
        const banka = mzrdb.get(`mzrbankbakiye.${user.id}`) || 0;
        const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
        const kartNumara = kart.kartNumara;
        const kartCVC = kart.cvc;
        const kartSonKullanım = kart.sonKullanım;
        const çekilen = mzrdjs.shortNumber(miktar);
        const güncelBakiye = mzrdjs.shortNumber(bakiye + miktar);
        const güncelBankaPara = mzrdjs.shortNumber(banka - miktar);

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

        if (miktar > banka || !banka) {
            return interaction.editReply({ content: `> Banka hesabında bu kadar paran yok!\n> **Mevcut paran:** ${banka}TL`, ephemeral: true });
        };

        const mzrEmbed = new EmbedBuilder()
        .setTitle('Para Bankadan Çekildi!')
        .addFields(
            { name: '💸 Çekilen Para Miktarı', value: `${çekilen}`, inline: true },
            { name: '🙍‍♂️ Kartın Sahibi', value: `${user}`, inline: true },
            { name: '💳 Kartın Numarası', value: `${kartNumara}`, inline: true },
            { name: '💳 Kart CVC', value: `${kartCVC}`, inline: true },
            { name: '💳 Kartın Son Kullanım Tarihi', value: `${kartSonKullanım}`, inline: true },
            { name: '💰 Güncel Bakiye', value: `${güncelBakiye}`, inline: true },
            { name: '💰 Güncel Bankadaki Para', value: `${güncelBankaPara}`, inline: true },
        )
        .setColor('Green')
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

        await interaction.editReply({ embeds: [mzrEmbed], ephemeral: true });

        mzrdb.add(`mzrbakiye.${user.id}`, miktar);
        mzrdb.subtract(`mzrbankbakiye.${user.id}`, miktar);
    },
};



















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
