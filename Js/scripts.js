document.addEventListener("DOMContentLoaded", function () {
  const categoriesContainer = document.getElementById("categories-container");
  const categoryDropdown = document.getElementById("category-dropdown");
  const heroSection = document.querySelector(".hero-section");
  const navList = document.querySelector(".nav-list");

  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;

      categories.forEach((category) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                    <div class="card-content">
                        <p class="card-title">${category.strCategory}</p>
                    </div>
                `;
        categoriesContainer.appendChild(card);

        const dropdownItem = document.createElement("a");
        dropdownItem.href = `category-detail.html?category-name=${category.strCategory}`;
        dropdownItem.textContent = category.strCategory;
        categoryDropdown.appendChild(dropdownItem);
      });

      categoriesContainer.addEventListener("click", function (event) {
        if (event.target.tagName === "IMG") {
          const categoryName = event.target.alt;
          console.log(`Image clicked: ${categoryName}`);

          window.location.href = `category-detail.html?category-name=${categoryName}`;
        }
      });

      const hamburgerMenu = document.querySelector(".hamburger-menu");
      hamburgerMenu.addEventListener("click", function () {
        navList.classList.toggle("show");
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => {
      const mealImage = data.meals[0].strMealThumb;
      heroSection.style.backgroundImage = `url('${mealImage}')`;
    })
    .catch((error) => console.error("Error fetching random meal image:", error));

  
});
