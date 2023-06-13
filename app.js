// global variables
let employees = [];

const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;

const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  
  employees.forEach((employee, index) => {
    let { name, email, location: { city }, picture } = employee;
    
    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
  });
  
  gridContainer.innerHTML = employeeHTML;
}
  

function displayModal(index) {
  
  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr />
  <p>${phone}</p>
  <p class="address">${street}, ${state} ${postcode}</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  }
 

  function closeModal(){
    overlay.classList.add('hidden');
  }

  gridContainer.addEventListener('click', (e) => {
    const employeeCard = e.target.closest('.card');
    if (employeeCard) {
      const index = employeeCard.getAttribute('data-index');
      displayModal(index);
    }
  });

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);


