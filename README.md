Este é um projeto [Next.js](https://nextjs.org/) inicializado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Começando

Primeiro, execute o comando para instalar os pacotes da aplicação. 

```bash
npm install
# or
yarn install
```

Depois execute o comando para rodar aplicação.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

Você pode começar a editar a página modificando `pages/index.tsx`. A página é atualizada automaticamente conforme você edita o arquivo.

## Saber mais

Para saber mais sobre Next.js, dê uma olhada nos seguintes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - aprenda sobre os recursos e API do Next.js.
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js.

Você pode conferir [o repositório Next.js no GitHub](https://github.com/vercel/next.js/) - seus comentários e contribuições são bem-vindos!

## Deploy on Vercel

A maneira mais fácil de implantar seu aplicativo Next.js é usar a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Consulte a [Next.js deployment documentation](https://nextjs.org/docs/deployment) par amais detalhes.
# Sistema de Cadastro de Tarefas
Para fazer login no sistema de cadastro de tarefas, você vai precisar confirgurar na sua conta do google um CLIENT_ID e um CLIENT_SECRET, também vai precisar gerar um token. Você pode usar (https://www.md5hashgenerator.com/).

Para gerar suas credentias no google acesse: (https://console.developers.google.com/apis/credentials)


## Informação importe que você não pode deixar de configurar
No Next.js, o arquivo .env é um arquivo que contém configurações que o Next procura automaticamente quando o servidor é iniciado. O arquivo .env pode ser criado na raiz do projeto com o nome convencionado .env.local. As configurações podem variar de projeto para projeto

```
# .env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=

NEXT_PUBLIC_URL=http://localhost:3000

```