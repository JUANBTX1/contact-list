// Array to store user data
let users = [];

// Reference to the contact form
const userForm = document.querySelector("#contactForm");

// Event listener for form submission
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form input values
  const user_name = getValue("#nombre");
  const user_lastName = getValue("#apellido");
  const phone = getValue("#telefono");
  const city = getValue("#ciudad");
  const address = getValue("#direccion");
  const email = getValue("#correo");

  if (userExist(phone, email)) {
    alertMsg("¡El usuario ya existe!");
  } else {
    if (insertUser(user_name, user_lastName, phone, city, address, email)) {
      updateUserList();
    } else {
      alertMsg("Error guardando, intenta nuevamente");
    }
  }
});

// Helper function to get form input values
const getValue = (elementId) => {
  return document.querySelector(elementId).value;
};

// Check if a user already exists based on phone or email
const userExist = (phone, email) => {
  return users.some((user) => user.phone === phone || user.email === email);
};

// Display an alert message
const alertMsg = (msg) => {
  alert(msg);
};

// Insert a new user into the array
const insertUser = (user_name, user_lastName, phone, city, address, email) => {
  users.push({
    user_name,
    user_lastName,
    phone,
    city,
    address,
    email,
  });
  return true;
};

// Update the user list in the DOM
const updateUserList = () => {
  userForm.reset();
  const usersContainer = document.querySelector("#list");
  usersContainer.innerHTML = "";

  users.forEach((user, index) => {
    // Add an index parameter
    const { user_name, user_lastName, phone, city, address, email } = user;

    // Create user data container
    const dataContainer = document.createElement("div");
    dataContainer.classList.add("data_container");

    // Create user element
    const userContainer = createUserElement(
      "user",
      `${user_name} ${user_lastName}`
    );
    const userPhone = createUserElement("user", phone);
    const userCity = createUserElement("user", city);
    const userAddress = createUserElement("user", address);
    const userEmail = createUserElement("user", email);

    // Create delete button
    const deleteUser = document.createElement("div");
    deleteUser.classList.add("delete_btn");
    deleteUser.textContent = "Delete";

    // Add an onclick function to the delete button
    deleteUser.onclick = () => {
      deleteUserFromArray(index); // Call function to delete user from the array
      updateUserList(); // Update the user list in the DOM
    };

    // Append elements to data container
    userContainer.appendChild(userPhone);
    userContainer.appendChild(userCity);
    userContainer.appendChild(userAddress);
    userContainer.appendChild(userEmail);

    dataContainer.appendChild(userContainer);
    dataContainer.appendChild(deleteUser);
    usersContainer.appendChild(dataContainer);
  });
};

// Function to delete a user from the array by index
const deleteUserFromArray = (index) => {
  users.splice(index, 1);
};

// Helper function to create a user element
const createUserElement = (className, text) => {
  const element = document.createElement("div");
  element.classList.add(className);
  element.textContent = text;
  return element;
};