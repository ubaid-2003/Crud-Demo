fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        userList = data.slice(0, 5); 
        displayUsers();
    });

let userList = [];
let currentEditIndex = null;

function createUser() {
    const name = document.getElementById("name").value;

    if (name) {
        const user = { name };

        if (currentEditIndex === null) {
            // Add new user
            fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then(response => response.json())
                .then(newUser => {
                    userList.push(newUser);
                    userList = userList.slice(0, 5); 
                    displayUsers();
                });
        } else {
            // Update existing user
            const userId = userList[currentEditIndex].id;
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then(response => response.json())
                .then(updatedUser => {
                    userList[currentEditIndex] = updatedUser;
                    currentEditIndex = null;
                    displayUsers();
                });
        }
        document.getElementById("name").value = "";
    }
}

function displayUsers() {
    const list = document.getElementById("userList");
    list.innerHTML = userList.map((user, index) =>
        `<li>${user.name}, Id: ${user.id}
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        </li>`
    ).join(" ");
}

function deleteUser(index) {
    const userId = userList[index].id;

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
    })
        .then(() => {
            userList.splice(index, 1);
            displayUsers();
        });
}

function editUser(index) {
    const user = userList[index];
    document.getElementById("name").value = user.name;
    currentEditIndex = index;
}
