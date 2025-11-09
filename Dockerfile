# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.3-alpine AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun run test
RUN bun run build

# copy production dependencies and source code into final image
FROM nginx:alpine AS release
COPY --from=prerelease /usr/src/app/dist /usr/share/nginx/html
COPY --from=prerelease /usr/src/app/public /usr/share/nginx/html/public
COPY nginx.conf /etc/nginx/conf.d/default.conf

# run the app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]