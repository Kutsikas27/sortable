const heroes = [];
let heroesPerPage = 20;

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then((data) => {
    updateTable(data);
    data.forEach((hero) => {
      heroes.push(hero);
    });
    initializePagination(heroesPerPage);
    updateTable(heroes.slice(0, 20));
  });

const handleSelectChange = (event) => {
  heroesPerPage = event.target.value;

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
    a.textContent = String(i);
    a.onclick = () => handlePaginationClick(i, heroesPerPage);
    li.appendChild(a);
    paginationUl.appendChild(li);
  }
};

const handlePaginationClick = (pageNumber, heroesPerPage) => {
  heroesPerPage = parseInt(heroesPerPage);
  const startIndex = (pageNumber - 1) * heroesPerPage;
  const endIndex = startIndex + heroesPerPage;

  const dataToShow = heroes.slice(startIndex, endIndex);

  updateTable(dataToShow);
};

let isAscending = true;

const sortListByName = () => {
  if (isAscending) {
    heroes.sort((a, b) => a.name.localeCompare(b.name));
    isAscending = false;
  } else {
    heroes.sort((a, b) => b.name.localeCompare(a.name));
    isAscending = true;
  }

  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortListByFullName = () => {
  if (isAscending) {
    heroes.sort((a, b) => {
      if (b.biography.fullName === "" && a.biography.fullName !== "") return -1;
      if (a.biography.fullName === "" && b.biography.fullName !== "") return 1;
      return a.biography.fullName.localeCompare(b.biography.fullName);
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (b.biography.fullName === "" && a.biography.fullName !== "") return -1;
      if (a.biography.fullName === "" && b.biography.fullName !== "") return 1;
      return b.biography.fullName.localeCompare(a.biography.fullName);
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortPowerstats = () => {
  if (isAscending) {
    heroes.sort(
      (a, b) =>
        Object.values(a.powerstats).reduce(
          (acc, currentValue) => acc + currentValue,
          0
        ) -
        Object.values(b.powerstats).reduce(
          (acc, currentValue) => acc + currentValue,
          0
        )
    );
    isAscending = false;
  } else {
    heroes.sort(
      (a, b) =>
        Object.values(b.powerstats).reduce(
          (acc, currentValue) => acc + currentValue,
          0
        ) -
        Object.values(a.powerstats).reduce(
          (acc, currentValue) => acc + currentValue,
          0
        )
    );
    isAscending = true;
  }

  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortRace = () => {
  if (isAscending) {
    heroes.sort((a, b) => {
      if (!a.appearance.race && !b.appearance.race) return 0;
      if (b.appearance.race === null && a.appearance.race !== null) return -1;
      if (a.appearance.race === null && b.appearance.race !== null) return 1;
      return a.appearance.race.localeCompare(b.appearance.race);
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (!a.appearance.race && !b.appearance.race) return 0;
      if (b.appearance.race === null && a.appearance.race !== null) return -1;
      if (a.appearance.race === null && b.appearance.race !== null) return 1;
      return b.appearance.race.localeCompare(a.appearance.race);
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortGender = () => {
  if (isAscending) {
    heroes.sort((a, b) => {
      if (b.appearance.gender === "-" && a.appearance.gender !== "-") return -1;
      if (a.appearance.gender === "-" && b.appearance.gender !== "-") return 1;
      return a.appearance.gender.localeCompare(b.appearance.gender);
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (b.appearance.gender === "-" && a.appearance.gender !== "-") return -1;
      if (a.appearance.gender === "-" && b.appearance.gender !== "-") return 1;
      return b.appearance.gender.localeCompare(a.appearance.gender);
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortHeight = () => {
  const getCM = (str) => {
    if (str === undefined) return;
    const [first, second] = str.split(" ");
    const num = Number(first);
    return second === "meters" ? num * 1000 : num;
  };
  if (isAscending) {
    heroes.sort((a, b) => {
      if (
        b.appearance.height[1] === "0 cm" &&
        a.appearance.height[1] !== "0 cm"
      )
        return -1;
      if (
        a.appearance.height[1] === "0 cm" &&
        b.appearance.height[1] !== "0 cm"
      )
        return 1;

      return getCM(a.appearance.height[1]) - getCM(b.appearance.height[1]);
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (
        b.appearance.height[1] === "0 cm" &&
        a.appearance.height[1] !== "0 cm"
      )
        return -1;
      if (
        a.appearance.height[1] === "0 cm" &&
        b.appearance.height[1] !== "0 cm"
      )
        return 1;

      return getCM(b.appearance.height[1]) - getCM(a.appearance.height[1]);
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortWeight = () => {
  if (isAscending) {
    heroes.sort((a, b) => {
      if (
        a.appearance.weight[0] === "- lb" &&
        b.appearance.weight[0] !== "- lb"
      ) {
        return 1;
      } else if (
        a.appearance.weight[0] !== "- lb" &&
        b.appearance.weight[0] === "- lb"
      ) {
        return -1;
      }
      return (
        parseInt(a.appearance.weight[0]) - parseInt(b.appearance.weight[0])
      );
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (
        a.appearance.weight[0] === "- lb" &&
        b.appearance.weight[0] !== "- lb"
      ) {
        return 1;
      } else if (
        a.appearance.weight[0] !== "- lb" &&
        b.appearance.weight[0] === "- lb"
      ) {
        return -1;
      }
      return (
        parseInt(b.appearance.weight[0]) - parseInt(a.appearance.weight[0])
      );
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
const sortPlaceOfBirth = () => {
  if (isAscending) {
    heroes.sort((a, b) => {
      if (b.biography.placeOfBirth === "-" && a.biography.placeOfBirth !== "-")
        return -1;
      if (a.biography.placeOfBirth === "-" && b.biography.placeOfBirth !== "-")
        return 1;
      return a.biography.placeOfBirth.localeCompare(b.biography.placeOfBirth);
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (b.biography.placeOfBirth === "-" && a.biography.placeOfBirth !== "-")
        return -1;
      if (a.biography.placeOfBirth === "-" && b.biography.placeOfBirth !== "-")
        return 1;
      return b.biography.placeOfBirth.localeCompare(a.biography.placeOfBirth);
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};

const sortAlignment = () => {
  if (isAscending) {
    heroes.sort((a, b) => {
      if (b.biography.alignment === "-" && a.biography.alignment !== "-")
        return -1;
      if (a.biography.alignment === "-" && b.biography.alignment !== "-")
        return 1;
      return a.biography.alignment.localeCompare(b.biography.alignment);
    });
    isAscending = false;
  } else {
    heroes.sort((a, b) => {
      if (b.biography.alignment === "-" && a.biography.alignment !== "-")
        return -1;
      if (a.biography.alignment === "-" && b.biography.alignment !== "-")
        return 1;
      return b.biography.alignment.localeCompare(a.biography.alignment);
    });
    isAscending = true;
  }
  updateTable(heroes.slice(0, heroesPerPage));
  initializePagination(heroesPerPage);
};
//Searchbar  Select the input field
// Get the input field
let searchBar = document.getElementById("searchBar");

// Add an event listener to the input field
searchBar.addEventListener("keyup", function (e) {
  // Filter the heroes array based on the input value.
  let searchString = e.target.value.toLowerCase();
  let filteredHeroes = heroes.filter((hero) => {
    return hero.name.toLowerCase().includes(searchString);
  });
  console.log(filteredHeroes);

  // Call the updateTable function with the filtered data
  updateTable(filteredHeroes);
});
