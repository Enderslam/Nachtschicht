# Node.js benutzen
FROM node:18

# Arbeitsordner im Container
WORKDIR /app

# package.json kopieren und Dependencies installieren
COPY package*.json ./
RUN npm install

# Restliche Dateien kopieren
COPY . .

# Port öffnen (Render benutzt 3000)
EXPOSE 3000

# Startkommando
CMD ["node", "server.js"]
