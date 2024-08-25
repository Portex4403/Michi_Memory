let Bild1 = new Image();
let Bild2 = new Image();
let Bild3 = new Image();
let Bild4 = new Image();
let Bild5 = new Image();
let Bild6 = new Image();
let Bild7 = new Image();
let Bild8 = new Image();
let Bild9 = new Image();
let Bild10 = new Image();

Bild1.src = 'BilderMemory/Bild1.png';
Bild2.src = 'BilderMemory/Bild2.png';
Bild3.src = 'BilderMemory/Bild3.png';
Bild4.src = 'BilderMemory/Bild4.png';
Bild5.src = 'BilderMemory/Bild5.png';
Bild6.src = 'BilderMemory/Bild6.png';
Bild7.src = 'BilderMemory/Bild7.png';
Bild8.src = 'BilderMemory/Bild8.png';
Bild9.src = 'BilderMemory/Bild9.png';
Bild10.src = 'BilderMemory/Bild10.png';

let karte1 = null;
let karte2 = null;
let kartenGesperrt = false;

let kartenStapelHalb = [Bild1, Bild2, Bild3, Bild4, Bild5, Bild6, Bild7, Bild8, Bild9, Bild10];
let kartenStapelGanz = kartenStapelHalb.concat(kartenStapelHalb);
kartenStapelGanz = mischen(kartenStapelGanz);

const bilder = document.querySelectorAll('.kartenPlatz');
bilder.forEach((img, index) => {
    img.src = kartenStapelGanz[index].src;
});

const karten = document.querySelectorAll('.karte');
karten.forEach(karte => {
    karte.addEventListener('click', () => kartenDrehen(karte));
});

function mischen(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function kartenDrehen(karte){
    if(kartenGesperrt) return;
    if(karte === karte1) return;
    if(karte.classList.contains('gedreht')) return;
  
    karte.classList.add('verdeckt');
    setTimeout(()=>{
        karte.querySelector('.kartenPlatz').style.zIndex = 2;
        karte.querySelector('.hintergrundBild').style.zIndex = 1;
        karte.classList.remove('verdeckt');
        karte.classList.add('gedreht');
    },750);
    
    
    if(!karte1) {
        karte1 = karte;
    } else {
        karte2 = karte;
        pruefeUebereinstimmung();
    }
}

function pruefeUebereinstimmung() {
    kartenGesperrt = true;
    let sindGleich = karte1.querySelector('.kartenPlatz').src === karte2.querySelector('.kartenPlatz').src;

    if (sindGleich) {
        karte1.removeEventListener('click', kartenDrehen);
        karte2.removeEventListener('click', kartenDrehen);
        resetKarten();
    } else {
        setTimeout(() => {
            karte1.classList.remove('gedreht');
            karte2.classList.remove('gedreht');
            karte1.classList.add('verdeckt');
            karte2.classList.add('verdeckt');
            
            setTimeout(() => {
                
                karte1.querySelector('.kartenPlatz').style.zIndex = 1;
                karte1.querySelector('.hintergrundBild').style.zIndex = 2;
                karte2.querySelector('.kartenPlatz').style.zIndex = 1;
                karte2.querySelector('.hintergrundBild').style.zIndex = 2;
                
                karte1.classList.remove('verdeckt');
                karte2.classList.remove('verdeckt');
                karte1.classList.add('gedreht');
                karte2.classList.add('gedreht');
                
                setTimeout(()=>{
                    karte1.classList.remove('gedreht');
                    karte2.classList.remove('gedreht');
                    resetKarten()
                },450);

                
            }, 750);
        }, 1500); //Ok hier hab ich die Zeit angepass auf 1500 Milisekunden
        
    }
}

function resetKarten() {
    karte1 = "";
    karte2 = "";
    kartenGesperrt = false;
    
    
}