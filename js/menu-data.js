/* Carta de Pachanka — transcrita de "CARTA PACHANKA ACTUALIZADA" (PDF del restaurante).
   Un solo archivo de datos para la landing y la carta digital: si cambia un precio,
   se cambia aquí y las dos webs quedan iguales.

   Categoría: { id, es, en, groups:[{ es?, en?, items:[] }] }
   Plato:     { id, es, en, p (precio en soles), des (descripción ES), den (descripción EN) }
   La foto de cada plato se busca en assets/platos/<id>.jpg (si no existe, se ve el marcador). */
window.PK_MENU = [
  {
    id: 'entradas', es: 'Pá empezar', en: 'To start',
    groups: [{ items: [
      { id: 'ceviche-pachanka', es: 'Ceviche Pachanka', en: 'Ceviche Pachanka', p: 33,
        des: 'Dados de pescado, láminas de pulpo, coronados con daditos de palta.',
        den: 'Diced fish and thin octopus slices, crowned with avocado.' },
      { id: 'causa-acevichada', es: 'Causa acevichada', en: 'Causa acevichada', p: 30,
        des: 'Suave masa de papa amarilla, sobre un espejo de salsa huancaína, coronada con un ceviche al rocoto.',
        den: 'Soft yellow potato cake over a mirror of huancaína sauce, crowned with rocoto ceviche.' },
      { id: 'leche-de-tigre', es: 'Leche de tigre', en: 'Leche de tigre', p: 24,
        des: 'Pescado y langostinos selectos bañados en una deliciosa salsa acevichada de la casa. Acompañado de una brocheta de chicharrón.',
        den: 'Select fish and prawns in the house ceviche marinade, with a crispy pork skewer.' },
      { id: 'langostinos-al-panko', es: 'Langostinos al panko', en: 'Panko prawns', p: 32,
        des: 'Crujientes y jugosos langostinos acompañados de una deliciosa salsa de maracuyá de la casa. (8 unidades)',
        den: 'Crispy, juicy prawns with the house passion fruit sauce. (8 pieces)' }
    ] }]
  },
  {
    id: 'clasicos', es: 'Nuestros clásicos', en: 'Our classics',
    groups: [{ items: [
      { id: 'lomo-saltado', es: 'Lomo saltado', en: 'Lomo saltado', p: 39,
        des: 'Trozos de lomo fino y vegetales salteados al wok, con unas crujientes papitas amarillas y arroz blanco con choclo.',
        den: 'Wok-tossed beef tenderloin and vegetables, with crispy yellow potatoes and white rice with corn.' },
      { id: 'pechuga-a-la-plancha', es: 'Pechuga a la plancha', en: 'Grilled chicken breast', p: 30,
        des: 'Filete de pechuga a la plancha acompañada de papas fritas, arroz y una ensalada mixta.',
        den: 'Grilled chicken breast with fries, rice and a mixed salad.' },
      { id: 'tacu-tacu-a-lo-pobre', es: 'Tacu tacu a lo pobre', en: 'Tacu tacu a lo pobre', p: 36,
        des: 'Masa crujiente de frejoles y arroz con lomo fino al wok, montado con huevo y plátano.',
        den: 'Crispy bean-and-rice cake with wok-tossed beef, topped with a fried egg and plantain.' },
      { id: 'spaghetti-al-pesto', es: 'Spaghetti al pesto con churrasco o milanesa', en: 'Pesto spaghetti with steak or breaded chicken', p: 30,
        des: 'Un tradicional spaghetti bañado en salsa pesto acompañado de un suculento churrasco de res a la parrilla o una milanesa de pollo.',
        den: 'Traditional spaghetti in pesto sauce with a juicy grilled beef steak or a breaded chicken cutlet.' },
      { id: 'tallarin-carretillero-pollo', es: 'Tallarín saltado carretillero de pollo', en: 'Carretillero noodles with chicken', p: 28,
        des: 'Spaghetti salteado con dados de pollo y vegetales con una peculiar salsa carretillera.',
        den: 'Spaghetti stir-fried with diced chicken and vegetables in a distinctive carretillera sauce.' }
    ] }]
  },
  {
    id: 'fusion', es: 'Criollo fusión', en: 'Criollo fusion',
    groups: [{ items: [
      { id: 'asado-de-tira', es: 'Asado de tira de la abuela', en: "Grandma's short ribs", p: 37,
        des: 'Nuestro asado de tira en cocción de 3 horas acompañado de un puré rústico y vegetales salteados.',
        den: 'Our short ribs, slow-cooked for three hours, with rustic mashed potatoes and sautéed vegetables.' },
      { id: 'arroz-cremoso-lomo', es: 'Arroz cremoso con lomo saltado', en: 'Creamy rice with lomo saltado', p: 38,
        des: 'Arroz en crema de ají amarillo con toque de parmesano, montado con lomo saltado al wok.',
        den: 'Creamy ají amarillo rice with a touch of parmesan, topped with wok-tossed beef.' },
      { id: 'chaufa-amazonico', es: 'Chaufa amazónico', en: 'Amazonian chaufa', p: 30,
        des: 'De la selva su chaufa: arroz salteado con cecina y chorizo amazónico, acompañado de unas crujientes costras de pollo, plátano y su infaltable ajicito de cocona.',
        den: 'Jungle-style fried rice with cecina and Amazonian chorizo, crispy chicken, plantain and the essential cocona chili sauce.' },
      { id: 'fetuccini-huancaina-strogonoff', es: 'Fetuccini a la huancaína con lomo strogonoff', en: 'Huancaína fettuccine with beef stroganoff', p: 38,
        des: 'Fetuccini cremoso a la huancaína acompañado de trozos de lomo fino con champiñones en salsa strogonoff.',
        den: 'Creamy huancaína fettuccine with beef tenderloin and mushrooms in stroganoff sauce.' },
      { id: 'milanesa-strogonoff', es: 'Milanesa strogonoff', en: 'Chicken milanesa stroganoff', p: 32,
        des: 'Filete de pechuga al panko cubierto de champiñones en salsa strogonoff con crujientes papas peruanitas. Puedes acompañarlo con arroz blanco o ensalada fresca.',
        den: 'Panko chicken cutlet covered in mushroom stroganoff with crispy Peruvian potatoes. Choose white rice or a fresh salad.' }
    ] }]
  },
  {
    id: 'mar', es: 'Del mar a tu plato', en: 'From the sea',
    groups: [{ items: [
      { id: 'arroz-con-mariscos', es: 'Arroz con mariscos', en: 'Seafood rice', p: 32,
        des: 'Arroz cremoso salteado con frutos del mar con nuestro toque chalaco.',
        den: 'Creamy rice sautéed with seafood, with our Callao twist.' },
      { id: 'duo-marino', es: 'Dúo marino', en: 'Dúo marino', p: 35,
        des: 'Nuestro cremoso arroz con mariscos acompañado de un delicioso ceviche al rocoto.',
        den: 'Our creamy seafood rice with a delicious rocoto ceviche.' },
      { id: 'trio-marino', es: 'Trío marino', en: 'Trío marino', p: 39,
        des: 'El trío perfecto. Arroz cremoso de mariscos montado con cevichito de la casa y crujientes aros de calamar.',
        den: 'The perfect trio: creamy seafood rice topped with house ceviche and crispy calamari rings.' },
      { id: 'tacu-tacu-mar-y-tierra', es: 'Tacu tacu mar y tierra', en: 'Surf and turf tacu tacu', p: 39,
        des: 'Masa crujiente de frejoles y arroz con lomo fino salteado al wok y una cremosa salsa de mariscos.',
        den: 'Crispy bean-and-rice cake with wok-tossed beef tenderloin and a creamy seafood sauce.' },
      { id: 'fetuccini-fruto-di-mari', es: 'Fetuccini fruto di mari', en: 'Fettuccine frutti di mare', p: 34,
        des: 'Mix de mariscos salteados con mantequilla y vino blanco envueltos en una salsa especial de mariscos, junto a un filete de pescado al grill.',
        den: 'Seafood sautéed in butter and white wine in a special seafood sauce, with a grilled fish fillet.' }
    ] }]
  },
  {
    id: 'finde', es: 'Especiales de fin de semana', en: 'Weekend specials',
    groups: [{ items: [
      { id: 'chanchito-caja-china', es: 'Chanchito crujiente a la caja china', en: 'Crispy caja china pork', p: 39,
        des: 'Chanchito crocante acompañado de papitas cocktail en finas hierbas y un mix de vegetales frescos.',
        den: 'Crispy pork with herbed cocktail potatoes and a mix of fresh vegetables.' },
      { id: 'carapulcra-sopa-seca', es: 'Carapulcra con sopa seca', en: 'Carapulcra with sopa seca', p: 37,
        des: 'Clásico de nuestro sur. Tallarines y nuestro guiso muy jugoso acompañado de una panceta crocante.',
        den: 'A southern Peruvian classic: noodles and our juicy stew with crispy pork belly.' },
      { id: 'frejoles-seco-cabrito', es: 'Frejoles con seco de cabrito', en: 'Beans with braised goat', p: 40,
        des: 'Un rico seco de cabrito al estilo norteño acompañado de unos suculentos frejoles canario con su rica sarza criolla.',
        den: 'Northern-style braised goat with canary beans and a fresh criolla salsa.' }
    ] }]
  },
  {
    id: 'ensaladas', es: 'Ensaladas', en: 'Salads',
    groups: [{ items: [
      { id: 'ensalada-pachanka', es: 'Ensalada Pachanka', en: 'Pachanka salad', p: 22,
        des: 'Lechugas, tomates cherry con láminas de jamón ahumado, dados de palta y transparencias de rabanito, coronadas con hilo de wantán crocante.',
        den: 'Lettuce, cherry tomatoes, smoked ham, avocado and paper-thin radish, crowned with crispy wonton threads.' },
      { id: 'ensalada-parrillera', es: 'Ensalada parrillera', en: 'Grilled chicken salad', p: 24,
        des: 'Filete de pollo al grill, mix de lechugas, tomates cherry y aceitunas, bañadas con un aderezo agridulce de mostaza y miel.',
        den: 'Grilled chicken fillet, mixed lettuce, cherry tomatoes and olives in a honey mustard dressing.' },
      { id: 'ensalada-cesar', es: 'Ensalada César', en: 'Caesar salad', p: 22,
        des: 'Lechuga romana, crocantes crutones, filetitos de pollo a la plancha, queso parmesano y salsa tradicional.',
        den: 'Romaine lettuce, crunchy croutons, grilled chicken, parmesan and the traditional dressing.' }
    ] }]
  },
  {
    id: 'peques', es: 'Para los peques', en: 'For kids',
    groups: [{ es: 'Incluye bebida', en: 'Drink included', items: [
      { id: 'milanesa-kids', es: 'Milanesa kids', en: 'Milanesa kids', p: 25,
        des: 'Filete de pollo empanizado al panko acompañado de papitas crujientes y bebida de cortesía.',
        den: 'Panko breaded chicken fillet with crispy fries and a complimentary drink.' },
      { id: 'spaguetti-alfredo', es: 'Spaguetti al alfredo', en: 'Spaghetti alfredo', p: 25,
        des: 'Clásica receta con jamón pizzero fresco acompañado de su bebida.',
        den: 'The classic recipe with fresh ham, drink included.' }
    ] }]
  },
  {
    id: 'postres', es: 'Postres', en: 'Desserts',
    groups: [{ items: [
      { id: 'cheesecake-fresa', es: 'Cheesecake de fresa', en: 'Strawberry cheesecake', p: 18,
        des: 'Crocante masa de galleta con queso crema y coronado con su reducción de fresas glaseadas.',
        den: 'Crunchy cookie base with cream cheese, crowned with a glazed strawberry reduction.' },
      { id: 'pie-de-limon', es: 'Pie de limón', en: 'Lime pie', p: 18,
        des: 'Delicioso pie de limón con el punto exacto de dulzura y acidez.',
        den: 'Lime pie with the exact balance of sweet and tart.' },
      { id: 'brownie-helado', es: 'Brownie con helado', en: 'Brownie with ice cream', p: 17,
        des: 'Delicioso bizcocho de chocolate acompañado de una bola de helado con el sabor de la temporada.',
        den: 'Chocolate brownie with a scoop of the season’s ice cream.' },
      { id: 'picarones-helado', es: 'Picarones con helado', en: 'Picarones with ice cream', p: 19,
        des: 'Clásicos y crujientes picarones bañados en una deliciosa miel, acompañados de una bola de helado.',
        den: 'Classic crispy picarones drizzled with syrup and a scoop of ice cream.' }
    ] }]
  },
  {
    id: 'guarniciones', es: 'Guarniciones', en: 'Sides',
    groups: [{ items: [
      { id: 'porcion-de-arroz', es: 'Porción de arroz', en: 'Rice', p: 8, des: '', den: '' },
      { id: 'papas-fritas', es: 'Papas fritas', en: 'Fries', p: 8, des: '', den: '' },
      { id: 'platano-frito', es: 'Plátano frito', en: 'Fried plantain', p: 5, des: '', den: '' },
      { id: 'huevo-frito', es: 'Huevo frito', en: 'Fried egg', p: 3.5, des: '', den: '' },
      { id: 'ensalada-mixta', es: 'Ensalada mixta', en: 'Mixed salad', p: 6, des: '', den: '' },
      { id: 'pure-de-papas', es: 'Puré de papas', en: 'Mashed potatoes', p: 9, des: '', den: '' },
      { id: 'pechuga-de-pollo-80g', es: 'Pechuga de pollo 80 g', en: 'Chicken breast 80 g', p: 12, des: '', den: '' }
    ] }]
  },
  {
    id: 'bebidas', es: 'Bebidas', en: 'Drinks',
    groups: [
      { es: 'Mocktails', en: 'Mocktails', items: [
        { id: 'rojo-atardecer', es: 'Rojo atardecer', en: 'Rojo atardecer', p: 14, des: '', den: '' },
        { id: 'efervescencia', es: 'Efervescencia', en: 'Efervescencia', p: 14, des: '', den: '' },
        { id: 'limonada-frutos-rojos', es: 'Limonada de frutos rojos', en: 'Red berry lemonade', p: 12, des: '', den: '' },
        { id: 'pachanka-fresh', es: 'Pachanka Fresh', en: 'Pachanka Fresh', p: 12, des: '', den: '' },
        { id: 'limonada-clasica-vaso', es: 'Limonada clásica · vaso', en: 'Classic lemonade · glass', p: 8, des: '', den: '' },
        { id: 'limonada-clasica-litro', es: 'Limonada clásica · litro', en: 'Classic lemonade · 1 L', p: 20, des: '', den: '' },
        { id: 'limonada-de-hierbas', es: 'Limonada de hierbas', en: 'Herb lemonade', p: 22, des: '', den: '' },
        { id: 'limonada-hierba-luisa', es: 'Limonada hierba luisa', en: 'Lemongrass lemonade', p: 8, des: '', den: '' },
        { id: 'limonada-hierba-buena', es: 'Limonada hierba buena', en: 'Spearmint lemonade', p: 8, des: '', den: '' },
        { id: 'maracuya-litro', es: 'Maracuyá · litro', en: 'Passion fruit · 1 L', p: 22, des: '', den: '' },
        { id: 'maracuya-vaso', es: 'Maracuyá · vaso', en: 'Passion fruit · glass', p: 8, des: '', den: '' }
      ] },
      { es: 'Infusiones', en: 'Herbal teas', items: [
        { id: 'hierba-menta', es: 'Hierba menta', en: 'Mint', p: 7, des: '', den: '' },
        { id: 'hierba-luisa', es: 'Hierba luisa', en: 'Lemongrass', p: 7, des: '', den: '' }
      ] }
    ]
  }
];
