function openmodel(){
    document.getElementById("addProductModal").style.display="block";
}
function closemodel(){ 
    document.getElementById("addProductModal").style.display="none";
}

// Chart.js code for sales chart
let categoryData = { vegetables: 35, fruits: 25, Grains: 20, Oils:20, spices: 10, others: 5 };

//add products to table + update chart
function addProduct(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    // Add product to table
    const tableBody = document.querySelector('#productsTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${category}</td>
        <td>$${price}</td>
        <td>${stock}</td>
        <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
    `;
    tableBody.appendChild(newRow);

    // Update category data for chart
    if (categoryData[category]) {
        categoryData[category] += 1; // Increment count for existing category
    } else {
        categoryData[category] = 1; // Initialize count for new category
    }
    updateChart();

    // Clear form and close modal
    document.getElementById('add-product-form').reset();
    closemodel();
}
// Sales Chart
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: Object.keys(categoryData),
        datasets: [{
            label: 'Product Categories',
            data: Object.values(categoryData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Product Categories Distribution'
            }
        }
    },
});
// Function to update chart data
function updateChart() {
    salesChart.data.labels = Object.keys(categoryData);
    salesChart.data.datasets[0].data = Object.values(categoryData);
    salesChart.update();
}
// Initial chart update
updateChart();
// product chart 
const ctx2 = document.getElementById('topProductsChart').getContext('2d');
let topProductsChart = new Chart(ctx2, { type:'pie', data: { labels: Object.keys(categoryData),datasets:[{ label:'Product Categories', data: Object.values(categoryData), backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)' ], borderColor: [ 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)' ], borderWidth:1 }] }, options:{ responsive:true, plugins:{ legend:{ position:'top', }, title:{ display:true, text:'Product Categories Distribution' } } } });
// Function to update product chart data
function updateTopProductsChart() {
    topProductsChart.data.labels = Object.keys(categoryData);
    topProductsChart.data.datasets[0].data = Object.values(categoryData);
    topProductsChart.update();
}
const productImageInput = document.getElementById('image');
const imagePreview = document.getElementById('preview');
const productlist = document.getElementById('product-list');
productImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
    }
});
function addProduct(){
    const productName = document.getElementById('product-name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const imageSrc = imagePreview.src;

    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <img src="${imageSrc}" alt="${productName}">
        <h3>${productName}</h3>
        <p>Category: ${category}</p>
        <p>Price: $${price}</p>
        <p>Stock: ${stock}</p>
    `;
    productlist.appendChild(productItem);

    // Reset form and preview
    document.getElementById('add-product-form').reset();
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    closemodel();
}
const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const contactForm = document.getElementById('contact-form');
        const messageBox = document.getElementById('message-box');
        const messageTitle = document.getElementById('message-title');
        const messageText = document.getElementById('message-text');
        const closeMessageBtn = document.getElementById('close-message-btn');
        const faqQuestions = document.querySelectorAll('.faq-question');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });

        closeMessageBtn.addEventListener('click', () => {
            messageBox.style.display = 'none';
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            messageTitle.textContent = "Message Sent!";
            messageText.textContent = "Thank you for your message. We will get back to you shortly.";
            messageBox.style.display = 'block';
            contactForm.reset();
        });

        // Ensure all FAQ answers are hidden initially
        faqQuestions.forEach(question => {
            const answer = question.parentElement.querySelector('.faq-answer');
            if (answer) {
                answer.style.display = "none";
            }
        });

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.parentElement.querySelector('.faq-answer');
                const svg = question.querySelector('svg');
                
                if (answer.style.display === "block") {
                    answer.style.display = "none";
                    if (svg) svg.style.transform = "rotate(0deg)";
                } else {
                    answer.style.display = "block";
                    if (svg) svg.style.transform = "rotate(180deg)";
                }
            });
        });
        const userIconTab = document.getElementById('user-icon-tab');
        userIconTab.addEventListener('click', () => {
            window.location.href = 'login.html';
        });