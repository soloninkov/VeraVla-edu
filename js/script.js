"use strict";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
if (window.innerWidth <= 768) {
  iconMenu.addEventListener("click", function () {
    let menuItems = document.querySelectorAll(".menu__list > li");
    menuItems.forEach((item) => {
      item.classList.add("_active");
    });
  });
}


window.addEventListener('scroll', function () {
  if (iconMenu.classList.contains('_active')) {
    document.body.classList.remove('_lock');
    iconMenu.classList.remove('_active');
    menuBody.classList.remove('_active');
  }
});


document.querySelectorAll('a[data-goto]').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetSelector = this.getAttribute('data-goto');
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });

     
      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }
    }
  });
});


function onMenuLinkClick(e) {
  const menuLink = e.target;
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top +
      pageYOffset -
      document.querySelector("header").offsetHeight;

    if (iconMenu.classList.contains("_active")) {
      document.body.classList.remove("_lock");
      iconMenu.classList.remove("_active");
      menuBody.classList.remove("_active");
    }

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
    e.preventDefault();
  }
}

function toggleDropdown(dropdownId, button) {
  var dropdown = document.getElementById(dropdownId);

  var isOpen = dropdown.classList.contains("show");


  var allDropdowns = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < allDropdowns.length; i++) {
    allDropdowns[i].classList.remove("show");
    allDropdowns[i].previousElementSibling
      .querySelector(".arrow")
      .classList.remove("rotate");
    allDropdowns[i].style.maxHeight = "0";
  }

  
  if (!isOpen) {
    dropdown.classList.add("show");
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";  
    button.querySelector(".arrow").classList.add("rotate");
  } else {
    dropdown.classList.remove("show");
    dropdown.style.maxHeight = "0";
  }
}


window.onclick = function (event) {
  if (!event.target.matches(".dropdown__button")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
      dropdowns[i].previousElementSibling
        .querySelector(".arrow")
        .classList.remove("rotate");
      dropdowns[i].style.maxHeight = "0";
    }
  }
};
 
$(".custom-carousel").owlCarousel({ 
  autoWidth: true, 
  loop: true, 
}); 
$(document).ready(function () { 
  $(".custom-carousel .item").click(function () { 
    $(".custom-carousel .item").not($(this)).removeClass("active"); 
    $(this).toggleClass("active"); 
  }); 
});

const openModalBtns = document.querySelectorAll('.openModalBtn');
const modal = document.getElementById('contactModal');
const closeModalBtn = document.querySelector('.close');
const contactIcons = document.querySelectorAll('.contact-icon');
const contactForm = document.getElementById('contactForm');
const contactInfoLabel = document.querySelector('label[for="contactInfo"]');
const contactInfoInput = document.getElementById('contactInfo');


openModalBtns.forEach(button => {
    button.onclick = () => {
        modal.style.display = 'block';
        setActiveIcon('phone');
    };
});


closeModalBtn.onclick = () => {
    modal.style.display = 'none';
};


window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


function setActiveIcon(iconId) {
    contactIcons.forEach(icon => {
        icon.classList.remove('active');
    });
    document.getElementById(iconId).classList.add('active');

    switch(iconId) {
        case 'facebook':
            contactInfoLabel.innerText = 'Facebook profile or ID:';
            contactInfoInput.type = 'text';
            contactInfoInput.placeholder = 'Enter your Facebook ID';
            contactInfoInput.pattern = ".*";
            break;
        case 'whatsapp':
            contactInfoLabel.innerText = 'WhatsApp number:';
            contactInfoInput.type = 'tel';
            contactInfoInput.placeholder = 'Enter your WhatsApp number';
            contactInfoInput.pattern = "[0-9]{10}";
            break;
        case 'email':
            contactInfoLabel.innerText = 'Email address:';
            contactInfoInput.type = 'email';
            contactInfoInput.placeholder = 'Enter Email';
            contactInfoInput.pattern = ".*";
            break;
        case 'phone':
            contactInfoLabel.innerText = 'Phone number:';
            contactInfoInput.type = 'tel';
            contactInfoInput.placeholder = 'Enter a phone number';
            contactInfoInput.pattern = "[0-9]{10}";
            break;
        default:
            contactInfoLabel.innerText = 'Contact information:';
            contactInfoInput.type = 'text';
    }
}


contactIcons.forEach(icon => {
    icon.onclick = () => {
        setActiveIcon(icon.id);
    };
});

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('has-content');
        } else {
            input.classList.remove('has-content');
        }
    });
});
