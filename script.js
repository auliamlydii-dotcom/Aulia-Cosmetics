// Product Data dengan Gambar
const products = [
    // Blush On Products
    {
        id: 1,
        name: "Colorfit Cream Blush Merry Mauve",
        category: "blushon",
        price: 60000,
        description: "blush krim bertekstur ringan dengan warna mauve lembut yang mudah dibaurkan dan memberi hasil natural segar di pipi.",
        imageUrl: "https://www.gogobli.com/produk/wardah/68425_wardah_colorfit_cream_blush_02_merry_mauve_3grj.jpg",
        badge: "Terlaris"
    },
    {
        id: 2,
        name: "Seamless Bouncy Blush Watermelon Berry",
        category: "blushon",
        price: 85000,
        description: "Blush bertekstur bouncy dengan warna pink segar dan hasil natural.",
        imageUrl: "https://dynamic.zacdn.com/12RorU_KVmv_X6iMLKL-UtRqKnk=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/luxcrime-3828-7319324-2.jpg",
        badge: "Baru"
    },
    {
        id: 3,
        name: "Bitty Balm Stick Blush Coquette",
        category: "blushon",
        price: 80000,
        description: "Blush stick creamy dengan warna soft pink yang mudah diaplikasikan dan memberi tampilan natural.",
        imageUrl: "https://images.soco.id/1184c492-5fbe-4a06-be30-ed65da0cfebf-image-2-1749455557713",
        badge: null
    },
    
    // Cushion Products
    {
        id: 4,
        name: "Luxcrime 2nd Skin Luminous",
        category: "cushion",
        price: 179000,
        description: "Blush cair dengan hasil bercahaya natural dan warna yang mudah dibaurkan.",
        imageUrl: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/104/MTA-178427407/brd-42577_luxcrime-2nd-skin-luminous-cushion-transforms-your-complexion-cushion-luxcream_full01-c80ec4e2.jpg",
        badge: "Terlaris"
    },
    {
        id: 5,
        name: "Hanasui Serum Cushion SoulMatt",
        category: "cushion",
        price: 135000,
        description: "Cushion berformula serum dengan hasil matte natural dan coverage halus.",
        imageUrl: "https://id-test-11.slatic.net/p/88c16c89569405454a046b4fd1eaa197.jpg",
        badge: "SPF 30"
    },
    {
        id: 6,
        name: "Emina Daily Matte Cushion",
        category: "cushion",
        price: 110000,
        description: "Cushion ringan dengan hasil matte natural dan coverage menyamarkan noda ringan.",
        imageUrl: "https://arti-assets.sgp1.cdn.digitaloceanspaces.com/renyswalayanku/products/7a4ff274-f8a8-4ff7-af6d-a6062c7366da.jpg",
        badge: "Praktis"
    },
    
    // Lipstik Products
    {
        id: 7,
        name: "Colorfit Ultralight Matte Lipstick 09 Romantic Namsan",
        category: "lipstik",
        price: 65000,
        description: "Lipstik matte tahan lama hingga 8 jam, tidak membuat bibir kering. Tersedia dalam 12 warna.",
        imageUrl: "https://enviostore.com/media/product/2759/product_image-1636367220.jpg",
        badge: "Tahan Lama"
    },
    {
        id: 8,
        name: "Lip Crayon Satin Jealousy",
        category: "lipstik",
        price: 75000,
        description: "Lip crayon satin dengan warna rich dan hasil lembut nyaman di bibir.",
        imageUrl: "https://guardianindonesia.co.id/media/catalog/product/4/c/4cabc4013c850ff50f853b11f60e996e0245d321b78450ad0c6d950046cfd2da.jpeg?auto=webp&format=pjpg&width=640&height=800&fit=cover",
        badge: "Glossy"
    },
    {
        id: 9,
        name: "FOCALLURE HyperMatte Lipstick NU01 Brick Nude",
        category: "lipstik",
        price: 70000,
        description: "Lipstick matte intens warna brick nude yang tahan lama dan hasil warna pekat.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvha6JLsiNCYyyHuONjbi5eRVjc2pH_PxIHA&s",
        badge: "Velvet"
    },
    
    // Eyeshadow Products
    {
        id: 10,
        name: "SALSA Galaxy Eyeshadow 02 Comet",
        category: "eyeshadow",
        price: 95000,
        description: "Palet eyeshadow dengan warna-warna shimmering dari nuansa netral hingga gelap yang mudah dibaurkan.",
        imageUrl: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/108/MTA-183059747/br-m036969-07577_-salsa-galaxy-eyeshadow-palette_full10-c3f3364a.webp",
        badge: "12 Warna"
    },
    {
        id: 11,
        name: "Goddess Eyeshadow Palette Bronze",
        category: "eyeshadow",
        price: 85000,
        description: "Palet eyeshadow dengan nuansa bronze hangat dan tekstur mudah dibaurkan untuk riasan natural hingga glam.",
        imageUrl: "https://images.soco.id/21dc9fdd-c949-4a63-a27a-87154e6287c9-image-0-1616732612380",
        badge: "Glitter"
    },
    {
        id: 12,
        name: "Colorfit Quad Eye Palette 02 Rosé Aurora",
        category: "eyeshadow",
        price: 81000,
        description: "Palet eyeshadow nuansa rosé lembut yang mudah dibaurkan.",
        imageUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/12/21/d65404cf-70d4-4245-8e35-d15c5e5f86fb.jpg",
        badge: "Single"
    },
    
    // Maskara Products
    {
        id: 13,
        name: "Lock & Pop! VoluMAX-ing Mascarat",
        category: "maskara",
        price: 55000,
        description: "Maskara yang memberi volume maksimal dan tampilan bulu mata lebih tebal.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymn5dv2iFwRKQHJ1hL91bXTsrI9m48iWcoA&s",
        badge: "Volume"
    },
    {
        id: 14,
        name: "Rosé All Day All New Thunder Lash Mascara Volumizing",
        category: "maskara",
        price: 100000,
        description: "Maskara volumizing yang membuat bulu mata tampak tebal dan lentik.",
        imageUrl: "https://id-test-11.slatic.net/p/de4b35bb3e7679afda7fea5d288d3f73.jpg",
        badge: "Waterproof"
    },
    {
        id: 15,
        name: "Judydoll Fine Curling Iron Mascara Black",
        category: "maskara",
        price: 129000,
        description: "Maskara hitam dengan sikat presisi yang melentikkan dan merapikan bulu mata.",
        imageUrl: "https://id-test-11.slatic.net/p/01cf4cebab0d0b96cd12681ebffc93d8.jpg",
        badge: "Panjang"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('auliaCart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const modalProductDetails = document.getElementById('modal-product-details');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartCount();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Display Products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>Tidak ada produk ditemukan</h3>
                <p>Coba gunakan kata kunci atau filter yang berbeda</p>
            </div>
        `;
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Tambah
                    </button>
                    <button class="view-details" onclick="showProductDetail(${product.id})">
                        <i class="fas fa-info-circle"></i> Detail
                    </button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// Get category name in Indonesian
function getCategoryName(category) {
    const categories = {
        'blushon': 'Blush On',
        'cushion': 'Cushion',
        'lipstik': 'Lipstik',
        'eyeshadow': 'Eyeshadow',
        'maskara': 'Maskara'
    };
    return categories[category] || category;
}

// Filter and Search functionality
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    
    let filteredProducts = products;
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === selectedCategory
        );
    }
    
    // Filter by price
    if (selectedPrice !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            switch(selectedPrice) {
                case 'low':
                    return product.price <= 70000;
                case 'high':
                    return product.price > 100000;
                case '50-100':
                    return product.price >= 50000 && product.price <= 100000;
                case '100-150':
                    return product.price >= 100000 && product.price <= 150000;
                case '150-200':
                    return product.price >= 150000 && product.price <= 200000;
                default:
                    return true;
            }
        });
    }
    
    displayProducts(filteredProducts);
}

// Event Listeners for filters
searchInput.addEventListener('input', filterProducts);
searchBtn.addEventListener('click', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
resetFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = 'all';
    priceFilter.value = 'all';
    displayProducts(products);
});

// Category cards click
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        categoryFilter.value = category;
        filterProducts();
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification(`${product.name} telah ditambahkan ke keranjang`);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function saveCartToStorage() {
    localStorage.setItem('auliaCart', JSON.stringify(cart));
}

function showNotification(message) {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--success);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: var(--shadow);
                z-index: 1002;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    
    modalProductDetails.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-detail-info">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h2>${product.name}</h2>
                <div class="product-detail-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-features">
                    <h4>Fitur Produk:</h4>
                    <ul>
                        <li><i class="fas fa-check"></i> Halal dan terdaftar BPOM</li>
                        <li><i class="fas fa-check"></i> Bahan berkualitas tinggi</li>
                        <li><i class="fas fa-check"></i> Tahan lama sepanjang hari</li>
                        <li><i class="fas fa-check"></i> Cocok untuk semua jenis kulit</li>
                    </ul>
                </div>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" id="detail-quantity">
                    <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
                </div>
                <div class="modal-actions">
                    <button class="modal-add-to-cart" onclick="addToCartWithQuantity(${product.id})">
                        <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                    </button>
                    <a href="cart.html" class="btn-outline" style="padding: 0.8rem; text-align: center;">
                        <i class="fas fa-shopping-cart"></i> Lihat Keranjang
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Quantity functions for modal
function changeQuantity(change) {
    const quantityInput = document.getElementById('detail-quantity');
    let quantity = parseInt(quantityInput.value) + change;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
}

function addToCartWithQuantity(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('detail-quantity').value);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification(`${quantity} ${product.name} telah ditambahkan ke keranjang`);
    closeModal.click();
}

// Modal close functionality
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});