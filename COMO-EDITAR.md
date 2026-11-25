# Cómo editar la web de Pachanka

Puedes cambiar precios, platos, horario, WhatsApp, textos y fotos desde la página de GitHub, sin instalar nada. Cada cambio aparece en la web en uno o dos minutos.

## Antes de empezar

- **Necesitas una cuenta de GitHub con permiso de edición** en el repositorio `creative-programming-partners/pachanka-landing-v3`. Si al abrir un archivo no ves el ícono del lápiz, pide acceso a quien administra el repositorio.
- **Todo se edita desde github.com.** Abres el archivo, tocas el lápiz (*Edit this file*), cambias el texto y tocas **Commit changes…** y luego **Commit changes** en la ventana que aparece.
- **Lo que guardas se publica.** No hay un paso de revisión: en uno o dos minutos el cambio está en la web en vivo.
- **En los archivos `.js`** cambia solo lo que está entre comillas. No borres comillas, comas ni llaves `{ }`. Para un apóstrofo usa la comilla curva `’` (por ejemplo `l’heure`), no la recta `'`.

## Cambiar un precio

El precio se cambia en un solo archivo y se actualiza en los paneles de la carta, en los videos y en la carta completa.

1. Abre `contenido/carta.js`.
2. Busca el plato con Ctrl+F (en Mac, Cmd+F), por ejemplo `Lomo saltado`.
3. Cambia el número que va después de `p:`. Por ejemplo, de `p: 39,` a `p: 42,`. Si lleva decimales, usa punto: `p: 3.5,`.
4. Guarda con **Commit changes**.

La carta digital es otra web y tiene su propia copia de la carta. Para que las dos muestren el mismo precio, cambia también el plato en el repositorio `pachanka-carta-digital`, archivo `contenido/carta.js`.

## Cambiar el nombre o la descripción de un plato

1. Abre `contenido/carta.js` y busca el plato.
2. Cambia el texto que quieras:
   - `es`, `en`, `fr`: el nombre en español, inglés y francés
   - `des`, `den`, `dfr`: la descripción en español, inglés y francés
3. Guarda.

Esto cambia los nombres de los videos y la carta completa. Los tres paneles de la portada ("Nuestros clásicos", "Del mar a tu plato" y "Criollo fusión") llevan nombres y descripciones cortas propias: el español está en `index.html` y la traducción en `contenido/textos-en.js` y `textos-fr.js`, en las claves `c1.d1`, `c2.d3`, etc.

## Agregar o quitar un plato

**Para agregar uno**, copia un plato parecido de la misma categoría en `contenido/carta.js`, pégalo debajo y cambia sus datos:

```js
{ id: 'causa-de-pulpo', es: 'Causa de pulpo', en: 'Octopus causa', fr: 'Causa au poulpe', p: 32,
  des: 'Causa de papa amarilla con pulpo al olivo.',
  den: 'Yellow potato causa with octopus in olive sauce.',
  dfr: 'Causa de pomme de terre jaune au poulpe, sauce aux olives.' },
```

- El `id` es el nombre interno: en minúsculas, con guiones y sin tildes ni ñ. No puede repetirse.
- Cada plato termina en `},` y el último de la lista puede ir sin coma.
- Las bebidas y guarniciones van con descripción vacía: `des: '', den: '', dfr: ''`.

**Para quitar uno**, borra el bloque completo, desde `{ id:` hasta su `},`.

Si el plato aparece en un panel de la portada o en un video, cámbialo también allí (ver *Cambiar los videos de los platos* y el apartado de la carta en `index.html`).

## Cambiar el horario

1. Abre `contenido/restaurante.js`.
2. En `horario`, cambia la hora de apertura y de cierre de cada día, en formato de 24 horas. Por ejemplo, para abrir los domingos a la 1 p.m.: `domingo: ['13:00', '18:00']`. El cierre tiene que ser antes de la medianoche: como máximo `'23:30'`.
3. Guarda.

Esto controla el aviso "Abierto ahora / Cerrado" y las horas que se pueden elegir al reservar (la última, una hora antes del cierre).

El horario que se lee en la sección "Ubícanos" es texto aparte. Cámbialo también en:
- `index.html`: busca `12:00 p.m. a 11:00 p.m.`
- `contenido/textos-en.js` y `textos-fr.js`: claves `loc.monsat.h`, `loc.sun.h` y `loc.ao.h`

Todos los días necesitan un horario. Para marcar un día cerrado, pide ayuda a quien mantiene la web.

## Cambiar el número de WhatsApp

1. Abre `contenido/restaurante.js` y cambia `whatsapp`: el código de país `51` seguido del número, todo junto. Por ejemplo `'51987654321'`.
2. Abre `index.html` y busca el número viejo de dos formas: `51971969101` (en los enlaces) y `971 969 101` (escrito). Reemplázalo en todos los lugares.
3. En `contenido/textos-en.js` y `textos-fr.js` busca `971 969 101` (clave `rs.dp`) y cámbialo.
4. Guarda cada archivo.

## Cambiar un texto en español

1. Abre `index.html` y busca el texto con Ctrl+F.
2. Cambia solo las palabras que se leen. No toques lo que está entre `<` y `>`.
3. Guarda.

Si la etiqueta del texto tiene `data-i18n="..."`, ese texto tiene traducción: cambia también la misma clave en `contenido/textos-en.js` y `textos-fr.js`.

## Cambiar un texto en inglés o en francés

1. Abre `contenido/textos-en.js` (inglés) o `contenido/textos-fr.js` (francés).
2. Busca el texto o su clave. La clave es la que aparece en `index.html` como `data-i18n="clave"`.
3. Cambia el texto de la derecha, entre las comillas, y guarda.

Si una clave no tiene traducción, la página muestra el texto en español.

## Cambiar una foto

La forma más simple es reemplazar el archivo por otro con el mismo nombre.

1. En GitHub, entra a la carpeta `assets/img`.
2. Toca **Add file → Upload files** y sube la foto nueva con el mismo nombre exacto que la anterior.
3. Toca **Commit changes**.

| Lugar | Archivo | Tamaño recomendado |
| --- | --- | --- |
| Portada (carrusel, en este orden) | `ceviche-hero.jpg`, `hamburguesa.jpg`, `alitas.jpg` | vertical, 2000 × 2600 |
| Paneles de la carta | `clasicos-lomo.jpg`, `mar-ceviche.jpg`, `fusion-arroz.jpg` | vertical, 1600 × 2000 |
| Reservas | `reservas-local.jpg` | vertical, 1600 × 2000 |
| Un día en Pachanka | `dia-mesa.jpg`, `dia-piqueo.jpg`, `dia-barra.jpg`, `musica-vivo.jpg` | vertical, 1200 × 1600 |
| Eventos | `show-criollo.jpg`, `brindis.jpg`, `mesa-larga.jpg`, `fachada-equipo.jpg` | vertical, 1080 × 1440 |

- Usa `.jpg` y procura que pese menos de 700 KB; puedes comprimirla en https://squoosh.app.
- Sube la foto en tamaño grande: la web la achica sola para cada pantalla (Cloudflare la entrega más chica a los celulares).
- Si subes la foto con otro nombre, en `index.html` el nombre aparece varias veces en la misma línea (en `src` y en `srcset`). Cámbialo en todas; si dejas uno viejo, en algunos celulares se verá la foto anterior. Por eso es más simple usar el mismo nombre.
- La foto anterior puede seguir viéndose unas horas en los celulares que ya la habían cargado. Si necesitas que cambie enseguida, en `index.html` cambia el `?v=2` de esa foto por `?v=3` en toda su línea.

## Cambiar los videos de los platos

1. En `assets/video`, sube el video en `.mp4` y una foto `.jpg` con el mismo nombre (por ejemplo `causa-1.mp4` y `causa-1.jpg`). La foto se ve mientras el video carga. Videos verticales de menos de 3 MB.
2. Abre `contenido/restaurante.js` y, en `videos`, agrega o cambia una línea: `{ archivo: 'causa-1', plato: 'causa-acevichada' },`. `archivo` va sin `.mp4` y `plato` es el `id` del plato en `contenido/carta.js`.
3. Guarda.

El nombre, la descripción y el precio del video salen solos de la carta.

## Cambiar la calificación de Google

1. En `index.html`, busca la sección `RESEÑAS` y cambia:
   - la nota: `<span class="rating-num" data-i18n="rev.num">4.5</span>`
   - las estrellas: `--fill:.9` es la nota dividida entre 5 (4.5 ÷ 5 = 0.9)
   - la descripción para lectores de pantalla: `aria-label="4.5 de 5 estrellas en Google"`
   - el número de reseñas: `<b>303</b>` y la fecha: `noviembre de 2026`
2. En `contenido/textos-en.js` y `textos-fr.js`, cambia `rev.num`, `rev.aria` y `rev.date`. En francés la nota va con coma: `'4,5'`.

## Cambiar los colores

- Colores de noche: `css/01-base.css`, al inicio, dentro de `:root`. Por ejemplo `--gold:#dfa159;` es el dorado.
- Colores de día: `css/20-tema-claro.css`.

Un color nuevo para texto necesita buen contraste con el fondo. Si no estás seguro, revísalo en https://webaim.org/resources/contrastchecker/.

## Ver la web en tema claro u oscuro

La web cambia sola según la hora de Lima: clara de 6 a.m. a 6 p.m. y oscura desde las 6 p.m. Para ver un tema a cualquier hora, agrega esto al final de la dirección:

- https://pachankarestaurant.com/?tema=claro
- https://pachankarestaurant.com/?tema=oscuro

## Si algo sale mal

**El cambio no aparece.** Espera dos minutos y recarga con Ctrl+F5 (en el celular, cierra la pestaña y vuelve a abrirla). Revisa en GitHub que el cambio se guardó en la rama `main`.

**La página se ve incompleta, no cambia de idioma o falta la carta** después de editar un archivo `.js`. Casi siempre es una coma, una comilla o una llave que se borró, o un apóstrofo recto `'` dentro de un texto. Vuelve a abrir el archivo y revisa la línea que cambiaste.

**Para volver a la versión anterior de un archivo:**
1. En GitHub, abre el archivo y toca **History**.
2. Abre el cambio anterior al tuyo y toca **View file** (o los tres puntos → *View file*).
3. Copia todo el contenido, abre el archivo actual con el lápiz, pega el contenido y guarda.

**El precio de un panel de la portada no cambió.** Ese precio sale de `contenido/carta.js`. Revisa que cambiaste el plato correcto y que en `index.html` el precio tenga `data-plato="..."` con el mismo `id`.
