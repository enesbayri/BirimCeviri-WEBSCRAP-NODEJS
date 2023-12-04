const puppeteer = require("puppeteer");
const dovizharfleri = require("./dovizHarfleri.json");
const path = require("path");
const dizi = [
    'TRY', 'USD', 'EUR', 'GBP', 'CHF', 'CAD',
    'RUB', 'AED', 'AUD', 'DKK', 'SEK', 'NOK',
    'JPY', 'KWD', 'ZAR', 'BHD', 'LYD', 'SAR',
    'IQD', 'ILS', 'IRR', 'INR', 'MXN', 'HUF',
    'NZD', 'BRL', 'IDR', 'CZK', 'PLN', 'RON',
    'CNY', 'ARS', 'ALL', 'BAM', 'CLP', 'COP',
    'CRC', 'DZD', 'EGP', 'HKD', 'ISK', 'HRK',
    'JOD', 'KRW', 'KZT', 'LBP', 'LKR', 'MAD',
    'MDL', 'MKD', 'MYR', 'OMR', 'PEN', 'PHP',
    'PKR', 'QAR', 'RSD', 'SGD', 'SYP', 'THB',
    'TWD', 'UAH', 'UYU', 'GEL', 'TND', 'BGN',
]
const harfAcilim=["Türk Lirası","Dolar","Euro","Sterlin","İsviçre Frangı","Kanada Doları","Rus Rublesi","B.A.E. Dirhemi",
"Avustralya Doları","Danimarka Kronu","İsveç Kronu","Norveç Kronu","Japon Yeni","Kuveyt Dinarı","G.Afrika Randı","Bahreyn Dinarı",
"Libya Dinarı","S.A. Riyali","Irak Dinarı","İsrail Yeni Şekeli","İran Riyali","Hindistan Rupisi","Meksika Pezosu","Macar Forinti",
"Y.Zelanda Doları","Brazilya Reali","Endonezya Rupisi","Çek Korunası","Polonya Zlotisi","Romen Leyi","Çin Yuanı","Arjantin Pezosu",
"Arnavut Leki","Bosna K. Mark","Şili Pezosu","Kolombiya Pezosu","K.Rika Kolonu","Cezayir Dinarı","Mısır Lirası",
"HongKong Doları","İzlanda Kronu","Hırvat Kunası","Ürdün Dinarı","G.Kore Wonu","Kazakistan Tengesi","Lübnan Paundu",
"SriLanka Rupisi","Fas Dirhemi","Moldova Leyi","Makedonya Dinarı","Malezya Ringiti","Umman Riyali","P.Yeni Solu","Filipinler Pesosu"
,"","Katar Riyali","Sırp Dinarı","Singapur Doları","Suriye Lirası","Tayland Bahtı","Tayvan Y.Doları",
"Ukrayna Hryvniası","Uruguay Pezosu","Gürcistan Larisi","Tunus Dinarı","Bulgar Levası"]             

dolarTlyeCevir = (istek, cevap, next) => {

    const cevir = async (neyden, neye, miktar) => {
        const url = `https://www.xe.com/currencyconverter/convert/?Amount=${miktar}&From=${neyden}&To=${neye}`;


        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto(url);

        /*const [element]=await page.$x('//*[@id="__next"]/div[3]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]');
        const text=await element.getProperty("textContent");
        console.log(text);
        cevap.json(text);*/
        const resultsSelector = '#__next > div:nth-child(3) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > div > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.iGrAod';
        const links = await page.evaluate(resultsSelector => {
            const anchors = Array.from(document.querySelectorAll(resultsSelector));
            return anchors.map(anchor => {
                const title = anchor.textContent.trim();
                return title;
            });
        }, resultsSelector);
        console.log(links);
        cevap.json({ "Hangi birimden": neyden, "Hangi birime": neye, "miktar": miktar, "Sonuc": links[0] });

        await browser.close();
    }


    cevir("TRY", "USD", 100);


}

harfleriAl = (istek, cevap, next) => {
    for (let i = 0; i < dovizharfleri.length; i++) {
        if (i % 2 == 1 || i == 1) {
            delete dovizharfleri[i];

        }

    }
    for (let i = 0; i < dovizharfleri.length; i++) {
        if (dovizharfleri[i] == null) {
            dovizharfleri.splice(i, 1);
        }

    }

    console.log(dovizharfleri);



}

anaSayfaKarsila = (istek, cevap, next) => {

    cevap.render("anaSayfa", { dizi: dizi,acilim:harfAcilim });
    //cevap.sendFile(path.resolve(__dirname,"../views/layout/html.html"));
}
birimCevir = (istek, cevap, next) => {
    console.log(istek.body)
    const cevir = async (neyden, neye, miktar) => {
        const url = `https://www.xe.com/currencyconverter/convert/?Amount=${miktar}&From=${neyden}&To=${neye}`;


        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto(url);

        /*const [element]=await page.$x('//*[@id="__next"]/div[3]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]');
        const text=await element.getProperty("textContent");
        console.log(text);
        cevap.json(text);*/
        //await page.screenshot({ path: `./scrapingbee_homepage.jpg` });
        const resultsSelector = '#__next > div:nth-child(3) > div.fluid-container__BaseFluidContainer-sc-qoidzu-0.cXGelU > section > div:nth-child(2) > div > main > div > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.dPdXSB';
        const links = await page.evaluate(resultsSelector => {
            const anchors = Array.from(document.querySelectorAll(resultsSelector));
            return anchors.map(anchor => {
                const title = anchor.textContent.trim();
                return title;
            });
        }, resultsSelector);
        const links1 = links[0].split(" ");
        const sonuc = links1[0];
        const birim = links1[1] + " " + links1[2];
        console.log(sonuc, birim);
        cevap.render("anaSayfa", { dizi: dizi, sonuc: sonuc, birim: birim,acilim:harfAcilim });
        await browser.close();
    }


    let miktar = 0;
    if (istek.body.miktar != "") {
        miktar = istek.body.miktar
        cevir(istek.body.neyden, istek.body.neye, miktar);
    } else {
        cevap.render("anaSayfa", { dizi: dizi, sonuc: "->", birim: "Lütfen Dönüştürülecek Birim Miktarı Girin!!" ,acilim:harfAcilim});
    }




    //cevap.render("anaSayfa",{dizi:dizi});
    //cevap.sendFile(path.resolve(__dirname,"../views/layout/html.html"));
}




module.exports = {
    anaSayfaKarsila,
    harfleriAl,
    birimCevir,
}