// vamos a ver como hacer peticiones con axios

// primero creamos una instancia de axios y le paso la url base

const api = axios.create({
   baseURL: 'https://api.thecatapi.com/v1'
});

// aqui estoy guardando los defaults header
api.defaults.headers.common['X-API-KEY'] = '5e64c61b-3fc5-4e62-84d0-a963792d5e91';

const saveFavoritesAxios = async (id) => {
   // uso la destructuracion
   const { data, status } = await api.post('/favourites', {
      // le envio solo el body por que los header ya se envian en el default
      // y el content type axios lo hace automaticamente
      image_id: id,
   });

   console.log(data);
   console.log(status);
}

const loadFavoritesAxios = async () => {
   const { data, status } = await api.get('/favourites');
   console.log(data);
   console.log(`status ${status}`);
}

loadFavoritesAxios();