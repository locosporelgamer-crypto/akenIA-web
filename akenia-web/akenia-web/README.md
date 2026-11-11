# AkenIA — Web del Reino de Akenco

Primera versión de la web de AkenIA, preparada con Next.js y OpenAI Responses API.

## Qué incluye
- Interfaz de chat adaptable a móvil y ordenador.
- Personalidad e instrucciones de AkenIA en español.
- Conocimiento inicial del Reino y de los mods declarados por la administración.
- Búsqueda web para consultar información reciente, priorizando la web oficial de Akenco.
- Enlaces a las fuentes cuando la búsqueda devuelve citas.
- Clave de OpenAI protegida en el servidor (nunca en el navegador).

## Requisitos
- Node.js 20.9 o superior.
- Una clave de API de OpenAI con facturación/configuración habilitada.
- Un ordenador para la instalación inicial, o una persona que pueda realizarla.

## Prueba local (Windows)
1. Instala Node.js LTS desde https://nodejs.org/
2. Descomprime `akenia-web.zip`.
3. Abre la carpeta `akenia-web`.
4. En el Explorador de archivos, haz clic en la barra de dirección, escribe `cmd` y pulsa Enter.
5. Ejecuta:

   ```bash
   npm install
   ```

6. Copia `.env.example`, pega la copia y renómbrala a `.env.local`.
7. Abre `.env.local` con el Bloc de notas y sustituye `pega_aqui_tu_clave_secreta` por tu clave de API.
8. Guarda el archivo y ejecuta:

   ```bash
   npm run dev
   ```

9. Abre http://localhost:3000 en tu navegador.

Para detener el servidor local, vuelve a la ventana de comandos y pulsa Ctrl+C.

## Publicación recomendada
La opción sencilla para empezar es desplegar el proyecto en Vercel:
1. Crear una cuenta en https://vercel.com/
2. Subir el proyecto a un repositorio privado de GitHub (o pedir ayuda para este paso).
3. Importar el repositorio en Vercel.
4. En Project Settings → Environment Variables, añadir:
   - `OPENAI_API_KEY` = tu clave secreta de OpenAI
   - `OPENAI_MODEL` = `gpt-6-astra`
5. Desplegar y comprobar que la web responde.

No subas `.env.local` a GitHub ni compartas la clave con jugadores.

## Conectar ia.akenco.aprblox.es
En Vercel → Project → Settings → Domains, añade `ia.akenco.aprblox.es`.
Vercel mostrará el registro DNS exacto que debes crear. En el panel DNS que controla `akenco.aprblox.es`, crea ese registro (normalmente CNAME) con el destino que indique Vercel. No uses un destino inventado: sigue los valores que muestre el panel.
Cuando Vercel confirme el dominio y el certificado SSL, prueba `https://ia.akenco.aprblox.es`.

Si el dominio se administra desde un panel externo o por otra persona, necesitarás que esa persona cree el registro DNS.

## Conocimiento oficial
El asistente recibe datos base y puede utilizar búsqueda web. La búsqueda no garantiza que todas las páginas del sitio se lean en cada pregunta. Para respuestas jurídicas o administrativas fiables, conviene añadir una fase de indexación/sincronización de la Constitución, noticias, trabajos, elecciones y terrenos, con fecha de actualización y enlaces de origen.

## Seguridad y costes
- La API se factura según el uso y el modelo. Establece límites de gasto y revisa el uso en la plataforma de OpenAI.
- Antes de abrir el acceso público, añade protección antiabuso/rate limiting y monitorización. El límite en memoria no se ha implementado en esta primera versión.
- No se ha añadido inicio de sesión: cualquier visitante puede usar el chat.
- No hay conexión con el servidor de Minecraft ni capacidad para ejecutar comandos.
- Esta versión es una base inicial; hay que probarla y desplegarla antes de anunciarla como servicio público.

## Ayuda
Si no quieres hacer estos pasos tú mismo, comparte este ZIP con la persona que gestione la web o el alojamiento. No le envíes tu clave API por chat público.
