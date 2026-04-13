// Theme toggle (dark/light) + lagrer valg i localStorage
(function () {
    const STORAGE_KEY = 'theme';
    const body = document.body;
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');

    body.setAttribute('data-theme', initialTheme);

    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    const syncButton = () => {
        const t = body.getAttribute('data-theme') || 'light';
        btn.textContent = (t === 'dark') ? 'Lys modus' : 'Mørk modus';
        btn.setAttribute('aria-label', (t === 'dark') ? 'Bytt til lys modus' : 'Bytt til mørk modus');
    };

    syncButton();
    btn.addEventListener('click', () => {
        const current = body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);
        syncButton();
    });
})();

// Kjøres når HTML-en er lastet
document.addEventListener('DOMContentLoaded', () => {
    
    // --- index.html: Animasjon for skills ---
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const skills = document.querySelectorAll('.skill');
    if (skills.length > 0) {
        if (prefersReducedMotion) {
            skills.forEach((skill) => {
                skill.style.opacity = '1';
                skill.style.transform = 'translateY(0)';
            });
        } else {
            skills.forEach((skill, index) => {
                skill.style.opacity = '0';
                skill.style.transform = 'translateY(20px)';
                skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }, 200 * index);
            });
        }
    }

    // --- projects.html: Animasjon for prosjekter ---
    const projects = document.querySelectorAll('.project');
    if (projects.length > 0) {
        projects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            project.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    // --- contact.html: Animasjon for kontaktskjema ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.1;
                contactForm.style.opacity = opacity;
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
    }
});

// --- contact.html: Validering av kontaktskjema ---
const contactFormElement = document.getElementById('contactForm');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(event) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            event.preventDefault();
            alert('Please fill in all fields.');
            return;
        }
    });
}

// --- Web Components ---
class SiteHeader extends HTMLElement {
    connectedCallback() {
        const currentPage = this.getAttribute('current-page');
        this.innerHTML = `
        <header>
            <div class="container">
                <div id="branding">
                    <h1><span class="highlight">Simen</span> Fredheim Aronsen</h1>
                </div>
                <nav>
                    <ul>
                        <li class="${currentPage === 'home' ? 'current' : ''}"><a href="index.html">Home</a></li>
                        <li class="${currentPage === 'projects' ? 'current' : ''}"><a href="projects.html">Projects</a></li>
                        <li class="${currentPage === 'about' ? 'current' : ''}"><a href="about.html">About</a></li>
                        <li class="${currentPage === 'contact' ? 'current' : ''}"><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        `;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p>&copy; 2026 Simen Fredheim Aronsen | AI Developer Portfolio</p>
        </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
