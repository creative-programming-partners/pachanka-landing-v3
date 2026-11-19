/* Carta de Pachanka — transcrita de "CARTA PACHANKA ACTUALIZADA" (PDF del restaurante).
   Un solo archivo de datos para la landing y la carta digital: si cambia un precio,
   se cambia aquí y las dos webs quedan iguales.

   Categoría: { id, es, en, fr, groups:[{ es?, en?, fr?, items:[] }] }
   Plato:     { id, es, en, fr, p (precio en soles), des (descripción ES), den (EN), dfr (FR) }
   La foto de cada plato se busca en assets/platos/<id>.jpg (si no existe, se ve el marcador). */
window.PK_MENU = [
  {
    id: 'entradas', es: 'Pá empezar', en: 'To start', fr: 'Pour commencer',
    groups: [{ items: [
      { id: 'ceviche-pachanka', es: 'Ceviche Pachanka', en: 'Ceviche Pachanka', fr: 'Ceviche Pachanka', p: 33,
        des: 'Dados de pescado, láminas de pulpo, coronados con daditos de palta.',
        den: 'Diced fish and thin octopus slices, crowned with avocado.', dfr: 'Dés de poisson et fines lamelles de poulpe, couronnés de petits dés d’avocat.' },
      { id: 'causa-acevichada', es: 'Causa acevichada', en: 'Causa acevichada', fr: 'Causa acevichada', p: 30,
        des: 'Suave masa de papa amarilla, sobre un espejo de salsa huancaína, coronada con un ceviche al rocoto.',
        den: 'Soft yellow potato cake over a mirror of huancaína sauce, crowned with rocoto ceviche.', dfr: 'Purée douce de pomme de terre jaune sur un miroir de sauce huancaína, couronnée d’un ceviche au rocoto.' },
      { id: 'leche-de-tigre', es: 'Leche de tigre', en: 'Leche de tigre', fr: 'Leche de tigre', p: 24,
        des: 'Pescado y langostinos selectos bañados en una deliciosa salsa acevichada de la casa. Acompañado de una brocheta de chicharrón.',
        den: 'Select fish and prawns in the house ceviche marinade, with a crispy pork skewer.', dfr: 'Poisson et crevettes choisis nappés de la sauce ceviche maison, avec une brochette de chicharrón croustillant.' },
      { id: 'langostinos-al-panko', es: 'Langostinos al panko', en: 'Panko prawns', fr: 'Crevettes panko', p: 32,
        des: 'Crujientes y jugosos langostinos acompañados de una deliciosa salsa de maracuyá de la casa. (8 unidades)',
        den: 'Crispy, juicy prawns with the house passion fruit sauce. (8 pieces)', dfr: 'Crevettes croustillantes et juteuses, avec la sauce maison au fruit de la passion. (8 pièces)' }
    ] }]
  },
  {
    id: 'clasicos', es: 'Nuestros clásicos', en: 'Our classics', fr: 'Nos classiques',
    groups: [{ items: [
      { id: 'lomo-saltado', es: 'Lomo saltado', en: 'Lomo saltado', fr: 'Lomo saltado', p: 39,
        des: 'Trozos de lomo fino y vegetales salteados al wok, con unas crujientes papitas amarillas y arroz blanco con choclo.',
        den: 'Wok-tossed beef tenderloin and vegetables, with crispy yellow potatoes and white rice with corn.', dfr: 'Morceaux de filet de bœuf et légumes sautés au wok, avec des pommes de terre jaunes croustillantes et du riz blanc au maïs.' },
      { id: 'pechuga-a-la-plancha', es: 'Pechuga a la plancha', en: 'Grilled chicken breast', fr: 'Blanc de poulet grillé', p: 30,
        des: 'Filete de pechuga a la plancha acompañada de papas fritas, arroz y una ensalada mixta.',
        den: 'Grilled chicken breast with fries, rice and a mixed salad.', dfr: 'Filet de poulet grillé, servi avec des frites, du riz et une salade composée.' },
      { id: 'tacu-tacu-a-lo-pobre', es: 'Tacu tacu a lo pobre', en: 'Tacu tacu a lo pobre', fr: 'Tacu tacu a lo pobre', p: 36,
        des: 'Masa crujiente de frejoles y arroz con lomo fino al wok, montado con huevo y plátano.',
        den: 'Crispy bean-and-rice cake with wok-tossed beef, topped with a fried egg and plantain.', dfr: 'Galette croustillante de haricots et de riz, filet de bœuf sauté au wok, œuf au plat et banane plantain.' },
      { id: 'spaghetti-al-pesto', es: 'Spaghetti al pesto con churrasco o milanesa', en: 'Pesto spaghetti with steak or breaded chicken', fr: 'Spaghetti au pesto, steak ou escalope panée', p: 30,
        des: 'Un tradicional spaghetti bañado en salsa pesto acompañado de un suculento churrasco de res a la parrilla o una milanesa de pollo.',
        den: 'Traditional spaghetti in pesto sauce with a juicy grilled beef steak or a breaded chicken cutlet.', dfr: 'Spaghetti traditionnels au pesto, avec un steak de bœuf grillé ou une escalope de poulet panée.' },
      { id: 'tallarin-carretillero-pollo', es: 'Tallarín saltado carretillero de pollo', en: 'Carretillero noodles with chicken', fr: 'Nouilles sautées carretillero au poulet', p: 28,
        des: 'Spaghetti salteado con dados de pollo y vegetales con una peculiar salsa carretillera.',
        den: 'Spaghetti stir-fried with diced chicken and vegetables in a distinctive carretillera sauce.', dfr: 'Spaghetti sautés aux dés de poulet et aux légumes, dans une sauce carretillera bien à elle.' }
    ] }]
  },
  {
    id: 'fusion', es: 'Criollo fusión', en: 'Criollo fusion', fr: 'Criollo fusion',
    groups: [{ items: [
      { id: 'asado-de-tira', es: 'Asado de tira de la abuela', en: "Grandma's short ribs", fr: 'Travers de bœuf de grand-mère', p: 37,
        des: 'Nuestro asado de tira en cocción de 3 horas acompañado de un puré rústico y vegetales salteados.',
        den: 'Our short ribs, slow-cooked for three hours, with rustic mashed potatoes and sautéed vegetables.', dfr: 'Notre travers de bœuf cuit pendant 3 heures, avec une purée rustique et des légumes sautés.' },
      { id: 'arroz-cremoso-lomo', es: 'Arroz cremoso con lomo saltado', en: 'Creamy rice with lomo saltado', fr: 'Riz crémeux au lomo saltado', p: 38,
        des: 'Arroz en crema de ají amarillo con toque de parmesano, montado con lomo saltado al wok.',
        den: 'Creamy ají amarillo rice with a touch of parmesan, topped with wok-tossed beef.', dfr: 'Riz crémeux à l’ají amarillo avec une touche de parmesan, surmonté de lomo saltado au wok.' },
      { id: 'chaufa-amazonico', es: 'Chaufa amazónico', en: 'Amazonian chaufa', fr: 'Chaufa amazonien', p: 30,
        des: 'De la selva su chaufa: arroz salteado con cecina y chorizo amazónico, acompañado de unas crujientes costras de pollo, plátano y su infaltable ajicito de cocona.',
        den: 'Jungle-style fried rice with cecina and Amazonian chorizo, crispy chicken, plantain and the essential cocona chili sauce.', dfr: 'Le chaufa de la jungle : riz sauté à la cecina et au chorizo amazonien, avec du poulet croustillant, de la banane plantain et l’incontournable piment de cocona.' },
      { id: 'fetuccini-huancaina-strogonoff', es: 'Fetuccini a la huancaína con lomo strogonoff', en: 'Huancaína fettuccine with beef stroganoff', fr: 'Fettuccine huancaína et bœuf strogonoff', p: 38,
        des: 'Fetuccini cremoso a la huancaína acompañado de trozos de lomo fino con champiñones en salsa strogonoff.',
        den: 'Creamy huancaína fettuccine with beef tenderloin and mushrooms in stroganoff sauce.', dfr: 'Fettuccine crémeuses à la huancaína, avec des morceaux de filet de bœuf aux champignons, sauce strogonoff.' },
      { id: 'milanesa-strogonoff', es: 'Milanesa strogonoff', en: 'Chicken milanesa stroganoff', fr: 'Escalope milanaise strogonoff', p: 32,
        des: 'Filete de pechuga al panko cubierto de champiñones en salsa strogonoff con crujientes papas peruanitas. Puedes acompañarlo con arroz blanco o ensalada fresca.',
        den: 'Panko chicken cutlet covered in mushroom stroganoff with crispy Peruvian potatoes. Choose white rice or a fresh salad.', dfr: 'Filet de poulet pané au panko, nappé de champignons sauce strogonoff, avec des pommes de terre péruviennes croustillantes. Au choix : riz blanc ou salade fraîche.' }
    ] }]
  },
  {
    id: 'mar', es: 'Del mar a tu plato', en: 'From the sea', fr: 'De la mer à votre assiette',
    groups: [{ items: [
      { id: 'arroz-con-mariscos', es: 'Arroz con mariscos', en: 'Seafood rice', fr: 'Riz aux fruits de mer', p: 32,
        des: 'Arroz cremoso salteado con frutos del mar con nuestro toque chalaco.',
        den: 'Creamy rice sautéed with seafood, with our Callao twist.', dfr: 'Riz crémeux sauté aux fruits de mer, avec notre touche du Callao.' },
      { id: 'duo-marino', es: 'Dúo marino', en: 'Dúo marino', fr: 'Dúo marino', p: 35,
        des: 'Nuestro cremoso arroz con mariscos acompañado de un delicioso ceviche al rocoto.',
        den: 'Our creamy seafood rice with a delicious rocoto ceviche.', dfr: 'Notre riz crémeux aux fruits de mer, accompagné d’un délicieux ceviche au rocoto.' },
      { id: 'trio-marino', es: 'Trío marino', en: 'Trío marino', fr: 'Trío marino', p: 39,
        des: 'El trío perfecto. Arroz cremoso de mariscos montado con cevichito de la casa y crujientes aros de calamar.',
        den: 'The perfect trio: creamy seafood rice topped with house ceviche and crispy calamari rings.', dfr: 'Le trio parfait : riz crémeux aux fruits de mer, petit ceviche maison et calamars frits croustillants.' },
      { id: 'tacu-tacu-mar-y-tierra', es: 'Tacu tacu mar y tierra', en: 'Surf and turf tacu tacu', fr: 'Tacu tacu terre et mer', p: 39,
        des: 'Masa crujiente de frejoles y arroz con lomo fino salteado al wok y una cremosa salsa de mariscos.',
        den: 'Crispy bean-and-rice cake with wok-tossed beef tenderloin and a creamy seafood sauce.', dfr: 'Galette croustillante de haricots et de riz, filet de bœuf sauté au wok et sauce crémeuse aux fruits de mer.' },
      { id: 'fetuccini-fruto-di-mari', es: 'Fetuccini fruto di mari', en: 'Fettuccine frutti di mare', fr: 'Fettuccine aux fruits de mer', p: 34,
        des: 'Mix de mariscos salteados con mantequilla y vino blanco envueltos en una salsa especial de mariscos, junto a un filete de pescado al grill.',
        den: 'Seafood sautéed in butter and white wine in a special seafood sauce, with a grilled fish fillet.', dfr: 'Fruits de mer sautés au beurre et au vin blanc dans une sauce spéciale, avec un filet de poisson grillé.' }
    ] }]
  },
  {
    id: 'finde', es: 'Especiales de fin de semana', en: 'Weekend specials', fr: 'Spécialités du week-end',
    groups: [{ items: [
      { id: 'chanchito-caja-china', es: 'Chanchito crujiente a la caja china', en: 'Crispy caja china pork', fr: 'Cochon croustillant à la caja china', p: 39,
        des: 'Chanchito crocante acompañado de papitas cocktail en finas hierbas y un mix de vegetales frescos.',
        den: 'Crispy pork with herbed cocktail potatoes and a mix of fresh vegetables.', dfr: 'Porc croustillant, pommes de terre grenaille aux fines herbes et mélange de légumes frais.' },
      { id: 'carapulcra-sopa-seca', es: 'Carapulcra con sopa seca', en: 'Carapulcra with sopa seca', fr: 'Carapulcra et sopa seca', p: 37,
        des: 'Clásico de nuestro sur. Tallarines y nuestro guiso muy jugoso acompañado de una panceta crocante.',
        den: 'A southern Peruvian classic: noodles and our juicy stew with crispy pork belly.', dfr: 'Un classique du sud du Pérou : nouilles et notre ragoût bien juteux, avec de la poitrine de porc croustillante.' },
      { id: 'frejoles-seco-cabrito', es: 'Frejoles con seco de cabrito', en: 'Beans with braised goat', fr: 'Haricots et ragoût de chevreau', p: 40,
        des: 'Un rico seco de cabrito al estilo norteño acompañado de unos suculentos frejoles canario con su rica sarza criolla.',
        den: 'Northern-style braised goat with canary beans and a fresh criolla salsa.', dfr: 'Ragoût de chevreau à la mode du nord, avec des haricots canario et une sauce criolla fraîche.' }
    ] }]
  },
  {
    id: 'ensaladas', es: 'Ensaladas', en: 'Salads', fr: 'Salades',
    groups: [{ items: [
      { id: 'ensalada-pachanka', es: 'Ensalada Pachanka', en: 'Pachanka salad', fr: 'Salade Pachanka', p: 22,
        des: 'Lechugas, tomates cherry con láminas de jamón ahumado, dados de palta y transparencias de rabanito, coronadas con hilo de wantán crocante.',
        den: 'Lettuce, cherry tomatoes, smoked ham, avocado and paper-thin radish, crowned with crispy wonton threads.', dfr: 'Laitues, tomates cerises, lamelles de jambon fumé, dés d’avocat et fines tranches de radis, couronnées de fils de wonton croustillants.' },
      { id: 'ensalada-parrillera', es: 'Ensalada parrillera', en: 'Grilled chicken salad', fr: 'Salade au poulet grillé', p: 24,
        des: 'Filete de pollo al grill, mix de lechugas, tomates cherry y aceitunas, bañadas con un aderezo agridulce de mostaza y miel.',
        den: 'Grilled chicken fillet, mixed lettuce, cherry tomatoes and olives in a honey mustard dressing.', dfr: 'Filet de poulet grillé, mélange de laitues, tomates cerises et olives, avec une vinaigrette aigre-douce miel-moutarde.' },
      { id: 'ensalada-cesar', es: 'Ensalada César', en: 'Caesar salad', fr: 'Salade César', p: 22,
        des: 'Lechuga romana, crocantes crutones, filetitos de pollo a la plancha, queso parmesano y salsa tradicional.',
        den: 'Romaine lettuce, crunchy croutons, grilled chicken, parmesan and the traditional dressing.', dfr: 'Laitue romaine, croûtons croustillants, filets de poulet grillé, parmesan et sauce traditionnelle.' }
    ] }]
  },
  {
    id: 'peques', es: 'Para los peques', en: 'For kids', fr: 'Pour les petits',
    groups: [{ es: 'Incluye bebida', en: 'Drink included', fr: 'Boisson incluse', items: [
      { id: 'milanesa-kids', es: 'Milanesa kids', en: 'Milanesa kids', fr: 'Escalope panée enfant', p: 25,
        des: 'Filete de pollo empanizado al panko acompañado de papitas crujientes y bebida de cortesía.',
        den: 'Panko breaded chicken fillet with crispy fries and a complimentary drink.', dfr: 'Filet de poulet pané au panko, frites croustillantes et boisson offerte.' },
      { id: 'spaguetti-alfredo', es: 'Spaguetti al alfredo', en: 'Spaghetti alfredo', fr: 'Spaghetti Alfredo', p: 25,
        des: 'Clásica receta con jamón pizzero fresco acompañado de su bebida.',
        den: 'The classic recipe with fresh ham, drink included.', dfr: 'La recette classique au jambon frais, boisson incluse.' }
    ] }]
  },
  {
    id: 'postres', es: 'Postres', en: 'Desserts', fr: 'Desserts',
    groups: [{ items: [
      { id: 'cheesecake-fresa', es: 'Cheesecake de fresa', en: 'Strawberry cheesecake', fr: 'Cheesecake à la fraise', p: 18,
        des: 'Crocante masa de galleta con queso crema y coronado con su reducción de fresas glaseadas.',
        den: 'Crunchy cookie base with cream cheese, crowned with a glazed strawberry reduction.', dfr: 'Base croquante de biscuit au fromage frais, nappée d’un coulis de fraises glacées.' },
      { id: 'pie-de-limon', es: 'Pie de limón', en: 'Lime pie', fr: 'Tarte au citron vert', p: 18,
        des: 'Delicioso pie de limón con el punto exacto de dulzura y acidez.',
        den: 'Lime pie with the exact balance of sweet and tart.', dfr: 'Tarte au citron vert au parfait équilibre entre douceur et acidité.' },
      { id: 'brownie-helado', es: 'Brownie con helado', en: 'Brownie with ice cream', fr: 'Brownie et glace', p: 17,
        des: 'Delicioso bizcocho de chocolate acompañado de una bola de helado con el sabor de la temporada.',
        den: 'Chocolate brownie with a scoop of the season’s ice cream.', dfr: 'Moelleux au chocolat servi avec une boule de glace au parfum de saison.' },
      { id: 'picarones-helado', es: 'Picarones con helado', en: 'Picarones with ice cream', fr: 'Picarones et glace', p: 19,
        des: 'Clásicos y crujientes picarones bañados en una deliciosa miel, acompañados de una bola de helado.',
        den: 'Classic crispy picarones drizzled with syrup and a scoop of ice cream.', dfr: 'Picarones classiques et croustillants nappés de sirop, avec une boule de glace.' }
    ] }]
  },
  {
    id: 'guarniciones', es: 'Guarniciones', en: 'Sides', fr: 'Accompagnements',
    groups: [{ items: [
      { id: 'porcion-de-arroz', es: 'Porción de arroz', en: 'Rice', fr: 'Portion de riz', p: 8, des: '', den: '', dfr: '' },
      { id: 'papas-fritas', es: 'Papas fritas', en: 'Fries', fr: 'Frites', p: 8, des: '', den: '', dfr: '' },
      { id: 'platano-frito', es: 'Plátano frito', en: 'Fried plantain', fr: 'Banane plantain frite', p: 5, des: '', den: '', dfr: '' },
      { id: 'huevo-frito', es: 'Huevo frito', en: 'Fried egg', fr: 'Œuf au plat', p: 3.5, des: '', den: '', dfr: '' },
      { id: 'ensalada-mixta', es: 'Ensalada mixta', en: 'Mixed salad', fr: 'Salade composée', p: 6, des: '', den: '', dfr: '' },
      { id: 'pure-de-papas', es: 'Puré de papas', en: 'Mashed potatoes', fr: 'Purée de pommes de terre', p: 9, des: '', den: '', dfr: '' },
      { id: 'pechuga-de-pollo-80g', es: 'Pechuga de pollo 80 g', en: 'Chicken breast 80 g', fr: 'Blanc de poulet 80 g', p: 12, des: '', den: '', dfr: '' }
    ] }]
  },
  {
    id: 'bebidas', es: 'Bebidas', en: 'Drinks', fr: 'Boissons',
    groups: [
      { es: 'Mocktails', en: 'Mocktails', fr: 'Mocktails', items: [
        { id: 'rojo-atardecer', es: 'Rojo atardecer', en: 'Rojo atardecer', fr: 'Rojo atardecer', p: 14, des: '', den: '', dfr: '' },
        { id: 'efervescencia', es: 'Efervescencia', en: 'Efervescencia', fr: 'Efervescencia', p: 14, des: '', den: '', dfr: '' },
        { id: 'limonada-frutos-rojos', es: 'Limonada de frutos rojos', en: 'Red berry lemonade', fr: 'Limonade aux fruits rouges', p: 12, des: '', den: '', dfr: '' },
        { id: 'pachanka-fresh', es: 'Pachanka Fresh', en: 'Pachanka Fresh', fr: 'Pachanka Fresh', p: 12, des: '', den: '', dfr: '' },
        { id: 'limonada-clasica-vaso', es: 'Limonada clásica · vaso', en: 'Classic lemonade · glass', fr: 'Limonade classique · verre', p: 8, des: '', den: '', dfr: '' },
        { id: 'limonada-clasica-litro', es: 'Limonada clásica · litro', en: 'Classic lemonade · 1 L', fr: 'Limonade classique · 1 L', p: 20, des: '', den: '', dfr: '' },
        { id: 'limonada-de-hierbas', es: 'Limonada de hierbas', en: 'Herb lemonade', fr: 'Limonade aux herbes', p: 22, des: '', den: '', dfr: '' },
        { id: 'limonada-hierba-luisa', es: 'Limonada hierba luisa', en: 'Lemongrass lemonade', fr: 'Limonade à la verveine citronnée', p: 8, des: '', den: '', dfr: '' },
        { id: 'limonada-hierba-buena', es: 'Limonada hierba buena', en: 'Spearmint lemonade', fr: 'Limonade à la menthe', p: 8, des: '', den: '', dfr: '' },
        { id: 'maracuya-litro', es: 'Maracuyá · litro', en: 'Passion fruit · 1 L', fr: 'Fruit de la passion · 1 L', p: 22, des: '', den: '', dfr: '' },
        { id: 'maracuya-vaso', es: 'Maracuyá · vaso', en: 'Passion fruit · glass', fr: 'Fruit de la passion · verre', p: 8, des: '', den: '', dfr: '' }
      ] },
      { es: 'Infusiones', en: 'Herbal teas', fr: 'Infusions', items: [
        { id: 'hierba-menta', es: 'Hierba menta', en: 'Mint', fr: 'Menthe', p: 7, des: '', den: '', dfr: '' },
        { id: 'hierba-luisa', es: 'Hierba luisa', en: 'Lemongrass', fr: 'Verveine citronnée', p: 7, des: '', den: '', dfr: '' }
      ] }
    ]
  }
];
