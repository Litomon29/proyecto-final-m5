const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const API_URL = "http://localhost:3000"; 

// Cargar tareas al iniciar
window.addEventListener('DOMContentLoaded', loadTasks);

// Agregar tarea
addTaskBtn.addEventListener('click', async () => {
  const taskName = taskInput.value.trim();
  if (!taskName) return alert("La tarea no puede estar vacía.");

  try {
    const res = await axios.post(API_URL, { name: taskName, completed: false });
    appendTask(res.data);
    taskInput.value = "";
  } catch (err) {
    alert("Error al agregar tarea.");
  }
});

// Cargar tareas del backend
async function loadTasks() {
  try {
    const res = await axios.get(API_URL);
    res.data.forEach(task => appendTask(task));
  } catch (err) {
    alert("Error al cargar tareas.");
  }
}

// Mostrar tarea en la lista
function appendTask(task) {
  const li = document.createElement('li');
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.dataset.id = task.id;

  const span = document.createElement('span');
  span.textContent = task.name;
  if (task.completed) span.classList.add('completed');
  span.style.flex = '1';
  span.addEventListener('click', () => toggleComplete(task.id, span));

  const editBtn = document.createElement('button');
  editBtn.className = "btn btn-sm btn-warning me-2";
  editBtn.textContent = "Editar";
  editBtn.addEventListener('click', () => editTask(task.id, span));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = "btn btn-sm btn-danger";
  deleteBtn.textContent = "Eliminar";
  deleteBtn.addEventListener('click', () => deleteTask(task.id, li));

  const btnGroup = document.createElement('div');
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

// Marcar como completada
async function toggleComplete(id, span) {
  const completed = !span.classList.contains('completed');
  try {
    await axios.patch(`${API_URL}/${id}`, { completed });
    span.classList.toggle('completed');
  } catch (err) {
    alert("Error al actualizar tarea.");
  }
}

// Eliminar tarea
async function deleteTask(id, li) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    li.remove();
  } catch (err) {
    alert("Error al eliminar tarea.");
  }
}

// Editar tarea
function editTask(id, span) {
  const oldText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;
  input.className = "form-control form-control-sm me-2";
  span.replaceWith(input);
  input.focus();

  input.addEventListener('blur', async () => {
    const newText = input.value.trim();
    if (!newText) {
      alert("La tarea no puede estar vacía.");
      input.focus();
      return;
    }

    try {
      await axios.patch(`${API_URL}/${id}`, { name: newText });
      span.textContent = newText;
      input.replaceWith(span);
    } catch (err) {
      alert("Error al editar tarea.");
      input.replaceWith(span);
    }
  });
}
