# Udora Leaskdale Lions Club Website

This is a static website reproduction of the Udora Leaskdale Lions Club website, created for easier maintenance and modernization.

## Project Structure

```
/
├── index.html              # Home page
├── about-us.html          # About Lions page
├── contact-us.html        # Contact information and form
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript for interactions
├── images/
│   ├── logo.png           # Club logo
│   ├── lion-badge.png     # Lions International badge
│   └── header-bg.jpg      # Header background image
├── index-original.html    # Original downloaded HTML (backup)
└── README.md             # This file
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean Structure**: Modern HTML5 semantic structure
- **Maintainable CSS**: Organized styles with comments
- **Mobile Navigation**: Collapsible menu for mobile devices
- **Accessibility**: Proper heading structure and alt text
- **Fast Loading**: Optimized images and minimal dependencies

## Key Pages

1. **Home Page** (`index.html`) - Main landing page with club information
2. **About Us** (`about-us.html`) - Information about Lions International
3. **Contact Us** (`contact-us.html`) - Meeting details and contact form

## Meeting Information

- **When**: First Monday of each month
- **Time**: 6:30 PM - 9:00 PM
- **Season**: September to June
- **New Members**: Always welcome!

## Planned Features

The following pages/features are referenced in navigation but need to be created:

- [ ] News and Events page
- [ ] Activities overview page
- [ ] Spaghetti Dinner event page
- [ ] Canoe River Run event page
- [ ] Lions Pavilion Project page
- [ ] Education Bursary information
- [ ] Become a Member page
- [ ] ULLC Executive page
- [ ] Functional event calendar
- [ ] Photo galleries
- [ ] Contact form backend processing

## Development Notes

### Assets Downloaded from Original Site:
- Club logo: `images/logo.png`
- Lions badge: `images/lion-badge.png` 
- Header background: `images/header-bg.jpg`

### Color Scheme:
- Primary: `#03263B` (dark blue)
- Secondary: `#0b3954` (medium blue)
- Accent: `#e9c46a` (golden yellow)
- Background: `#190042` (dark purple)
- Text: `#252525` (dark gray)

### Fonts:
- Headings: Raleway (700 weight)
- Body text: Raleway (300, 400 weights)
- Navigation: Raleway (400 weight)

## Browser Support

This website is designed to work on:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Internet Explorer 11+ (with some graceful degradation)

## Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. For local development with a server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
4. Navigate to `http://localhost:8000`

## Maintenance Tasks

### Regular Updates Needed:
- [ ] Update meeting dates and events
- [ ] Add new photos and content
- [ ] Update executive/member information
- [ ] Modify upcoming events sidebar

### Technical Improvements:
- [ ] Implement backend for contact form
- [ ] Add proper event calendar functionality
- [ ] Set up automated backups
- [ ] Add search functionality
- [ ] Optimize images further
- [ ] Add social media integration

## Deployment

This is a static website that can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting
- Content Delivery Networks (CDNs)

Simply upload all files to your web server's document root.

## Contributing

When making updates:
1. Test on multiple devices and browsers
2. Maintain consistent styling and structure
3. Update this README if adding new features
4. Keep backup copies of original content

## Original Website

The original WordPress site can be found at: https://udoraleaskdalelionsclub.ca/
(Note: SSL certificate expired, site accessible with warnings)

This reproduction maintains the visual design and content structure while providing a cleaner, more maintainable codebase.
