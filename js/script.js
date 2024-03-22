/* ========== Start Settings Box ========== */
// Select Elements
const settingBox = document.querySelector(".setting-box");
const settingIcon = document.querySelector(".setting-icon");
const colorsLi = document.querySelectorAll(".colors-list li");
const randomBackground = document.querySelectorAll(".background-option span");
const bulletsSpan = document.querySelectorAll(".bullets-option span");
const bulletsContainer = document.querySelector(".nav-bullets");
const resetOptions = document.querySelector(".reset-options");

/* ===== Settings Box ===== */
function show(show, icon) {
  settingIcon.addEventListener("click", () => {
    // Toggle Class fa-spin To Icon When It Opened
    icon.classList.toggle("fa-spin");
    // Toggle Class Show To Setting-Box
    show.classList.toggle("show");
  });

  // Close Settings Box If User Scroll Up Or Down
  window.addEventListener("scroll", () => {
    show.classList.remove("show");
    icon.classList.remove("fa-spin");
  });
}
show(settingBox, settingIcon);

/* ===== Colors In Settings Box ===== */
// Check If There Is A Color In Local Storage ?!
// If Already There Is A Color In Local Storage, Take It From Local Storage And Set It To Root Element
if (window.localStorage.getItem("--main-color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("--main-color")
  );

  // Remove Active Class & Scale Property From Each Li
  colorsLi.forEach((li) => {
    li.classList.remove("active");
    li.classList.remove("scale");

    // Add Active Class To Clicked Li Color
    if (li.dataset.color === localStorage.getItem("--main-color")) {
      li.classList.add("active");
    }
  });
}

// Switch Colors
// Loop On All Li Element
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Remove Active Class & Scale Property From Each Li
    colorsLi.forEach((li) => {
      li.classList.remove("active");
      li.classList.remove("scale");
    });

    // Add Active Class & Scale Property To Clicked Li Color
    e.target.classList.add("active");
    e.target.classList.add("scale");

    // Set Clicked Color To Root Element
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Clicked Color To Local Storage
    window.localStorage.setItem("--main-color", e.target.dataset.color);
  });
});

/* ===== Random Background In Settings Box ===== */

// Set Random Background State To Default Value True
let randomBackgroundState = true;

// Make A Variable To Clear SetInterval If User Click On No Option
let backgroundInterval;

// Check If There Is Background Item In Local Storage ?!
// If Already There Is A Color In Local Storage, Take It From Local Storage And Set It To Root Element
let backgroundLocalStorage = window.localStorage.getItem("background-item");
if (backgroundLocalStorage !== null) {
  if (backgroundLocalStorage === "true") {
    randomBackgroundState = true;
  } else {
    randomBackgroundState = false;
  }

  // Remove Active Class From All Spans
  randomBackground.forEach((span) => {
    span.classList.remove("active");
  });

  if (backgroundLocalStorage === "true") {
    document.querySelector(".background-option .yes").classList.add("active");
  } else {
    document.querySelector(".background-option .no").classList.add("active");
  }
}

// Switch Random Background Option
// Loop On All Spans
randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove Active Class From Each Span
    randomBackground.forEach((span) => {
      span.classList.remove("active");
    });

    // Add Active Class To Clicked Span
    e.target.classList.add("active");

    /* IF User Click Yes Or IF Yes Is Default Value => Random Background State Is True
      Which Means That randomBackgroundImgs() Function Must Be Work And Generate Random Background 
    */
    if (e.target.dataset.background === "yes") {
      randomBackgroundState = true;
      randomBackgroundImgs();

      // Set Background Item To Local Storage
      window.localStorage.setItem("background-item", true);
    } else {
      /* IF User Click No => Random Background State Is False
        That Means randomBackgroundImgs() Function Must Be Stop And Clear SetInterval
      */
      randomBackgroundState = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background-item", false);
    }
  });
});

/* ===== Show Or Hide Bullets ===== */
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((bullet) => {
    bullet.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    if (bullet.dataset.display === "block") {
      bulletsContainer.style.display = "block";
      window.localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      window.localStorage.setItem("bullets_option", "none");
    }
    bulletsSpan.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

/* ===== Reset Options ===== */

resetOptions.addEventListener("click", (e) => {
  localStorage.clear();
  window.location.reload();
});

/* ========== End Settings Box ========== */

/* ========== Start Nav Menu ========== */
let icon = document.querySelector(".icon-menu");
let navLinks = document.querySelector(".nav-links");
let navMenu = document.querySelectorAll(".nav-links");

function showMenu(icon, navMenu) {
  // Toggle Class Show To Nav Menu
  icon.addEventListener("click", () => {
    navLinks.classList.toggle("show-nav");
  });

  // Remove Class Show From Menu Nav Links If Any Link Clicked On It
  navMenu.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.classList.remove("show-nav");
    });
  });

  // Remove Class Show From Menu Nav Links IF Window Scroll
  window.addEventListener("scroll", () => {
    navLinks.classList.remove("show-nav");
  });
}
showMenu(icon, navMenu);
/* ========== End Nav Menu ========== */

/* ========== Start Landing Page ========== */
// Select Landing Page Element
const landingPage = document.querySelector(".landing-page");

// Get Imgs Array
const coverArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];

function randomBackgroundImgs() {
  if (randomBackgroundState === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * coverArray.length);
      // Change Landing Page Cover After 10s
      landingPage.style.backgroundImage = `url(imgs/${coverArray[randomNumber]})`;
    }, 10000);
  }
}
randomBackgroundImgs();
/* ========== End Landing Page ========== */

/* ========== Start Our Skills Section ========== */
// Select Our Skills Section

const ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", () => {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window Scroll Top
  let windowScrollTop = this.scrollY;

  /* 983 > (985 + 615 - 617)*/
  if (
    windowScrollTop >=
    skillsOffsetTop + skillsOuterHeight - windowHeight - 200
  ) {
    let allSkills = document.querySelectorAll(".skill-box .progress-bar .prog");
    for (let skill of allSkills) {
      skill.style.width = skill.dataset.progress;
    }
  }
});
/* ========== End Our Skills Section ========== */

/* ========== Start Gallery Section ========== */
const ourGallery = document.querySelectorAll(".gallery-box .gallery-img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay Element
    overlay.className = "popup-overlay";
    // Append Overlay To Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To Popup Box Element
    popupBox.className = "popup-box";
    // Create Image
    let popupImg = document.createElement("img");
    // Add Class TO Popup Img
    popupImg.className = "popup-img";
    // Set Image Source
    popupImg.src = e.target.src;
    // Append Popup Img To Popup Box
    popupBox.appendChild(popupImg);

    // Append Popup Box To Body
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Add Class To Heading
      imgHeading.className = "img-heading";
      // Create Text For Heading
      let = headingText = document.createTextNode(img.alt);
      imgHeading.appendChild(headingText);

      // Append Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Close Span
    let closePopup = document.createElement("i");
    closePopup.className = "fa-solid fa-xmark close-popup";

    closePopup.addEventListener("click", () => {
      popupBox.remove();
      overlay.remove();
    });

    popupBox.appendChild(closePopup);
  });
});
/* ========== End Gallery Section ========== */

/* ========== Start Scrolling Nav Menu Links & Nav Bullets ========== */

// Select Elements

const navBullets = document.querySelectorAll(".nav-bullets ul .bullet");
const allLinks = document.querySelectorAll(".nav-links");

function scrollingView(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollingView(allLinks);
scrollingView(navBullets);

/* ========== End Scrolling Nav Menu Links & Nav Bullets ========== */
