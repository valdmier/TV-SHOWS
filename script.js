const form = document.getElementById('form')
const input= document.querySelector("#searchInput");
const cardsContainer = document.getElementById('cardsContainer');
let ss = "";
form.addEventListener("submit", async function(e){
    e.preventDefault();
    let searchTerm= input.value;
let config = {params: { q: searchTerm}, }
let res = await axios.get(`https://api.tvmaze.com/search/shows?q=`,config )
    
makeImages(res.data);
})
let searched = false;
let row = document.createElement('DIV');
row.classList.add("row");
cardsContainer.appendChild(row);

function makeImages(shows) {
     for(let result of shows){
            if(result.show.image){             
let card = document.createElement('DIV');
card.classList.add("card");
card.classList.add("bg-dark");
card.classList.add("text-light");
card.classList.add("m-3");
card.style.width="12rem";
row.append(card);
let img = document.createElement('IMG');
img.classList.add("card-img-top");
img.src = result.show.image.medium;
img.style.width="12rem";
card.append(img);
 header = document.createElement('H5');
header.classList.add("card-header");
header.classList.add("lead");
header.innerText = result.show.name;
card.appendChild(header)
let body = document.createElement('DIV');
body.classList.add("card-body");
card.appendChild(body);
let language = document.createElement('P');
language.classList.add("card-text");
body.appendChild(language);
language.innerText = result.show.language;

let rating = document.createElement('P');
rating.classList.add("card-text");
let imdb = document.createElement('SPAN');
imdb.classList.add("imdb");
imdb.innerText = `    IMDB`;
rating.innerText = `${result.show.rating.average}   `;
rating.appendChild(imdb);
if(!result.show.rating.average){
    rating.innerText = `No  Rating.`;
}
body.appendChild(rating);
console.log(row);

input.value = "";
    } }
}
