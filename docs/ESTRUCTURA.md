# Estructura del proyecto

Mapa de carpetas y archivos de la landing de Pachanka: qué hay en cada lugar, cómo se nombran los archivos y en qué orden los carga la página. Para cambios del día a día (precios, horario, textos, fotos) la guía es [COMO-EDITAR.md](../COMO-EDITAR.md).

## Cómo está organizado

Es un sitio estático: HTML, CSS y JavaScript que el navegador lee tal cual, sin instalar dependencias ni compilar. Cloudflare publica la carpeta tal como está en la rama `main`.

La organización separa **contenido** de **diseño** y de **funcionamiento**:

- **Contenido** (`index.html` y `contenido/`): lo que dice la página. Es lo que se edita seguido.
- **Diseño** (`css/`): cómo se ve, un archivo por sección de la página.
- **Funcionamiento** (`js/`): lo que se mueve y responde (carrusel, reservas, idiomas, tema, animaciones). No hace falta tocarlo para cambiar contenido.
- **Archivos multimedia** (`assets/`): fotos, logo y videos.

## Carpetas y archivos

```
pachanka-landing-v3/
├── index.html                  la página: secciones, textos en español y fotos
├── README.md                   presentación y tabla de "dónde se cambia cada cosa"
├── COMO-EDITAR.md              guía paso a paso para el cliente
├── ver-en-local.cmd            en Windows, doble clic para ver la web en la computadora
├── contenido/
│   ├── restaurante.js          WhatsApp de reservas, horario y lista de videos
│   ├── carta.js                platos, precios y descripciones en es / en / fr
│   ├── textos-es.js            mensajes en español (formulario, WhatsApp, abierto/cerrado)
│   ├── textos-en.js            textos de la página y mensajes en inglés
│   └── textos-fr.js            textos de la página y mensajes en francés
├── css/
│   ├── 01-base.css             colores y tipografías de la noche (:root), reset, logo
│   ├── 02-botones-y-titulos.css
│   ├── 03-pantalla-de-carga.css
│   ├── 04-cabecera-y-menu.css
│   ├── 05-portada.css
│   ├── 06-revelado.css         aparición suave al hacer scroll
│   ├── 07-un-dia.css
│   ├── 08-carta-paneles.css    los tres paneles de la carta y el bloque de reservas
│   ├── 09-eventos.css
│   ├── 10-ubicanos.css
│   ├── 11-pie.css              pie y botón de volver arriba
│   ├── 12-abierto-e-idioma.css aviso de abierto/cerrado y selector ES · EN · FR
│   ├── 13-carta-completa.css   panel lateral con la carta completa
│   ├── 14-resenas.css
│   ├── 15-reservas.css         formulario de reserva
│   ├── 16-videos.css
│   ├── 17-avisos-y-casilla.css flechas de "sigue bajando" y casilla del formulario
│   ├── 18-celular-y-tablet.css ajustes para pantallas chicas
│   ├── 19-animaciones-scroll.css
│   ├── 20-tema-claro.css       colores del día (6 a.m. a 6 p.m., hora de Lima)
│   └── 21-movimiento-reducido.css
├── js/                         un módulo por sección; main.js los arma
│   ├── main.js                 ÚNICO punto de entrada: enciende cada parte y las conecta
│   ├── utiles.js               ayudas comunes (buscar en el DOM, escapar texto, precios)
│   ├── textos.js               cambia el español del HTML por el inglés o el francés
│   ├── idioma.js               idioma activo y selector ES · EN · FR
│   ├── catalogo.js             índice de platos por id y precios de los paneles
│   ├── hora-lima.js            hora de Lima y horario de atención
│   ├── revelado.js             lo que entra al hacer scroll (.rv), cortinas y mapa
│   ├── scroll-suave.js         Lenis y el "ir a" de los enlaces internos
│   ├── cabecera.js             cabecera, volver arriba y sección a la vista
│   ├── paneles.js              menú lateral, panel de la carta y capa oscura
│   ├── enlaces.js              enlaces internos (#seccion)
│   ├── estado-abierto.js       aviso de "Abierto ahora" o "Cerrado"
│   ├── tema.js                 claro u oscuro según la hora de Lima
│   ├── reservas.js             formulario de reserva → WhatsApp
│   ├── carta-completa.js       panel con las categorías y los platos
│   ├── resenas.js              carrusel de reseñas de Google
│   ├── portada.js              carrusel de la portada
│   ├── videos.js               cinta de videos y video expandido
│   ├── pantalla-de-carga.js    la pantalla de inicio
│   ├── un-dia.js               línea del tiempo "Un día en Pachanka"
│   └── animaciones.js          animaciones ligadas al scroll (GSAP)
├── assets/
│   ├── img/                    fotos que usa la página y piezas del logo (img/logo/)
│   ├── video/                  videos de platos (.mp4) con su foto de espera (.jpg)
│   └── archivo/                fotos y bocetos que la página no usa hoy
│       ├── platos/             fotos de platos (las usa la carta digital)
│       ├── fotos/              fotos sueltas del restaurante
│       └── bocetos/
└── docs/
    ├── ESTRUCTURA.md           este documento
    └── diseno/                 fichas del sistema de diseño (JSON)
```

## Dónde va cada cosa

| Tipo de cambio | Lugar |
| --- | --- |
| Textos en español | `index.html`, dentro de su sección |
| Traducciones | `contenido/textos-en.js` y `contenido/textos-fr.js`, con la misma clave que `data-i18n` en el HTML |
| Mensajes que arma la página | `mensajes` en cada `contenido/textos-*.js` |
| Platos y precios | `contenido/carta.js` |
| Datos de operación | `contenido/restaurante.js` |
| Estilos de una sección | el archivo de `css/` con el nombre de la sección |
| Colores | `css/01-base.css` (noche) y `css/20-tema-claro.css` (día) |
| Fotos | `assets/img/`; videos en `assets/video/` |
| Documentación técnica | `docs/` |

## Convenciones de nombres

- Archivos y carpetas en minúsculas, con guiones y sin tildes ni ñ: `fusion-arroz.jpg`, `textos-fr.js`.
- Los estilos llevan un número de dos cifras que marca su orden de carga: `05-portada.css`.
- Los platos se identifican con un `id` en minúsculas y con guiones (`lomo-saltado`). Lo usan las fotos de la carta digital, los videos y los precios de los paneles (`data-plato="lomo-saltado"`).
- Las claves de traducción son `seccion.cosa`: `hero.lede`, `loc.hours`, `c1.d2`.

## Cómo se relacionan los archivos

`index.html` carga los archivos en este orden, y el orden importa:

1. Los 21 estilos de `css/`, del 01 al 21. Si dos reglas chocan, gana la del archivo con número mayor; por eso `18-celular-y-tablet.css` y `20-tema-claro.css` van al final.
2. Las librerías externas (GSAP y Lenis, desde CDN).
3. El contenido: `contenido/restaurante.js`, `carta.js` y `textos-es/en/fr.js`.
4. `js/main.js` como módulo (`<script type="module">`), que importa los demás archivos
   de `js/` y arma la página. Es el único que se enlaza desde el HTML.

Además, un script corto en el `<head>` de `index.html` elige el tema (claro u oscuro) según la hora de Lima antes de mostrar la página.

Cada enlace lleva `?v=...` al final. Al cambiar un archivo de forma importante conviene subir ese número en `index.html`, para que los navegadores no muestren la versión guardada.

## Publicación

No hay paso de compilación. **Cloudflare** publica la rama `main` desde la carpeta principal (proyecto `pachanka`, sin comando de build, carpeta de salida `/`). Cada cambio guardado en `main` aparece en https://pachankarestaurant.com en uno o dos minutos.

Archivos que lee Cloudflare en la raíz:

| Archivo | Para qué |
| --- | --- |
| `_redirects` | `/carta`, `/carta/` y `/menu` llevan a la carta digital |
| `_headers` | `noindex` para la documentación; `nosniff` y política de referencia para todo |
| `404.html` | la página de dirección equivocada. **Sin ella**, Cloudflare respondería cualquier dirección inventada con la portada y un código 200, y Google lo tomaría como contenido duplicado |
| `robots.txt` · `sitemap.xml` | para los buscadores |
| `site.webmanifest` + `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | el ícono del sitio |

GitHub Pages sigue encendido con las direcciones viejas: un script al inicio del `<head>` manda a quien entre por ahí a la dirección nueva, porque hay códigos QR impresos que apuntan a `github.io`. El archivo `.nojekyll` es para eso.

## Cómo crece el proyecto

- **Una sección nueva:** su HTML va en `index.html` en el lugar donde se verá, sus textos con claves `data-i18n` en los tres idiomas y sus estilos en un archivo nuevo de `css/`. Si sus reglas no dependen de otras, puede ir antes de `18-celular-y-tablet.css` con el siguiente número libre, renumerando los de después.
- **Un plato o un video:** solo contenido, ver COMO-EDITAR.md.
- **Un comportamiento nuevo:** un archivo en `js/` con una función `iniciar…()` que se exporta, y una línea en `js/main.js` que la llama. Si la sección también se ve, su CSS va en un archivo nuevo de `css/` con el mismo nombre.
- **Un idioma nuevo:** requiere un archivo `contenido/textos-xx.js`, un botón en el selector de `index.html` y su registro en `js/textos.js` y `js/idioma.js` (lista `LANGS`). Es trabajo de desarrollo.

## Relación con la carta digital

La carta digital (`pachanka-carta-digital`) es otro repositorio con su propia copia de la carta en `contenido/carta.js`, el mismo archivo que aquí: cuando cambia un plato o un precio, hay que cambiarlo en los dos. Las dos webs siguen esta misma estructura (`contenido/` + `css/` numerados + `js/` por módulos), para que quien trabaje en una se mueva igual en la otra.

## Mantenimiento de este documento

Actualízalo cuando se agregue, renombre o mueva una carpeta o un archivo de `contenido/`, `css/` o `js/`.

Última actualización: 24 de noviembre de 2026.
