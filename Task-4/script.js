// ===== Config =====
let PER_PAGE = 6;

// ===== State =====
let state = {
  category: "All",
  search: "",
  page: 1,
  perPage: PER_PAGE,
  dark: false,
};

// ===== DOM =====
const postsEl = document.getElementById("posts");
const paginationEl = document.getElementById("pagination");
const emptyEl = document.getElementById("emptyState");
const yearEl = document.getElementById("year");
const perPageSelect = document.getElementById("perPageSelect");
const darkToggle = document.getElementById("darkToggle");
yearEl.textContent = new Date().getFullYear();

// ===== Load from localStorage =====
const saved = localStorage.getItem("blogState");
if (saved) {
  try { state = { ...state, ...JSON.parse(saved) }; } catch { }
}
if (state.perPage) {
  PER_PAGE = state.perPage;
  perPageSelect.value = String(PER_PAGE);
}
if (state.dark) {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️ Light Mode";
}
document.getElementById("searchInput").value = state.search;

// ===== Helpers =====
function saveState() {
  localStorage.setItem("blogState", JSON.stringify(state));
}

// ===== Demo Blog Posts =====
const POSTS = [
  { title: "Mastering React Components", category: "Tech", img: "images/Matering_react.png", date: "2025-02-01", desc: "Learn how to break down your UI into reusable building blocks." },
  { title: "Exploring the Alps", category: "Travel", img: "images/Alps.jpeg", date: "2025-01-15", desc: "A journey through the snow-capped peaks and cozy villages." },
  { title: "10-Minute Healthy Meals", category: "Food", img: "images/10_minutes.jpeg", date: "2025-01-10", desc: "Quick recipes that are both tasty and nutritious." },
  { title: "Understanding CSS Grid", category: "Tech", img: "images/css_gird.png", date: "2025-01-08", desc: "Tips and tricks for mastering modern CSS layout techniques." },
  { title: "Street Food in Bangkok", category: "Food", img: "images/street_food.jpg", date: "2025-01-02", desc: "Discover the flavors of Thailand’s capital through its street markets." },
  { title: "Backpacking South America", category: "Travel", img: "images/south_america.jpeg", date: "2024-12-28", desc: "My 6-month adventure across Peru, Chile, and Argentina." },
  { title: "The Future of AI", category: "Tech", img: "images/future_of_ai.jpg", date: "2024-12-22", desc: "Exploring how artificial intelligence will shape our world." },
  { title: "Homemade Italian Pasta", category: "Food", img: "images/pasta.jpeg", date: "2024-12-18", desc: "Step-by-step guide to making fresh pasta from scratch." },
  { title: "Solo Travel in Japan", category: "Travel", img: "images/japan.jpeg", date: "2024-12-12", desc: "Why Japan is one of the best destinations for solo travelers." }
];

// Date formatting
function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// Filtering
function applyFilters() {
  return POSTS.filter(p => {
    const matchCat = state.category === "All" || p.category === state.category;
    const matchSearch = !state.search || p.title.toLowerCase().includes(state.search.toLowerCase());
    return matchCat && matchSearch;
  });
}

// Pagination
function paginate(items) {
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const start = (state.page - 1) * PER_PAGE;
  const current = items.slice(start, start + PER_PAGE);
  return { current, totalPages };
}

// Render posts
function renderPosts(posts) {
  postsEl.innerHTML = "";
  if (posts.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  posts.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card fade-in";
    card.style.animationDelay = `${i * 60}ms`;
    card.innerHTML = `
      <img src="${p.img}" alt="" class="card-img">
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-meta">${p.category} · ${formatDate(p.date)}</p>
        <p class="card-desc">${p.desc}</p>
      </div>`;
    postsEl.appendChild(card);
  });
}

// Render pagination
function renderPagination(totalPages) {
  paginationEl.innerHTML = "";
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "page-btn" + (i === state.page ? " active" : "");
    btn.textContent = i;
    btn.addEventListener("click", () => goPage(i));
    paginationEl.appendChild(btn);
  }
}

// ===== Update functions =====
function goPage(n) {
  const filtered = applyFilters();
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  state.page = Math.min(Math.max(1, n), totalPages);
  saveState();
  update();
}

function update() {
  const filtered = applyFilters();
  const { current, totalPages } = paginate(filtered);
  renderPosts(current);
  renderPagination(totalPages);
  saveState();
}

// ===== Events =====
document.querySelectorAll(".filter-btn").forEach((btn) => {
  if (btn.dataset.category === state.category) {
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
  }
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    state.category = btn.dataset.category;
    state.page = 1;
    update();
  });
});

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.search = searchInput.value || "";
  state.page = 1;
  update();
});

perPageSelect.addEventListener("change", () => {
  PER_PAGE = parseInt(perPageSelect.value, 10);
  state.perPage = PER_PAGE;
  state.page = 1;
  update();
});

darkToggle.addEventListener("click", () => {
  state.dark = !state.dark;
  document.body.classList.toggle("dark", state.dark);
  darkToggle.textContent = state.dark ? "☀️ Light Mode" : "🌙 Dark Mode";
  saveState();
});

// ===== Initial render =====
update();
