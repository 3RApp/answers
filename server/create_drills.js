const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const {GigaChat} = require('gigachat');
const { Agent } = require('node:https');
const { clear } = require('node:console');
// 
const httpsAgent = new Agent({
  rejectUnauthorized: false, // Отключает проверку корневого сертификата
  // Читайте ниже как можно включить проверку сертификата Мин. Цифры
});

const client = new GigaChat({
    accessToken: "eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.rzpmqlcy3h8-iPVsLYi93b1Sh9JnvMecPlJ7rQVmuS24LaR1Mvz1ApQ8FA4ZDVmyIxfMw0XBq6grkPEsPYIj2qSprid8fguM81e7nnnLxRK08IQTTrEAyyhKOHmrPyqZvDhN83KmaMkSZOL_jd0nfaiwuJVTaJbsUpT28WrV6127cot01gi_pXbcOg1uLTX-JO0TSY9bk-CuIDrrOwRRM0U7zWZiTRHvjwU6nM7QnKO7LO5GziTAfA4nipwPO78eJM724wqkZf-4472fXOiSzaJC3Wnqd3c6kK6o6PdvhdF-EcfCTC83ea6O-DM5aYgENYHf38nVVW3CtLKGcqqxzw.O-gu4vaVritJDHcub_6n_A.-AcJOLccaF7XkjG8BNmEooxcWSpks4FsAEnzIHBBPWl6NGfoKO5A1RVZO1qMPF-Eziivs1dhf4eveN9cylTO5WrAUeZNT4O4Qv8pZAE1TEs2PauWoOSm1rMJQKX7qcG5Y5JG6MlUiBFYGygXcovjyWZ-FhpqomJDjEo2J2S1UhnsOyo-c_APNZ730BdwEpzFGc9P9Bur-23ZjqpT-FuOojEBko3-x98HEpmV2tPcY7zdWBG4-uAOobFnIBfdzn-TI4Yts3EwmSRkHabFu2U4fhC9UR4QTkHtVvXKY5ry9Kifl1l4AOHQhrM0Z77KkQG61-SLKRbl7HsW7pdVURVjfzFe_n79mMGaLvC7zckP2SYl1In-W-N1PyDKMMkjx0_gQzBxZ10mo5jl-sH5TL3VHHxrprzOQ-ds9udf-1uWCsqLIZBlSUPJgwKXINl6ixmGwRRMtGBDvlC6zJuhBp9EGWj4jdaw9hyzQ01pFT2Q5gQhhkk_senokCukHWB0di_aV7Ycr8mDJ4vJO_Jg-_Dlu1KOpsFS9mmVQ1186uej5i2DAnulTrkPukUQbw-T2lTNPWgd96yYwwJIsv9PFhqVIK_UO1Y2q-iSOmVuDRL8U0TVGJW36xox75-JH194h8E01SDhC_h_uXHnqFxKyS3b9nHg8GZqIty42wpA23yYMK840SpCCLcq1UiM6Vg8HalUn1XFKOZnq2ztORjJ353H_yKpgRrQ_vOKnDXMLyf4bEg.8AncSDAYPlBvp_Z1rFYjTuCh17hd4u5hfo43zzeheTM",
    model: "GigaChat-Pro",
    timeout: 10000,
    httpsAgent: httpsAgent,
});

// client
//   .chat({
//     messages: [{ role: 'user', content: 'Вот JSON: ' }],
//   })
//   .then((resp) => {
//     console.log(resp.choices[0]?.message.content);
//   });

fs.readFile(path.join(cwd, "./goods.json"), "utf-8", (err, goodsString) => {
    if (err){
        console.error(err.message);
        
    } else {

        const goodsJSON = JSON.parse(goodsString);
        const goodsKeys = Object.keys(goodsJSON);
        const result = {};

        let index = 0

        try {
            const intervalId = setInterval(() => {
                
                const vendor = goodsJSON[goodsKeys[index]];

                if (vendor) {
                    const { vendorTitle, humanSubcategoryTitle } = vendor;

                    index++;

                    client
                        .chat({
                            messages: [{ 
                                role: 'user', 
                                content: `Есть имя производителя: ${vendorTitle} и описание категории: ${humanSubcategoryTitle}. Сгенерируй название товара title для этого производителя, описание description, цену price (числом) и urlUniqueKey (является написанием товара латинскими буквами и вместо пробелов нижнее подчеркивание) в формате JSON.` 
                            }],
                        })
                        .then((resp) => {

                            const json = resp.choices[0]?.message.content.replace("```", "").replace("```", "").replace("json", "").trim();

                            result[goodsKeys[index]] = {
                                ...goodsJSON[goodsKeys[index]],
                                ...JSON.parse(json),
                                index
                            };

                            console.log(result[goodsKeys[index]]);

                        }).catch((error) => {

                            console.error("Ошибка Promise catch");

                            fs.writeFile(path.join(cwd, "./test_gigachat_goods2.json"), JSON.stringify(result), (err) => {
                                if (err) {
                                    console.error(err.message);
                                    
                                } else {
                                    console.error("Success");
                                }
                            });
                        });

                } else {
                    clearInterval(intervalId);
                }
            }, 1100);

        } catch(err) {
            console.error("Ошибка в try/catch", err.message);

        } finally {
            fs.writeFile(path.join(cwd, "./test_gigachat_goods.json"), JSON.stringify(result), (err) => {
                if (err) {
                    console.error(err.message);
                    
                } else {
                    console.error("Success");
                }
            });
        }
    }
});
