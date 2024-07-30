## Getting Started

Aplicación web que simula una red social que permite regitrarse con un correo y contraseña, también por medio de la cuenta Google, permite publicar con y sin imagenes en la red, interactuar con likes o comentarios en las publicaciones y acceder a los perfiles se los usuarios (para implementar su contenido a futuro).

Construida con React.js, Next.js, Redux - toolkit, firebase, tailwind y NextUI.

Arquitectura por tipo de ficheros o directorios, separando: 
    - Componentes (/components)
    - Vistas o páginas (/pages)
    - Servicios (/api)
    - Centralización de datos (/store)
    - Utils (/utils)

Cuenta con despliegue continuo y hosting con AWS - Amplify mediante la conexión al repositorio:

Enlace app: https://main.dq4zjh3oxxihe.amplifyapp.com/
Repositorio: https://github.com/Wida7/social-app

Implementa el uso de: 
    - Hooks: (useState, useEffect...).
    - Conexión y centralización de datos: (firebase - Redux Toolkit).
    - Persistencia de datos: (Redux-persist).
    - Manejo de estilos y componentes: (Tailwind, NextUI).
    - Manejo de formularios.
    - Rutas dinamicas.
    - Manejo de errores.
    - Manejo de espera mientras cargan los componentes por medio de esqueletos y loaders.

Uso de diferentes librerias: NextUI, React-hook-form, react-icons, firebase entre otras.

## Install and execute repository

Aspectos necesarios para clonar y ejecutar el repositorio:

 1.Git
    • https://git-scm.com/
 2.Node.js
    • https://nodejs.org/en/



```bash
#Para instalar y ejecutar el repositorio es necesario clonarlo en su carpeta de preferencia por medio de la terminal y el comando:
 git clone https://github.com/Wida7/social-app
#Posterior acceder a la carpeta desde la terminal para instalar dependencias necesarias por medio del comando: 
 npm install
#para terminar ejecutamos el siguiente comando para ejecutar el proyecto en entorno de desarrollo:
 npm run dev
#Una vez ejecute el comando y termine de cargar, se podra acceder por medio del siguiente enlace o por el indicado en la terminal:
 http://localhost:3000
```

