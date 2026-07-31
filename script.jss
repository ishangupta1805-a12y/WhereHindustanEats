// Curated core application dataset
const restaurants = [
    {
        name: "Fabcafe by Fabindia",
        city: "Delhi NCR",
        cuisine: "Healthy Indian, Fusion",
        rating: 4.6,
        votes: "1,200+",
        price: "₹₹",
        specialty: "Quinoa Biryani, Almond Flour Roti",
        tags: ["Organic", "Gluten-Free"],
        image: "https://unsplash.com"
    },
    {
        name: "The Yoga House",
        city: "Mumbai",
        cuisine: "Organic Cafe, Juices",
        rating: 4.7,
        votes: "950+",
        price: "₹₹",
        specialty: "Macrobiotic Meals, Detox Juices",
        tags: ["Organic", "Vegan Options"],
        image: "https://unsplash.com"
    },
    {
        name: "Sante Spa Cuisine",
        city: "Bengaluru",
        cuisine: "Vegan, Mediterranean, Spa Food",
        rating: 4.8,
        votes: "1,800+",
        price: "₹₹₹",
        specialty: "Zucchini Noodles, Charcoal Ice Cream",
        tags: ["Vegan Options", "Keto Friendly", "Gluten-Free"],
        image: "https://unsplash.com"
    },
    {
        name: "Gotta Turnip",
        city: "Delhi NCR",
        cuisine: "Salads, Cold-pressed Juices",
        rating: 4.5,
        votes: "720+",
        price: "₹",
        specialty: "Avocado Keto Salads, Protein Bowls",
        tags: ["Keto Friendly", "Gluten-Free"],
        image: "https://unsplash.com"
    },
    {
        name: "Sequel Raw",
        city: "Mumbai",
        cuisine: "Organic, Clean Eating",
        rating: 4.9,
        votes: "1,100+",
        price: "₹₹₹",
        specialty: "Acai Bowls, Flaxseed Crackers",
        tags: ["Organic", "Gluten-Free", "Vegan Options"],
        image: "https://unsplash.com"
    },
    {
        name: "Carrots Restaurant",
        city: "Bengaluru",
        cuisine: "100% Plant-Based, Healthy Comfort",
        rating: 4.6,
        votes: "1,400+",
        price: "₹",
        specialty: "Sourdough Pizzas, Vegan Pesto Pasta",
        tags: ["Vegan Options"],
        image: "https://unsplash.com"
    }
];

// Function to render HTML components dynamically
function displayRestaurants(data) {
    const grid = document.getElementById("restaurantGrid");
    const noResults = document.getElementById("noResults");
    
    if (!grid) return;
    grid.innerHTML = ""; 

    if (data.length === 0) {
        if (noResults) noResults.classList.remove("hidden");
        return;
    }
    if (noResults) noResults.classList.add("hidden");

    data.forEach(res => {
        const tagBadges = res.tags.map(tag => 
            `<span class="text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-100/50 dark:border-emerald-900/30">${tag}</span>`
        ).join("");

        const cardHtml = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 flex flex-col custom-card-zoom">
                <div class="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img src="${res.image}" alt="${res.name}" class="w-full h-full object-cover">
                    <div class="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <i class="fa-solid fa-star text-amber-500 text-xs"></i>
                        <span class="text-sm font-bold text-gray-800 dark:text-gray-100">${res.rating}</span>
                        <span class="text-xs text-gray-400 font-medium">(${res.votes})</span>
                    </div>
                    <div class="absolute bottom-3 left-4 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                        <i class="fa-solid fa-location-dot mr-1"></i>${res.city}
                    </div>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-start justify-between gap-2 mb-1">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white leading-snug">${res.name}</h3>
                            <span class="text-sm font-black text-emerald-600 dark:text-emerald-400 whitespace-nowrap bg-emerald-50 dark:bg-gray-700 px-2 py-0.5 rounded-md">${res.price}</span>
                        </div>
                        <p class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">${res.cuisine}</p>
                        <div class="bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 rounded-xl p-3 mb-4">
                            <span class="text-xs font-bold text-gray-400 dark:text-gray-400 block uppercase tracking-tight">Must Try Specialty</span>
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-0.5 block">${res.specialty}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1.5 pt-2 border-t border-gray-150 dark:border-gray-700">
                        ${tagBadges}
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

// Advanced Multidimensional client-side filter engine
function filterRestaurants() {
    const searchVal = document.getElementById("searchBar").value.toLowerCase();
    const cityVal = document.getElementById("cityFilter").value;
    const dietVal = document.getElementById("dietFilter").value;
    const priceVal = document.getElementById("priceFilter").value;

    const filtered = restaurants.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchVal) || 
                              res.cuisine.toLowerCase().includes(searchVal) || 
                              res.city.toLowerCase().includes(searchVal);
        const matchesCity = cityVal === "all" || res.city === cityVal;
        const matchesDiet = dietVal === "all" || res.tags.includes(dietVal);
        const matchesPrice = priceVal === "all" || res.price === priceVal;

        return matchesSearch && matchesCity && matchesDiet && matchesPrice;
    });

    displayRestaurants(filtered);
}

// Initialize logic safely after DOM completely compiles
document.addEventListener("DOMContentLoaded", () => {
    // Initial data paint
    displayRestaurants(restaurants);

    // Bind filters
    document.getElementById("searchBar").addEventListener("keyup", filterRestaurants);
    document.getElementById("cityFilter").addEventListener("change", filterRestaurants);
    document.getElementById("dietFilter").addEventListener("change", filterRestaurants);
    document.getElementById("priceFilter").addEventListener("change", filterRestaurants);

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const themeText = document.getElementById("themeText");

    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        if (document.documentElement.classList.contains("dark")) {
            themeIcon.className = "fa-solid fa-sun";
            themeText.innerText = "Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.className = "fa-solid fa-moon";
            themeText.innerText = "Dark Mode";
            localStorage.setItem("theme", "light");
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
        themeIcon.className = "fa-solid fa-sun";
        themeText.innerText = "Light Mode";
    }

    // Modal windows logic
    const modal = document.getElementById("submissionModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("addRestaurantForm");

    openModalBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        setTimeout(() => {
            modal.classList.remove("opacity-0");
            modal.querySelector("div").classList.remove("scale-95");
        }, 10);
    });

    const closeModal = () => {
        modal.classList.add("opacity-0");
        modal.querySelector("div").classList.add("scale-95");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 300);
    };

    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const newSpot = {
            name: document.getElementById("newFormName").value,
            city: document.getElementById("newFormCity").value,
            cuisine: document.getElementById("newFormCuisine").value,
            rating: 5.0,
            votes: "1",
            price: document.getElementById("newFormPrice").value,
            specialty: document.getElementById("newFormSpecialty").value,
            tags: ["Organic"],
            image: "https://unsplash.com"
        };

        restaurants.unshift(newSpot); 
        displayRestaurants(restaurants);
        form.reset();
        closeModal();
    });
});
