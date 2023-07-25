// Array para almacenar los usuarios
let users = [];

// Referencia al formulario de contacto
const userForm = document.querySelector("#contactForm");

// Evento de escucha para enviar el formulario
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const user_name = document.querySelector("#nombre").value;
  const phone = document.querySelector("#telefono").value;
  const email = document.querySelector("#correo").value;

  if (userExist(phone, email)) {
    alertMsg("¡El usuario ya existe!");
  } else {
    if (insertUser(user_name, phone, email)) {
      updateUserList();
    } else {
      alertMsg("Error guardando, intenta nuevamente");
    }
  }
});

// Comprueba si el usuario ya existe en base al número de teléfono o correo electrónico
const userExist = (phone, email) => {
  return users.some((user) => user.phone === phone || user.email === email);
};

// Muestra una alerta con el mensaje proporcionado
const alertMsg = (msg) => {
  alert(msg);
};

// Inserta un nuevo usuario en el array
const insertUser = (user_name, phone, email) => {
  users.push({ user_name: user_name, phone: phone, email: email });
  return true;
};

// Actualiza la lista de usuarios en el DOM
const updateUserList = () => {
  userForm.reset();
  const usersContainer = document.querySelector("#list");
  usersContainer.innerHTML = "";

  users.forEach((user) => {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user_container", "user");

    const userName = document.createElement("div");
    userName.classList.add("user");
    userName.textContent = user.user_name;

    const userPhone = document.createElement("div");
    userPhone.classList.add("user");
    userPhone.textContent = user.phone;

    const userEmail = document.createElement("div");
    userEmail.classList.add("user");
    userEmail.textContent = user.email;

    userContainer.appendChild(userName);
    userContainer.appendChild(userPhone);
    userContainer.appendChild(userEmail);

    usersContainer.appendChild(userContainer);
  });
};
