require("express")().listen(1343); //Abyss

const db = require("quick.db");
const discord = require("discord.js"); 
const client = new discord.Client({ disableEveryone: true }); 
client.login("");
const fetch = require("node-fetch");
const fs = require("fs"); 

setInterval(() => {
  var links = db.get("linkler"); 
  if (!links) return;
  var linkA = links.map(c => c.url); 
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Başarıyla Pinglendi."); 
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    
    db.set("linkler", []);
  } 
});

client.on("ready", () => {
  client.user.setActivity(`yk!yardım | yk!ekle`); 
  console.log(`Logined`); 
});



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆LİNK EKLE KISMI◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//


client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "yk!ekle") {
    var link = spl[1]; 
    fetch(link)
      .then(() => {
        
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send("**<a:shend_guvensiz:782074444494405643> Bu bot zaten uptime ediliyor.**"); 

        let yardım = new Discord.RichEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription("**<a:shend_guvenli:782074450539446282> Başarılı! Projeniz artık 7/24!**") 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        message.channel.send(yardım).then(msg => msg.delete(60000)); 
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        let yardım = new Discord.RichEmbed() 
          .setAuthor(client.user.username)
          .setColor(0x6a3db8)
          .setDescription(
            "<a:shend_guvensiz:782074444494405643> **Hata! Sadece düzgün url'ler ekleyebilirsiniz.**"
          ) 
          .setFooter(`© ${client.user.username}`)
          .setTimestamp();
        return message.channel.send(yardım).then(msg => msg.delete(60000)); 
      }); //Abyss
  }
});


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆LİNK SAY KISMI◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

client.on("message", message => {

  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "yk!botsay") {

    var link = spl[1];
    message.channel.send(`Toplamda **${db.get("linkler").length}** Mevcut`); //Abyss
  }
});

const Discord = require("discord.js");


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆YARDIM KISMI◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "yk!yardım") {
    let embed = new Discord.RichEmbed() 
 .setDescription(
        `**<a:shend_tamir:782074877062545468> **Prefixim : yk!**

<a:yk_hyps:795568170361552926> **yk!yardım** : Botun yardım menüsünü açar.

<a:yk_hyps:795568170361552926> **yk!ekle** : Eklediğiniz proje linkini 7/24 açık yapar.

<a:yk_hyps:795568170361552926> **yk!botsay** : Bot'umuzla uptime olan proje sayısını gösterir.

<a:yk_hyps:795568170361552926> **yk!bilgi** : Bot'un istastistik verilerini gösterir.

<a:yk_hyps:795568170361552926> **yk!davet** : Bot'un davet linkini atar.

`
      )
      .setAuthor(`ThundeR Discord Bot | Yardım Paneli`, client.user.avatarURL)
      .setFooter(`ThundeR | Botun Kodlayıcısı : Abyss ✩#0001`) 
      .setColor("#ff0004")
      .setImage(
        `https://media.discordapp.net/attachments/779065987382902795/795564974617264148/standard.gif`
      );
    return message.channel.send(embed); //Abyss
  }
});
const log = message => {
  console.log(`${message}`);
};

//Abyss

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆BİLGİ KISMI◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//


client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "yk!bilgi") {
    let embed = new Discord.RichEmbed() 
   .setTitle(`__${client.user.username} Bot Bilgi Menüsü__`)
   .setDescription(`**Toplam :** \n \n <a:shend_guvenli:782074450539446282> **${client.guilds.size}** Adet Sunucuya \n \n <a:shend_guvenli:782074450539446282> **${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** Kullanıcıya \n \n <a:shend_guvenli:782074450539446282> **${client.channels.size}** kanala hizmet veriyor! `) //Abyss
   .setThumbnail(client.user.avatarURL)   
   .setColor(`#36393e`) 
    return message.channel.sendEmbed(embed);
    return message.channel.send(embed); //Abyss
 }
});

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆DAVET KISMI◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//


client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); 
  if (spl[0] == "yk!davet") {
    let embed = new Discord.RichEmbed() 

        .setTitle(`${client.user.username} Davet Menüsü `)
        .setDescription(`<:abyss_botdev:793381484856868875> **Botun Davet Linki İçin** [TIKLA](https://discord.com/api/oauth2/authorize?client_id=793042531272228924&permissions=851136&scope=bot) \n <a:shend_discord:782074840550473748> **Destek Sunucusu İçin** [TIKLA](https://discord.gg/TvBk2Q2xHc)`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Başarıyla Davet Sistemi Kullandı`, message.author.avatarURL)
        .setColor(`#36393e`)
    return message.channel.sendEmbed(embed);
    return message.channel.send(embed); //Abyss
  }
});


//Coded by Abyss
