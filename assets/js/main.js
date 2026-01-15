/* assets/js/main.js (Template Version) */

// 1. Translation Data
const translations = {
    "en": {
        // Nav
        "nav_intro": "Intro",
        "nav_about": "About",
        "nav_exp": "Experience",
        "nav_contact": "Contact", 
        
        // About (Desensitized)
        "about_title": "About Me",
        "about_text": "Hi, I am <b>[Your Name]</b>.<br><br>This is a placeholder for your introduction. You can describe your background, your major, and your skills here.<br>Replace this text in <b>assets/js/main.js</b> to customize your bio.",
        
        // Experience (Desensitized)
        "exp_title": "Experience",
        "job1_title": "[Job Title 1]",
        "job1_desc": "• Description of your responsibility.<br>• Highlight your achievements here.<br>• Tools used: Python, SQL, etc.",
        "job2_title": "[Job Title 2]",
        "job2_desc": "• Description of your responsibility.<br>• Highlight your achievements here.<br>• Mention your soft skills or leadership.",
        "job3_title": "[Job Title 3]",
        "job3_desc": "• Description of your responsibility.<br>• Highlight your achievements here.<br>• Mention any awards or certifications.",
        
        // Footer
        "footer_title": "Let's Connect",
        "footer_text": "Feel free to connect for opportunities in [Your Industry] or [Your Field].",
        "footer_copyright": "© 2026 [Your Name]. Built with AI & Passion."
    },
    "zh": {
        // Nav
        "nav_intro": "首頁",
        "nav_about": "關於我",
        "nav_exp": "經歷",
        "nav_contact": "聯絡",

        // About (Desensitized)
        "about_title": "關於我",
        "about_text": "你好，我是 <b>[你的名字]</b>。<br><br>這裡是自我介紹的佔位符。你可以在這裡描述你的背景、主修科目以及你的技能。<br>請在 <b>assets/js/main.js</b> 中修改這段文字。",
        
        // Experience (Desensitized)
        "exp_title": "工作經歷",
        "job1_title": "[職位名稱 1]",
        "job1_desc": "• 描述你的日常職責。<br>• 在這裡強調你的成就。<br>• 使用的工具：Python, SQL 等。",
        "job2_title": "[職位名稱 2]",
        "job2_desc": "• 描述你的日常職責。<br>• 在這裡強調你的成就。<br>• 提及你的軟技能或領導力。",
        "job3_title": "[職位名稱 3]", 
        "job3_desc": "• 描述你的日常職責。<br>• 在這裡強調你的成就。<br>• 提及獲得的獎項或證書。",

        // Footer
        "footer_title": "保持聯絡",
        "footer_text": "隨時歡迎交流 [你的行業] 或 [你的領域] 的合作機會。",
        "footer_copyright": "© 2026 [你的名字]. 用 AI 與熱情構建。"
    }
};

// 2. Global Interaction Logic
document.addEventListener('DOMContentLoaded', () => {
    // --- Get DOM Elements ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langText = langToggleBtn.querySelector('.lang-text');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // --- Initialize State ---

    // Load Language Preference
    let currentLang = localStorage.getItem('site-lang') || 'en';
    applyLanguage(currentLang);

    // Load Theme Preference
    let currentTheme = localStorage.getItem('site-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // --- Event Listeners ---

    // 1. Language Toggle
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        applyLanguage(currentLang);
        localStorage.setItem('site-lang', currentLang);
    });

    // 2. Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        localStorage.setItem('site-theme', currentTheme);
    });

    // 3. Scroll Listener (Back to Top)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 4. Back to Top Click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Helper Functions ---

    function applyLanguage(lang) {
        langText.textContent = lang === 'en' ? 'EN' : '中';
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // --- Hero Section Logic (3D Pendulum + Spotlight) ---
    const heroSection = document.querySelector('.hero-section');
    const spotlightMask = document.querySelector('.spotlight-mask');
    const modelViewer = document.querySelector('model-viewer');

    let isHovering = false;
    let animationFrameId;

    // 3D Model Pendulum Animation (Sway +/- 15 degrees)
    function animateSway() {
        if (isHovering || !modelViewer) return;

        const time = Date.now();
        const theta = Math.sin(time / 1500) * 15; // Swing amplitude
        
        // Update Camera Orbit: theta(horizontal), 75deg(vertical), 105%(distance)
        modelViewer.cameraOrbit = `${theta}deg 75deg 105%`;

        animationFrameId = requestAnimationFrame(animateSway);
    }

    if (heroSection && spotlightMask && modelViewer) {
        // Start animation on load
        animateSway();

        // Mouse Move: Update Spotlight Position
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlightMask.style.setProperty('--x', `${x}px`);
            spotlightMask.style.setProperty('--y', `${y}px`);
        });

        // Mouse Enter: Stop Sway, Activate Spotlight
        heroSection.addEventListener('mouseenter', () => {
            isHovering = true;
            cancelAnimationFrame(animationFrameId);
            heroSection.classList.add('is-active');
        });

        // Mouse Leave: Resume Sway, Dim Spotlight
        heroSection.addEventListener('mouseleave', () => {
            isHovering = false;
            heroSection.classList.remove('is-active');
            spotlightMask.style.setProperty('--x', '50%');
            spotlightMask.style.setProperty('--y', '50%');
            animateSway();
        });
    }

    // --- Slogan Animation Logic (Replay on Scroll) ---
    const sloganObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const typingText = document.querySelector('.typing-text');
            if (!typingText) return;

            if (entry.isIntersecting) {
                // Enter Viewport: Play Typing Animation with Delay
                setTimeout(() => {
                    typingText.classList.add('animate-type');
                }, 100); 
            } else {
                // Leave Viewport: Reset Animation
                typingText.classList.remove('animate-type');
            }
        });
    }, {
        threshold: 0.1
    });

    if (heroSection) {
        sloganObserver.observe(heroSection);
    }
});