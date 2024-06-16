# Utiliza una imagen de Java como base
FROM openjdk:17-jdk

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo JAR de la aplicación al contenedor
COPY target/local-guide-0.0.1-SNAPSHOT.jar /app

# Expone el puerto en el que se ejecutará la aplicación Spring Boot
EXPOSE 8080

# Define el comando para ejecutar la aplicación Spring Boot
CMD ["java", "-jar", "local-guide-0.0.1-SNAPSHOT.jar"]