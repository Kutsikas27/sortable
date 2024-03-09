// @ts-nocheck

const loadData = (heroes) => {
  // ;
  heroes.forEach((hero) => {
    addElement(hero);
  });

  // Object.entries(heroes[0].powerstats).forEach(([key, value]) => {
  //   addElement(`${key}: ${value}`);
  // });

  addElement(heroes[0].appearance.gender);
  addElement(heroes[0].appearance.height);
  addElement(heroes[0].appearance.weight);
  addElement(heroes[0].biography.placeOfBirth);
  addElement(heroes[0].biography.alignment);
  addElement(heroes[0].name);
  addElement(heroes[0]);
};
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json())
  .then(loadData);

const addElement = (hero) => {
  const parenttbl = document.getElementById("table");
  const image = document.createElement("img");
  const newTd = document.createElement("td");
  const newTr = document.createElement("tr");
  const newTd2 = document.createElement("td");
  const newTd3 = document.createElement("td");
  const newTd4 = document.createElement("td");
  const newTd5 = document.createElement("td");
  const newTd6 = document.createElement("td");
  const newTd7 = document.createElement("td");
  const newTd8 = document.createElement("td");
  const newTd9 = document.createElement("td");
  const newTd10 = document.createElement("td");

  const trElement = parenttbl.appendChild(newTr);
  const elementid = document.getElementsByTagName("td").length;
  newTd.setAttribute("id", elementid);
  image.src = hero.images.xs;
  newTd2.innerHTML = hero.appearance.gender;
  newTd3.innerHTML = hero.biography.fullName;
  newTd4.innerHTML = hero.appearance.race;
  newTd5.innerHTML = hero.appearance.race;
  newTd6.innerHTML = hero.appearance.race;
  newTd7.innerHTML = hero.appearance.race;
  newTd8.innerHTML = hero.appearance.race;
  newTd9.innerHTML = hero.appearance.race;
  newTd10.innerHTML = hero.appearance.race;

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
