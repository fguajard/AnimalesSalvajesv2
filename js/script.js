import clases from "./clases.js";
const { Animal, Leon, Lobo, Oso, Serpiente, Aguila } = clases;

const baseUrlFirestore =
  "https://animales-salvajes-f8585-default-rtdb.firebaseio.com/";

/* Buscar sonidos
hace una primera busqueda de todos los sonidos que coinciden con la palabra a buscar
luego selecciona un elemento y busca ese elemento por su id para devolver el mp3 de ese sonido */
const buscarSonidosEnApi = async (nombreBusqueda) => {
  const APIKey = "o05mt69oqHCFcfOZMnxyxVZ4kUteUyfI5iIuaVir";
  try {
    const urlSonidos = `https://freesound.org/apiv2/search/text/?query=${nombreBusqueda}&filter=tag:${nombreBusqueda}&sort=downloads_desc&token=${APIKey}`;
    const requestSonidos = await axios(urlSonidos);
    const idSonido = requestSonidos.data.results[0].id;
    const urlSonidoUnitario = `https://freesound.org/apiv2/sounds/${idSonido}/?token=${APIKey}`;
    const requestSonido = await axios(urlSonidoUnitario);
    const sonido = requestSonido.data.previews;
    if (!sonido["preview-lq-mp3"]) {
      throw "no hay sonido";
    }
    // $("video").attr("src",`${sonido["preview-lq-mp3"]}`)
    return sonido["preview-lq-mp3"];
  } catch (err) {
    alert("Sonido no Encontrado");
  }
};

//Buscar imagenes usando la API de Unesplash

const buscarImagenes = async (inputBusqueda) => {
  const accessKeyUnesplash = "hbqzon-DeTtMzRi1szCuMi8gdlEf2d3qBHIghH3-EdI";
  try {
    const urlUnesplash = `https://api.unsplash.com/search/photos?page=1&query=${inputBusqueda}&client_id=${accessKeyUnesplash}&orientation=landscape`;
    const requestUnesplash = await axios(urlUnesplash);
    const urlRequestUnesplash = requestUnesplash.data.results[0].urls.full;
    $("#image").attr("src", `${urlRequestUnesplash}`);
    return urlRequestUnesplash;
  } catch (err) {
    alert("Imagen no Encontrada");
  }
};

//guarda los datos eN RealTime Database de Firebase
const enviarDatosFirebase = async (animalABuscar, edad, comentario) => {
  const imgLink = await buscarSonidosEnApi(animalABuscar);
  const sonidoLink = await buscarImagenes(animalABuscar);
  const animal = {
    nombre: animalABuscar,
    edad: edad,
    img: imgLink,
    comentario: comentario,
    sonido: sonidoLink,
  };
  try {
    const urlFirestore = `${baseUrlFirestore}Animales.json`;
    const animalAgregar = await axios.post(urlFirestore, animal);
    console.log(animal);
  } catch (error) {
    console.log(error);
  }
};

//acativar ventana modal personalizada al hacer click en la tarjeta
window.rellenarVentanaModal = (animalABuscar, edad, comentario, imagen) => {
  alert(animalABuscar, edad, comentario, imagen);
  $("#exampleModalCenter").modal("toggle");  
  $("#imagenModal").attr("src",`${imagen}`);
  $("#comentarioModal").html(comentario);
  $("#nombreModal").html(animalABuscar);
  console.log($(this));
};

// crea uan tarjeta nueva cuando se llena y se envia el formulario
const crearTarjetaDeAnimal = async (animalABuscar, edad, comentario) => {
  const imagenAnimal = await buscarImagenes(animalABuscar);
  const sonidoAnimal = await buscarSonidosEnApi(animalABuscar);
  $("#contenedorCards").append
  (
    `
        <div class="col-md-4" onclick="rellenarVentanaModal('${animalABuscar}','${edad}','${comentario}','${imagenAnimal}')">
            <div class="card profile-card-3">
                <div class="background-block">
                    <img src="${imagenAnimal}" alt="profile-sample1" class="background"/>
                </div>
                <div class="profile-thumb-block">                    
					<div class="profile"> <i class="fa fa-volume-up"></i></div>
                </div>
                <div class="card-content">
                    <h2>${animalABuscar}<small>${edad}</small></h3>
                    <div class="icon-block">						
					</div>
                </div>
                <video src="${sonidoAnimal}" class="d-none" autoplay=""></video>
            </div>              
           </div>        
        `
    );
};

$("form").on("submit", (event) => {
  event.preventDefault();
  const animalABuscar = $("#animal").val();
  const edad = $("#edad").val();
  const comentario = $("#comentario").val();
  buscarSonidosEnApi(animalABuscar);
  buscarImagenes(animalABuscar);
  crearTarjetaDeAnimal(animalABuscar, edad, comentario);

  // enviarDatosFirebase(animalABuscar,edad,comentario)
});
