# Pachanka Restaurant — Landing page (edición nocturna)

Tercera propuesta de diseño web para **Pachanka Restaurant**, cocina criolla con fusión en Jesús María, Lima.

**Ver en vivo:** https://creative-programming-partners.github.io/pachanka-landing-v3/

**Carta digital:** https://creative-programming-partners.github.io/pachanka-carta-digital/

> Maqueta de presentación para el cliente. La carta y los precios son los de su carta vigente
> (*CARTA PACHANKA ACTUALIZADA*). Las fotos de los platos son del archivo del restaurante;
> las del local y las celebraciones vienen de sus canales públicos.

Esta versión toma el estilo de un restaurante de noche —salón oscuro, titulares serif dorados,
fotos cálidas en marcos de arco— y lo adapta a la marca de Pachanka: su logo de ocho letras de
colores, las etiquetas en pincelada de su carta impresa y los colores del logo como acentos.

## Qué tiene

- **Portada en carrusel** con barra de "Hoy en Pachanka": flechas, estado de abierto o cerrado en vivo y aviso de la música en vivo
- **Un día en Pachanka**: en escritorio la sección se fija en pantalla y cada tramo de scroll avanza una hora
- **Carta**: clásicos, del mar y criollo fusión, con enlace a cada categoría de la carta digital
- **Videos de los platos** en una cinta que se acelera con el scroll; solo se reproducen los que están a la vista
- **Eventos**, **reseñas de Google** y **reservas por WhatsApp**
- **Español / inglés** (botón ES / EN)
- Respeta *reducir movimiento* del sistema

## Rendimiento

Pensada para ir fluida también en equipos modestos y sin aceleración gráfica:

- Sin `backdrop-filter`, `mix-blend-mode` ni `mask-image` sobre contenido que se mueve
- Las animaciones que no están a la vista se pausan
- Todo el movimiento ocurre en `transform` y `opacity`

## Ver en local

```
python -m http.server 8010
```

y entrar a http://localhost:8010

## Estructura

```
index.html          Página
css/styles.css      Estilos (colores y tipografías al inicio del archivo)
js/main.js          Carrusel, menú, reservas, idioma y animaciones
js/i18n.js          Textos en inglés
js/menu-data.js     La carta con precios
assets/             Fotos, logo y videos de los platos
design-dna/         Sistema de diseño en JSON
                      referencia.json  análisis de la referencia
                      pachanka.json    la versión adaptada a la marca (la aplicada)
```

Tipografías: Fraunces (títulos), Hanken Grotesk (textos) y Chewy (marca), de Google Fonts.
Librerías desde CDN: GSAP 3.13 (ScrollTrigger, SplitText, DrawSVG, Flip, CustomEase) y Lenis para el scroll suave.
