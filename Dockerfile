FROM imbios/bun-node:18-alpine

ARG ENV

# set the working directory
WORKDIR /app

# install dependencies
COPY package.json .
RUN bun install

# copy the app
COPY . .

# build the app
RUN bun run build

# run the app
CMD bun run start