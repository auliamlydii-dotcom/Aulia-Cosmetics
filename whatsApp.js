// ============================================
// KONFIRMASI WHATSAPP AULIA COSMETICS - FIX
// ============================================

// Konfigurasi
const WHATSAPP_CONFIG = {
    phoneNumber: "6282281947955",
    storeName: "Aulia Cosmetics",
    storeAddress: "Jl. Aur Kuning No. 123, Bukittinggi",
    bankAccount: {
        bank: "Bank BSI",
        number: "123-456-7890",
        name: "Aulia Cosmetics"
    }
};

// Data order contoh (untuk testing jika tidak ada data di localStorage)
const SAMPLE_ORDER = {
    orderId: "AUL-" + Date.now().toString().slice(-6),
    name: "Pelanggan Aulia",
    email: "pelanggan@example.com",
    phone: "081234567890",
    address: "Jl. Contoh No. 123",
    city: "Jakarta",
    postal: "12345",
    shipping: "JNE Regular (2-3 hari)",
    payment: "transfer",
    notes: "Tolong dibungkus dengan rapi",
    items: [
        {
            name: "Blush On Velvet Matte",
            quantity: 2,
            price: 75000
        },
        {
            name: "Lipstik Matte Stay",
            quantity: 1,
            price: 65000
        }
    ],
    subtotal: 215000,
    shippingCost: 15000,
    total: 230000
};

// Ambil data dari localStorage
function getOrderData() {
    const orderData = localStorage.getItem('auliaLastOrder');
    return orderData ? JSON.parse(orderData) : SAMPLE_ORDER;
}

// Format pesan WhatsApp
function formatWhatsAppMessage(order) {
    if (!order) return "";
    
    // Format tanggal
    const orderDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Format produk
    let productsText = "";
    if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            productsText += `${index + 1}. ${item.name}\n   Jumlah: ${item.quantity} x Rp ${item.price.toLocaleString('id-ID')} = Rp ${itemTotal.toLocaleString('id-ID')}\n`;
        });
    }
    
    // Format alamat
    const address = `${order.address || ''}, ${order.city || ''} ${order.postal || ''}`;
    
    // Format metode pembayaran
    const paymentMethod = order.payment === 'transfer' ? 'Transfer Bank' :
                         order.payment === 'ewallet' ? 'E-Wallet' :
                         order.payment === 'cod' ? 'Cash on Delivery (COD)' : 'Tidak diketahui';
    
    // Buat pesan
    const message = `*KONFIRMASI PEMBAYARAN - ${WHATSAPP_CONFIG.storeName}*

Halo ${WHATSAPP_CONFIG.storeName}, saya ingin mengkonfirmasi pembayaran untuk pesanan berikut:

📋 *DATA PESANAN*
• ID Pesanan: ${order.orderId || 'Tidak tersedia'}
• Tanggal: ${orderDate}
• Status: Menunggu Pembayaran

👤 *DATA PELANGGAN*
• Nama: ${order.name || 'Tidak tersedia'}
• Email: ${order.email || 'Tidak tersedia'}
• Telepon: ${order.phone || 'Tidak tersedia'}
• Alamat: ${address}

🛒 *DETAIL PRODUK*
${productsText}

📦 *PENGIRIMAN*
• Metode: ${order.shipping || 'Tidak tersedia'}
• Ongkos Kirim: Rp ${order.shippingCost ? order.shippingCost.toLocaleString('id-ID') : '0'}

💰 *TOTAL PEMBAYARAN*
• Subtotal: Rp ${order.subtotal ? order.subtotal.toLocaleString('id-ID') : '0'}
• Ongkir: Rp ${order.shippingCost ? order.shippingCost.toLocaleString('id-ID') : '0'}
• *TOTAL: Rp ${order.total ? order.total.toLocaleString('id-ID') : '0'}*

💳 *METODE PEMBAYARAN*
• ${paymentMethod}

${paymentMethod === 'Transfer Bank' ? `
🏦 *INFORMASI REKENING*
• Bank: ${WHATSAPP_CONFIG.bankAccount.bank}
• No. Rekening: ${WHATSAPP_CONFIG.bankAccount.number}
• Atas Nama: ${WHATSAPP_CONFIG.bankAccount.name}
` : ''}

${order.notes ? `
📝 *CATATAN PESANAN*
${order.notes}
` : ''}

📍 *ALAMAT TOKO*
${WHATSAPP_CONFIG.storeAddress}

Terima kasih atas pelayanannya!`;

    return message;
}

// Buka WhatsApp
function openWhatsApp() {
    const orderData = getOrderData();
    const message = formatWhatsAppMessage(orderData);
    
    // Encode untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    console.log("WhatsApp URL:", whatsappUrl);
    console.log("Message:", message);
    
    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Buat halaman konfirmasi sederhana
function createSimpleConfirmation() {
    // Hapus semua konten
    document.body.innerHTML = '';
    
    // Tambahkan styling sederhana
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            margin: 0;
        }
        
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        
        .icon {
            font-size: 60px;
            color: #25D366;
            margin-bottom: 20px;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        
        p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .whatsapp-btn {
            background: #25D366;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            border-radius: 50px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin: 20px 0;
            transition: all 0.3s;
        }
        
        .whatsapp-btn:hover {
            background: #128C7E;
            transform: scale(1.05);
        }
        
        .back-btn {
            background: #ff6b8b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: left;
        }
        
        .info-box p {
            margin: 5px 0;
            color: #333;
        }
        
        .test-note {
            background: #fff3cd;
            color: #856404;
            padding: 10px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
    
    // Buat konten
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <div class="icon">
            <i class="fab fa-whatsapp"></i>
        </div>
        
        <h1>Konfirmasi Pembayaran</h1>
        <p>Klik tombol di bawah untuk mengirim konfirmasi pembayaran ke WhatsApp Aulia Cosmetics</p>
        
        <div class="info-box">
            <p><strong>Nomor WhatsApp:</strong> ${WHATSAPP_CONFIG.phoneNumber}</p>
            <p><strong>Pesan akan berisi:</strong></p>
            <ul style="padding-left: 20px; margin: 10px 0;">
                <li>Data pesanan Anda</li>
                <li>Detail produk</li>
                <li>Total pembayaran</li>
                <li>Informasi rekening (jika transfer)</li>
            </ul>
        </div>
        
        <div class="test-note">
            <strong>Catatan:</strong> Jika tidak ada data pesanan, akan menggunakan data contoh untuk testing.
        </div>
        
        <button class="whatsapp-btn" onclick="openWhatsApp()">
            <i class="fab fa-whatsapp"></i> Kirim Konfirmasi ke WhatsApp
        </button>
        
        <div style="margin-top: 30px;">
            <a href="index.html" class="back-btn">
                <i class="fas fa-home"></i> Kembali ke Beranda
            </a>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #999;">
            <p>Jika WhatsApp tidak terbuka, pastikan nomor ${WHATSAPP_CONFIG.phoneNumber} terdaftar di WhatsApp.</p>
        </div>
    `;
    
    document.body.appendChild(container);
}

// Versi SIMPLE untuk integrasi cepat
function simpleWhatsAppIntegration() {
    // Fungsi ini bisa dipanggil dari halaman checkout
    const orderData = getOrderData();
    const message = formatWhatsAppMessage(orderData);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
}

// ============================================
// INTEGRASI DENGAN CHECKOUT PAGE
// ============================================

// Fungsi untuk dipanggil dari checkout.html
function triggerWhatsAppConfirmation() {
    console.log("WhatsApp confirmation triggered");
    
    // Coba ambil data dari form checkout
    let orderData = {
        orderId: "AUL-" + Date.now().toString().slice(-6),
        name: document.getElementById('name') ? document.getElementById('name').value : "Pelanggan",
        email: document.getElementById('email') ? document.getElementById('email').value : "",
        phone: document.getElementById('phone') ? document.getElementById('phone').value : "",
        address: document.getElementById('address') ? document.getElementById('address').value : "",
        city: document.getElementById('city') ? document.getElementById('city').value : "",
        postal: document.getElementById('postal') ? document.getElementById('postal').value : "",
        shipping: document.getElementById('shipping') ? document.getElementById('shipping').value : "JNE Regular",
        payment: document.querySelector('input[name="payment"]:checked') ? 
                 document.querySelector('input[name="payment"]:checked').value : "transfer",
        notes: document.getElementById('notes') ? document.getElementById('notes').value : "",
        items: JSON.parse(localStorage.getItem('auliaCart')) || [],
        subtotal: 0,
        shippingCost: 15000,
        total: 0
    };
    
    // Hitung total
    if (orderData.items && orderData.items.length > 0) {
        orderData.subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderData.total = orderData.subtotal + orderData.shippingCost;
    } else {
        orderData.subtotal = 100000;
        orderData.total = 115000;
    }
    
    // Simpan ke localStorage
    localStorage.setItem('auliaLastOrder', JSON.stringify(orderData));
    
    // Buka WhatsApp
    simpleWhatsAppIntegration();
}

// ============================================
// INISIALISASI
// ============================================

// Jalankan ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log("WhatsApp script loaded");
    
    // Cek jika ada tombol konfirmasi WhatsApp
    const whatsappBtn = document.getElementById('whatsapp-confirm');
    if (whatsappBtn) {
        console.log("WhatsApp button found");
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            triggerWhatsAppConfirmation();
        });
    }
    
    // Cek jika di halaman konfirmasi khusus
    if (window.location.pathname.includes('whatsapp-confirm.html') || 
        window.location.pathname.includes('konfirmasi.html')) {
        console.log("On confirmation page");
        createSimpleConfirmation();
    }
});

// ============================================
// FUNGSI GLOBAL (bisa dipanggil dari file lain)
// ============================================

// Simpan data dan buka WhatsApp
window.saveAndConfirmOrder = function(orderData) {
    // Generate order ID jika belum ada
    if (!orderData.orderId) {
        orderData.orderId = 'AUL-' + Date.now().toString().slice(-6);
    }
    
    // Simpan ke localStorage
    localStorage.setItem('auliaLastOrder', JSON.stringify(orderData));
    
    // Buka WhatsApp
    simpleWhatsAppIntegration();
    
    return true;
};

// Fungsi untuk testing langsung
window.testWhatsApp = function() {
    const testData = {
        orderId: "AUL-TEST-" + Date.now().toString().slice(-4),
        name: "Nama Test",
        phone: "081234567890",
        address: "Alamat Test",
        items: [
            { name: "Produk Test 1", quantity: 2, price: 50000 },
            { name: "Produk Test 2", quantity: 1, price: 75000 }
        ],
        subtotal: 175000,
        shippingCost: 15000,
        total: 190000,
        payment: "transfer"
    };
    
    window.saveAndConfirmOrder(testData);
};