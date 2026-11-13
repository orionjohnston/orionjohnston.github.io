(function () {
    'use strict';

    // Mobile navigation
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');

    if (toggle && menu) {
        var setOpen = function (open) {
            menu.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
        };

        toggle.addEventListener('click', function () {
            setOpen(!menu.classList.contains('open'));
        });

        menu.addEventListener('click', function (event) {
            if (event.target.closest('a')) setOpen(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setOpen(false);
        });
    }

    // Videos: each .video is a plain link to YouTube. With JavaScript, a click
    // swaps the thumbnail for the player in place, so YouTube is only contacted
    // when a visitor chooses to play something.
    document.querySelectorAll('a.video[data-video-id]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (event.metaKey || event.ctrlKey || event.shiftKey) return;
            event.preventDefault();

            var frame = document.createElement('iframe');
            frame.src = 'https://www.youtube-nocookie.com/embed/' +
                encodeURIComponent(link.dataset.videoId) + '?autoplay=1&rel=0';
            frame.title = link.dataset.videoTitle || 'Video';
            frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            frame.allowFullscreen = true;

            var holder = document.createElement('div');
            holder.className = 'video';
            holder.appendChild(frame);
            link.replaceWith(holder);
        });
    });

    // Home hero globe (Vanta.js). Loaded only on wide screens and only when the
    // visitor has not asked for reduced motion; the hero has a plain gradient
    // behind it, so nothing breaks if the scripts fail to load.
    var hero = document.getElementById('vanta-bg');
    var wide = window.matchMedia('(min-width: 901px)').matches;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hero && wide && !calm) {
        var load = function (src) {
            return new Promise(function (resolve, reject) {
                var script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        var start = function () {
            load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
                .then(function () {
                    return load('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.globe.min.js');
                })
                .then(function () {
                    window.VANTA.GLOBE({
                        el: hero,
                        mouseControls: true,
                        touchControls: false,
                        gyroControls: false,
                        minHeight: 200,
                        minWidth: 200,
                        scale: 1,
                        color: 0x1e5f8e,
                        color2: 0x6a3775,
                        size: 0.9,
                        backgroundColor: 0xf8f9fa
                    });
                })
                .catch(function () { /* keep the static gradient */ });
        };

        if (document.readyState === 'complete') start();
        else window.addEventListener('load', start);
    }
})();
