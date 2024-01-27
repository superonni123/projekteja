//pisteet ja pelikerrat
let pisteet = 0;
let pelit = 0;

//saatujen silmäkulujen määrä
let k_yksi = 0;
let k_kaksi = 0;
let k_kolme = 0;
let k_nelja = 0;
let k_viisi = 0;
let k_kuusi = 0;

//pyöräyttää noppaa
function pyorayta(){
    //hakee arvauksen numeerisen arvon
    arvaus = document.getElementById("arvo").valueAsNumber;
    //jos arvaus on 0<x<=6
    if(arvaus>0 && arvaus<=6){

        //hakee satunnaisen luvun väliltä 1-6
        luku = Math.floor(Math.random()*6)+1;
        //muutta sivulla olevaa silmäluku tekstiä
        document.getElementById("luku").innerHTML = "nopan silmäluku: " + luku;
        //muuttaa kuvan source-attribuuttia, jotta näkyy luvun osoittama silmäluku
        document.getElementById("noppa").setAttribute("src","kuvat/"+luku+".png");
        //nostaa pelien määrää yhdellä
        pelit += 1;
        //päivittää sivulla näkyvän tekstin
        document.getElementById("pelit").innerHTML = "pelikerrat: " + pelit;
        //kutsuu numero-funktiota
        numero(luku);
        //jos arvaus oli oiken
        if (arvaus === luku){
            //lisätään yksi piste
            pisteet += 1;
        }
        //päivitetään pisteiden määrä
        document.getElementById("pisteet").innerHTML = "pisteet: "+ pisteet
    } else{
        //ilmoittaa pelaajalle, että arvaus on väärin
        alert("arvauksen tulee olla välillä 1-6")
    }
}

//numero-funktio kasvattaa saatujen silmälukujen määrää yhdellä riippuen silmäluvusta
function numero(x){
    switch(x){
        case 1:
            k_yksi += 1;
            break;
        case 2:
            k_kaksi += 1;
            break;
        case 3:
            k_kolme += 1;
            break;
        case 4:
            k_nelja += 1;
            break;
        case 5:
            k_viisi += 1;
            break;
        case 6:
            k_kuusi += 1;
            break;
    }
    frekvenssi();
}

function frekvenssi(){
    //laskee silmälukujen frekvenssin kolmen desimaalin tarkkuuteen
    f_yksi = (k_yksi/pelit).toFixed(3);
    f_kaksi = (k_kaksi/pelit).toFixed(3);
    f_kolme = (k_kolme/pelit).toFixed(3);
    f_nelja = (k_nelja/pelit).toFixed(3);
    f_viisi = (k_viisi/pelit).toFixed(3);
    f_kuusi = (k_kuusi/pelit).toFixed(3);

    //päivittää frekvenssin sivulla olevaan taulukkoon
    document.getElementById("fre1").innerHTML = f_yksi;
    document.getElementById("fre2").innerHTML = f_kaksi;
    document.getElementById("fre3").innerHTML = f_kolme;
    document.getElementById("fre4").innerHTML = f_nelja;
    document.getElementById("fre5").innerHTML = f_viisi;
    document.getElementById("fre6").innerHTML = f_kuusi;
}
