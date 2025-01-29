# Guía para Usar Remix desde un Repositorio

Este proyecto utiliza [Remix], un framework moderno para construir aplicaciones web. A continuación, te muestro cómo puedes descargar e iniciar un proyecto Remix desde este repositorio.


## Pasos para empezar

1. **Clona este repositorio**

   Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio en tu máquina local:

   ```jsx
   git clone https://github.com/Mariaisajc/profundizacion_nodo_aztro.git

   cd crud

2. **Instala las dependencias**

   Una vez dentro del directorio del proyecto, instala las dependencias necesarias. 
   A continuación, se muestra el comando para usar npm:

   ```jsx
   npm install

3. **Ejecuta el proyecto en tu entorno local**

   Una vez que las dependencias se han instalado, puedes ejecutar el proyecto localmente. Usa el siguiente comando para iniciar el servidor de desarrollo:

   ```jsx
   npm run dev

# Funciones y Hooks en Remix

## ¿Qué es action?

action: Es una función que se ejecuta en respuesta a una solicitud POST, PUT, PATCH o DELETE desde el cliente. Se utiliza para manejar datos enviados por el usuario, como formularios.

```jsx
export async function action({ request }) {
  const formData = await request.formData();
  const nombre = formData.get("first");
  const apellido = formData.get("last");
  const twitter = formData.get("twitter");

  // Validar y procesar los datos
  if (!first || !last || !twitter) {
    return { error: "Todos los campos son obligatorios." };
  }

  // Aquí puedes agregar la lógica para manejar los datos
  return { success: "Datos recibidos correctamente." };
}
```

## ¿Qué es loader?

loader: Es una función que se ejecuta antes de renderizar una ruta. Se utiliza para cargar datos necesarios para esa ruta, de manera que estén disponibles cuando la página se renderice.

```jsx
export async function loader() {
  // Simulación de datos cargados
  const data = {
    nombre: "Maria",
    apellido: "Isabel",
    twitter: "@mariaisajc"
  };
  return data;
}
```

## ¿Qué es useLoaderData?

useLoaderData: Es un hook de Remix que permite acceder a los datos cargados por el loader en un componente de React. Es útil para obtener y utilizar esos datos en la renderización del componente.

```jsx
import { useLoaderData } from "remix";

export default function UserProfile() {
  const { first, last, twitter } = useLoaderData();

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Name: {first}</p>
      <p>Last Name: {last}</p>
      <p>Twitter: {twitter}</p>
    </div>
  );
}
```

## ¿Qué es useActionData?

useActionData: Es un hook de Remix que permite acceder a los datos devueltos por una acción (action). Se utiliza para manejar la respuesta de la acción, como mostrar mensajes de error o éxito después de enviar un formulario.

```jsx
export default function BasicForm() {
    const actionData = useActionData<ActionData>();

    return (
        <div>
            <h1>Basic Form</h1>
            <form method="post">
                <label>
                    First Name: <input type="text" name="firstName" />
                </label>
                <label>
                    Last Name: <input type="text" name="lastName" />
                </label>
                <button type="submit">Send</button>
            </form>
            {actionData?.success && <p style={{color: 'green'}}>{actionData.success}</p>}
            {actionData?.error && <p style={{color:"red"}}>{actionData.error.message}</p>}
        </div>
    );
}
```

# Validaciones

Las validaciones en Remix se pueden hacer tanto en el lado del cliente como en el servidor. Aquí tienes un ejemplo básico de cómo podrías hacerlo:

Validación en el cliente:

```jsx
function validateForm(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "El nombre es requerido.";
  }
  if (!values.email) {
    errors.email = "El correo electrónico es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El correo electrónico no es válido.";
  }
  return errors;
}
```

Validación en el servidor (en la action):

```jsx
export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  const errors = {};
  if (!name) {
    errors.name = "El nombre es requerido.";
  }
  if (!email) {
    errors.email = "El correo electrónico es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (Object.keys(errors).length) {
    return { errors };
  }

  // Procesar datos válidos

}
```
