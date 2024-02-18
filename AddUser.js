let form = document.getElementById("form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let schoolInput = document.getElementById("school");
let universityInput = document.getElementById("university");
let skillsInput = document.getElementById("skills");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

// Función para cargar los datos almacenados localmente al cargar la página
window.addEventListener('load', () => {
  let savedPosts = localStorage.getItem('savedPosts');
  if (savedPosts) {
    posts.innerHTML = savedPosts;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation();
});

let formValidation = () => {
  if (nameInput.value === "") {
    msg.innerHTML = "Post cannot be blank";
    console.log("failure");
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
  }
};

let data = {};

let acceptData = () => {
  data["name"] = nameInput.value;
  data["email"] = emailInput.value;
  data["school"] = schoolInput.value;
  data["university"] = universityInput.value;
  data["skills"] = skillsInput.value;
  console.log(data);
  createPost();
  saveToLocalStorage();
};


let createPost = () => {
  posts.innerHTML += `
    <div class="cards-item">
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Escuela:</strong> ${data.school}</p>
      <p><strong>Universidad:</strong> ${data.university}</p>
      <p><strong>Habilidades:</strong> ${data.skills}</p>
      <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
  `;
  clearInputs();
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  saveToLocalStorage();
};

let editPost = (e) => {
  let postContainer = e.parentElement.parentElement;
  nameInput.value = postContainer.querySelector("p:nth-child(1)").textContent.split(':')[1].trim();
  emailInput.value = postContainer.querySelector("p:nth-child(2)").textContent.split(':')[1].trim();
  schoolInput.value = postContainer.querySelector("p:nth-child(3)").textContent.split(':')[1].trim();
  universityInput.value = postContainer.querySelector("p:nth-child(4)").textContent.split(':')[1].trim();
  skillsInput.value = postContainer.querySelector("p:nth-child(5)").textContent.split(':')[1].trim();
  postContainer.remove();
};

let clearInputs = () => {
  nameInput.value = "";
  emailInput.value = "";
  schoolInput.value = "";
  universityInput.value = "";
  skillsInput.value = "";
};

// Función para guardar los datos en el almacenamiento local
let saveToLocalStorage = () => {
  localStorage.setItem('savedPosts', posts.innerHTML);
};
