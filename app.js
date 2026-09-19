document.addEventListener('DOMContentLoaded', () => {
    
    // --- FLOATING NAV SCROLL LOGIC ---
    const nav = document.querySelector('.nav-container');
    const navCta = document.querySelector('.nav-cta');
    const siteLogo = document.querySelector('.site-logo');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide when scrolled down from the top, show when at the top
        if (currentScrollY > 50) {
            if (nav) nav.classList.add('nav-hidden');
            if (navCta) navCta.classList.add('cta-hidden');
            if (siteLogo) siteLogo.classList.add('logo-hidden');
        } else {
            if (nav) nav.classList.remove('nav-hidden');
            if (navCta) navCta.classList.remove('cta-hidden');
            if (siteLogo) siteLogo.classList.remove('logo-hidden');
        }
    });

    // --- INTERSECTION OBSERVER FOR REVEALS ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For experience words
                if (entry.target.classList.contains('exp-word')) {
                    entry.target.classList.add('reveal');
                }
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal, .exp-word').forEach(el => {
        revealObserver.observe(el);
    });

    // --- MENU OVERLAY LOGIC ---
    const menuOverlay = document.getElementById('menu-overlay');
    const openMenuBtns = document.querySelectorAll('.open-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');

    openMenuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const closeMenuLinks = document.querySelectorAll('.close-menu-link');
    closeMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- ORDER MODAL LOGIC ---
    const orderModal = document.getElementById('order-modal');
    const orderNowBtns = document.querySelectorAll('.order-now-btn');
    const closeModalBtn = document.querySelector('.close-modal');

    orderNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- POPULATE MENU FROM DATA ---
    const menuGrid = document.querySelector('.menu-grid');
    const menuFiltersContainer = document.querySelector('.menu-filters');
    let currentFilter = 'ALL';

    const renderMenu = (filter = 'ALL') => {
        menuGrid.innerHTML = '';
        
        const filteredData = filter === 'ALL' 
            ? menuData 
            : menuData.filter(item => item.category === filter);

        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.desc}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                        <span style="font-size: 1.1rem; color: var(--gold);">${item.price}</span>
                        <span class="card-action">ADD <i>→</i></span>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    };

    const renderFilters = () => {
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${cat === 'ALL' ? 'active' : ''}`;
            btn.textContent = cat;
            
            btn.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Render new data
                renderMenu(cat);
            });
            
            menuFiltersContainer.appendChild(btn);
        });
    };

    // Initialize menu
    if (typeof menuData !== 'undefined' && menuGrid) {
        renderFilters();
        renderMenu();
    }

    // --- COLLECTION FILTER LOGIC ---
    const collectionFilterBtns = document.querySelectorAll('.col-filter-btn');
    const collectionItems = document.querySelectorAll('.col-item');

    if (collectionFilterBtns.length > 0 && collectionItems.length > 0) {
        collectionFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state on buttons
                collectionFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                collectionItems.forEach(item => {
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                            setTimeout(() => {
                                item.style.opacity = '1';
                            }, 50);
                        } else {
                            item.classList.add('hidden');
                        }
                    }, 300); // 300ms fade transition
                });
            });
        });
    }
});
