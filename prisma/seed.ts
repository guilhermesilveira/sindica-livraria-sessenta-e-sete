import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@livraria67.local";
const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

const products = [
  {
    slug: "javascript-com-dashboards",
    title: "JavaScript com Dashboards",
    author: "Lucas Tauil",
    category: "Front-end",
    description:
      "Uma jornada prática para transformar dados em telas claras, com JavaScript moderno e dashboards que ajudam equipes a decidir melhor.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/23d199d8-4078-44d6-a814-98eb9c66de24_1491c45e-0155-409e-94e7-e32faf933e0e_large.jpg?v=1756499653",
    priceInCents: 3990,
    stock: 18
  },
  {
    slug: "alfabetizacao-de-dados",
    title: "Alfabetizacao de Dados",
    author: "Marcio Victorino",
    category: "Dados",
    description:
      "Fundamentos para ler, questionar e comunicar dados com segurança, ideal para quem quer participar de projetos orientados por evidências.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/ca899b8d-d3fd-40d0-b776-3a6c0d745d04_large.jpg?v=1729279954",
    priceInCents: 3990,
    stock: 12
  },
  {
    slug: "aprenda-a-programar-com-python",
    title: "Aprenda a programar com Python",
    author: "Leonardo Soares e Gabriel Fortes",
    category: "Python",
    description:
      "Um começo cuidadoso para quem quer aprender programação escrevendo código útil desde os primeiros capítulos.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/p_23b8423e-86bd-438a-b34b-2551147022e5_large.jpg?v=1654834607",
    priceInCents: 3990,
    stock: 22
  },
  {
    slug: "logica-de-programacao-com-portugol",
    title: "Logica de Programacao com Portugol",
    author: "Joice Mendes e Rafael Muniz",
    category: "Logica",
    description:
      "Conceitos de algoritmos, raciocínio lógico e resolução de problemas para quem está dando os primeiros passos em tecnologia.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/p_dd9f330f-e4bb-405d-bdaf-e6c8a3985488_large.jpg?v=1645219300",
    priceInCents: 3990,
    stock: 16
  },
  {
    slug: "testes-de-software",
    title: "Testes de Software",
    author: "Thiago e Fred",
    category: "Qualidade",
    description:
      "Uma leitura objetiva para entender testes unitários, integração, aceitação e como criar confiança em entregas de software.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/cae1567b-088a-4193-afeb-f5ec41a2d432_large.jpg?v=1742936700",
    priceInCents: 3990,
    stock: 14
  },
  {
    slug: "estruturas-de-dados",
    title: "Estruturas de Dados",
    author: "Thiago Leite",
    category: "Computacao",
    description:
      "Listas, filas, pilhas, árvores e outros blocos fundamentais explicados com foco em uso real e clareza de implementação.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/EstruturasdeDados_Facebook_large.jpg?v=1686689005",
    priceInCents: 4990,
    stock: 10
  },
  {
    slug: "deixe-seu-codigo-limpo-e-brilhante",
    title: "Deixe seu codigo limpo e brilhante",
    author: "Jose Yoshiriro",
    category: "Boas praticas",
    description:
      "Refatoração, nomes melhores e pequenas decisões de design para deixar o código mais legível no dia a dia.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/Deixeseucodigolimpoebrilhante_ebook_large.jpg?v=1738704899",
    priceInCents: 4590,
    stock: 9
  },
  {
    slug: "desbravando-solid",
    title: "Desbravando SOLID",
    author: "Alexandre Aquiles",
    category: "Arquitetura",
    description:
      "Princípios de design orientado a objetos apresentados com exemplos diretos para evoluir código sem perder o controle.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/p_06eb36d4-f6a4-4ba0-933d-a54b9d700409_large.jpg?v=1659469600",
    priceInCents: 3990,
    stock: 15
  },
  {
    slug: "apache-kafka",
    title: "Apache Kafka",
    author: "Eduardo Zambom Santana",
    category: "Infraestrutura",
    description:
      "Mensageria, eventos e integração assíncrona com Kafka em uma abordagem prática para sistemas distribuídos.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/Apache-Kafka-Digital__Facebook_large.jpg?v=1643659546",
    priceInCents: 3990,
    stock: 11
  },
  {
    slug: "back-end-java",
    title: "Back-end Java",
    author: "Eduardo Zambom Santana",
    category: "Java",
    description:
      "Um guia para construir back-ends Java com Spring Boot, APIs, persistência e organização de serviços.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/Back-EndJava_Facebook_large.jpg?v=1631747300",
    priceInCents: 4990,
    stock: 13
  },
  {
    slug: "apis-rest",
    title: "APIs REST",
    author: "Alexandre Saudate",
    category: "Web",
    description:
      "Conceitos e práticas para desenhar APIs REST mais previsíveis, documentadas e fáceis de consumir.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/APIsREST_Facebook_large.jpg?v=1631570721",
    priceInCents: 3990,
    stock: 19
  },
  {
    slug: "teoria-dos-grafos",
    title: "Teoria dos Grafos",
    author: "Joao Paulo Maida",
    category: "Computacao",
    description:
      "Uma introdução aplicada a vértices, arestas, caminhos e problemas clássicos que aparecem em redes, mapas e recomendações.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/TeoriadosGrafos_Facebook_large.jpg?v=1631648963",
    priceInCents: 3990,
    stock: 8
  },
  {
    slug: "python-3",
    title: "Python 3",
    author: "Autor Casa do Codigo",
    category: "Python",
    description:
      "Sintaxe, arquivos, exceções, estruturas de dados e biblioteca padrão para consolidar a base em Python.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/Python_Facebook_large.jpg?v=1631651164",
    priceInCents: 3990,
    stock: 20
  },
  {
    slug: "pandas-python",
    title: "Pandas Python",
    author: "Eduardo Correa",
    category: "Dados",
    description:
      "Tratamento, exploração e transformação de dados com pandas para análises mais rápidas e confiáveis.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/PandasPython_Facebook_large.jpg?v=1631652849",
    priceInCents: 3990,
    stock: 17
  },
  {
    slug: "flask-de-a-a-z",
    title: "Flask de A a Z",
    author: "Tiago Silva",
    category: "Python",
    description:
      "Aplicações web e APIs com Flask, SQLAlchemy e ferramentas do ecossistema Python para projetos robustos.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/FlaskdeAaZ_Facebook_large.jpg?v=1631675377",
    priceInCents: 3990,
    stock: 7
  },
  {
    slug: "django-de-a-a-z",
    title: "Django de A a Z",
    author: "Tiago Silva",
    category: "Python",
    description:
      "Do primeiro projeto ao uso profissional de Django, com foco em aplicações completas, seguras e bem estruturadas.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/DjangodeAaZ_Facebook_large.jpg?v=1631668600",
    priceInCents: 3990,
    stock: 6
  },
  {
    slug: "engenharia-de-prompt-para-devs",
    title: "Engenharia de Prompt para Devs",
    author: "Ricardo Pupo Larguesa",
    category: "Inteligencia Artificial",
    description:
      "Técnicas de prompt para desenvolvedores que querem usar IA com mais precisão em código, produto e documentação.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/EngenhariadePromptsparaDevs_ebook2ed_large.jpg?v=1762802524",
    priceInCents: 3990,
    stock: 24
  },
  {
    slug: "inteligencia-artificial-e-chatgpt",
    title: "Inteligencia Artificial e ChatGPT",
    author: "Fabricio Carraro",
    category: "Inteligencia Artificial",
    description:
      "Uma explicação acessível sobre IA generativa, modelos de linguagem e como essas ferramentas entram no trabalho técnico.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/files/ia-ampliada_Amazon_1_d789b8bd-31d5-48e2-a67b-24166713cfad_large.jpg?v=1753912532",
    priceInCents: 4590,
    stock: 21
  },
  {
    slug: "typescript",
    title: "TypeScript",
    author: "Thiago da Silva Adriano",
    category: "Front-end",
    description:
      "Tipagem, interfaces, generics e boas práticas para tornar aplicações JavaScript mais claras e sustentáveis.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/p_53c8c7bd-9bcd-4fad-b00d-ff6b9ba40036_large.jpg?v=1627678101",
    priceInCents: 3990,
    stock: 18
  },
  {
    slug: "graphql",
    title: "GraphQL",
    author: "Akira Hanashiro",
    category: "Web",
    description:
      "Conceitos, consultas e modelagem de APIs GraphQL com uma abordagem prática para produtos web modernos.",
    imageUrl:
      "https://www.casadocodigo.com.br/cdn/shop/products/GraphQL_Facebook_large.jpg?v=1631677033",
    priceInCents: 3990,
    stock: 12
  }
];

async function main() {
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin Livraria 67",
      role: Role.ADMIN,
      passwordHash: await hash(adminPassword, 12)
    },
    create: {
      name: "Admin Livraria 67",
      email: adminEmail,
      role: Role.ADMIN,
      passwordHash: await hash(adminPassword, 12)
    }
  });

  await prisma.product.deleteMany({
    where: {
      slug: {
        notIn: products.map((product) => product.slug)
      }
    }
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...product,
        publisher: "Casa do Codigo",
        active: true
      },
      create: {
        ...product,
        publisher: "Casa do Codigo",
        active: true
      }
    });
  }

  console.log(`Seed complete. Admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
