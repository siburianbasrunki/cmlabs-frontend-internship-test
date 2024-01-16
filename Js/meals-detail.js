document.addEventListener("DOMContentLoaded", function () {
  const breadcrumbContainer = document.getElementById("breadcrumb-container");
  const mealDetailContainer = document.getElementById("meal-detail-container");

  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("meal-id");

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        }
      }

      breadcrumbContainer.innerHTML = `
                <a href="index.html">Home</a> > 
                <a href="category-detail.html?category-name=${meal.strCategory}">${meal.strCategory}</a> > ${meal.strMeal}
            `;

      mealDetailContainer.innerHTML = `
            <div class="main-meal">
                <div>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div>
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strInstructions}</p>
                </div>
            </div>
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                </ul>
                <div>
                    <h3>Youtube Tutorial:</h3>
                    <iframe width="560" height="315" src="${
                      meal.strYoutube
                    }" frameborder="0" allowfullscreen></iframe>
                </div>
            `;
    })
    .catch((error) => console.error("Error fetching meal details:", error));
});
