# Guía para Usar Remix desde un Repositorio

Este proyecto utiliza [Remix], un framework moderno para construir aplicaciones web. A continuación, te muestro cómo puedes descargar e iniciar un proyecto Remix desde este repositorio.


## Pasos para empezar

1. **Clona este repositorio**

   Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

   ```jsx
   git clone https://github.com/Mariaisajc/profundizacion_nodo_aztro.git

   cd tutorial-remix

2. **Instala las dependencias**

   Una vez dentro del directorio del proyecto, instala las dependencias necesarias. 
   A continuación, se muestra el comando para usar npm:

   ```jsx
   npm install

3. **Ejecuta el proyecto en tu entorno local**

   Una vez que las dependencias se han instalado, puedes ejecutar el proyecto localmente. Usa el siguiente comando para iniciar el servidor de desarrollo:

   ```jsx
   npm run dev


# ¿Qué son los Links en Remix?

En Remix, los `Links` son componentes para navegar entre páginas sin recargar la aplicación. Usando `Link` en vez de un `<a>`, Remix maneja la navegación de forma eficiente, cargando solo lo necesario para cada página.

## Ejemplo de un Link

```jsx
import { Link } from 'remix';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/acerca">Acerca</Link>
    </nav>
  );
}

export default Navbar;


