const date = document.getElementById("tarih")
const miktar = document.getElementById("harcama")
const alan = document.getElementById("harcama-adi")


function kaydet() { 

    if(date.value==""||miktar.value==""||alan.value==""){

    }else{
          const yeniTr = document.createElement("tr");
    yeniTr.innerHTML = `
        <td>${date.value}</td>
        <td>${miktar.value}</td>
        <td>${alan.value}</td>
        <td> <i style="cursor:pointer;" class="text-danger bi bi-trash"></i></td>
    `
    document.querySelector(".tablo").appendChild(yeniTr);
    }
 

}

