const express = require('express');
const path=require('path');
const fs=require('fs');
const sharp=require('sharp');
/*const pg=require('pg');*/
const {Client} =require('pg');
var app = express();  /*?????*/

const client = new Client({    /*era un pg. inainte de cliend*/
    host: 'localhost' ,
    user: 'andy',
    password: 'andy',
    database: 'db_test',
    port: 5432   
})
client.connect()


/*
const rezultat = client.query('select nume, pret, material from art', function(err,rez){
    //console.log(err, rez);
    console.log(rez.rows)
}); */



app.set("view engine", "ejs");
console.log("Dirname: ", __dirname);
app.use("/resurse", express.static(path.join(__dirname, "resurse") ))

getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0] 
    || req.connection.remoteAddress;
};

app.get(["/","/index"], function(req,res){
    /*
    res.setHeader("Content-Type","text/html");
    console.log("Salut 1");
    res.write("</!DOCTYPE html><html><head><title>Node!!!</title></head><body><p style='color:red;'>hello</p>")
    res.write("</body></html>");
    res.end();
    */
    let vector = verificaImagini();
    client.query("select unnest(enum_range( null::culoare_baza)) as categ", function(err, resz){
        res.render("pagini/index", {ipAddress: getClientAddress(req), pics:vector, info:resz.rows}); 
    });
});
/*
app.get("/index", function(req,res){
    let vector = verificaImagini();
    res.render("pagini/index", {pics:vector});
}); */

app.get("/data", function(req,res){
    res.setHeader("Content-Type","text/html");
    console.log("Salut 1");
    res.write("</!DOCTYPE html><html><head><title>Node!!!</title></head><body>" +new Date());
    res.write("</body></html>");
    res.end();
});

app.get("/art", function(req,res){
    let vector = verificaImagini();
    client.query("select unnest(enum_range( null::culoare_baza)) as categ", function(err, resz){
        res.render("pagini/art",  {ipAddress: getClientAddress(req), pics:vector, info:resz.rows}) ;
    });
});

function verificaImagini(){
    var textFisier=fs.readFileSync("resurse/json/galerie.json");
    var jsi=JSON.parse(textFisier);
    var caleGalerie=jsi.cale_galerie;
    let vectorCai=[];
    for(let im of jsi.pics){
        var imVeche= path.join(caleGalerie, im.cale_imagine);
        var ext= path.extname(im.cale_imagine);
        var numeFisier= path.basename(im.cale_imagine,ext);
        let imNoua=path.join(caleGalerie+"/mic/",numeFisier+"-mic"+".webp");
        let imNouaMare=path.join(caleGalerie+"/mare/",numeFisier+"-mare"+".webp");

        if(!fs.existsSync(imNoua))
            sharp(imVeche)
                .resize(170,113)
                .toFile(imNoua,function (err){
                    if(err)
                        console.log("eroare conversie",imVeche,"->",imNoua,err);
                });

        if(!fs.existsSync(imNouaMare))
            sharp(imVeche)
                .resize(400,600)
                .toFile(imNouaMare,function (err){
                    if(err)
                        console.log("eroare conversie",imVeche,"->",imNouaMare,err);
                });

        vectorCai.push({mare:"/"+imNouaMare,mic:"/"+imNoua,titlu:im.titlu,sfert_ora:im.sfert_ora,text_descriere:im.descriere});
    }
    return vectorCai;

};

app.get("/produse", function(req, res){
    console.log(req.query);
    console.log(req.query.categ);
    let conditie= req.query.tip ? "and categorie='"+req.query.tip+"'" : "";
    console.log('select * from art'+conditie); 
    
    client.query("select * from art where 1=1"+conditie, function(err,rez){
        client.query("select unnest(enum_range( null::culoare_baza)) as categ", function(err, resz){
            res.render("pagini/produse", {produse:rez.rows, info:resz.rows});
        });
    });
});

app.get("/item/:idi", function(req, res){
    console.log(req.params);
    
    const rezultat = client.query('select * from art where id='+req.params.idi, function(err,rez){
        client.query("select unnest(enum_range( null::culoare_baza)) as categ", function(err, resz){;
            console.log("foo");
            console.log(rez.rows);
            res.render("pagini/item", {produse:rez.rows[0], info:resz.rows});
        });
    });
    
});

app.get('/galerie.json', function(req, res){
    res.setHeader("Content-Type","text/html");
    console.log("Salut 5");
    res.write("</!DOCTYPE html><html><head><title>Eroare 403</title><p style='font-size:30px;'>Eroare 403</p></head><body><br><p style='font-size:30px;'>sorry for the inconveniance <img src='/resurse/pics/sad.png' width = 40 height = 40> </body></p>");
    res.write("</body></html>");
    res.end();
});

app.get('*', function(req, res){
    res.setHeader("Content-Type","text/html");
    console.log("Salut 1");
    res.write("</!DOCTYPE html><html><head><title>Eroare 404</title><p style='font-size:30px;'>Eroare 404</p></head><body><br><p style='font-size:30px;'>sorry for the inconveniance <img src='/resurse/pics/sad.png' width = 40 height = 40> </body></p>");
    res.write("</body></html>");
    res.end();
});

console.log("hello 2");

app.listen(8080);
console.log("a pornit serverul")

