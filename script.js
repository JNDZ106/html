const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");

/* Burger Menu */
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

/* Toggle theme */
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

/* Add picture to gallery */
const addButton = document.querySelector('.ewan-button');
const showMoreBtn = document.getElementById('show-more');

function updateGalleryVisibility() {
    const items = Array.from(document.querySelectorAll('.gallery-item')).filter(item => !item.classList.contains('button-div'));
    if (items.length > 12) {
        items.forEach((item, index) => {
            if (index >= 12) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
        showMoreBtn.style.display = 'block';
    } else {
        items.forEach(item => item.style.display = 'block');
        showMoreBtn.style.display = 'none';
    }
}

showMoreBtn.addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.gallery-item')).filter(item => !item.classList.contains('button-div'));
    items.forEach(item => item.style.display = 'block');
    showMoreBtn.style.display = 'none';
});

// Initially update
updateGalleryVisibility();

// Modal functions
function openModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Fetch the content of project-bank.html
    fetch('project-bank.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const projectDetail = doc.querySelector('.project-detail');
            if (projectDetail) {
                // Remove the back button or adjust
                const backBtn = projectDetail.querySelector('a[href="index.html"]');
                if (backBtn) backBtn.style.display = 'none';
                
                // Clear existing content except close button
                const closeBtn = modalContent.querySelector('.close');
                modalContent.innerHTML = '';
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(projectDetail);
            }
            modal.classList.add('show');
        })
        .catch(error => console.error('Error loading project:', error));
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    // Clear content
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modalContent.querySelector('.close');
    modalContent.innerHTML = '';
    modalContent.appendChild(closeBtn);
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.remove('show');
    // Clear content
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modalContent.querySelector('.close');
    modalContent.innerHTML = '';
    modalContent.appendChild(closeBtn);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const projectModal = document.getElementById('projectModal');
    const profileModal = document.getElementById('profileModal');
    if (event.target == projectModal) {
        closeModal();
    }
    if (event.target == profileModal) {
        closeProfileModal();
    }
}

if (addButton) {
    addButton.addEventListener('click', () => {
        const galleryGrid = document.querySelector('.gallery-grid');
        const buttonDiv = document.querySelector('.button-div');
        const newItem = document.createElement('div');
        newItem.className = 'gallery-item';
        newItem.innerHTML = '<a href="project-new.html"><img src="images/computer-program-coding-screen_53876-138060.avif" style="width: 250px; height: 200px;" alt="New Gallery Image"></a>';
        galleryGrid.insertBefore(newItem, buttonDiv);
        updateGalleryVisibility();
    });
}

// Profile modal functionality
function openProfileModal(target) {
    console.log('Opening modal for target:', target.id);
    const modal = document.getElementById('profileModal');
    console.log('Modal element:', modal);
    const modalContent = modal.querySelector('.modal-content');
    console.log('Modal content:', modalContent);
    
    // Clear existing content except close button
    const closeBtn = modalContent.querySelector('.close');
    modalContent.innerHTML = '';
    modalContent.appendChild(closeBtn);
    
    // Clone the profile content
    const profileContent = target.querySelector('.profile-content');
    console.log('Profile content to clone:', profileContent);
    if (profileContent) {
        const cloned = profileContent.cloneNode(true);
        // Adjust styles for modal
        cloned.style.padding = '0';
        cloned.style.minHeight = 'auto';
        cloned.style.animation = 'none';
        cloned.style.opacity = '1';
        modalContent.appendChild(cloned);
        console.log('Cloned and appended');
    }
    
    modal.classList.add('show');
    console.log('Show class added');
}

document.addEventListener('DOMContentLoaded', () => {
    const cardLinks = document.querySelectorAll('.card-link');

    console.log('Found card links:', cardLinks.length);

    cardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Card clicked');
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            console.log('Target ID:', targetId);
            const target = document.getElementById(targetId);
            console.log('Target element:', target);
            if (target) {
                openProfileModal(target);
                console.log('Modal opened');
            }
        });
    });
});