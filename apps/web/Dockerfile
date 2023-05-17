FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript
RUN yarn global add pnpm@7.27.0

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY turbo.json .

COPY apps/web/package.json ./apps/web/

COPY packages/common/package.json ./packages/common/
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/
COPY packages/queries/package.json ./packages/queries/
COPY packages/tsconfig/package.json ./packages/tsconfig/

RUN pnpm install

COPY . .

CMD [ "pnpm", "run", "start", "--filter web" ]
