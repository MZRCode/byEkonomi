const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kart')
    .setDescription('Kredi Kart Sistemi')
    .addSubcommand((option) => option
      .setName('oluştur')
      .setDescription('Kredi Kartı Oluşturursunuz'))
    .addSubcommand((option) => option
      .setName('bilgilerim')
      .setDescription('Kredi Kartı Bilgilerinizi Görüntülersiniz'))
    .addSubcommand((option) => option
      .setName('sil')
      .setDescription('Kredi Kartınızı Silersiniz'))
}





















































// YouTube: @MZRDev tarafından yapılmıştır. Satılması, paylaşılması tamamen yasaktır!
