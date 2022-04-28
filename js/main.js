const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';

const URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';

const URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const URL_UPLOAD_PHOTO= 'https://api.thecatapi.com/v1/images/upload';

const URL__MY_UPLOAD = 'https://api.thecatapi.com/v1/images';


import { API_KEY } from "./api_key.js";



//  esta funcion trae 3 gatos aleatorios y los carga en el html
const loadRandom = async () => {
   const request = await fetch(URL_RANDOM);
   const data = await request.json();
   // console.log(data)
   const randoCardsContainer = document.querySelector(".random-cards__container");
   randoCardsContainer.innerHTML = "";
   data.forEach((element, index) => {

      const article = document.createElement("article");
      article.className = "random__card";

      const img = document.createElement("img");
      img.className = "random__image";
      img.src = element.url

      const div = document.createElement("div");
      div.className = "random-button__container";

      const btnForeground = document.createElement("i");
      btnForeground.className = "bx bx-heart random__button--foreground";

      const btnBackground = document.createElement("i");
      btnBackground.className = "bx bxs-heart random__button--background";

      btnForeground.addEventListener("click", () => {
         btnBackground.style.opacity = 1;
      })

      div.appendChild(btnForeground)
      div.appendChild(btnBackground)

      article.appendChild(img);
      article.appendChild(div);
      randoCardsContainer.appendChild(article);
   });

   // ejecutando la funcion de guardar en favoritos cuando le den click al boton 

   const btnsFavorites = document.querySelectorAll(".random__button--foreground");
   btnsFavorites.forEach((element, index) => {
      element.addEventListener('click', () => {
         saveFavorites(data[index].id);
      })

   });
}

loadRandom();

// cada vez que le haga click al boton de random va a ejecutar la funcion de load random
const buttonRandom = document.querySelector(".random__button");
buttonRandom.addEventListener('click', () => loadRandom())


const saveFavorites = async (id) => {
   const request = await fetch(URL_FAVORITES, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'X-API-KEY': API_KEY
      },
      body: JSON.stringify({
         image_id: id
      })
   });

   const data = await request.json();

   if (request.status !== 200) {
      console.error(`Error: ${request.status}`);
   } else {
      console.log(`Imagen guardada con exito en el id ${id}`);
      loadFavorites();
   }
}

// cargar las imagenes de favoritos

const loadFavorites = async () => {
   const request = await fetch(URL_FAVORITES, {
      method: 'GET',
      headers: {
         'X-API-KEY': API_KEY
      }
   });
   const data = await request.json();
   
   const favoritesContainer = document.querySelector(".favorites-cards__container");

   favoritesContainer.innerHTML = "";

   data.forEach((element) => {
      const article = document.createElement("article");
      article.className = "favorites__card";

      const img = document.createElement("img");
      img.className = "favorites__image";
      img.src = element.image.url

      const div = document.createElement("div");
      div.className = "favorites-button__container";

      const btnBackground = document.createElement("i");
      btnBackground.className = "bx bxs-heart favorites__button--background";

      btnBackground.addEventListener('click', () => {
         btnBackground.style.opacity = 0;
      })

      div.appendChild(btnBackground)

      article.appendChild(img);
      article.appendChild(div);
      favoritesContainer.appendChild(article);
   })

   // cargando los botones de favoritos
   const buttonFavoritesBackgroun = document.querySelectorAll(".favorites__button--background")

   buttonFavoritesBackgroun.forEach((element, index) => {
      element.addEventListener('click', () => {
         deleteFavorites(data[index].id)
      })
   })

};

loadFavorites()

// borrar las imagenes de favoritos
const deleteFavorites = async (id) => {
   const request = await fetch(URL_FAVORITES_DELETE(id),{
      method: 'DELETE',
      headers: {
         'X-API-KEY': API_KEY
      }
   });

   const data = await request.json();

   if(request.status !== 200) {
      console.error(`ERROR: ${request.status}`)
   }else {
      console.log(`Imagen borrada con exito`)
      loadFavorites()
   }

}

// etiqueta a de error por si no selecciona ningun archivo
const uploadinError = document.querySelector('.uploading__error');

// subir una imagen 
const uploadPhoto = async () => {
   const form = document.querySelector(".uploading__form");
   const formData = new FormData(form);
   // console.log(formData.get('file'));

   if(formData.get('file').name === ""){
      uploadinError.style.color = "#C0392B";
      uploadinError.textContent = "Debe cargar una imagen";

   }else {
      uploadinError.style.color = "#black";
      uploadinError.textContent = "subiendo imagen ...."
   const request = await fetch(URL_UPLOAD_PHOTO, {
      
      method: 'POST',
      headers: {
         // 'Content-Type': 'multipart/form-data',
         'X-API-KEY': API_KEY
      },
      body: formData,
   });

   const data = await request.json();
   if(request.status !== 201) {
      console.error(`Error: ${request.status} la imagen no se subio`);
   }else {
      uploadMyImage();
      console.log(`Imagen subida exitosamente`);
      console.log(({data}));
      console.log(data.url);
      uploadinError.style.color = "#28B463";
      uploadinError.textContent = "Imagen Cargada con Exito"
   }
}

}


// carga el input
let inputForm = document.querySelector("#uploading__form-file");

// pone el nombre del archivo que se cargo
inputForm.addEventListener('change', () => {
   uploadinError.style.color = "black"
   uploadinError.textContent = inputForm.files[0].name;
})

// carga el boton del form
const buttonForm = document.querySelector('.uploading__form-submit');
// cuando le de click al boton me va a ejecutar esa funcion
buttonForm.addEventListener('click', () => uploadPhoto() )


const uploadMyImage = async() => {
   const request = await fetch(URL__MY_UPLOAD, {
      method: 'GET',
      headers: {
         'X-API-KEY': API_KEY
      }     
   });

   const data = await request.json();
   
   // console.log(data);

   let myPhotosContainer = document.querySelector('.myPhotos-cards__container');
   myPhotosContainer.innerHTML = "";
   data.forEach(element => {
      const article = document.createElement("article");
      article.className = "myPhotos__card";

      const img = document.createElement("img");
      img.className = "myPhotos__image";
      img.src = element.url

      const div = document.createElement("div");
      div.className = "myPhotos-button__container";

      const btnBackground = document.createElement("i");
      btnBackground.className = "bx bxs-heart myPhotos__button--background";

      btnBackground.addEventListener('click', () => {
         btnBackground.style.opacity = 0;
      })

      div.appendChild(btnBackground)

      article.appendChild(img);
      article.appendChild(div);
      myPhotosContainer.appendChild(article);
   })
}

uploadMyImage();