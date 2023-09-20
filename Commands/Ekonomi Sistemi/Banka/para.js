const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('para')
    .setDescription('Banka Sistemi')
    .addSubcommand((option) => option
      .setName('yatır')
      .setDescription('Kredi Kartınız ile Para Yatırırsınız')
     .addNumberOption(option => option
      .setName('miktar')
      .setDescription('Bankaya Yatıracağınız Para Miktarınızı Yazınız')
      .setRequired(true))
    )
    .addSubcommand((option) => option
      .setName('çek')
      .setDescription('Kredi Kartınız ile Para Çekersiniz')
      .addNumberOption(option => option
        .setName('miktar')
        .setDescription('Bankadan Çekeceğiniz Para Miktarınızı Yazınız')
        .setRequired(true))
    )
    .addSubcommand((option) => option
      .setName('gönder')
      .setDescription('Bir Kullanıcıya Para Göndermenize Yarar')
      .addUserOption(option => option
        .setName('kullanıcı')
        .setDescription('Para Gönderilecek Kullanıcı')
        .setRequired(true))
      .addNumberOption(option => option
        .setName('miktar')
        .setDescription('Gönderilecek Para Miktarı')
        .setRequired(true))
    )
};






















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
