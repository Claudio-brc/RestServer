# Service Marketplace API
The Service Marketplace API is designed to facilitate the exchange of services between users. This platform allows service providers to list and manage their offerings, while customers can browse, search, and book services according to their needs.

The API is built using Node.js and TypeScript for a scalable and maintainable codebase. Express is utilized as the web framework, providing a robust structure for handling HTTP requests and middleware. Data is stored in a MongoDB database, enabling flexible and efficient management of service listings, user accounts, and other key entities.

For security, JSON Web Tokens (JWT) are implemented to handle user authentication, ensuring that only authorized users can access specific resources and perform actions based on their roles.

Key functionalities include managing user accounts, defining roles (e.g., service providers and customers), and organizing services into categories for easier navigation. The API supports CRUD operations for products (services), user management, role assignment, and category organization, providing a strong foundation for building a comprehensive service marketplace.

This API is ideal for businesses and individuals looking to create a platform where services can be offered, discovered, and utilized efficiently.


## Key Features (under development)
- User authentication using JSON Web Tokens (JWT).
- Implementation of CRUD (Create, Read, Update, Delete) operations to interact with the database.

# Configuration
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure necessary environment variables, such as database credentials and the secret key for JWT, in a `.env` file.
4. Run the application using `nodemon app.js`.

# Usage
You can review the endpoints developed in the routers file. I am working on the documentation!

# Contact
If you have any questions or suggestions, please don't hesitate to contact me at calvarez.brc@gmail.com


**Español:**

# Configuración
1. Clona este repositorio.
2. Instala las dependencias utilizando `nodemon app.js`.
3. Configura las variables de entorno necesarias, como las credenciales de la base de datos y la clave secreta para JWT en un archivo `.env`.
4. Ejecuta la aplicación utilizando `npm start`.

# Uso
Puedes revisar los endpoints desarrollados en el archivo de routers. ¡Estoy trabajando en la documentación!

# Contacto
Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto conmigo en calvarez.brc@gmail.com.

