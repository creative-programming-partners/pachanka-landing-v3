# Pachanka Restaurant — Landing page (edición nocturna)

Propuesta de diseño web para **Pachanka Restaurant**, cocina criolla con fusión en Jesús María, Lima.

**Ver en vivo:** https://creative-programming-partners.github.io/pachanka-landing-v3/

**Carta digital:** https://creative-programming-partners.github.io/pachanka-carta-digital/

> Maqueta de presentación para el cliente. La carta y los precios son los de su carta vigente
> (*CARTA PACHANKA ACTUALIZADA*). Las fotos de los platos son del archivo del restaurante;
> las del local y las celebraciones vienen de sus canales públicos.

## Dónde se cambia cada cosa

| Quieres cambiar… | Archivo |
| --- | --- |
| Un precio, un plato o su descripción | `contenido/carta.js` |
| El número de WhatsApp de las reservas | `contenido/restaurante.js` |
| El horario (aviso "Abierto ahora" y horas para reservar) | `contenido/restaurante.js` |
| Los videos de los platos | `contenido/restaurante.js` y la carpeta `assets/video/` |
| Un texto en español | `index.html` |
| Un texto en inglés o en francés | `contenido/textos-en.js` o `contenido/textos-fr.js` |
| Los mensajes del formulario y de WhatsApp | `contenido/textos-es.js`, `textos-en.js` y `textos-fr.js` |
| Una foto | la carpeta `assets/img/` (con el mismo nombre de archivo) |
| Los colores de noche o de día | `css/01-base.css` y `css/20-tema-claro.css` |

Paso a paso para cada caso, y qué hacer si algo sale mal: **[COMO-EDITAR.md](COMO-EDITAR.md)**.
Qué hay en cada carpeta y cómo se relacionan los archivos: **[docs/ESTRUCTURA.md](docs/ESTRUCTURA.md)**.

## Qué tiene la página

- **Portada en carrusel** con la barra "Hoy en Pachanka": flechas, aviso de abierto o cerrado en vivo y de la música en vivo
- **Un día en Pachanka**: en escritorio la sección queda fija y cada tramo de scroll avanza una hora
- **Carta**: clásicos, del mar y criollo fusión, con enlace a cada categoría de la carta digital
- **Videos de los platos** en una cinta que se acelera con el scroll
- **Eventos**, **reseñas de Google** y **reservas por WhatsApp**
- **Tres idiomas**: español, inglés y francés (botón ES · EN · FR)
- **Tema claro de día y oscuro de noche**, según la hora de Lima: claro de 6 a.m. a 6 p.m. Para ver uno a mano, agrega `?tema=claro` u `?tema=oscuro` al final de la dirección
- Respeta la opción *reducir movimiento* del sistema

## Estructura

```
index.html       la página: textos en español, fotos y secciones
contenido/       lo que se edita seguido: carta, datos del restaurante y textos en inglés y francés
css/             el diseño, un archivo por sección (01 a 21, en el orden en que se cargan)
js/              el funcionamiento (no hace falta tocarlo para cambiar contenido)
assets/          fotos, logo y videos
docs/            esta documentación técnica y las fichas del diseño
```

## Ver en tu computadora

Abre una terminal en esta carpeta y escribe:

```
python -m http.server 8010
```

Después entra a http://localhost:8010. También puedes abrir `index.html` con doble clic; necesita internet porque las tipografías, las animaciones y el mapa se cargan desde la web.

## Publicar

La página se publica sola con GitHub Pages desde la rama `main`: cada cambio que se guarda en `main` aparece en la dirección en vivo en uno o dos minutos. No hay que compilar nada.

Tipografías: Fraunces (títulos), Hanken Grotesk (textos) y Chewy (marca), de Google Fonts.
Librerías desde CDN: GSAP 3.13 (ScrollTrigger, SplitText, DrawSVG, Flip, CustomEase) y Lenis para el scroll suave.
