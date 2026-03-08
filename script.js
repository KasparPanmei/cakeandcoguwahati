// --- 1. DARK MODE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});

// --- 2. SCROLL REVEAL (Existing) ---
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});
sr.reveal('.hero-data');
sr.reveal('.menu-card:not(.hidden-item)', { interval: 100 });
sr.reveal('.order-container');
// --- LOAD MORE LOGIC ---
const loadMoreBtn = document.getElementById('load-more-btn');
const hiddenItems = document.querySelectorAll('.hidden-item');

loadMoreBtn.addEventListener('click', () => {
    hiddenItems.forEach(item => {
        item.style.display = 'block'; // Show item
        item.classList.add('fade-in'); // Add animation
    });

    // Hide the button after loading everything
    loadMoreBtn.style.display = 'none';

    // Re-sync ScrollReveal so it notices the new elements
    sr.reveal('.fade-in', { interval: 100 });
});

// --- 3. CHATBOT CUSTOMIZATION ---
// If using Tidio, you can trigger it via JS or let it load automatically.
// Tip: Set the bot's "Welcome Message" to: 
// "Hi! Want to order a cake in Guwahati? I can help you book via WhatsApp or Instagram!"
document.getElementById('cake-order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Collect Data
    const orderData = {
        name: document.getElementById('cust-name').value,
        flavor: document.getElementById('cake-flavor').value,
        weight: document.getElementById('cake-weight').value,
        location: document.getElementById('delivery-loc').value,
        msg: document.getElementById('special-msg').value
    };

    // 2. Save to Temporary Storage (SessionStorage)
    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));

    // 3. Redirect to Success Page
    window.location.href = 'success.html';
});
/* Tidio Conversation Starter Fix */
function onTidioChatApiReady() {
    // This tells Tidio to show the "Conversation Starters" immediately
    window.tidioChatApi.show();
    
    // Optional: Uncomment below if you want the chat to pop open 
    // automatically after 3 seconds for Guwahati users
    /*
    setTimeout(() => {
        window.tidioChatApi.open();
    }, 3000);
    */
}

if (window.tidioChatApi) {
    window.tidioChatApi.on("ready", onTidioChatApiReady);
} else {
    document.addEventListener("tidioChat-ready", onTidioChatApiReady);
}