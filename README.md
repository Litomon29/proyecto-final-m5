# 📝 Lista de Tareas - Aplicación Web

Una aplicación web interactiva que permite a los usuarios gestionar sus tareas: añadir, editar, eliminar y marcar como completadas, todo con persistencia de datos conectada a un backend local.

---

## 🚀 Instrucciones de Uso

1. **Clona o descarga** este repositorio.
2. **Accede ala carpeta del proyecto**
   cd nombre-de-tu-proyecto
3. Instala [JSON Server](https://github.com/typicode/json-server) si no lo tienes:
   ```bash
   npm install -g json-server
4. Crea el archivo db.json
En la raíz del proyecto, crea un archivo llamado db.json con el siguiente contenido:

{
  "tasks": []
}

5. Inicia el backend
Ejecuta el siguiente comando en la terminal para iniciar JSON Server:
   json-server --watch db.json --port 3000
6. Abre la aplicación en el navegador
Abre el archivo index.html en tu navegador. Puedes hacer doble clic sobre él o usar una extensión como Live Server en Visual Studio Code.
7. Usa la aplicación
Desde la interfaz podrás:

➕ Añadir nuevas tareas (no se permiten vacías).

✅ Marcar tareas como completadas (se tachan visualmente).

📝 Editar tareas existentes.

🗑️ Eliminar tareas de la lista.

Todos los cambios se guardan automáticamente en tiempo real en el backend (db.json).

  
