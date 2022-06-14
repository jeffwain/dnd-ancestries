const nav = {
  activePage: "basics",
  init() {
    if (localStorage.hasOwnProperty("activePage")) {
      this.activePage = localStorage.activePage;
    }
    else {
      localStorage.activePage = this.activePage;
    }
    var toReturn = `
      <ul>
        <li><a id="nav-basics" href="#" onclick="nav.goTo('basics')" class="${this.activePage == "basics" ? "active" : ""}">1. Basics</a></li>
        <li><a id="nav-bloodlines" href="#" onclick="nav.goTo('bloodlines')" class="${this.activePage == "bloodlines" ? "active" : ""}">2. Bloodlines</a></li>
        <li><a id="nav-cultures" href="#" onclick="nav.goTo('cultures')" class="${this.activePage == "cultures" ? "active" : ""}">3. Cultures</a></li>
        <li><a id="nav-summary" href="#" onclick="nav.goTo('summary')" class="${this.activePage == "summary" ? "active" : ""}">4. Summary</a></li>
      </ul>
    `;
    document.querySelector("nav").innerHTML = toReturn;
  },
  goTo(page) {
    console.log(`goTo(${page})`);
    this.activePage = page;
    localStorage.activePage = page;
    setup();
  }
}