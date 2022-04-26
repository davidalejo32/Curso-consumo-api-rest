const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';

const URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=5e64c61b-3fc5-4e62-84d0-a963792d5e91';

const URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=5e64c61b-3fc5-4e62-84d0-a963792d5e91`;


//  esta funcion trae 3 gatos aleatorios y los carga en el html
const loadRandom = async () => {
   const request = await fetch(URL_RANDOM);
   const data = await request.json();
   console.log(data)
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
         'Content-Type': 'application/json'
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


const loadFavorites = async () => {
   const request = await fetch(URL_FAVORITES);
   const data = await request.json();
   console.log(data)
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


const deleteFavorites = async (id) => {
   const request = await fetch(URL_FAVORITES_DELETE(id),{
      method: 'DELETE',
   });

   const data = await request.json();

   if(request.status !== 200) {
      console.error(`ERROR: ${request.status}`)
   }else {
      console.log(`Imagen borrada con exito`)
      loadFavorites()
   }

}