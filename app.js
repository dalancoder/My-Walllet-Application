const date = document.getElementById("tarih");
const miktar = document.getElementById("harcama");
const alan = document.getElementById("harcama-adi");
const kalan1 = document.getElementById("kalan");
const tGider = document.getElementById("gideriniz");
const tGelir = document.getElementById("geliriniz");
const tablo = document.querySelector(".tablo");
const roundedCircle = document.querySelector(".bgColor");
const header = document.querySelector(".header");

let toplamGelir = 0;
let toplamGider = 0;

function saveLocalStorage() {
  const data = {
    toplamGelir,
    toplamGider,
    tablo: tablo.innerHTML,
    tGelir: tGelir.textContent,
    tGider: tGider.textContent,
    kalan1: kalan1.textContent,
  };
  localStorage.setItem("myData", JSON.stringify(data));
}

function loadLocalStorage() {
  const savedData = localStorage.getItem("myData");
  if (savedData) {
    const data = JSON.parse(savedData);
    toplamGelir = data.toplamGelir;
    toplamGider = data.toplamGider;
    tablo.innerHTML = data.tablo;
    tGelir.textContent = data.tGelir;
    tGider.textContent = data.tGider;
    kalan1.textContent = data.kalan1;
  }
}

document.addEventListener("DOMContentLoaded", loadLocalStorage);
document.addEventListener("DOMContentLoaded", currentDate);
document.addEventListener("DOMContentLoaded", kalan);

function currentDate() {
  // Bugünün tarihini al
  const today = new Date();
  // Gün, ay ve yıl bilgilerini al
  const day = today.getDate();
  const month = today.getMonth() + 1; // Ay bilgisi 0'dan başlar, bu yüzden 1 ekliyoruz
  const year = today.getFullYear();
  // Tarihi formatla (gün/ay/yıl)
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  date.value = formattedDate; // date kendi verdiğiniz değer olacak
}

function kaydet() {
   
  if (date.value == "" || miktar.value == "" || alan.value == "") {
    alert("Lütfen tüm alanları doldurun");
  } else {
    const yeniTr = document.createElement("tr");
    yeniTr.classList.add("yeniTr");
    yeniTr.innerHTML = `
        <td>${date.value}</td>
        <td id="gider2" >${miktar.value}</td>
        <td>${alan.value}</td>
        <td  > <i style="cursor:pointer;" onclick="satirSil()" class="text-danger bi bi-trash"></i></td>
    `;
    document.querySelector(".tablo").appendChild(yeniTr);

    toplamGider += Number(miktar.value);
    tGider.textContent = toplamGider;
    currentDate();

    kalan();
    saveLocalStorage();
  }

  date.value = "";
  miktar.value = "";
  alan.value = "";
}

function ekle() {
  const gelir = document.getElementById("gelir");
  if(!isNaN(gelir.value)&&gelir.value>0){
     toplamGelir += Number(gelir.value);
  tGelir.textContent = toplamGelir;
  gelir.value = "";
    currentDate();

  kalan();
  saveLocalStorage();
      }else {
        alert("yalnızca pozitif sayılar girebilirsiniz!")
      }

}

function kalan() {
  kalan1.textContent = toplamGelir - toplamGider;

  if (Number(kalan1.textContent) < 0) {
    roundedCircle.classList.add("bg-danger");
    header.classList.add("bg-danger");
  } else if (Number(kalan1.textContent) === 0) {
    roundedCircle.classList.add("bg-warning");
    roundedCircle.classList.remove("bg-danger");
    header.classList.add("bg-warning");
    header.classList.remove("bg-danger");
  } else {
    roundedCircle.classList.remove("bg-warning");
    roundedCircle.classList.remove("bg-danger");
    header.classList.remove("bg-warning");
    header.classList.remove("bg-danger");
    header.classList.add("bg-success")
  }
}
console.log(roundedCircle);
currentDate();

function satirSil() {
  let yeniBakiye = document.querySelector(".yeniTr").children[1].textContent;
  toplamGider -= Number(yeniBakiye);
  tGider.textContent = toplamGider;
  kalan1.textContent = toplamGelir - toplamGider;
  kalan();
  document.querySelector(".yeniTr").remove();
  saveLocalStorage();
  currentDate();
}

function temizle() {
  const result = confirm("Tüm verileri silmek istediğinizden emin misiniz?");
  if (result) {
    tGelir.textContent = 0;
    tGider.textContent = 0;
    kalan1.textContent = 0;
    document.querySelector(".tablo").remove();
    currentDate();
    localStorage.removeItem("myData");
  }
}

