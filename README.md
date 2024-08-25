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
Um Sistema de Cadastro de Tarefas permite aos usuários criar, gerenciar e organizar suas atividades diárias de forma eficiente. Ao cadastrar uma tarefa, o usuário tem a opção de defini-la como pública ou privada. No caso de uma tarefa privada, ela é visível e acessível apenas ao usuário que a criou, garantindo a confidencialidade de suas atividades.

Por outro lado, ao cadastrar uma tarefa pública, essa se torna visível para todos os usuários do sistema. Nessa modalidade, qualquer usuário pode visualizar a tarefa e interagir com ela por meio de comentários, promovendo colaboração ou fornecendo feedback. Apesar de a tarefa pública permitir a interação de outros usuários, somente o criador da tarefa tem permissão para excluí-la, mantendo o controle sobre suas próprias atividades.

Este sistema oferece uma maneira versátil e segura de gerenciar tarefas, permitindo que os usuários escolham como desejam compartilhar suas atividades e interagir com a comunidade, garantindo, ao mesmo tempo, o controle sobre suas informações.

# Como se logar o sistema

Para fazer login no Sistema de Cadastro de Tarefas, é necessário configurar algumas credenciais em sua conta do Google. Primeiro, você precisará criar um CLIENT_ID e um CLIENT_SECRET, que são credenciais específicas que permitem que o sistema se autentique com a sua conta do Google. Além disso, será necessário gerar um token de acesso, que permite ao sistema realizar a autenticação de maneira segura.

Essas configurações são fundamentais para garantir a segurança e a privacidade do seu acesso, assegurando que apenas você possa gerenciar suas tarefas e informações dentro do sistema. Uma vez configurados, esses dados permitirão que você realize o login de forma simples e segura, utilizando sua conta Google como meio de autenticação.

## Para gerar suas credentias no google acesse
→ https://console.developers.google.com/apis/credentials
## Para gerar seu token acesse
→ https://www.md5hashgenerator.com/.


## Criar um arquivo .env
No Next.js, o arquivo .env é um arquivo que contém configurações que o Next procura automaticamente quando o servidor é iniciado. O arquivo .env pode ser criado na raiz do projeto com o nome convencionado .env.local. As configurações podem variar de projeto para projeto

```
# .env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=

NEXT_PUBLIC_URL=http://localhost:3000

```