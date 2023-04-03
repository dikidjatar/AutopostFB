const { exec } = require("child_process");
const figlet = require("figlet");
const chalk = require("chalk");

// fungsi clear layar
const clearLayar = function () {
  exec("clear", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
};

// fungsi banner
const showBanner = function () {
  figlet.text("AutopostFB", {
      font: "Small", 
      horizontalLayout: 'fitted'
  }, (err, data) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log(chalk.blue(data));
      console.log(chalk.yellow(`
                    Created By ${chalk.bold.green('Dikidjatar')}
                ${chalk.blue.underline('https://tiktok.com/@codingismylive')}
      `));
    });
};

// fungsi menu utama
const menuUtama = function() {
  const menu = `
  
  ${chalk.red.bold.underline('Menu Pilihan')}
  
   ${chalk.magenta.bold('(0) Keluar')}
   ${chalk.green.bold('(1) Login dengan cookie')}
   ${chalk.cyan.bold('(2) Cara mendapatkan cookie')}
  
  `;
  console.log(menu);
};

// fungsi menu extra
const menuExtra = function() {
  const menu = `
  
  ${chalk.cyan.bold.underline(`Silahkan masukan cookie facebook anda`)}
  
  `;
  console.log(menu);
};

// main menu
// ${chalk.cyanBright.bold('UserID')} : ${chalk.blue.bold.dim('10003837474')}
// ${chalk.green.bold('Nama')} : ${chalk.yellow.bold.dim('Atonement')}
const mainMenu = function() {
  const profil = `
  
  `;
  console.log(profil);
};

// fungsi untuk mulai ulang script setelah login
const restart = function () {
  exec("node index", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
};

module.exports = {
  clearLayar,
  showBanner,
  menuUtama,
  menuExtra,
  mainMenu,
  restart
};