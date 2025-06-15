const products = document.getElementById("products");
const cartslno = document.getElementById("cartsl");
const cartList = document.getElementById("cartList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let cartno = 0;
cartslno.innerText = " "+cartno+" ";
function fproducts(name){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+name)
    .then(res => res.json())
    .then(data => {
        if(!data.drinks){
           products.innerHTML = `<h5 class="text-center"> Your Search Result Not Found </h5>"`; 
        }else{
            for (product of data.drinks){
                let productID = product.idDrink;
                let title = product.strGlass;
                let category = product.strCategory;
                let instruction = product.strInstructions; 
                let shortinstruction = instruction.slice(0, 15);
                let thumb = product.strDrinkThumb;
                const productdiv = document.createElement("div");
                productdiv.classList.add("Drink");
                productdiv.innerHTML = `
                <div class="card m-3" style="width: 16rem;">
                    <img src="${thumb}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title mb-0">${title}</h5>
                        <p class="card-text mb-0">Category: ${category}</p>
                        <p class="card-text">instructions: ${shortinstruction}...</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline-primary addBtn">Add to group</button>
                        <button class="btn btn-outline-success detailBtn">Details</button>
                    </div>
                </div>
                `;
                products.appendChild(productdiv); 

                const addBtn = productdiv.querySelector(".addBtn");
                const detailBtn = productdiv.querySelector(".detailBtn");
                    addBtn.addEventListener("click", function () {
                        if (cartno == 7){
                            alert("Max 7 item can cart");
                        }else{
                            cartno++;
                            cartslno.innerText = cartno;
                            addBtn.innerText = "Cart Added!"
                            addBtn.disabled = true;
                            const cartItem = document.createElement("div");
                            cartItem.classList.add("d-flex", "align-items-center", "mb-2");
                            cartItem.innerHTML = `
                                <div class="col-2">${cartno}</div>
                                <div class="col-5"> <img src="${thumb}" width="40" height="40" class="me-2 rounded"></div>
                                <div class="col-5">${title}</div>
                            `;
                            cartList.appendChild(cartItem);
                        }
                    });
                    detailBtn.addEventListener("click", (event)=>{
                        showDetails(productID);
                    });
            }
        }
    });
}
fproducts("c");

searchBtn.addEventListener("click", (e)=>{
    valueofprod = searchInput.value;
    products.innerHTML = "";
    fproducts(valueofprod);
});

function showDetails(id) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        drinksTitle = document.getElementById("drinksTitle");
        drinksImage = document.getElementById("drinksImage");
        drinksDetails = document.getElementById("drinksDetails");
        info = data.drinks[0];
        console.log(info);
        img = info.strDrinkThumb;
        title = info.strGlass;
        instruction = info.strInstructions;
        category = info.strCategory;
        alcohonic = info.strAlcoholic;
        drinks = info.strDrink;

        drinksTitle.innerText = title;
        drinksImage.src = img;
        drinksDetails.innerHTML=
        `
        <h6> Category: ${category} </h6>
        <h6> Alcohonic: ${alcohonic} </h6>
        <h6> Drinks: ${drinks} </h6>
        <p>${instruction}</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById('mealModal'));
        modal.show();
      });
    }