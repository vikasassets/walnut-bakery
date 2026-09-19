document.addEventListener('DOMContentLoaded', () => {
    // STICKY CATEGORY NAV LOGIC
    const categoryLinks = document.querySelectorAll('.cat-link');
    const menuSections = document.querySelectorAll('.menu-section');
    const stickyNav = document.querySelector('.sticky-category-nav');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Smooth scroll to section
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId === 'all') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const navHeight = stickyNav ? stickyNav.offsetHeight : 0;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = 'all';
        const navHeight = stickyNav ? stickyNav.offsetHeight : 0;

        menuSections.forEach(section => {
            const sectionTop = section.offsetTop;
            // if we have scrolled past the section top minus nav height and a little buffer
            if (scrollY >= (sectionTop - navHeight - 60)) {
                current = section.getAttribute('id');
            }
        });

        if (scrollY < 300) {
            current = 'all';
        }

        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === current) {
                link.classList.add('active');
                
                // Keep active link visible in horizontal scroll on mobile
                if (window.innerWidth <= 768) {
                    const linkLeft = link.offsetLeft;
                    const linkWidth = link.offsetWidth;
                    const navWidth = stickyNav.offsetWidth;
                    const navScrollLeft = stickyNav.scrollLeft;

                    if (linkLeft < navScrollLeft || (linkLeft + linkWidth) > (navScrollLeft + navWidth)) {
                        stickyNav.scrollTo({
                            left: linkLeft - (navWidth / 2) + (linkWidth / 2),
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });

        // Back to top button visibility
        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // SEARCH LOGIC
    const searchInput = document.getElementById('menuSearch');
    const menuRows = document.querySelectorAll('.menu-item-row');
    const subcategoryTitles = document.querySelectorAll('.menu-subcategory-title');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            menuRows.forEach(row => {
                const itemName = row.getAttribute('data-name').toLowerCase();
                if (itemName.includes(searchTerm)) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });

            // Hide empty categories and subcategories
            menuSections.forEach(section => {
                let hasVisibleItems = false;
                
                // Check subcategories within this section
                const subcats = section.querySelectorAll('.menu-grid-2col');
                const subcatTitles = section.querySelectorAll('.menu-subcategory-title');
                
                subcats.forEach((subcatGrid, index) => {
                    const rows = subcatGrid.querySelectorAll('.menu-item-row');
                    let subcatHasVisible = false;
                    
                    rows.forEach(row => {
                        if (row.style.display !== 'none') {
                            subcatHasVisible = true;
                            hasVisibleItems = true;
                        }
                    });

                    // Hide/Show subcategory title based on its items
                    if (subcatTitles[index]) {
                        subcatTitles[index].style.display = subcatHasVisible ? 'block' : 'none';
                    }
                    subcatGrid.style.display = subcatHasVisible ? 'grid' : 'none';
                });

                // Check if any item in the section is visible
                const allRows = section.querySelectorAll('.menu-item-row');
                allRows.forEach(row => {
                    if (row.style.display !== 'none') {
                        hasVisibleItems = true;
                    }
                });

                if (hasVisibleItems) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // Scroll reveal animations
    const fadeElements = document.querySelectorAll('.fade-up-element');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));
});
