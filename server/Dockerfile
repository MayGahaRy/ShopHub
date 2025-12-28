FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Ensure the database file is handled via volume, but copy initial if exists
# Note: sequelize.sync() will create it if missing

EXPOSE 5000

CMD ["npm", "start"]
