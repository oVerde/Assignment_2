<?php
// projetos.php
session_start();

// verificar idioma ativo
if (isset($_SESSION['lang'])) {
    $activeLang = $_SESSION['lang'];
} else {
    $activeLang = 'en'; // idioma default
}

// textos traduzíveis
$texts = [
    'en' => [
        'title' => '.atoJ | Projects',
        'h1' => 'Projects',
        'project1' => 'the great automatic grammatizator',
        'project2' => 'casa lubra',
        'project3' => 'vernovo',
        'project4' => 'dynamic posters',
        'arrow' => '↗'
    ],
    'pt' => [
        'title' => '.atoJ | Projetos',
        'h1' => 'Projetos',
        'project1' => 'the great automatic grammatizator',
        'project2' => 'casa lubra',
        'project3' => 'vernovo',
        'project4' => 'posters dinâmicos',
        'arrow' => '↗'
    ]
];
?>
<!DOCTYPE html>
<html lang="<?= $activeLang ?>">

<head>
    <?php include 'head.php'; ?>
    <title><?= $texts[$activeLang]['title'] ?></title>
    <link rel="stylesheet" href="css/projetos.css">
</head>

<body>

    <header>
        <?php include 'header.php'; ?>
    </header>

    <div class="container">
        <div class="lista">
            <h1><?= $texts[$activeLang]['h1'] ?></h1>
            <a href="/projetos/tgag.php" data-preview="/imgs/projetos/tgag/cover.webp">
                <span><?= $texts[$activeLang]['project1'] ?></span>
                <span class="seta"><?= $texts[$activeLang]['arrow'] ?></span>
            </a>
            <a href="/projetos/casalubra.php" data-preview="/imgs/projetos/casalubra/capa.webp">
                <span><?= $texts[$activeLang]['project2'] ?></span>
                <span class="seta"><?= $texts[$activeLang]['arrow'] ?></span>
            </a>
            <a href="/projetos/vernovo.php" data-preview="/imgs/projetos/vernovo/capa.webp">
                <span><?= $texts[$activeLang]['project3'] ?></span>
                <span class="seta"><?= $texts[$activeLang]['arrow'] ?></span>
            </a>
            <a href="/projetos/posters.php" data-preview="/imgs/projetos/posters/capa.webp">
                <span><?= $texts[$activeLang]['project4'] ?></span>
                <span class="seta"><?= $texts[$activeLang]['arrow'] ?></span>
            </a>
        </div>
    </div>

    <!-- Quadrado flutuante -->
    <div class="preview-box" id="previewBox">
        <img src="" alt="preview">
    </div>


    <script>
        const links = document.querySelectorAll('.lista a');
        const previewBox = document.getElementById('previewBox');
        const previewImg = previewBox.querySelector('img');

        let mouseX = 0, mouseY = 0;
        let boxX = 0, boxY = 0;
        const speed = 0.05;
        let isHovering = false;
        let fadeTimeout;
        let firstHover = true; // flag para a primeira vez

        links.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                isHovering = true;

                if (firstHover) {
                    // Na primeira vez, posiciona imediatamente no mouse
                    boxX = e.pageX;
                    boxY = e.pageY - previewBox.offsetHeight;
                    previewBox.style.left = boxX + 'px';
                    previewBox.style.top = boxY + 'px';
                    firstHover = false;
                }

                // Fade-out suave
                previewBox.style.opacity = '0';

                clearTimeout(fadeTimeout);

                fadeTimeout = setTimeout(() => {
                    if (!isHovering) return;
                    // pega a imagem do atributo data-preview
                    previewImg.src = link.getAttribute("data-preview");


                    // Apenas na primeira vez reposiciona; depois mantém o movimento suave
                    if (firstHover) {
                        boxX = e.pageX;
                        boxY = e.pageY - previewBox.offsetHeight;
                        previewBox.style.left = boxX + 'px';
                        previewBox.style.top = boxY + 'px';
                    }

                    previewBox.style.opacity = '1'; // fade-in suave
                }, 100); // tempo de espera para fade-out
            });

            link.addEventListener('mousemove', (e) => {
                mouseX = e.pageX;
                mouseY = e.pageY;
            });

            link.addEventListener('mouseleave', () => {
                isHovering = false;
                previewBox.style.opacity = '0';
                clearTimeout(fadeTimeout);
            });
        });

        function animate() {
            // Movimento suave contínuo
            boxX += (mouseX - boxX) * speed;
            boxY += ((mouseY - previewBox.offsetHeight) - boxY) * speed;

            previewBox.style.left = boxX + 'px';
            previewBox.style.top = boxY + 'px';

            requestAnimationFrame(animate);
        }

        animate();
    </script>

    <script>

        // Animação do título
        const titulo = document.querySelector('.lista h1');
        setTimeout(() => {
            titulo.classList.add('visible');
        }, 200); // delay antes de aparecer, para dar efeito sequencial

    </script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const links = document.querySelectorAll('.lista a');

            links.forEach((link, index) => {
                const textSpan = link.querySelector('span:first-child');
                const text = textSpan.textContent;
                textSpan.textContent = '';

                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    textSpan.appendChild(span);
                });

                // Bloqueia clique inicialmente
                link.style.pointerEvents = 'none';

                setTimeout(() => {
                    link.classList.add('visible');

                    // Habilita o link assim que a animação dos caracteres terminar
                    const chars = textSpan.querySelectorAll('span');
                    const totalDelay = chars.length * 10; // tempo total da animação
                    setTimeout(() => {
                        link.style.pointerEvents = 'auto';
                    }, totalDelay);

                }, index * 200); // delay sequencial entre links

                // Aplica transição de cada caractere
                const chars = textSpan.querySelectorAll('span');
                chars.forEach((char, charIndex) => {
                    char.style.transitionDelay = `${charIndex * 10}ms`;
                });
            });

            // Animação do título
            const titulo = document.querySelector('.lista h1');
            setTimeout(() => {
                titulo.classList.add('visible');
            }, 200); // delay para o título
        });

        // Mantém animação ao voltar do cache
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                location.reload();
            }
        });

    </script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {

            // =======================
            // Preview Box e movimento
            // =======================
            const links = document.querySelectorAll('.lista a');
            const previewBox = document.getElementById('previewBox');
            const previewImg = previewBox.querySelector('img');

            let mouseX = 0, mouseY = 0;
            let boxX = 0, boxY = 0;
            const speed = 0.05;
            let isHovering = false;
            let fadeTimeout;
            let firstHover = true;

            links.forEach(link => {
                link.addEventListener('mouseenter', (e) => {
                    isHovering = true;

                    if (firstHover) {
                        boxX = e.pageX;
                        boxY = e.pageY - previewBox.offsetHeight;
                        previewBox.style.left = boxX + 'px';
                        previewBox.style.top = boxY + 'px';
                        firstHover = false;
                    }

                    previewBox.style.opacity = '0';
                    clearTimeout(fadeTimeout);

                    fadeTimeout = setTimeout(() => {
                        if (!isHovering) return;
                        previewImg.src = link.getAttribute("data-preview");
                        previewBox.style.opacity = '1';
                    }, 100);
                });

                link.addEventListener('mousemove', (e) => {
                    mouseX = e.pageX;
                    mouseY = e.pageY;
                });

                link.addEventListener('mouseleave', () => {
                    isHovering = false;
                    previewBox.style.opacity = '0';
                    clearTimeout(fadeTimeout);
                });
            });

            function animate() {
                boxX += (mouseX - boxX) * speed;
                boxY += ((mouseY - previewBox.offsetHeight) - boxY) * speed;
                previewBox.style.left = boxX + 'px';
                previewBox.style.top = boxY + 'px';
                requestAnimationFrame(animate);
            }
            animate();

            // =======================
            // Animação de texto
            // =======================
            links.forEach((link, index) => {
                const textSpan = link.querySelector('span:first-child');
                const text = textSpan.textContent;
                textSpan.textContent = '';

                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    textSpan.appendChild(span);
                });

                link.style.pointerEvents = 'none';

                setTimeout(() => {
                    link.classList.add('visible');
                    const chars = textSpan.querySelectorAll('span');
                    const totalDelay = chars.length * 10;
                    setTimeout(() => { link.style.pointerEvents = 'auto'; }, totalDelay);
                }, index * 200);

                const chars = textSpan.querySelectorAll('span');
                chars.forEach((char, charIndex) => {
                    char.style.transitionDelay = `${charIndex * 10}ms`;
                });
            });

            const titulo = document.querySelector('.lista h1');
            setTimeout(() => { titulo.classList.add('visible'); }, 200);

            // =======================
            // Overlay para animação de saída
            // =======================
            const pageOverlay = document.createElement("div");
            pageOverlay.id = "pageOverlay";
            Object.assign(pageOverlay.style, {
                position: "fixed",
                inset: "0",
                backgroundColor: "#090909",
                zIndex: "999999",
                pointerEvents: "none",
                opacity: "0",
                clipPath: "circle(0% at 50% 50%)",
                willChange: "clip-path, opacity"
            });
            document.body.appendChild(pageOverlay);

            links.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const href = link.getAttribute("href");

                    const mouseX = e.clientX;
                    const mouseY = e.clientY;

                    const distTopLeft = Math.hypot(mouseX, mouseY);
                    const distTopRight = Math.hypot(window.innerWidth - mouseX, mouseY);
                    const distBottomLeft = Math.hypot(mouseX, window.innerHeight - mouseY);
                    const distBottomRight = Math.hypot(window.innerWidth - mouseX, window.innerHeight - mouseY);
                    const maxRadius = Math.max(distTopLeft, distTopRight, distBottomLeft, distBottomRight);

                    pageOverlay.style.pointerEvents = "auto";
                    pageOverlay.style.clipPath = `circle(0px at ${mouseX}px ${mouseY}px)`;
                    pageOverlay.style.opacity = "1";

                    gsap.to(pageOverlay, {
                        clipPath: `circle(${maxRadius}px at ${mouseX}px ${mouseY}px)`,
                        duration: 0.6,
                        ease: "power2.inOut",
                        onComplete: () => { window.location.href = href; }
                    });
                });
            });

            // Reset ao voltar do cache
            window.addEventListener("pageshow", () => {
                gsap.set(pageOverlay, { opacity: 0, pointerEvents: "none", clipPath: "circle(0% at 50% 50%)" });
            });

        });

        links.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                isHovering = true;

                const src = link.getAttribute("data-preview");

                // Fade-out da imagem atual antes de trocar
                previewImg.style.opacity = 0;
                previewImg.style.transform = "scale(1.2)";
                previewImg.style.filter = "blur(10px)";

                clearTimeout(fadeTimeout);

                fadeTimeout = setTimeout(() => {
                    if (!isHovering) return;

                    // Troca a imagem
                    previewImg.src = src;

                    // Quando a nova imagem carregar, faz fade-in + zoom-in + blur out
                    previewImg.onload = () => {
                        previewImg.style.opacity = 1;
                        previewImg.style.transform = "scale(1)";
                        previewImg.style.filter = "blur(0)";
                    }

                    // Posiciona o preview box próximo ao mouse
                    boxX = e.pageX;
                    boxY = e.pageY - previewBox.offsetHeight;
                    previewBox.style.left = boxX + 'px';
                    previewBox.style.top = boxY + 'px';

                }, 100);
            });

            link.addEventListener('mouseleave', () => {
                isHovering = false;
                // Fade-out + zoom-out ao sair
                previewImg.style.opacity = 0;
                previewImg.style.transform = "scale(1.2)";
                previewImg.style.filter = "blur(10px)";
                clearTimeout(fadeTimeout);
            });
        });


    </script>


</body>

</html>