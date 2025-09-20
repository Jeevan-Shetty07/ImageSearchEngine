const key = "ZpZ2GtW5Bb-SPqSDluiYrP1pdcmjJ_4bOYPxpAacvWE";
let page = 1;
let keyword = "";
const perPage = 6;

const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const imageGrid = document.getElementById("imageGrid");
const input = document.getElementById("keyword");

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
      <div class="img-container">
        <img src="${img.urls.small}" alt="${img.alt_description || "Image"}">
        <a href="IMAGE_URL" download class="download-btn">
  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
    <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.34v4h4.66V9h3.34L12 2z"/>
  </svg>
</a>

      </div>
    `;
    imageGrid.appendChild(card);
  });
}

searchBtn.addEventListener("click", async () => {
  keyword = input.value.trim();
  if (!keyword) return;
  page = 1;
  imageGrid.innerHTML = "";
  const images = await fetchImages();
  displayImages(images);
  loadMoreBtn.style.display =
    images.length === perPage ? "inline-block" : "none";
  clearBtn.style.display = "inline-block";
});

loadMoreBtn.addEventListener("click", async () => {
  page++;
  const images = await fetchImages();
  displayImages(images);
  if (images.length < perPage) loadMoreBtn.style.display = "none";
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  imageGrid.innerHTML = "";
  loadMoreBtn.style.display = "none";
  clearBtn.style.display = "none";
});
