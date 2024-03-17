document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("user-form");
  const name = document.getElementById("name");
  const role = document.getElementById("role");
  const userList = document.getElementById("user-list");
  const search = document.getElementById("search");
  const hr = document.getElementById("hr");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameValue = name.value;
    const roleValue = role.value;

    if (nameValue.length < 2) {
      alert("Name should contain at least 2 characters!");
    } else {
      addUser(nameValue, roleValue);
    }
  });

  function renderUsers() {
    userList.innerHTML = "";
    users.forEach(function (user) {
      if (user.name.toLowerCase().includes(search.value.toLowerCase())) {
        const li = document.createElement("li");
        li.innerHTML = `<div class="user-container">
      <div class="info-container">
        <div class="icon">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
            alt="icon"
            width="100"
            height="100"
          />
        </div>
        <div class="info">
          <div class="name">${user.name}</div>
          <div class="role">${user.role}</div>
        </div>
      </div>
      <div class="delete-icon" data-name="${user.name}">&#8855;</div>
    </div>`;

        userList.appendChild(li);
      }
    });
    if (users.length !== 0) {
      search.style.display = "block";
      hr.style.display = "block";
    } else {
      search.style.display = "none";
      hr.style.display = "none";
    }
  }
  function addUser(newName, newRole) {
    if (
      users.find((user) => user.name.toLowerCase() === newName.toLowerCase())
    ) {
      alert("This user exists");
      name.value = "";
      role.value = "default";
      return;
    }

    const newUser = {
      name: newName[0].toUpperCase() + newName.slice(1),
      role: newRole,
    };

    users.push(newUser);
    saveUsers();
    renderUsers();

    name.value = "";
    role.value = "default";
  }

  function deleteUser(userName) {
    users = users.filter((user) => user.name != userName);
    saveUsers();

    renderUsers();
  }

  search.addEventListener("input", renderUsers);

  userList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-icon")) {
      const divName = e.target.getAttribute("data-name");
      deleteUser(divName);
    }
  });

  renderUsers();
});
