class Page {
  constructor() {
    const main = document.querySelector("main");

    this.sections = main.querySelectorAll("section");
    this.pageNav = main.querySelector(".pageNav");
    this.navList = main.querySelectorAll(".pageNav ul li");
    this.navIcon = main.querySelectorAll(".pageNav ul li .navIcon");
    this.currentSection = 0;
  }

  pageEvent() {
    this.fullPageEvent();
    this.navIconEvent();
  }

  fullPageEvent() {
    window.addEventListener("wheel", (e) => {
      if (this.isScrolling) return;

      this.isScrolling = true;

      if (e.deltaY > 0) {
        this.scrollToNextSection();
      } else {
        this.scrollToPreviousSection();
      }

      setTimeout(() => {
        this.isScrolling = false;
      }, 100);
    });
  }

  scrollToNextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.scrollToSection(this.currentSection);
    }
  }

  scrollToPreviousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.scrollToSection(this.currentSection);
    }
  }

  scrollToSection(index) {
    const targetSection = this.sections[index];
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth",
    });

    this.updateNav(index);
  }

  navIconEvent() {
    this.navIcon.forEach((nav, index) => {
      nav.addEventListener("click", () => {
        this.currentSection = index;
        this.scrollToSection(index);
      });
    });
  }

  updateNav(index) {
    this.navList.forEach((item) => {
      item.classList.remove("active");
    });

    this.navList[index].classList.add("active");

    if (index === 1 || index === 3) {
      this.pageNav.classList.add("white");
    } else {
      this.pageNav.classList.remove("white");
    }
  }
}

const page = new Page();
page.pageEvent();
