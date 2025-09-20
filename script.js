const key = "ZpZ2GtW5Bb-SPqSDluiYrP1pdcmjJ_4bOYPxpAacvWE";
let page = 1;
let keyword = "";
const perPage = 6;

const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const imageGrid = document.getElementById('imageGrid');
const input = document.getElementById('keyword');

async function fetchImages() {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=${perPage}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}

function displayImages(images) {
  images.forEach((img, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <a href="${img.links.html}" target="_blank">
        <img src="${img.urls.small}" alt="${img.alt_description || 'Image'}">
      </a>
    `;
    imageGrid.appendChild(card);
  });
}

// Search button
searchBtn.addEventListener('click', async () => {
  keyword = input.value.trim();
  if (!keyword) return;
  page = 1;
  imageGrid.innerHTML = '';
  const images = await fetchImages();
  displayImages(images);
  loadMoreBtn.style.display = images.length === perPage ? 'inline-block' : 'none';
  clearBtn.style.display = 'inline-block'; // show clear button
});

// Load more button
loadMoreBtn.addEventListener('click', async () => {
  page++;
  const images = await fetchImages();
  displayImages(images);
  if (images.length < perPage) loadMoreBtn.style.display = 'none';
});

// Clear button
clearBtn.addEventListener('click', () => {
  input.value = '';
  imageGrid.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  clearBtn.style.display = 'none';
});
