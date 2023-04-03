/*
CODED BY : Dikidjatar
tiktok: https://tiktok.com/@codingismylive
*/

// module
const readlineSync = require("readline-sync");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");

// module user
const { clearLayar, showBanner, menuUtama, menuExtra, mainMenu, restart } = require("./main.js");

// inisialisasi variabel
const pathFile = "data/data.json";

// cek apakah sudah ada file di folder data
if (fs.existsSync(pathFile)) {
  clearLayar();
  setTimeout(showBanner, 2000);
  setTimeout(mainMenu, 3000);
  const prosesUtama = function() {
    fs.readFile(pathFile, (err, data) => {
      if (err) throw err;
      const parsedData = JSON.parse(data);
      const cookie = parsedData.cookie;
      // console.log(parsedData.cookie)
      const text_postingan = readlineSync.question(chalk.cyan.bold(`Masukan text postingan ${chalk.green.bold.italic.underline('(Pisahkan dengan tanda + untuk postingan yang berbeda)')} : `));
      let DELAY = readlineSync.question(chalk.yellow.bold(`Masukan delay postingan, ${chalk.red('PERINGATAN')} ${chalk.green.italic('1000 artinya 1 detik, contohnya jika 10 detik berarti masukan 10000 : ')} `));
      
      if (text_postingan == '') {
        console.log(chalk.yellow.italic('Text postingan tidak boleh kosong!!'));
        setTimeout(prosesUtama, 2000);
        return false;
      }
      // jangan diubah!
     setInterval(() => {
      const config = {
        headers: {
          Cookie: cookie,
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "sec-fetch-site": "none",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "document",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
          "Host" : "mbasic.facebook.com"
        }
      };
      
      axios.get('https://mbasic.facebook.com/?_rdr', config)
       .then(response => {
         if (response.data.match(/id="mbasic_logout_button"/)) {
           // pecah text menjadi array
           let filterText = text_postingan.split('+');
           // buat random angaka
           let randomText = Math.floor(Math.random() * filterText.length);
           
           const url_posting = response.data.match(/method="post" action="(.*?)"/)[1].replace('amp;', '');
           const fb_dtsg = response.data.match(/name="fb_dtsg" value="(.*?)"/)[1];
           const jazoest = response.data.match(/name="jazoest" value="(\d+)"/)[1];
           const privacyx = response.data.match(/name="privacyx" value="(\d+)"/)[1];
           const target = response.data.match(/name="target" value="(\d+)"/)[1];
           const c_src = response.data.match(/name="c_src" value="(.*?)"/)[1];
           const cwevent = response.data.match(/name="cwevent" value="(.*?)"/)[1];
           const referrer = response.data.match(/name="referrer" value="(.*?)"/)[1];
           const ctype = response.data.match(/name="ctype" value="(.*?)"/)[1];
           const cver = response.data.match(/name="cver" value="(.*?)"/)[1];
           
           const jamMenitDetik = () => {             
            let date = new Date();
            let jam = date.getHours();
            let menit = date.getMinutes();
            let detik = date.getSeconds();
              
            jam = (jam < 10) ? '0' + jam : jam;
            menit = (menit < 10) ? '0' + menit : menit;
            detik = (detik < 10) ? '0' + detik : detik;
              
            return { jam, menit, detik };
           };
           
           const waktu = jamMenitDetik();
          // text ayng akan diposting
           let message = `${filterText[randomText]}

${waktu.jam} : ${waktu.menit} : ${waktu.detik}`;
         
           const headers = {
            Cookie: cookie,
            'referer': "https://mbasic.facebook.com/?_rdr",
            "sec-fetch-site": "same-origin",
            'origin': "https://mbasic.facebook.com",
            "content-type": "application/x-www-form-urlencoded",
          };
        
          const data = {
            url_posting,
            fb_dtsg,
            jazoest,
            privacyx,
            target,
            c_src,
            cwevent,
            referrer,
            ctype,
            cver,
            rst_ivc: '',
            xc_message: message,
            view_post: 'Posting'
          };
          
          axios.post(`https://mbasic.facebook.com${url_posting}`, data, {headers})
          .then(response => {
            if (response.request.res.responseUrl.includes('https://mbasic.facebook.com/home.php?s=')) {
              let success = chalk.blue.bold(`
${chalk.cyan.bold(`Target`)} : ${chalk.yellow.bold(target)}
${chalk.magenta.bold(`Post`)} : ${chalk.blue.bold(message)}
${chalk.yellow.bold(`Status`)} : ${chalk.green.bold('Berhasil')}

              `);
              console.log(success);
            } else {
              let gagal = chalk.blue.bold(`
${chalk.cyan.bold(`Target`)} : ${chalk.red.bold(target)}
${chalk.magenta.bold(`Post`)} : ${chalk.red.bold(message)}
${chalk.yellow.bold(`Status`)} : ${chalk.red.bold('Gagal')}

              `);
              console.log(gagal);
            }
          })
          .catch(error => console.log(error));
         
         } else {
           console.log(chalk.red.bold.italic(`Gagal mengambil data, kemungkinan cookie anda sudah kedaluarsa ${chalk.yellow.bold('Sialhkan ganti cookie anda!')}`));
         }
       })
       .catch(error => {
         console.log(error);
       });
     }, DELAY);
    });
  };
  setTimeout(prosesUtama, 4000);
} else {
  clearLayar();
  setTimeout(showBanner, 2000);
  setTimeout(menuUtama, 3000);
  
  const main = function() {
    const getCookie = () => {
      clearLayar();
      setTimeout(showBanner, 2000);
      setTimeout(menuExtra, 3000);
      const writeCookie = function() {
        const cookie = readlineSync.question(chalk.cyan.bold('Masukan Cookie : '));
        
        fs.writeFile(pathFile, JSON.stringify({cookie}), (err) => {
          if (err) throw err;
          console.log(chalk.green.bold('Silahkan mulai ulang script'));
        });
        
      };
      setTimeout(writeCookie, 4000);
    };
    
    let pilihan = readlineSync.question(chalk.cyan.bold('Masukan Pilihan : '));
    if (pilihan == 1) {
       getCookie();
    } else if (pilihan == 2) {
      console.log('lihat video : https://djtar.com/help/vid/auto-post-fb');
    } else {
      console.log('Anda memasukan pilihan yang salah');
    }
    
  };
  setTimeout(main, 4000);
  
}
