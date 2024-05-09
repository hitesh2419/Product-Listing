const getData = async (sortBy = "desc") => {
  const resp = await fetch(
    "https://dummyjson.com/products/category/mens-shoes"
  );
  const res = await resp.json();

  res.products.sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;

    if (sortBy === "asc") {
      return ratingA - ratingB;
    } else {
      return ratingB - ratingA;
    }
  });

  const cardContainer = document.querySelector(".card-container");
  const totalProducts = document.querySelector(".totalProducts");
  cardContainer.innerHTML = "";

  res.products.forEach((item) => {
    const cardEle = document.createElement("div");
    cardEle.classList.add("card");

    const cardTitle = document.createElement("h6");
    const cardPrice = document.createElement("h3");
    const cardImage = document.createElement("img");

    cardTitle.innerText = item.title;
    cardPrice.innerText = `$${item.price}`;
    cardImage.src = item.images[0];
    totalProducts.innerText = `Found: ${res.products.length} Products`;

    const rating = Math.round(item.rating);

    const ratingIcons = document.createElement("div");

    for (let i = 0; i < rating; i++) {
      const starIcon = document.createElement("i");
      starIcon.classList.add("fas", "fa-star");
      ratingIcons.appendChild(starIcon);
    }

    cardEle.append(cardImage, cardTitle, cardPrice, ratingIcons);
    cardContainer.appendChild(cardEle);
  });
};

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", () => {
    const sortOrder = item.getAttribute("data-sort");
    getData(sortOrder);
    document.getElementById("popularityToggle").click();
  });
});

const popularityToggle = document.getElementById("popularityToggle");
const popularityDropdown = document.getElementById("popularityDropdown");

popularityToggle.addEventListener("click", () => {
  popularityDropdown.style.display =
    popularityDropdown.style.display === "block" ? "none" : "block";
});

getData();
