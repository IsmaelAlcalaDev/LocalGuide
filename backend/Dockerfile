# Imagen de node que se va a usar (establecer vuestra versión, en el ejemplo es la 14)
FROM node:20

# Directorio de trabajo en el contenedor
WORKDIR /app 

# Copiar el archivo package.json y package-lock.json al contenedor para que se puedan instalar las dependencias
COPY package*.json ./ 

# Instalar las dependencias 
RUN npm install 

# Copiar el código fuente al contenedor ( el primer punto es el directorio local donde está el dockerfile
# y el segundo punto es el directorio WORKDIR definido más arriba)
COPY . . 

# Exponer el puerto en el que se ejecutará la API 
EXPOSE 8080 

# Arranque del servicio
CMD ["npm", "start"]