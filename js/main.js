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
    const eventsContainer = document.querySelector('.widget.coming-events');
    if (!eventsContainer) return;
    
    try {
        // If we're on the news-and-events page, populate from current page
        if (window.location.pathname.includes('news-and-events')) {
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
            const id = item.id || '';
            const title = item.querySelector('h3')?.textContent || 'Untitled Event';
            const details = item.querySelector('.event-details');
            const date = details?.querySelector('p')?.textContent?.replace('Date: ', '') || '';
            const time = details?.querySelectorAll('p')[1]?.textContent?.replace('Time: ', '') || '';
            
            return { id, title, date, time };
        });
        
        // Update the events display - show up to 3 events
        if (events.length > 0) {
            let eventsHtml = '<h4 class="widget-title">Coming Events</h4>';
            
            events.forEach((event, index) => {
                const eventLink = event.id ? `news-and-events.html#${event.id}` : 'news-and-events.html#upcoming-events';
                eventsHtml += `
                    <div class="event-info" onclick="window.location.href='${eventLink}';" style="cursor: pointer;">
                        <h5><a href="${eventLink}">${event.title}</a></h5>
                        <p><strong>${event.date}</strong><br>
                        ${event.time}</p>
                    </div>
                    ${index < events.length - 1 ? '<hr style="margin: 1rem 0; border: none; border-top: 1px solid #eee;">' : ''}
                `;
            });
            
            eventsHtml += '<p style="margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid #eee;"><a href="news-and-events.html#upcoming-events">View all upcoming events →</a></p>';
            
            eventsContainer.innerHTML = eventsHtml;
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
            <div class="event-info" onclick="window.location.href='news-and-events.html#spaghetti-dinner-event';" style="cursor: pointer;">
                <h5><a href="news-and-events.html#spaghetti-dinner-event">Spaghetti Dinner</a></h5>
                <p><strong>Date:</strong> Friday, November 29th, 2024<br>
                <strong>Time:</strong> 5:30 PM - 7:30 PM<br>
                <strong>Cost:</strong> $15.00 Adults, $5.00 Kids</p>
            </div>
            <p style="margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid #eee;"><a href="news-and-events.html#upcoming-events">View all events →</a></p>
        `;
    }
}

// Function to populate events when on the news-and-events page itself
function populateEventsFromCurrentPage() {
    const eventsContainer = document.querySelector('.widget.coming-events');
    const eventItems = document.querySelectorAll('.event-item');
    
    if (!eventsContainer || !eventItems.length) return;
    
    const events = Array.from(eventItems).slice(0, 3).map(item => {
        const id = item.id || '';
        const title = item.querySelector('h3')?.textContent || 'Untitled Event';
        const details = item.querySelector('.event-details');
        const date = details?.querySelector('p')?.textContent?.replace('Date: ', '') || '';
        const time = details?.querySelectorAll('p')[1]?.textContent?.replace('Time: ', '') || '';
        
        return { id, title, date, time };
    });
    
    if (events.length > 0) {
        let eventsHtml = '<h4 class="widget-title">Coming Events</h4>';
        
        events.forEach((event, index) => {
            const eventLink = event.id ? `#${event.id}` : '#upcoming-events';
            eventsHtml += `
                <div class="event-info" onclick="window.location.href='${eventLink}';" style="cursor: pointer;">
                    <h5><a href="${eventLink}">${event.title}</a></h5>
                    <p><strong>${event.date}</strong><br>
                    ${event.time}</p>
                </div>
                ${index < events.length - 1 ? '<hr style="margin: 1rem 0; border: none; border-top: 1px solid #eee;">' : ''}
            `;
        });
        
        eventsHtml += '<p style="margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid #eee;"><a href="#upcoming-events">View all upcoming events →</a></p>';
        
        eventsContainer.innerHTML = eventsHtml;
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
