const key = "ZpZ2GtW5Bb-SPqSDluiYrP1pdcmjJ_4bOYPxpAacvWE";
let page = 1;
let keyword = "";
const perPage = 6;

const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const imageGrid = document.getElementById("imageGrid");
const input = document.getElementById("keyword");
const themeToggle = document.getElementById("themeToggle");

async function fetchImages() {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=${perPage}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

function displayImages(images) {
  images.forEach((img, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <img src="${img.urls.small}" alt="${img.alt_description || "Image"}" loading="lazy">
      <div class="overlay">📸 ${img.user.name}</div>
    `;
    imageGrid.appendChild(card);
  });
}

async function performSearch() {
  keyword = input.value.trim();
  if (!keyword) return;
  page = 1;
  imageGrid.innerHTML = "";
  const images = await fetchImages();
  displayImages(images);
  loadMoreBtn.style.display = images.length === perPage ? "inline-block" : "none";
  clearBtn.style.display = "inline-block";
}

searchBtn.addEventListener("click", performSearch);
input.addEventListener("keyup", (e) => { if (e.key === "Enter") performSearch(); });

loadMoreBtn.addEventListener("click", async () => {
  page++;
  const images = await fetchImages();
  displayImages(images);
  if (images.length < perPage) loadMoreBtn.style.display = "none";
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  imageGrid.innerHTML = "";
  page = 1;
  loadMoreBtn.style.display = "none";
  clearBtn.style.display = "none";
});

/* Dark/Light Mode Toggle with Sun/Moon */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌞" : "🌙";
});
