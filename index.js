const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, codeBlock, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const mzrdb = require('croxydb');
const mzrdjs = require('mzrdjs');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent
],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.GuildMember,
    Partials.ThreadMember
],
});

client.config = require("./config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  const { customId, user } = interaction;

  if (customId.startsWith('mzrekonomicmd')) {
    const userId = customId.split('-')[1];
    if (userId === user.id) {
    const mzrEmbed = new EmbedBuilder()
    .setTitle("Yardım Menüm")
    .setColor("Blurple")
    .addFields(
    { name: "Ekonomi Komutları", value: `
🪙 **</bakiye:0>**
Kendinizin veya başkasının bakiyesine bakarsınız.

🪙 **</bilgi:0>**
Kendinizin veya başkasının bilgilerine bakarsınız.

🪙 **</envanter:0>**
Kendinizin veya başkasının envanterine bakarsınız.

🪙 **</çalış:0>**
Bir saatte bir çalışarak para kazanırsınız.

🪙 **</cf:0>**
Yazı tura oynarsınız.

🪙 **</slot:0>**
Slot oyunu oynarsınız.

🪙 **</dilen:0>**
Dilenerek para kazanırsınız.

🪙 **</günlük:0>**
Günlük paranızı alırsınız

🪙 **</kaz:0>**
Kazı yaparak para kazanırsınız.

🪙 **</market:0>**
Marketten kazma satın alırsınız.`, inline: true })
.setTimestamp()
.setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })

await interaction.update({ embeds: [mzrEmbed] });
  } else {
    await interaction.reply({ content: `Bu butonu sadece <@${userId}> kullanabilir!`, ephemeral: true });
  };
};

  if (customId.startsWith('mzrbankveparacmd')) {
    const userId = customId.split('-')[1];
    if (userId === user.id) {
    const mzrEmbed = new EmbedBuilder()
    .setTitle("Yardım Menüm")
    .setColor("Blurple")
    .addFields(
    { name: "Kart ve Banka Komutları", value: `
🪙 **</kart oluştur:0>**
Ekonomi sistemleri için kart oluşturursunuz.

🪙 **</kart bilgilerim:0>**
Oluşturduğunuz kartın bankasından para çekersiniz.

🪙 **</kart sil:0>**
Oluşturduğunuz kartı silersiniz.

🪙 **</para gönder:0>**
Başkasına para göndermenize yarar.

🪙 **</para yatır:0>**
Oluşturduğunuz kartın banka hesabına para yatrırısınız.

🪙 **</para çek:0>**
Oluşturduğunuz kartın banka hesabından para çekersiniz.`, inline: true })
.setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })

await interaction.update({ embeds: [mzrEmbed] });
  } else {
    await interaction.reply({ content: `Bu butonu sadece <@${userId}> kullanabilir!`, ephemeral: true });
  };
};

if (customId.startsWith('mzrkurucucmd')) {
  const userId = customId.split('-')[1];
  if (userId === user.id) {
    const mzrEmbed = new EmbedBuilder()
    .setTitle("Yardım Menüm")
    .setColor("Blurple")
    .addFields(
    { name: "Bot Sahibi Komutları", value: `
👑 **</para-ekle:0>**
Etiketlediğiniz kullanıcıya yazdığınız miktar kadar para ekler.

👑 **</para-sil:0>**
Etiketlediğiniz kullanıcıdan yazdığınız miktar kadar para siler.`, inline: true })
.setTimestamp()
.setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })

await interaction.update({ embeds: [mzrEmbed] });
  } else {
    await interaction.reply({ content: `Bu butonu sadece <@${userId}> kullanabilir!`, ephemeral: true });
  };
};

if (customId.startsWith('mzrusercmd')) {
  const userId = customId.split('-')[1];
  if (userId === user.id) {
    const mzrEmbed = new EmbedBuilder()
    .setTitle("Yardım Menüm")
    .setColor("Blurple")
    .addFields(
    { name: "Bot Sahibi Komutları", value: `
🙍‍♂️ **</yardım:0>**
Yardım menüsünü gösterir.

🙍‍♂️ **</ping:0>**
Botun pingini gösterir.

🙍‍♂️ **</invite:0>**
Botu davet edersiniz ve destek sunucusuna katılabilirsiniz.`, inline: true })
.setTimestamp()
.setFooter({ text: `${user.username} tarafından istendi.`, iconURL: user.displayAvatarURL() })

await interaction.update({ embeds: [mzrEmbed] });
    } else {
      await interaction.reply({ content: `Bu butonu sadece <@${userId}> kullanabilir!`, ephemeral: true });
    };
  };
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === 'mzrkartolustur') {
      const { user } = interaction;

      const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
      const kartNumarası = kart.kartNumara;

      if (kartNumarası) {
        return interaction.reply({ content: '> Mevcut bir kredi kartın bulunuyor!', ephemeral: true })
      };

      const kartNumaraOluştur = () => {
          let kartNum = "";
          for (let i = 0; i < 12; i++) {
              if (i > 0 && i % 3 === 0) {
                kartNum += " ";
              }
              kartNum += Math.floor(Math.random() * 10);
          }
          return kartNum;
      };

      const sonKullanımOluştur = () => {
        const month = mzrdjs.random(1, 12)
        const year = mzrdjs.random(10, 21) // Buradaki 21, 2021 yılına kadar çıkartır. 10 ise 2010'dan başlayıp yapar.
        return `${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
    };

      const kartNumara = kartNumaraOluştur();
      const kartCVC = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
      const kartSonKullanım = sonKullanımOluştur();

      const mzrEmbed = new EmbedBuilder()
          .setTitle("Kredi Kartınız Oluşturuldu ✅")
          .setColor('Green')
          .setTimestamp()
          .setFooter({ text:  user.username, iconURL: user.displayAvatarURL() })
          .addFields(
              { name: '🙍‍♂️ Kartın Sahibi', value: `${user}`, inline: true },
              { name: '💳 Kart Numarası', value: `${kartNumara}`, inline: true },
              { name: '💳 Kartın CVC', value: `${kartCVC}`, inline: true },
              { name: "💳 Kart Son Kullanım Tarihi", value: `${kartSonKullanım}`, inline: true }
          )

      await interaction.reply({ embeds: [mzrEmbed], ephemeral: true });

      mzrdb.set(`mzrkart.${user.id}`, { kartNumara: kartNumara, cvc: kartCVC, sonKullanım: kartSonKullanım });
  };
  if (interaction.customId === 'mzrkartsil') {
    await interaction.deferReply({ ephemeral: true });

    const { user } = interaction;

    const banka = mzrdb.get(`mzrbankbakiye.${user.id}`) || 0;
    const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
    const kartNumara = kart.kartNumara;
    const kartCVC = kart.cvc;
    const kartSonKullanım = kart.sonKullanım;
    const içindeki = mzrdjs.shortNumber(banka);

    if (!kartNumara) {
      return interaction.editReply({ content: '> Cüzlanında bu kadar para yok!' });
    };

    const mzrEmbed = new EmbedBuilder()
    .setTitle('Kartın Silinmesini Onaylıyormusun?')
    .setDescription(`Aşağıdaki kart bilgili kartınızın **silinmesini** onaylıyormusunuz?`)
    .setColor('Red')
    .addFields(
      { name: '💳 Kart Numarası', value: `${codeBlock("yaml", `${kartNumara}`)}`, inline: true },
      { name: '💳 Kartın CVC', value: `${codeBlock("yaml", `${kartCVC}`)}`, inline: true },
      { name: "💳 Kart Son Kullanım Tarihi", value: `${codeBlock("yaml", `${kartSonKullanım}`)}`, inline: true },
      { name: "💸 İçindeki Para", value: `${codeBlock("yaml", `${içindeki} TL`)}`, inline: true }
    )
    .setTimestamp()
    .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })
    
    const mzrButon = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setLabel('Onayla')
      .setEmoji('✅')
      .setStyle(ButtonStyle.Success)
      .setCustomId('mzrkartsilonay'))

      interaction.editReply({ embeds: [mzrEmbed], components: [mzrButon] });
  };

  if (interaction.customId === 'mzrkartsilonay') {
    const { user } = interaction;

    await interaction.deferReply({ ephemeral: true });

    const banka = mzrdb.get(`mzrbankbakiye.${user.id}`) || 0;
    const kart = mzrdb.get(`mzrkart.${user.id}`) || {};
    const kartNumara = kart.kartNumara;
    const silinen = mzrdjs.shortNumber(banka);

    if (!kartNumara) {
      return interaction.editReply({ content: '> Mevcut bir kartın bulunmuyor! Kart oluşturmak için: **/kart oluştur**' });
    };
    
    const mzrEmbed = new EmbedBuilder()
    .setTitle('Kartın Silindi!')
    .setDescription(`Kartını başarıyla sildim! aşağıdaki bölümden detayları görebilirsin.`)
    .addFields(
      { name: '💳 Kart Numarası', value: `${codeBlock("yaml", `${kartNumara}`)}`, inline: true },
      { name: '💸 Silinen Para', value: `${codeBlock("yaml", `${silinen} TL`)}`, inline: true }
    )
    .setColor('Green')
    .setTimestamp()
    .setFooter({ text: user.username, iconURL: user.displayAvatarURL() })

    interaction.editReply({ embeds: [mzrEmbed] });

    if (!banka && banka < 1) {
      mzrdb.delete(`mzrkart.${user.id}`);
    } else {
      mzrdb.delete(`mzrkart.${user.id}`);
      mzrdb.delete(`mzrbankbakiye.${user.id}`);
    };
  };
});

client.login(client.config.token);






















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
