// Elementų selektoriai
const slider      = document.getElementById("temp-slider");
const minusBtn    = document.getElementById("minus");
const plusBtn     = document.getElementById("plus");
const thermoFill  = document.getElementById("thermo-fill");
const tempValue   = document.getElementById("temp-value");
const scaleSelect = document.getElementById("scale");
const clothesText = document.getElementById("clothes-text");

// Dviejų drabužių sluoksnių elementai
const img1 = document.getElementById("clothes-img-1");
const img2 = document.getElementById("clothes-img-2");
const img3 = document.getElementById("clothes-img-3");
const img4 = document.getElementById("clothes-img-4");
let tempC = 0; // visada Celsijais

// Konvertavimas
function toF(c){ return c * 9/5 + 32; }
function toK(c){ return c + 273.15; }

// Formatuojame temperatūrą pagal pasirinką skalę
function formatTemp(c){
  const s = scaleSelect.value;
  if(s === "C") return `${c.toFixed(1)}°C`;
  if(s === "F") return `${toF(c).toFixed(1)}°F`;
  return `${toK(c).toFixed(2)} K`;
}

// Grąžina spalvą pagal Celsijų
function getColor(c){
  if(c < 0){
    const t = (c + 50)/50;
    const r = Math.floor(0   + 102*t);
    const g = Math.floor(51  + 153*t);
    const b = Math.floor(204 +  51*t);
    return `rgb(${r},${g},${b})`;
  } else {
    const t = c/50;
    const g = Math.floor(153 + (51-153)*t);
    const b = Math.floor(102 + (0-102)*t);
    return `rgb(255,${g},${b})`;
  }
}

// Pagrindinė atnaujinimo funkcija
function updateUI(){
  // 1) Termometro dalis
  tempValue.textContent = formatTemp(tempC);
  const pct = (tempC + 50)/100*100;
  thermoFill.style.height     = pct + "%";
  thermoFill.style.background = getColor(tempC);

  // 2) Aprangos tekstas ir vienas stačiakampis paveiksliukas
  if (tempC <= -30) {
    clothesText.textContent = "Ekstremali šalčio apranga...";
  } else if (tempC <= -10) {
    clothesText.textContent = "Labai šalta: storas paltas...";
  } else if (tempC <= 5) {
    clothesText.textContent = "Vėsu: striukė, džemperis.";
  } else if (tempC <= 15) {
    clothesText.textContent = "Pavasariška: lengva striukė.";
  } else if (tempC <= 25) {
    clothesText.textContent = "Maloni temperatūra: marškinėliai.";
  } else if (tempC <= 35) {
    clothesText.textContent = "Karšta: šortai, maikutė.";
  } else {
    clothesText.textContent = "Labai karšta: kuo mažiau rūbų.";
  }

  // 3) Drabužių sluoksniai (dvi nuotraukos)
  updateClothesImages();
}
function updateClothesImages() {
  // 1) paslepiame visus sluoksnius
  [img1, img2, img3, img4].forEach(img => {
    img.style.display = "none";
    img.src = "";  // išvalome, kad vėliau galėtume patikrinti
  });

  // 2) pagal tempC intervalą nustatome tekstą ir paveiksliukus
  if (tempC <= -30) {
    clothesText.textContent = "Ekstremali šalčio apranga: pūkinė striukė, pirštinės...";
    img1.src = "img/kailine.jpg";
    img2.src = "img/termo.jpg";
    img3.src = "img/termok.jpeg";
    img4.src = "img/arc_bat.jpeg";
  }
  else if (tempC <= -10) {
    clothesText.textContent = "Labai šalta: storas paltas, kepurė...";
    img1.src = "img/kepure.avif";
    img2.src = "img/kelnesz.webp";
    img3.src = "img/striukez.avif";
    img4.src = "img/batz.jpg";  
  }
  else if (tempC <= 5) {
    clothesText.textContent = "Vėsu: striukė, džemperis.";
    img1.src = "img/plonakep.jpg";
    img2.src = "img/plonastriuke.webp";
    img3.src = "img/dzins.jpg";
    img4.src = "img/jordans.avif";
  }
  else if (tempC <= 15) {
    clothesText.textContent = "Pavasariška: lengva striukė.";
    img1.src = "img/hat.jpg";
    img2.src = "img/maike.webp";
    img3.src = "img/treningai.jpg";
    img4.src = "img/batai.avif";
  }
  else if (tempC <= 25) {
    clothesText.textContent = "Maloni temperatūra: marškinėliai.";
    img1.src = "img/hat.jpg";
    img2.src = "img/polo.jpg";
    img3.src = "img/sortai.jpg";
    img4.src = "img/basakes.jpg";
  }
  else if (tempC <= 35) {
    clothesText.textContent = "Karšta: šortai, lengvi marškinėliai.";
    img1.src = "";
    img2.src = "";
    img3.src = "";
    img4.src = "";
  }
  else {
    clothesText.textContent = "Labai karšta: kuo mažiau rūbų.";
    img1.src = "";
    img2.src = "";
    img3.src = "";
    img4.src = "";
  }

  // 3) parodome tik tuos, kurių src nenustatytas tuščiai
  [img1, img2, img3, img4].forEach(img => {
    if (img.src) {
      img.style.display = "block";
    }
  });
}
// Funkcija kuri rodo / paslepia ir pozicionuoja img1, img2 pagal tempC








// Event’ai
slider.addEventListener("input", () => {
  tempC = Number(slider.value);
  updateUI();
});
minusBtn.addEventListener("click", () => {
  tempC--; slider.value = tempC; updateUI();
});
plusBtn.addEventListener("click", () => {
  tempC++; slider.value = tempC; updateUI();
});
scaleSelect.addEventListener("change", updateUI);

// Pradinė būsena
updateUI();