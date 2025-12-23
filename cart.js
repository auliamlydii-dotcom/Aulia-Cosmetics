// Cart functionality
let cart = JSON.parse(localStorage.getItem('auliaCart')) || [];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const totalElement = document.getElementById('total');
const emptyCartElement = document.getElementById('empty-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
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

// Update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        emptyCartElement.style.display = 'block';
        document.querySelector('.cart-container').style.display = 'none';
        return;
    }
    
    emptyCartElement.style.display = 'none';
    document.querySelector('.cart-container').style.display = 'grid';
    
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-category">${getCategoryName(item.category)}</p>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-item-total">
                Rp ${itemTotal.toLocaleString('id-ID')}
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Calculate totals
    const shipping = 15000;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    shippingElement.textContent = `Rp ${shipping.toLocaleString('id-ID')}`;
    totalElement.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    // Save to localStorage
    localStorage.setItem('auliaCart', JSON.stringify(cart));
}

// Get category name
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

// Update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }
    
    updateCartDisplay();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(index) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini dari keranjang?')) {
        cart.splice(index, 1);
        updateCartDisplay();
        updateCartCount();
        showNotification('Produk telah dihapus dari keranjang');
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
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
    
    // Add styles if not exist
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Checkout button event
checkoutBtn.addEventListener('click', (e) => {
    if (cart.length === 0) {
        e.preventDefault();
        alert('Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.');
    }
});

// Add cart-specific styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-section {
        padding: 3rem 0;
        min-height: 60vh;
    }
    
    .cart-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }
    
    .cart-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .cart-item {
        display: grid;
        grid-template-columns: auto 2fr auto auto auto;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        background: white;
        border-radius: 10px;
        box-shadow: var(--shadow);
    }
    
    .cart-item-image {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .cart-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .cart-item-info h4 {
        margin-bottom: 0.5rem;
        color: var(--dark);
    }
    
    .cart-item-category {
        color: var(--primary);
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
    }
    
    .cart-item-price {
        color: var(--gray);
        font-weight: 500;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .cart-item-quantity .quantity-btn {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cart-item-quantity .quantity {
        font-weight: 600;
        min-width: 30px;
        text-align: center;
    }
    
    .cart-item-total {
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--primary);
        min-width: 100px;
        text-align: right;
    }
    
    .remove-item {
        background: none;
        border: none;
        color: #ff6b6b;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: var(--transition);
    }
    
    .remove-item:hover {
        background: rgba(255, 107, 107, 0.1);
    }
    
    .cart-summary {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        height: fit-content;
        position: sticky;
        top: 100px;
    }
    
    .cart-summary h3 {
        margin-bottom: 1.5rem;
        color: var(--dark);
    }
    
    .summary-details {
        margin-bottom: 2rem;
    }
    
    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .summary-row.total {
        border-bottom: none;
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--primary);
    }
    
    .cart-summary .btn,
    .cart-summary .btn-outline {
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
    }
    
    .empty-cart {
        text-align: center;
        padding: 4rem 2rem;
        display: none;
    }
    
    .empty-cart i {
        font-size: 5rem;
        color: #ddd;
        margin-bottom: 1.5rem;
    }
    
    .empty-cart h3 {
        margin-bottom: 1rem;
        color: var(--dark);
    }
    
    .empty-cart p {
        color: var(--gray);
        max-width: 500px;
        margin: 0 auto 2rem;
    }
    
    @media (max-width: 992px) {
        .cart-container {
            grid-template-columns: 1fr;
        }
        
        .cart-summary {
            position: static;
        }
    }
    
    @media (max-width: 768px) {
        .cart-item {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1rem;
        }
        
        .cart-item-image {
            margin: 0 auto;
        }
        
        .cart-item-total {
            text-align: center;
        }
    }
`;

document.head.appendChild(cartStyles);