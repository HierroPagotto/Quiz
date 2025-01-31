/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "hierropagotto.github.io",
          pathname: "/Quiz/**",  // Permite carregar qualquer imagem dentro do diretório /Quiz/
        },
      ],
    },
  };
  