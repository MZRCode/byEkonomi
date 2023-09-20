const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mzrdb = require('croxydb');
const { createCanvas, loadImage  } = require('canvas');

module.exports = {
    subCommand: 'kart.bilgilerim',
    async execute(interaction) {
        const { user } = interaction;

        await interaction.deferReply({ ephemeral: true });

        const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
        const kartNumara = kart.kartNumara;
        const kartCVC = kart.cvc;
        const kartSonKullanım = kart.sonKullanım;

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

        const canvas = createCanvas(1092, 678);
        const ctx = canvas.getContext('2d');
        const bank = 'https://cdn.discordapp.com/attachments/904050075020460123/1140611074903789588/MZRBank.png';

        const bankImage = await loadImage(bank);
        
        ctx.drawImage(bankImage, 0, 0, canvas.width, canvas.height);

        /*ctx.font = '53pt Jokerman';
        ctx.fillStyle = 'white';
        ctx.fillText(`${kartNumara}`, 275, 370, 935); // 275, 370, 935*/

        const kartNumaraSplit = kartNumara.split('');
        let kartNumaraX = 275;
        let kartNumaraY = 370;

        ctx.font = '53pt Jokerman';
        ctx.fillStyle = 'white';
        for (let i = 0; i < kartNumaraSplit.length; i++) {
          ctx.fillText(kartNumaraSplit[i], kartNumaraX, kartNumaraY);
          kartNumaraX += ctx.measureText(kartNumaraSplit[i]).width + 10;
        };

        ctx.font = '30pt Jokerman';
        ctx.fillStyle = 'white';
        ctx.fillText(`${kartCVC}`, 125, 465);

        ctx.font = '30pt Jokerman';
        ctx.fillStyle = 'white';
        ctx.fillText(`${kartSonKullanım}`, 893, 430); // 935, 430

        let kartSahibiX = 70;
        let kartSahibiY = 650;
        
        ctx.font = '35pt Jokerman';
        ctx.fillStyle = 'white';
        for (let i = 0; i < user.username.length; i++) {
          ctx.fillText(user.username[i], kartSahibiX, kartSahibiY);
          kartSahibiX += ctx.measureText(user.username[i]).width + 10; 
        };

        const attachment = new AttachmentBuilder(
            canvas.toBuffer(),
            'mzr.jpg'
        );

        /* BU KISMI NASIL YAPACAĞINIZI VIDEODA GÖSTERİYOM, VIDEOYU IZLEMEZSEN HATA ALIRSIN!
        const mzrEmbed = new EmbedBuilder()
        .setTitle('Kart Bilgilerin')
        .addFields(
          { name: '🙍‍♂️ Kart Sahibi', value: `${user}`, inline: true },
          { name: '💳 Kart Numarası', value: `${kartNumara}`, inline: true },
          { name: '💳 Kart CVC', value: `${kartCVC}`, inline: true },
          { name: '💳 Kart Son Kullanım Tarihi', value: `${kartSonKullanım}`, inline: true },
          { name: '💰 Bankadaki Para', value: `${banka}`, inline: true }
        )
        .setColor('Blue')
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL() });

        interaction.editReply({ embeds: [mzrEmbed] });*/

        interaction.editReply({ files: [attachment] });
    },
};






































































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
