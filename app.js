const date = document.getElementById("tarih")
const miktar = document.getElementById("harcama")
const alan = document.getElementById("harcama-adi")
const kalan1 = document.getElementById("kalan")
const tGider = document.getElementById("gideriniz") 
const tGelir = document.getElementById("geliriniz")

let toplamGelir = 0;
let toplamGider =0;

function kaydet() { 

    if(date.value==""||miktar.value==""||alan.value==""){
        alert("Lütfen tüm alanları doldurun")
    } else{
    const yeniTr = document.createElement("tr");
    yeniTr.classList.add("yeniTr")
    yeniTr.innerHTML = `
        <td>${date.value}</td>
        <td id="gider2" >${miktar.value}</td>
        <td>${alan.value}</td>
        <td  > <i style="cursor:pointer;" onclick="satirSil()" class="text-danger bi bi-trash"></i></td>
    `
    document.querySelector(".tablo").appendChild(yeniTr);
    
     
    toplamGider += Number(miktar.value)
    tGider.textContent = toplamGider

    kalan();

    }

    date.value="";
    miktar.value="";
    alan.value="";
   
}

function ekle(){
    
    const gelir = document.getElementById("gelir")
    
    toplamGelir += Number(gelir.value)
    tGelir.textContent = toplamGelir
    gelir.value=""
    
    kalan();
  
    
}

function kalan(){
    
    kalan1.textContent = toplamGelir - toplamGider;
}

function satirSil(){
   
   let yeniBakiye = document.querySelector(".yeniTr").children[1].textContent;
   toplamGider -= Number(yeniBakiye)
  tGider.textContent = toplamGider
kalan1.textContent = toplamGelir - toplamGider
document.querySelector(".yeniTr").remove(); 

}

function temizle(){
confirm( "Tüm verileri silmek istediğinizden emin misiniz?")
if(confirm){
    tGelir.textContent = "";
    tGider.textContent = "";
    kalan1.textContent = ""

}
}