// Curated dataset of highly rated healthy restaurants in India
const restaurants = [
    {
        name: "Fabcafe by Fabindia",
        city: "Delhi NCR",
        cuisine: "Healthy Indian, Fusion",
        rating: 4.6,
        votes: "1,200+",
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
        specialty: "Sourdough Pizzas, Vegan Pesto Pasta",
        tags: ["Vegan Options"],
        image: "https://unsplash.com"
    }
];

// Function to render HTML cards dynamically into the DOM grid
function displayRestaurants(data) {
    const grid = document.getElementById("restaurantGrid");
    const noResults = document.getElementById("noResults");
    
    grid.innerHTML = ""; // Clear existing elements

    if (data.length === 0) {
        noResults.classList.remove("hidden");
        return;
    }
    noResults.classList.add("hidden");

    data.forEach(res => {
        const tagBadges = res.tags.map(tag => 
            `<span class="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-100/50">${tag}</span>`
        ).join("");

        const cardHtml = `
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col custom-card-zoom">
                <div class="relative h-48 bg-gray-200 overflow-hidden">
                    <img src="${res.image}" alt="${res.name}" class="w-full h-full object-cover">
                    <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <i class="fa-solid fa-star text-amber-500 text-xs"></i>
                        <span class="text-sm font-bold text-gray-800">${res.rating}</span>
                        <span class="text-xs text-gray-400 font-medium">(${res.votes})</span>
                    </div>
                    <div class="absolute bottom-3 left-4 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                        <i class="fa-solid fa-location-dot mr-1"></i>${res.city}
                    </div>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-1 leading-snug">${res.name}</h3>
                        <p class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">${res.cuisine}</p>
                        <div class="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-4">
                            <span class="text-xs font-bold text-gray-400 block uppercase tracking-tight">Must Try Specialty</span>
                            <span class="text-sm font-semibold text-gray-700 mt-0.5 block">${res.specialty}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1.5 pt-2 border-t border-gray-150">
                        ${tagBadges}
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

// Client-side dynamic search and multi-filtering logic
function filterRestaurants() {
    const searchVal = document.getElementById("searchBar").value.toLowerCase();
    const cityVal = document.getElementById("cityFilter").value;
    const dietVal = document.getElementById("dietFilter").value;

    const filtered = restaurants.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchVal) || 
                              res.cuisine.toLowerCase().includes(searchVal) || 
                              res.city.toLowerCase().includes(searchVal);
        const matchesCity = cityVal === "all" || res.city === cityVal;
        const matchesDiet = dietVal === "all" || res.tags.includes(dietVal);

        return matchesSearch && matchesCity && matchesDiet;
    });

    displayRestaurants(filtered);
}

// Attach event listeners to filter elements
document.getElementById("searchBar").addEventListener("keyup", filterRestaurants);
document.getElementById("cityFilter").addEventListener("change", filterRestaurants);
document.getElementById("dietFilter").addEventListener("change", filterRestaurants);

// Initialize display content on document load
window.onload = () => displayRestaurants(restaurants);
