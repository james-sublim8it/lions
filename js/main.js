// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-navigation')) {
            mainMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        }
    });
    
    // Handle submenu clicks on mobile
    const hasSubmenuItems = document.querySelectorAll('.has-submenu > a');
    hasSubmenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                if (submenu) {
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });
    
    // Load recent posts dynamically
    loadRecentPosts();
});

// Function to load recent posts from news-and-events page
async function loadRecentPosts() {
    const postsContainer = document.querySelector('.recent-posts ul');
    if (!postsContainer) return;
    
    try {
        // If we're on the news-and-events page, populate from current page
        if (window.location.pathname.includes('news-and-events') || 
            window.location.pathname === '/' && document.querySelector('.news-item')) {
            populatePostsFromCurrentPage();
            return;
        }
        
        // For other pages, fetch the news-and-events page
        const response = await fetch('news-and-events.html');
        if (!response.ok) throw new Error('Could not fetch news page');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract news items
        const newsItems = doc.querySelectorAll('.news-item');
        const posts = Array.from(newsItems).slice(0, 4).map(item => {
            const id = item.id;
            const title = item.querySelector('h3')?.textContent || 'Untitled';
            return { id, title };
        });
        
        // Update the posts list
        postsContainer.innerHTML = posts.map(post => 
            `<li><a href="news-and-events.html#${post.id}">${post.title}</a></li>`
        ).join('');
        
    } catch (error) {
        console.error('Error loading recent posts:', error);
        // Fallback to static content if fetch fails
        postsContainer.innerHTML = `
            <li><a href="news-and-events.html#family-fun-day">Family Fun Day</a></li>
            <li><a href="news-and-events.html#diabetes-donation">Donation to Diabetes Canada</a></li>
            <li><a href="news-and-events.html#donation-34k">Udora Leaskdale Lions donate $34,000</a></li>
            <li><a href="news-and-events.html#north-country-meats">North Country Meats Fundraiser</a></li>
        `;
    }
}

// Function to populate posts when on the news-and-events page itself
function populatePostsFromCurrentPage() {
    const postsContainer = document.querySelector('.recent-posts ul');
    const newsItems = document.querySelectorAll('.news-item');
    
    if (!postsContainer || !newsItems.length) return;
    
    const posts = Array.from(newsItems).slice(0, 4).map(item => {
        const id = item.id;
        const title = item.querySelector('h3')?.textContent || 'Untitled';
        return { id, title };
    });
    
    postsContainer.innerHTML = posts.map(post => 
        `<li><a href="#${post.id}">${post.title}</a></li>`
    ).join('');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Simple calendar functionality (placeholder)
function generateCalendar(month, year) {
    // This is a placeholder for future calendar implementation
    const calendarPlaceholder = document.querySelector('.calendar-placeholder');
    if (calendarPlaceholder) {
        calendarPlaceholder.innerHTML = `
            <h5>Calendar for ${month}/${year}</h5>
            <p>Calendar implementation coming soon...</p>
        `;
    }
}

// Initialize calendar with current date
const currentDate = new Date();
generateCalendar(currentDate.getMonth() + 1, currentDate.getFullYear());
