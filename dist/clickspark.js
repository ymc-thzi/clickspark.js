/*
 * Clickspark JavaScript utility v1.0.0
 * https://github.com/ymc-thzi/clickspark.js
 *
 * Thomas Zinnbauer @ YMC
 *
 * 2015 YMC AG | Sonnenstrasse 4 | CH-8280 Kreuzlingen | Switzerland
 * http://www.ymc.ch
 *
 */

//global default spec
csDefaultSpecs = {
    particleImagePath: '',
    particleCount: 35,
    particleSpeed: 12,
    particleSize: 12
}

//setup clickSpark as a jQuery function
$.fn.clickSpark = function (spec) {
    if (spec == undefined) {
        spec = {
            particleImagePath: csDefaultSpecs.particleImagePath,
            particleCount: csDefaultSpecs.particleCount,
            particleSpeed: csDefaultSpecs.particleSpeed,
            particleSize: csDefaultSpecs.particleSize
        };
    }

    $(this).on("click", function (e) {
        //set specification vars
        clickSpark.setParticleImagePath(spec.particleImagePath);
        clickSpark.setParticleCount(spec.particleCount);
        clickSpark.setParticleSpeed(spec.particleSpeed);
        clickSpark.setParticleSize(spec.particleSize);

        //call the on click fireParticle
        clickSpark.stdFuncOCl(e);
    });
};


var clickSpark = function (spec) {

    //spec Attributes
    var particleImagePath = csDefaultSpecs.particleImagePath;
    var particleCount = csDefaultSpecs.particleCount;
    var particleSpeed = csDefaultSpecs.particleSpeed;
    var particleSize = csDefaultSpecs.particleSize;

    //private
    var running = false;
    var canvas;
    var context;
    var particles = [];
    //call the constructor
    constructor();

    /*
     * constructor
     */
    function constructor() {
        prepareDOMElements();
    }

    /*
     * setters
     */
    function setParticleImagePath(val) {
        if (val != undefined) {
            particleImagePath = val;
        }
    }

    function setParticleCount(val) {
        if (val != undefined) {
            particleCount = val;
        }
    }

    function setParticleSpeed(val) {
        if (val != undefined) {
            particleSpeed = val;
        }
    }

    function setParticleSize(val) {
        if (val != undefined) {
            particleSize = val;
        }
    }

    /*
     * prepareDOMElements
     */
    function prepareDOMElements() {
        $(document).ready(function () {

            $('body').prepend('<div class="cs-canvas-container"><canvas id="cs-particle-canvas"></canvas></div>');

            //image should be autogenerate always hidden
            $(".cs-particle-image").hide();

            //hide CanvasContainer
            $(".cs-canvas-container").hide();
            //hide canvas
            $("#cs-particle-canvas").hide();

            //set canvas attributes
            $(".cs-canvas-container").css({
                position: 'fixed',
                width: 500,
                height: 500
            });
        });
    }

    /*
     * createParticle
     */
    function createParticle() {
        var particle = {};
        if (canvas) {
            particle.x = canvas.width / 2;
            particle.y = canvas.height / 2;
        }
        particle.xSpeed = rnd((-1) * particleSpeed, particleSpeed);
        particle.ySpeed = rnd((-1) * particleSpeed, particleSpeed);
        particle.size = particleSize;
        return particle;
    }

    /*
     * initParticle
     */
    function initParticle() {
        canvas = document.getElementById("cs-particle-canvas");
        if (particleImagePath == '') {
            defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAc5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KaBqfRAAAATZJREFUOBGtlM2NwjAQhd+MAndaSAu5cuBAC9RAAyuxVICQtgFqoAUOHLi6BbfAnY3ineeNTXYvKA6WRv59X8bxzAj+teUhLCqgeSg2CGhsuzZbmN3NPARu3uHcAu62F67lJnlkg+VXaAKwC20GEEJLjeJoUsGb+Hj7EJc2M2x1COtWsOuAddp81StwqQKO171ceDbC6FHX4mRzXmtsc1phSw+F/yjMcLKrbcZS0nm78lm+sTUomv4fpb3RPfXkaHy13xcbDRkIanK0f/7BeuHQwsgeJIdBISXKGD41YcM4mgQk7E8UT6DdCfNvANIhr8y1Cd48pcZRJi2pz9WikSdHmf1M2iJEL6KeHGUZYfbbeul1XawexuEDgEk6D/i0Scz+/oMvO56nLpWhXIKofFs9S25MqbQ/ard2fSmw8JoAAAAASUVORK5CYII='
            particleImg = new Image();
            particleImg.src = defaultImg;
        } else {
            particleImg = new Image();
            particleImg.src = particleImagePath;
        }

        if (canvas && typeof(canvas['getContext']) == 'function') {
            context = canvas.getContext("2d");
            bodyWidth = document.body.clientWidth;
            context.canvas.width = ($('.cs-canvas-container').width() > bodyWidth) ? bodyWidth : $('.cs-canvas-container').width() * 2;
            context.canvas.height = $('.cs-canvas-container').height();
        }
        generateParticles();
    }

    /*
     * generateParticles
     */
    function generateParticles() {
        for (var i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    /*
     * paintParticles
     */
    function paintParticles() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0; i < particleCount; i++) {
            var particle = particles[i];
            particle.size = particle.size * (0.96 + (rnd(1, 10) / 100));
            context.drawImage(particleImg, particle.x, particle.y, particle.size, particle.size);
            particle.x = particle.x + particle.xSpeed;
            particle.y = particle.y + particle.ySpeed;
        }
    }

    /*
     * requestAnimationFrame
     */
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 1);
            };
    })();

    /*
     * animate
     */
    function animate() {
        if (running) {
            requestAnimationFrame(animate);
            paintParticles();
        }
    }

    /*
     * rnd
     */
    function rnd(min, max) {
        return ((Math.random() * (max - min)) + min);
    }

    /*
     * fireParticles
     */
    function fireParticles(e) {

        //Set the anchor of the particle origin
        var posX;
        var posY;
        //if click take event coordinates
        if (e.type == 'click') {
            posX = e.pageX;
            posY = e.pageY;
        } else {
            //if html-element take position coordinates
            posX = e.offset().left;
            posY = e.offset().top;
        }

        particles = [];
        particle = null;
        initParticle();
        if ($('.cs-canvas-container').width() > bodyWidth) {
            $(".cs-canvas-container").css('left', posX - ($(".cs-canvas-container").width() / 2));
        } else {
            $(".cs-canvas-container").css('left', posX - ($(".cs-canvas-container").width()));
        }
        $(".cs-canvas-container").css('top', posY - ($(".cs-canvas-container").height() / 2));
        $(".cs-canvas-container").show();
        $("#cs-particle-canvas").show();
        window.setTimeout(function () {
            $("#cs-particle-canvas").fadeOut();
        }, 400);
        running = true;
        animate();
        window.setTimeout(function () {
            $("#cs-particle-canvas").hide();
            $(".cs-canvas-container").hide();
            running = false;
        }, 800);
    }

    /*
     * public methods
     */
    return {
        setParticleImagePath: function (val) {
            setParticleImagePath(val);
        },
        setParticleCount: function (val) {
            setParticleCount(val);
        },
        setParticleSpeed: function (val) {
            setParticleSpeed(val);
        },
        setParticleSize: function (val) {
            setParticleSize(val);
        },

        init: function (spec) {
            fireParticles(element);
        },
        fireParticles: function (element) {
            fireParticles(element);
        },

        stdFuncOCl: function (e) {
            fireParticles(e);

        }
    };
}();





