/* =========================================================
   PUNTO DE ENTRADA
   El único archivo que carga index.html: enciende cada parte de la página en orden y
   las conecta entre sí. Cada sección vive en su propio archivo de js/ y no sabe de las
   demás; lo que una necesita de otra se pasa desde aquí.

   No hace falta editar nada de js/ para cambiar textos, precios, horario, WhatsApp o
   videos: todo eso está en la carpeta contenido/.

   Para añadir un comportamiento: un archivo nuevo en js/ con una función iniciar…()
   y una línea aquí. Mapa completo en docs/ESTRUCTURA.md.
   ========================================================= */
import { iniciarRevelado } from './revelado.js';
import { iniciarCabecera } from './cabecera.js';
import { iniciarPaneles } from './paneles.js';
import { iniciarEnlaces } from './enlaces.js';
import { iniciarReservas, iniciarFecha, construirPersonas, construirHoras } from './reservas.js';
import { iniciarCartaCompleta, pintarPestanas, pintarCategoria, colocarTinta, categoriaActual } from './carta-completa.js';
import { iniciarResenas } from './resenas.js';
import { iniciarPortada } from './portada.js';
import { iniciarVideos, pintarCinta } from './videos.js';
import { pintarPrecios } from './catalogo.js';
import { pintarEstado } from './estado-abierto.js';
import { revisarTema } from './tema.js';
import { iniciarIdioma } from './idioma.js';
import { iniciarPantallaDeCarga } from './pantalla-de-carga.js';
import { iniciarUnDia } from './un-dia.js';
import { iniciarAnimaciones } from './animaciones.js';

iniciarRevelado();
iniciarCabecera();
iniciarPaneles();
iniciarEnlaces();
iniciarReservas();
iniciarCartaCompleta();
iniciarResenas();
iniciarPortada();
iniciarVideos();
pintarPrecios();

// El aviso de abierto o cerrado y el tema del día se revisan al cambiar de minuto
// (y al volver a la pestaña, por si pasó la hora mientras estaba oculta)
const cadaMinuto = () => { pintarEstado(); revisarTema(); };
setTimeout(() => { cadaMinuto(); setInterval(cadaMinuto, 60000); }, (60 - new Date().getSeconds()) * 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) cadaMinuto(); });

// Todo lo que arma el JavaScript hay que rehacerlo al cambiar de idioma
iniciarFecha();
iniciarIdioma(() => {
  pintarEstado();
  construirPersonas();
  construirHoras();
  pintarPestanas();
  colocarTinta(false);
  if (categoriaActual()) pintarCategoria();
  pintarCinta();
});

iniciarPantallaDeCarga();
iniciarUnDia();
iniciarAnimaciones();
