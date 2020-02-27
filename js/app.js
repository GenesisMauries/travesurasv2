var audio = document.getElementById("player")
var music
// Asigna imagen 
const playSong = (id)=>{
    // Longitud del arreglo
    var long = music.songs
    if(id>=long.length){
        audio.paused()
        console.log("Se acabaron las travesuras")
    }else{
        $('#img-album').attr('src', music.songs[id].image );
        $('#player').attr('src', music.songs[id].song)
        $('#title').text(music.songs[id].nombre)
        // Reproduccion automatica
        audio.play();
        console.log("Hay más travesuras")
        schuduleSong(id)
    }
}
const genLinst= (music)=>{
    // Imprime lista de canciones
    $.each(music.songs, function(i,song){
        $('#playlist').append('<li class="list-group-item" id="'+i+'"><i class="far fa-play-circle text-rigth"></i>&#32;' + song.nombre + '</li>')
    })
    // Reproduce elemento seleccionado
    $('#playlist li').click(function(){
        var selectedsong = $(this).attr('id')
        // console.log(selectedsong)
        playSong(selectedsong)
    })
}
// Peticion
const getSongs = () =>{
   fetch("js/app.json",{})
   .catch(error => console.log(`Tienes este problemita: ${error.message}`))
    .then((response) => response.json())
    .then(datos => {music= datos; genLinst(music)})
}
//Se termina playlist
const schuduleSong=(id)=>{
    audio.onended= function(){
        console.log('Terminó la travesura')
        // Recorre el arreglo
        playSong(parseInt(id)+1)
    }
}
// Carga data automaticamente
window.onload = getSongs()