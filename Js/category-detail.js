document.addEventListener("DOMContentLoaded", function() {
    const mealsContainer = document.getElementById("meals-container");
    const paginationContainer = document.getElementById("pagination");
  
    const itemsPerPage = 10;
    let currentPage = 1;
  
    function displayData(data, page) {
      mealsContainer.innerHTML = "";
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
  
      for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const meal = data[i];
        const mealElement = document.createElement("div");
        mealElement.className = "card";
        mealElement.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p>${meal.strMeal}</p>
        `;
        mealElement.addEventListener("click", () => {
          window.location.href = `meals-detail.html?meal-id=${meal.idMeal}`;
        });
        mealsContainer.appendChild(mealElement);
      }
    }
  
    function createPaginationButtons(data) {
      const totalPages = Math.ceil(data.length / itemsPerPage);
  
      paginationContainer.innerHTML = "";
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.addEventListener("click", () => {
          currentPage = i;
          displayData(data, currentPage);
        });
        paginationContainer.appendChild(button);
      }
    }
  
    function fetchData(categoryName) {
      document.getElementById("categoryName").innerText = categoryName;
  
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then(response => response.json())
        .then(data => {
          createPaginationButtons(data.meals);
          displayData(data.meals, currentPage);
        })
        .catch(error => console.error("Error fetching meals:", error));
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category-name");
    fetchData(categoryName);
  });
  