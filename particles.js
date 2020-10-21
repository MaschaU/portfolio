const particles = {
    "particles": {
	    "number": {
            "value": 50,
            "density": {
                "enable": true,
                "value_area": 900 
            }
        },
        "color": {
            "value": "#e41f7b"
        },
        "shape": {
            "type": "circle", 
            "stroke": {
                "width": 0.5,
                "color": "#e41f7b"
            },
            "polygon": { 
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true
        },
        "size": {
            "value": 9,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 200, 
            "color": "#e41f7b",
            "opacity": 0.5,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "top",
            "random": true,
            "straight": false,
            "out_mode": "out", 
            "bounce": false, 
            "attract": {
                "enable": true,
                "rotateX": 800,
                "rotateY": 1400
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 800,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 800,
                "size": 80,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};
            
particlesJS("particles", particles);