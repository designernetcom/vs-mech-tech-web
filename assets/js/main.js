const headerMarkup = `<header class="site-header"><nav class="navbar navbar-expand-lg"><div class="container"><a class="navbar-brand brand" href="index.html"><img src="assets/images/vs-mech-tech-logo.png" alt="VS MechTech"><span>VS <b>MECHTECH</b><small>ENGINEERING THE NEXT STEP</small></span></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="mainNav"><ul class="navbar-nav ms-auto align-items-lg-center"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="products.html" role="button" data-bs-toggle="dropdown">Products</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="products.html">All Products</a></li><li><a class="dropdown-item" href="products.html#radiator">Transformer Radiator Fin Forming Machine</a></li><li><a class="dropdown-item" href="products.html#welding">Spot and Seam Welding Machine</a></li><li><a class="dropdown-item" href="products.html#trimming">Edge Trimming and Straightening Machine</a></li><li><a class="dropdown-item" href="products.html#tooling">Die Sets & Fixtures</a></li><li><a class="dropdown-item" href="products.html#fabrication">Fabrication & Conveyor Systems</a></li></ul></li><li class="nav-item"><a class="nav-link" href="about.html#capabilities">Capabilities</a></li><li class="nav-item"><a class="nav-link" href="about.html#industries">Industries</a></li><li class="nav-item"><a class="nav-link" href="about.html#why-us">Why Choose Us</a></li><li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li></ul><a class="btn btn-primary nav-cta" href="contact.html#enquiry">Request a Quote <i class="bi bi-arrow-up-right"></i></a></div></div></nav></header>`;
const footerMarkup = `<footer class="site-footer"><div class="container"><div class="row g-5 footer-top"><div class="col-lg-4"><a class="brand brand-light" href="index.html"><img src="assets/images/vs-mech-tech-logo.png" alt="VS MechTech"><span>VS <b>MECHTECH</b><small>ENGINEERING THE NEXT STEP</small></span></a><p class="footer-about">Specialized industrial machinery, special-purpose machines, tooling and fabrication solutions for production.</p></div><div class="col-6 col-lg-2"><h3>Quick links</h3><a href="index.html">Home</a><a href="about.html">About us</a><a href="products.html">Products</a><a href="about.html#capabilities">Capabilities</a><a href="contact.html">Contact</a></div><div class="col-6 col-lg-3"><h3>Products</h3><a href="products.html#radiator">Radiator fin forming</a><a href="products.html#welding">Welding machines</a><a href="products.html#trimming">Trimming & straightening</a><a href="products.html#tooling">Die sets & fixtures</a><a href="products.html#fabrication">Fabrication & conveyors</a></div><div class="col-lg-3"><h3>Get in touch</h3><p><i class="bi bi-geo-alt"></i> Gat no 162, Tower line road, Triveni Nagar Road, Talawade, Pune - 411062</p><a href="tel:+919579020191"><i class="bi bi-telephone"></i> +91 9579020191</a><a href="mailto:sales@vsentp.com"><i class="bi bi-envelope"></i> sales@vsentp.com</a></div></div><div class="footer-bottom"><span>© <span id="year"></span> VS MechTech. All rights reserved.</span><span><a href="contact.html#privacy">Privacy Policy</a><a href="contact.html#terms">Terms & Conditions</a></span><span>DESIGNED FOR INDUSTRY</span></div></div></footer>`;
document
  .querySelectorAll("#shared-header")
  .forEach((el) => (el.innerHTML = headerMarkup));
document
  .querySelectorAll("#shared-footer")
  .forEach((el) => (el.innerHTML = footerMarkup));
document.querySelectorAll(".site-header .nav-link").forEach((link) => {
  if (
    link.pathname.split("/").pop() ===
    (location.pathname.split("/").pop() || "index.html")
  )
    link.classList.add("active");
});
document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1050;
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.disconnect();
      }),
    { threshold: 0.4 },
  );
  observer.observe(el);
});
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(
    ".product-tile,.cap-list a,.why-grid article,.process-row article,.stat",
  )
  .forEach((el) => {
    el.classList.add("fade-up");
    revealObserver.observe(el);
  });
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById("enquiryForm");
if (form)
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Project / Requirement: ${data.get("project") || ""}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");
    const subject = encodeURIComponent(
      `Website enquiry${data.get("project") ? ": " + data.get("project") : ""}`,
    );
    document.getElementById("formStatus").textContent =
      "Your email app is opening with the enquiry details.";
    location.href = `mailto:sales@vsentp.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  });
if (
  document.querySelector(".navbar-toggler") &&
  !document.querySelector('script[src*="bootstrap.bundle"]')
) {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
  document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".product-slide");
  const navItems = document.querySelectorAll(".product-nav-item");
  const prevBtn = document.querySelector(".products-prev");
  const nextBtn = document.querySelector(".products-next");
  const currentNumber = document.querySelector(".products-progress-current");
  const progress = document.querySelector(".products-progress-track span");

  let currentSlide = 0;

  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    navItems.forEach((item, i) => {
      item.classList.toggle("active", i === currentSlide);
    });

    currentNumber.textContent = String(currentSlide + 1).padStart(2, "0");

    progress.style.width = ((currentSlide + 1) / slides.length) * 100 + "%";
  }

  nextBtn.addEventListener("click", function () {
    showSlide(currentSlide + 1);
  });

  prevBtn.addEventListener("click", function () {
    showSlide(currentSlide - 1);
  });

  navItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      showSlide(index);
    });
  });

  /* Optional automatic slider */
  let autoSlide = setInterval(function () {
    showSlide(currentSlide + 1);
  }, 6000);

  /* Stop autoplay while interacting */
  const showcase = document.querySelector(".products-showcase");

  showcase.addEventListener("mouseenter", function () {
    clearInterval(autoSlide);
  });

  showcase.addEventListener("mouseleave", function () {
    autoSlide = setInterval(function () {
      showSlide(currentSlide + 1);
    }, 6000);
  });
});
