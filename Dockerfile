FROM node:12 AS builder
WORKDIR /app
ENV PORT 8000
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]