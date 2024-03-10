const heroes = [];

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then((data) => {
    updateTable(data);
    data.forEach((hero) => {
      heroes.push(hero);
    });
    initializePagination(20);
    updateTable(heroes.slice(0, 20));
  });

const handleSelectChange = (event) => {
  let heroesPerPage = event.target.value;

  if (heroesPerPage === "All") {
    heroesPerPage = heroes.length;
  }
  console.log(heroesPerPage);
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};

const getNrOfPages = (heroesPerPage) =>
  Math.ceil(heroes.length / heroesPerPage);

const updateTable = (data) => {
  const tableBody = document.getElementById("tbody");
  tableBody.innerHTML = "";
  data.forEach((hero) => addToTable(hero, tableBody));
};

const addToTable = (hero, tBody) => {
  const row = document.createElement("tr");

  const image = document.createElement("img");
  image.src = hero.images.xs;
  row.appendChild(document.createElement("td")).appendChild(image);

  const powerstats = Object.entries(hero.powerstats)
    .map(([key, value]) => `${key}:${value}`)
    .join(", ");

  addCell(hero.name, row);
  addCell(hero.biography.fullName, row);
  addCell(powerstats, row);
  addCell(hero.appearance.race, row);
  addCell(hero.appearance.gender, row);
  addCell(hero.appearance.height, row);
  addCell(hero.appearance.weight, row);
  addCell(hero.biography.placeOfBirth, row);
  addCell(hero.biography.alignment, row);

  tBody.appendChild(row);
};

const addCell = (content, row) => {
  const cell = document.createElement("td");
  cell.innerHTML = content;
  row.appendChild(cell);
};

const initializePagination = (heroesPerPage) => {
  const totalPages = getNrOfPages(heroesPerPage);
  const paginationUl = document.getElementById("pagination");
  paginationUl.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "#";
    a.textContent = i;
    a.onclick = () => handlePaginationClick(i, heroesPerPage);
    li.appendChild(a);
    paginationUl.appendChild(li);
  }
};

const handlePaginationClick = (pageNumber, heroesPerPage) => {
  const startIndex = (pageNumber - 1) * heroesPerPage;
  const endIndex = startIndex + heroesPerPage;
  const dataToShow = heroes.slice(startIndex, endIndex);
  updateTable(dataToShow);
};
