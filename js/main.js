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
    
    // Load coming events dynamically
    loadComingEvents();
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

// Function to load coming events from news-and-events page
async function loadComingEvents() {
    const eventsContainer = document.querySelector('.coming-events');
    if (!eventsContainer) return;
    
    try {
        // If we're on the news-and-events page, populate from current page
        if (window.location.pathname.includes('news-and-events') || 
            window.location.pathname === '/' && document.querySelector('.event-item')) {
            populateEventsFromCurrentPage();
            return;
        }
        
        // For other pages, fetch the news-and-events page
        const response = await fetch('news-and-events.html');
        if (!response.ok) throw new Error('Could not fetch news page');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract upcoming events
        const eventItems = doc.querySelectorAll('.event-item');
        const events = Array.from(eventItems).slice(0, 3).map(item => {
            const title = item.querySelector('h3')?.textContent || 'Untitled Event';
            const details = item.querySelector('.event-details');
            const date = details?.querySelector('p')?.textContent?.replace('Date: ', '') || '';
            const time = details?.querySelectorAll('p')[1]?.textContent?.replace('Time: ', '') || '';
            const cost = details?.querySelectorAll('p')[2]?.textContent?.replace('Cost: ', '') || '';
            
            return { title, date, time, cost };
        });
        
        // Update the events display
        if (events.length > 0) {
            const event = events[0]; // Show the first upcoming event
            eventsContainer.innerHTML = `
                <h4 class="widget-title">Coming Events</h4>
                <div class="event-info">
                    <h5><a href="news-and-events.html#upcoming-events">${event.title}</a></h5>
                    <p><strong>Date:</strong> ${event.date}<br>
                    <strong>Time:</strong> ${event.time}<br>
                    <strong>Cost:</strong> ${event.cost}</p>
                    <p><a href="news-and-events.html#upcoming-events">View all upcoming events →</a></p>
                </div>
            `;
        } else {
            eventsContainer.innerHTML = `
                <h4 class="widget-title">Coming Events</h4>
                <p><a href="news-and-events.html#upcoming-events">Check our News & Events page for upcoming activities</a></p>
            `;
        }
        
    } catch (error) {
        console.error('Error loading coming events:', error);
        // Fallback to static content if fetch fails
        eventsContainer.innerHTML = `
            <h4 class="widget-title">Coming Events</h4>
            <p>Spaghetti Dinner<br>
            Friday<br>
            November, 29th, 2024<br>
            5:30 - 7:30<br>
            $15.00 Adults<br>
            $5.00 kids</p>
            <p><a href="news-and-events.html">View all events →</a></p>
        `;
    }
}

// Function to populate events when on the news-and-events page itself
function populateEventsFromCurrentPage() {
    const eventsContainer = document.querySelector('.coming-events');
    const eventItems = document.querySelectorAll('.event-item');
    
    if (!eventsContainer || !eventItems.length) return;
    
    const events = Array.from(eventItems).slice(0, 3).map(item => {
        const title = item.querySelector('h3')?.textContent || 'Untitled Event';
        const details = item.querySelector('.event-details');
        const date = details?.querySelector('p')?.textContent?.replace('Date: ', '') || '';
        const time = details?.querySelectorAll('p')[1]?.textContent?.replace('Time: ', '') || '';
        const cost = details?.querySelectorAll('p')[2]?.textContent?.replace('Cost: ', '') || '';
        
        return { title, date, time, cost };
    });
    
    if (events.length > 0) {
        const event = events[0]; // Show the first upcoming event
        eventsContainer.innerHTML = `
            <h4 class="widget-title">Coming Events</h4>
            <div class="event-info">
                <h5><a href="#upcoming-events">${event.title}</a></h5>
                <p><strong>Date:</strong> ${event.date}<br>
                <strong>Time:</strong> ${event.time}<br>
                <strong>Cost:</strong> ${event.cost}</p>
                <p><a href="#upcoming-events">View all upcoming events →</a></p>
            </div>
        `;
    }
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
