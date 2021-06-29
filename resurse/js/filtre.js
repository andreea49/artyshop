window.onload=function(){


    let btn=document.getElementById("filtru");
    btn.onclick=function(){
        let greutatemax = parseInt(document.getElementById("i_range").value); //val butonului de range
        let categorieSel=document.getElementById("inp-categorie").value; //extrage val selectului simplu
        let produse=document.querySelectorAll('article[class^="produs_"]');
        for(let i = 0; i < produse.length; i++){
            produse[i].style.display="none"; 
            console.log(produse[i].getElementsByClassName("greutate")[0].innerHTML);
            let greutate=parseInt((produse[i].getElementsByClassName("greutate")[0].getInnerHTML()));
            var conditie1 = greutate < greutatemax;
            let material = produse[i].getElementsByClassName("bool")[0].getInnerHTML();
            var conditie2 = -1;
            if((document.getElementById("i_check1").checked && material == document.getElementById("i_check1").value) || (document.getElementById("i_check1").checked != true )){
                conditie2 = 1;
            }
            else {
                conditie2 = 0;
            };
            let info = produse[i].getElementsByClassName("info")[0].getInnerHTML();
            var radiobuttons=document.getElementsByName("gr_rad");		
		    var sir;
		    for(let rad of radiobuttons){
		    	if(rad.checked){
			    	sir=rad.value;
			    	break;
                }
            }
            var conditie3 = (info == sir || sir == "toate");
            let categorieArt= produse[i].getElementsByClassName("tip")[0].getInnerHTML();
            var conditie4= (categorieArt==categorieSel || categorieSel=="toate");
    
            let titlu = produse[i].getElementsByClassName("titlul")[0].getInnerHTML().toLowerCase();
            let aaa = null;
            if(document.getElementById("i_text")!=null) {
                aaa = document.getElementById("i_text").value.toLowerCase();
            }
            var conditie5 = (titlu.search(aaa) != -1 || aaa==null);
            let optiuni=document.getElementById("i_sel_multiplu").options;		
            let greutatee = parseFloat(produse[i].getElementsByClassName("greutate")[0].getInnerHTML());
            let conditie6 = false;
            for(let opt of optiuni) { 
               if(opt.selected) {
                   let oferta = opt.value;
                   let parsare = oferta.split("-");
                   if(parseFloat(parsare[0])<=greutatee && greutatee<=parseFloat(parsare[1])) {
                        conditie6 = true;
                   }
               }
            }
            let descriere = produse[i].getElementsByClassName("desc")[0].getInnerHTML().toLowerCase();
            let chei = document.getElementById('i_textarea').value.toLowerCase().split(" ");
            let cond1 = true;
            let cond2 = false;
            let nrplus = 0;
            for(let ce of chei){
                if( ce.indexOf("+")==0) {
                    nrplus++;
                }
            }
            for(let che of chei){
                if( che.indexOf("-")==0 && descriere.search(che.substr(1))!=-1) {
                    cond1 = false;
                }
                if( (che.indexOf("+")==0 && descriere.search(che.substr(1))!=-1) || nrplus == 0) {
                    cond2 = true;
                }
            }
            conditie7 = cond1 && cond2;
            ConditieTotala = conditie1 && conditie2 && conditie3 && conditie4 && conditie5 && conditie6 && conditie7;
            if (ConditieTotala)
                produse[i].style.display="grid";
        }
    }


    function sortArticole(factor){
        let arrayProduse=Array.prototype.slice.call(document.querySelectorAll('article[class^="produs_"]'));
        arrayProduse.sort(function(art1,art2){
            let greutate1=art1.getElementsByClassName("greutate")[0].innerHTML;
            let greutate2=art2.getElementsByClassName("greutate")[0].innerHTML;
            let material1=art1.getElementsByClassName("material")[0].innerHTML;
            let material2=art2.getElementsByClassName("material")[0].innerHTML;
            let rez = factor*(greutate1-greutate2);
            if (rez==0){
                return factor*material1.localeCompare(material2);
            } 
            return rez;
        });
        console.log(arrayProduse); 
        for (let prod of arrayProduse){
            prod.parentNode.appendChild(prod);
        }
    }


    btn=document.getElementById("sortCrescNume");
    btn.onclick=function(){
        sortArticole(1);
    }


    btn=document.getElementById("sortDescrescNume");
    btn.onclick=function(){
        sortArticole(-1);
    }


    btn=document.getElementById("resetare");


    btn.onclick=function(){
        let produse=document.querySelectorAll('article[class^="produs_"]');
        for (let prod of produse){
            prod.style.display="grid";
        }
        document.getElementById('i_text').value="";
        document.getElementById('i_range').value=4000;
        document.getElementById('i_check1').checked=0;
        document.getElementById('inp-categorie').value="toate";
        let radiobuttons=document.getElementsByName("gr_rad");		
		for(let rad of radiobuttons){
		    if(rad.value=="toate"){
			    rad.checked=1;
            }
        }
        let optiuni=document.getElementById("i_sel_multiplu").options;
        for(let opt of optiuni){
            console.log(opt.value);
            if (opt.value == "0-1000"){
                opt.selected=1;
            }
            else{
                opt.selected=0;
            }
        }
        document.getElementById('i_textarea').value="";	
    }


    btn = document.getElementById("calculeaza") 
            btn.onclick= function(){
            let produse=Array.prototype.slice.call(document.querySelectorAll('article[class^="produs_"]'));
            sumaArt=0;
            for (let prod of produse){
                if(prod.style.display=="grid"){
                    sumaArt+=parseFloat(prod.getElementsByClassName("greutate")[0].innerHTML);
                    console.log(prod.getElementsByClassName("greutate")[0].innerHTML);
                }
            }
            let infoSuma=document.createElement("p");
            infoSuma.innerHTML="Suma: "+sumaArt;
            infoSuma.className="info-produse";
            let p=document.getElementById("p-suma")
            p.parentNode.insertBefore(infoSuma,p.nextSibling);
            setTimeout(function(){infoSuma.remove()}, 2000);
    }
}