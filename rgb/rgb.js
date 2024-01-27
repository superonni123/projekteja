function hex(value){
    let hex = "";
    let rem;
    let vali = [];
    let letter = ["A","B","C","D","E","F"];

    while (value > 0){
        rem = value%16;
        if (rem >=10){
            vali.push(letter[rem%10]);
        } else{
            vali.push(rem);
        }
        value = ~~(value/16);
    }

    if(vali.length <2){
        vali.push(0);
    }

    for(let i=(vali.length)-1; i>=0; i--){
        hex = hex + vali[i];
    }

    return hex
}

function colorhex(){
    let red = parseInt(document.getElementById("red").value);
    let green = parseInt(document.getElementById("green").value);
    let blue = parseInt(document.getElementById("blue").value); 

    let txt = document.getElementById("rgbtxt");


    txt.innerText = `#${hex(red)}${hex(green)}${hex(blue)}`;
    txt.setAttribute("style",`color:rgb(${red},${green},${blue})`);

}

function colorrgb(){
    let txt = document.getElementById("hextxt")
    let hexVal = document.getElementById("hex").value.toUpperCase();
    redVal = hexVal.substring(0,2);
    greenVal = hexVal.substring(2,4);
    blueVal = hexVal.substring(4,6);

    console.log(`red:${redVal}, green:${greenVal}, blue:${blueVal}`);
    
    txt.innerText = `rgb(${rgb(redVal)};${rgb(greenVal)};${rgb(blueVal)})`
    txt.setAttribute("style",`color:#${hexVal}`)
}

function rgb(value){
    let val=[];
    let letter = ["A","B","C","D","E","F"];
    vals = [value.charAt(1),value.charAt(0)];

    for(i in vals){
        if(letter.indexOf(vals[i])!= -1){
            val[i]=letter.indexOf(vals[i])+10;
        }else{
            val[i]=vals[i];
        }
    }
    return(val[0]*16**0+val[1]*16**1)
}