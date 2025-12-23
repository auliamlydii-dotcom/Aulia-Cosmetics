// Cart data
let cart = JSON.parse(localStorage.getItem('auliaCart')) || [];

// DOM Elements
const cartCount = document.getElementById('cart-count');
const orderItemsContainer = document.getElementById('order-items');
const orderSubtotal = document.getElementById('order-subtotal');
const orderShipping = document.getElementById('order-shipping');
const orderTotal = document.getElementById('order-total');
const transferAmount = document.getElementById('transfer-amount');
const shippingSelect = document.getElementById('shipping');
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const bankInstruction = document.getElementById('bank-instruction');
const codInstruction = document.getElementById('cod-instruction');
const checkoutForm = document.getElementById('checkout-form');
const confirmationModal = document.getElementById('confirmation-modal');
const whatsappConfirmBtn = document.getElementById('whatsapp-confirm');

// Shipping costs
const shippingCosts = {
    'jne': 15000,
    'jne-express': 25000,
    'tiki': 18000,
    'pos': 12000
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    loadOrderSummary();
    
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
    
    // Check if cart is empty
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.');
        window.location.href = 'index.html';
    }
    
    // Event listeners
    shippingSelect.addEventListener('change', updateShipping);
    paymentOptions.forEach(option => {
        option.addEventListener('change', updatePaymentInstruction);
    });
    
    // Form submission
    checkoutForm.addEventListener('submit', processOrder);
    
    // WhatsApp confirmation button
    whatsappConfirmBtn.addEventListener('click', () => {
        const phoneNumber = '082281947955';
        const message = `Halo Aulia Cosmetics, saya ingin konfirmasi pembayaran untuk pesanan AUL-2023-001`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
});

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Load order summary
function loadOrderSummary() {
    orderItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-name">
                <span>${item.name}</span>
                <span class="order-item-quantity">x${item.quantity}</span>
            </div>
            <div class="order-item-price">Rp ${itemTotal.toLocaleString('id-ID')}</div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
    
    // Update totals
    updateTotals(subtotal);
}

// Update shipping cost
function updateShipping() {
    const selectedShipping = shippingSelect.value;
    const shippingCost = shippingCosts[selectedShipping] || 15000;
    orderShipping.textContent = `Rp ${shippingCost.toLocaleString('id-ID')}`;
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateTotals(subtotal);
}

// Update totals
function updateTotals(subtotal) {
    const selectedShipping = shippingSelect.value;
    const shippingCost = shippingCosts[selectedShipping] || 15000;
    const total = subtotal + shippingCost;
    
    orderSubtotal.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    orderShipping.textContent = `Rp ${shippingCost.toLocaleString('id-ID')}`;
    orderTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    transferAmount.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Update payment instruction based on selected method
function updatePaymentInstruction() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    if (selectedPayment === 'cod') {
        bankInstruction.style.display = 'none';
        codInstruction.style.display = 'block';
    } else {
        bankInstruction.style.display = 'block';
        codInstruction.style.display = 'none';
    }
}

// Process order
function processOrder(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postal: document.getElementById('postal').value,
        shipping: shippingSelect.options[shippingSelect.selectedIndex].text,
        payment: document.querySelector('input[name="payment"]:checked').value,
        notes: document.getElementById('notes').value,
        orderDate: new Date().toLocaleString('id-ID'),
        orderId: 'AUL-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0')
    };
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedShipping = shippingSelect.value;
    const shippingCost = shippingCosts[selectedShipping] || 15000;
    const total = subtotal + shippingCost;
    
    // Create order object
    const order = {
        ...formData,
        items: [...cart],
        subtotal,
        shippingCost,
        total
    };
    
    // Save order to localStorage
    localStorage.setItem('auliaLastOrder', JSON.stringify(order));
    
    // Clear cart
    cart = [];
    localStorage.setItem('auliaCart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation modal
    document.getElementById('order-id').innerHTML = `ID Pesanan: <strong>${order.orderId}</strong>`;
    confirmationModal.style.display = 'flex';
    
    // Update WhatsApp message
    const phoneNumber = '081234567890';
    const message = `Halo Aulia Cosmetics, saya ingin konfirmasi pembayaran untuk pesanan ${order.orderId}. 
    
Nama: ${order.name}
Email: ${order.email}
Telepon: ${order.phone}

Total: Rp ${total.toLocaleString('id-ID')}
Metode: ${order.payment === 'transfer' ? 'Transfer Bank' : order.payment === 'ewallet' ? 'E-Wallet' : 'COD'}`;
    
    whatsappConfirmBtn.onclick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };
}

// Add checkout-specific styles
const checkoutStyles = document.createElement('style');
checkoutStyles.textContent = `
    .checkout-section {
        padding: 3rem 0;
        min-height: 70vh;
    }
    
    .checkout-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }
    
    .checkout-form {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
    }
    
    .checkout-form h3 {
        margin-bottom: 1.5rem;
        color: var(--dark);
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--dark);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.8rem 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(255, 107, 139, 0.1);
    }
    
    .payment-methods {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .payment-option {
        display: flex;
        align-items: center;
    }
    
    .payment-option input {
        margin-right: 1rem;
    }
    
    .payment-option label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        flex: 1;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .payment-option input:checked + label {
        border-color: var(--primary);
        background: rgba(255, 107, 139, 0.05);
    }
    
    .payment-option label i {
        color: var(--primary);
        font-size: 1.2rem;
    }
    
    .form-agreement {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        margin: 2rem 0;
    }
    
    .form-agreement input {
        margin-top: 0.3rem;
    }
    
    .form-agreement label {
        font-size: 0.9rem;
        color: var(--gray);
    }
    
    .form-agreement a {
        color: var(--primary);
        text-decoration: none;
    }
    
    .form-agreement a:hover {
        text-decoration: underline;
    }
    
    #submit-order {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
    }
    
    .order-summary {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        height: fit-content;
        position: sticky;
        top: 100px;
    }
    
    .order-items {
        max-height: 300px;
        overflow-y: auto;
        margin-bottom: 1.5rem;
    }
    
    .order-item {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .order-item-name {
        display: flex;
        flex-direction: column;
    }
    
    .order-item-quantity {
        font-size: 0.9rem;
        color: var(--gray);
    }
    
    .order-item-price {
        font-weight: 600;
        color: var(--dark);
    }
    
    .order-totals {
        margin: 2rem 0;
    }
    
    .total-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .total-row.grand-total {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--primary);
        border-bottom: none;
    }
    
    .payment-instruction {
        background: var(--light);
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
    }
    
    .payment-instruction h4 {
        margin-bottom: 1rem;
        color: var(--dark);
    }
    
    .bank-details {
        background: white;
        padding: 1rem;
        border-radius: 4px;
        margin: 1rem 0;
        border-left: 3px solid var(--primary);
    }
    
    .bank-details p {
        margin-bottom: 0.5rem;
    }
    
    .note {
        font-size: 0.9rem;
        color: var(--gray);
        margin-top: 1rem;
    }
    
    .confirmation-content {
        text-align: center;
        padding: 3rem 2rem;
    }
    
    .confirmation-icon {
        width: 80px;
        height: 80px;
        background: var(--success);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        font-size: 2.5rem;
    }
    
    .confirmation-content h2 {
        margin-bottom: 1rem;
        color: var(--dark);
    }
    
    .confirmation-details {
        background: var(--light);
        padding: 1.5rem;
        border-radius: 8px;
        margin: 2rem 0;
        text-align: left;
    }
    
    .whatsapp-number {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        color: var(--primary);
        font-weight: 600;
        margin: 1rem 0;
    }
    
    .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    @media (max-width: 992px) {
        .checkout-container {
            grid-template-columns: 1fr;
        }
        
        .order-summary {
            position: static;
        }
        
        .confirmation-actions {
            flex-direction: column;
        }
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(checkoutStyles);