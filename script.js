document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Offset untuk header sticky
            const headerOffset = document.querySelector('.main-header').offsetHeight;
            const targetElement = document.querySelector(this.getAttribute('href'));
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // --- Section Fade-In Animation ---
    // Mengembalikan ke animasi fade-in sederhana saat section pertama kali terlihat
    const sections = document.querySelectorAll('.section'); // Pilih semua section
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Hapus observer setelah section terlihat untuk sekali animasi
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        // Atur status awal sebelum di-observe
        section.style.opacity = 0;
        section.style.transform = 'translateY(1.875rem)'; /* Sesuaikan dengan nilai di layout.css */
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out, background-color 0.5s ease, border-color 0.5s ease';
        sectionObserver.observe(section);
    });


    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // --- Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');

    if (typingTextElement) { // Pastikan elemen ada sebelum mencoba mengaksesnya
        const words = JSON.parse(typingTextElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBeforeDeleting = 1500;
        const delayBeforeTyping = 750;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeoutDelay = typingSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                timeoutDelay = delayBeforeDeleting;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                timeoutDelay = delayBeforeTyping;
            } else {
                timeoutDelay = isDeleting ? deletingSpeed : typingSpeed;
            }

            setTimeout(type, timeoutDelay);
        }
        type();
    }

    // --- Header Hide/Unhide on Scroll ---
    const mainHeader = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;
    const headerHeight = mainHeader.offsetHeight;
    const scrollThreshold = 100; // Jarak scroll sebelum header bersembunyi/muncul

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > headerHeight + scrollThreshold) {
            // Scrolling down and past initial header height + threshold
            mainHeader.classList.add('hide');
        } else if (window.scrollY < lastScrollY && window.scrollY > 0) {
            // Scrolling up
            mainHeader.classList.remove('hide');
        } else if (window.scrollY === 0) {
            // Di paling atas halaman, pastikan header terlihat
            mainHeader.classList.remove('hide');
        }
        lastScrollY = window.scrollY; // Update last scroll position
    });

    // --- Dynamic Portfolio Projects ---
    const portfolioItems = [
        {
            title: "Desain UI/UX Aplikasi XYZ",
            description: "Proyek desain antarmuka pengguna untuk aplikasi mobile XYZ, berfokus pada kemudahan penggunaan dan estetika modern.",
            link: "https://www.behance.net/yourproject1", // Ganti dengan link proyek Anda
            placeholderText: "Desain UI/UX"
        },
        {
            title: "Website Portofolio Pribadi (V1)",
            description: "Pengembangan website pribadi menggunakan HTML, CSS, dan JavaScript vanilla. Menampilkan keahlian dasar web development.",
            link: "https://github.com/yourproject2", // Ganti dengan link proyek Anda
            placeholderText: "Web Dev"
        },
        {
            title: "Video Promosi Produk Baru",
            description: "Produksi dan editing video promosi untuk peluncuran produk X, termasuk motion graphics dan sound design.",
            link: "https://www.youtube.com/yourproject3", // Ganti dengan link proyek Anda
            placeholderText: "Video Editor"
        },
        {
            title: "Campaign Media Sosial ABC",
            description: "Strategi dan eksekusi konten media sosial untuk kampanye merek ABC, menghasilkan peningkatan engagement 30%.",
            link: "https://www.instagram.com/yourproject4", // Ganti dengan link proyek Anda
            placeholderText: "Konten Kreator"
        }
        // Tambahkan lebih banyak proyek di sini sesuai kebutuhan Anda
        // {
        //     title: "Nama Proyek Lain",
        //     description: "Deskripsi proyek lain Anda.",
        //     link: "https://link-ke-proyek-lain.com",
        //     placeholderText: "Lainnya"
        // }
    ];

    const portfolioContainer = document.getElementById('portfolio-items-container');

    if (portfolioContainer) { // Pastikan container portofolio ada
        portfolioItems.forEach(project => {
            const portfolioItemDiv = document.createElement('div');
            portfolioItemDiv.classList.add('portfolio-item');

            const placeholderDiv = document.createElement('div');
            placeholderDiv.classList.add('portfolio-placeholder');
            placeholderDiv.textContent = project.placeholderText; // Gunakan teks placeholder dari data

            const titleH3 = document.createElement('h3');
            titleH3.textContent = project.title;

            const descriptionP = document.createElement('p');
            descriptionP.textContent = project.description;

            const linkA = document.createElement('a');
            linkA.href = project.link;
            linkA.target = "_blank";
            linkA.classList.add('btn-link');
            linkA.textContent = "Lihat Proyek";

            portfolioItemDiv.appendChild(placeholderDiv);
            portfolioItemDiv.appendChild(titleH3);
            portfolioItemDiv.appendChild(descriptionP);
            portfolioItemDiv.appendChild(linkA);

            portfolioContainer.appendChild(portfolioItemDiv);
        });
    }
});