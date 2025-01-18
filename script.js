var SpeakersSlider = new Swiper('.speakers-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});





const blocks = document.querySelectorAll('.block');

function handleScroll() {
blocks.forEach(block => {
  const rect = block.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if the block is entering the viewport
  const isVisible = rect.top <= windowHeight-80;

  if (isVisible) {
    block.style.opacity = 1;
    block.style.transform = 'translateX(0)';
  } else {
    block.style.opacity = 0;
    block.style.transform = 'translateX(100px)'; // Slide back to the right
  }
});
}

window.addEventListener('scroll', handleScroll);

// Trigger the effect on page load
handleScroll();




document.querySelectorAll('.hexagon').forEach(hex => {
hex.addEventListener('click', () => {
  hex.classList.toggle('flipped');
});
});






const timelineItems = document.querySelectorAll('.timeline-item');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });










class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector("summary");
    this.content = el.querySelector(".accordion-content");
    this.expandIcon = this.summary.querySelector(".accordion-icon");
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener("click", (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = "hidden";

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight+20}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 400,
        easing: "ease-out"
      }
    );
    this.animation.onfinish = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return this.onAnimationFinish(false);
    };

    this.animation.oncancel = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return (this.isClosing = false);
    };
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight+20
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 350,
        easing: "ease-out"
      }
    );

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return this.onAnimationFinish(true);
    };
    this.animation.oncancel = () => {
      this.expandIcon.setAttribute(
        "src",
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
      );
      return (this.isExpanding = false);
    };
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = "";
  }
}

document.querySelectorAll("details").forEach((el) => {
  new Accordion(el);
});






function get_height() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  
  const viewport = window.innerHeight;
  const header_height = header.offsetHeight;
  const heroHeight = viewport - header_height;
  
  hero.style.height = `${heroHeight}px`;
}

window.addEventListener('load', get_height);
window.addEventListener('resize', get_height);



function countdown() {
  const target_date = new Date("2025-01-01T07:00:00Z");
  const days_counter = document.querySelector('.countdown-days');
  const hours_counter = document.querySelector('.countdown-hours');
  const minutes_counter = document.querySelector('.countdown-minutes');
  const seconds_counter = document.querySelector('.countdown-seconds');

  function update_timer() {
      const now = new Date();
      const difference = target_date - now;

      if (difference <= 0) {
          days_counter.textContent = '0';
          hours_counter.textContent = '0';
          minutes_counter.textContent = '0';
          seconds_counter.textContent = '0';
          clearInterval(interval);
          return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      days_counter.textContent = days;
      hours_counter.textContent = hours;
      minutes_counter.textContent = minutes;
      seconds_counter.textContent = seconds;
  }

  const interval = setInterval(update_timer, 1000);
  update_timer();
}

document.addEventListener('DOMContentLoaded', countdown);