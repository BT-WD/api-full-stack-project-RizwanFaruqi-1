let score = 0;
let correctBreed = "";

async function loadDog() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    const imageUrl = data.message;
    document.getElementById("dog-image").src = imageUrl;

    // Extract breed from URL
    const breed = imageUrl.split("/")[4];
    correctBreed = breed;

    generateOptions(breed);
  } catch (error) {
    console.error("Error loading dog:", error);
  }
}

function generateOptions(correct) {
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  let options = [correct, "husky", "poodle", "beagle"];

  options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === correctBreed) {
    score++;
    alert("Correct!");
  } else {
    alert("Wrong!");
  }

  document.getElementById("score").innerText = "Score: " + score;
}

document.getElementById("next-btn").addEventListener("click", loadDog);

loadDog();
