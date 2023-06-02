//Variables

const carrito = document.querySelector('#carrito');
const listaCursos =  document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarrito.addEventListener('click', ()=>{
        articulosCarrito = [];
        limpiarHtml(); //LIMPIAMOS TODO EL HTML
    })
}


//FUNCIONES
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

//elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const curso_id = e.target.getAttribute('data-id');
        
        //elimina del arreglo por el id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== curso_id);
        CarritoHtml(); //ITERAR SOBRE EL CARRITO Y MOSTAR SU HTML
    }else{

    }
}

//lee el conteni del html al que le dimos clickmy extrae la informacion del curso

function leerDatosCurso(cursoSeleccionado) {
    console.log(cursoSeleccionado)
    //crear un objeto con la informaicon que necesitamos del curso
    const infoCurso = {
        imagen : cursoSeleccionado.querySelector('img').src,
        titulo : cursoSeleccionado.querySelector('.info-card h4').textContent,
        precio : cursoSeleccionado.querySelector('.precio span').textContent,
        id : cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    console.log(existe)

    if(existe){
        //actualizamos contidad
        const cursos = articulosCarrito.map(curso =>{
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna objeto actualizado
            }else{
                return curso; //retorna objetos que no son actualizados
            }
        });
        articulosCarrito = [...cursos]
    }else{
        //agregamos elemento al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
    CarritoHtml();

}


//muestra el carrito de compras en el html
function CarritoHtml(){
    //limpiar el HTML
    limpiarHtml();
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{
        const {imagen,precio,titulo,cantidad,id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width = "100" height = "">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${titulo}</td>
            <td>
                <a href = "#" class = "borrar-curso" data-id ="${id}">X</a>
            </td>
            `;
        //agrega el html del carrito el tbody
        contenedorCarrito.appendChild(row)
    })
}


//elimina los cuersos del tbody
function limpiarHtml(){
    //FORMA LENTA
    // contenedorCarrito.innerHTML = "";

    //forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};

