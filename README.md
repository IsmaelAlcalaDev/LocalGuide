# LocalGuide

LocalGuide es una aplicación web desarrollada como proyecto final para el Ciclo Superior de Desarrollo de Aplicaciones Web (DAW). Esta aplicación tiene como objetivo proporcionar a los usuarios una plataforma para encontrar guías locales en diferentes destinos turísticos.

## Características principales

- **Registro**: Los usuarios pueden registrarse de manera fácil y rápida, proporcionando la información necesaria para crear su perfil.
- **Inicio de sesión**: Los usuarios pueden iniciar sesión con sus credenciales para acceder a sus perfiles y utilizar todas las funcionalidades de la aplicación.
- **Gestión de perfil**: Los usuarios pueden gestionar su información de perfil, incluyendo datos personales, preferencias y fotografías.
- **Gestión de reservas**: Los usuarios pueden gestionar sus reservas, dejar reseñas, y gestionar reservas activas. Los guías disponen de un panel para ver estadísticas sobre sus servicios.
- **Visualización de perfiles**: Los usuarios pueden visitar los perfiles de otros usuarios y guías para conocer más sobre ellos.
- **Búsqueda de guías**: Los usuarios pueden buscar guías locales según su ubicación, destino y preferencias, utilizando filtros avanzados para una mejor precisión en la búsqueda.
- **Reservas**: Los usuarios pueden reservar servicios de guía directamente a través de la plataforma, seleccionando la fecha y número de horas deseada.
- **Valoraciones y comentarios**: Los usuarios pueden dejar valoraciones y comentarios sobre sus experiencias con los guías, ayudando a otros usuarios a tomar decisiones informadas.
- **Administración**: El administrador dispone de un panel donde puede ver los principales KPIs de la aplicación, además de listas de guías, turistas, reservas y transacciones.

## Tecnologías utilizadas

- **Frontend**: Angular
- **Backend**: Spring Boot
- **Arquitectura**: Hexagonal
- **Base de datos**: MySQL
- **Seguridad**: Spring Security (sin implementar)
- **Autenticación**: JSON Web Tokens (JWT) (sin implementar)
- **Librerías**: AOS (Animate On Scroll), Bootstrap, Material UI
- **APIs**: Pixabay (utiliza el nombre de la ciudad de los guías para obtener una imagen aleatoria de la API)

## Estructura del Proyecto

Este proyecto es una aplicación completa dividida en tres partes principales: Angular (frontend), Spring Boot (backend) y base de datos. A continuación se detallan los pasos para configurar y ejecutar cada parte del proyecto.

## Requisitos previos

- Node.js (v20)
- Angular CLI (v17)
- Java Development Kit (JDK) (v17)
- Maven (v3.9.6)
- MySQL o MariaDB

## Configuración del Frontend (Angular)

### 1. Instalación de Angular CLI

Si no tienes Angular CLI instalado, instálalo globalmente:

```bash
npm install -g @angular/cli
```

### 2. Clonar el repositorio y navegar al directorio del proyecto

```bash
git clone https://github.com/IsmaelAlcalaDev/LocalGuide
cd frontend
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar la aplicación en modo desarrollo

```bash
ng serve
```

Esto arrancará la aplicación Angular en [http://localhost:4200](http://localhost:4200).


## Configuración de la Base de Datos

### 1. Instalar y configurar MySQL o MariaDB

Asegúrate de tener MySQL o MariaDB instalado y en ejecución. Puedes descargar e instalar MariaDB desde su sitio oficial.

### 2. Crear la base de datos

Accede a la consola de MySQL/MariaDB y crea una base de datos para el proyecto:

```sql
CREATE DATABASE local_guide;
```

## Configuración del Backend (Spring Boot)

### 1. Configurar la base de datos

Crea una base de datos en MySQL o MariaDB y configura el archivo \`application.properties\` en \`src/main/resources\` con las credenciales de la base de datos.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/local_guide
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=create-drop
```

### 2. Construir y ejecutar la aplicación Spring Boot

```bash
mvn clean install
mvn spring-boot:run
```

Esto arrancará la aplicación Spring Boot en [http://localhost:8080](http://localhost:8080).

## Carga de Datos Iniciales

Se proporciona un script para cargar datos iniciales en la base de datos. Este script se encuentra en el directorio \`resources\` del proyecto backend. 

### 1. Ubicación del Script

El script SQL para la carga de datos iniciales se encuentra en:

```
src/main/resources/schema.sql
```

### 2. Ejecución del Script

El script se ejecuta automáticamente al iniciar la aplicación Spring Boot, gracias a la configuración de Spring que detecta y ejecuta automáticamente archivos SQL ubicados en el directorio \`resources\`.

Si deseas ejecutar el script manualmente, puedes hacerlo desde la consola de MySQL/MariaDB:

```sql
source src/main/resources/schema.sql;
```

## Librerías y herramientas adicionales utilizadas

El proyecto Angular utiliza varias bibliotecas adicionales que deben ser instaladas junto con el resto de las dependencias:

- **Bootstrap**: \`bootstrap@5.3.3\`
- **Angular Material**: \`@angular/material@17.3.5\`
- **AOS (Animate on Scroll)**: \`aos@2.3.4\`
- **Font Awesome**: \`@fortawesome/fontawesome-free@6.0.0\`
- **SweetAlert2**: \`sweetalert2@11.6.13\` y \`@sweetalert2/ngx-sweetalert2@12.3.0\`
- **ag-Grid**: \`ag-grid-angular@31.3.2\` y \`ag-grid-community@31.3.2\`
- **Chart.js**: \`chart.js@3.9.1\`
- **ng2-charts**: \`ng2-charts@6.0.1\`
- **ngx-pagination**: \`ngx-pagination@6.0.3\`
