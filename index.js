// @ts-nocheck

const loadData = (heroes, herosPerPage) => {
  const heroesToLoad = heroes.slice(10, 20);
  heroesToLoad.map((hero) => {
    addElement(hero);
  });
};

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then((data) => {
    loadData(data, 20);
  });

const handleSelectChange = () => {
  fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json())
    .then((data) => {
      const herosPerPage = document.getElementById("herosPerPage").value;
      loadData(data, herosPerPage);
    });
};

const addElement = (hero) => {
  const parenttbl = document.getElementById("table");
  const image = document.createElement("img");
  const newTr = document.createElement("tr");
  const newTd = document.createElement("td");
  const newTd2 = document.createElement("td");
  const newTd3 = document.createElement("td");
  const newTd4 = document.createElement("td");
  const newTd5 = document.createElement("td");
  const newTd6 = document.createElement("td");
  const newTd7 = document.createElement("td");
  const newTd8 = document.createElement("td");
  const newTd9 = document.createElement("td");
  const newTd10 = document.createElement("td");
  const powerstats = [];
  Object.entries(hero.powerstats).map(([key, value]) => {
    powerstats.push(`${key}:${value}`);
  });
  const trElement = parenttbl.appendChild(newTr);
  const elementid = document.getElementsByTagName("td").length;
  newTd.setAttribute("id", elementid);
  image.src = hero.images.xs;
  newTd2.innerHTML = hero.name;
  newTd3.innerHTML = hero.biography.fullName;
  newTd4.innerHTML = powerstats.join(", ");
  newTd5.innerHTML = hero.appearance.race;
  newTd6.innerHTML = hero.appearance.gender;
  newTd7.innerHTML = hero.appearance.height;
  newTd8.innerHTML = hero.appearance.weight;
  newTd9.innerHTML = hero.biography.placeOfBirth;
  newTd10.innerHTML = hero.biography.alignment;

  trElement.appendChild(newTd).appendChild(image);
  trElement.appendChild(newTd2);
  trElement.appendChild(newTd3);
  trElement.appendChild(newTd4);
  trElement.appendChild(newTd5);
  trElement.appendChild(newTd6);
  trElement.appendChild(newTd7);
  trElement.appendChild(newTd8);
  trElement.appendChild(newTd9);
  trElement.appendChild(newTd10);
};
