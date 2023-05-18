FROM node:16.13.2

WORKDIR /app

RUN yarn global add pnpm@7.27.0
RUN yarn global add turbo

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY turbo.json .

COPY apps/web/package.json ./apps/web/

COPY . .

RUN pnpm i --shamefully-hoist=true

RUN pnpm run build --filter web

RUN pnpm run build --filter web,queries,common,tsconfig,ui,eslint-config-custom

ENTRYPOINT [ "pnpm", "run", "start", "--filter web" ]
