/*
 * -----------------------------------
 * SIDEBAR CLASS
 * -----------------------------------
 */
const sidebar = {
  traitList: "#selected-stats .selected-trait-list",
  traitPrefix: "#selected-stats .selected-trait-list #trait-",
  totalPoints: 15,
  totalSpent: 0,
  loaded: false,

  init() {
    console.log(`sidebar.init()`);
    document.querySelector("aside#selected-stats").innerHTML = `
      <h2>Your character</h2>
      <div class="property">
        <h3 class="stat-title">Size</h3>
        <p id="stat-size">Medium</p>
      </div>
      <div class="property">
        <h3 class="stat-title">Speed</h3>
        <p id="stat-speed">30 ft.</p>
      </div>
      <div class="property">
        <h3 class="stat-title">Vision</h3>
        <p id="stat-vision">Normal vision</p>
      </div>
      <div class="property">
        <h3 class="stat-title">Languages</h3>
        <div id="stat-languages">Common</div>
        <div id="second-language" class="hide"></div>
        <div id="extra-languages"></div>
      </div>
      <div class="points property">
        <h3 id="cost-title">Total points</h3>
        <p class="cost-label">
          <div id="cost-spent" class="h3">${this.totalSpent}</div>
          <div id="cost-available" class="h3">/${this.totalPoints}</div>
        </p>
      </div>
      <div class="selected-traits">
        <h3>Traits</h3>
        <div class="selected-trait-list">

        </div>
      </div>
      <a class="button button-summary" href="" onclick="nav.goTo('summary')">
        Review your character
      </a>
    `;
    this.refreshLanguages();
    getPropertyValues("selectedTraits").forEach(trait => {
      this.addTrait(trait);
    });
    this.loaded = true;
  },

  getTraitList() {
    return document.querySelector(this.traitList);
  },

  addTrait(key) {
    console.log("sidebar.addTrait(" + key + ")");
    var traitList = this.getTraitList();
    if (traitList.querySelector("#trait-" + key)) { return; }
    var trait = traits[key];


    var parent = traitList.querySelector(".trait-type-" + trait.type);
    var newTrait = document.createElement("div");
    newTrait.classList.add("trait-item");
    newTrait.id = "trait-" + key;
    newTrait.innerHTML = `
      <div class="trait-label">${trait.title}</div>
      <div class="cost">${trait.cost}</div>
    `;

    if (parent == null) {
      var parent = document.createElement("div");
      parent.classList.add("trait-type-" + trait.type);
      var typeLabel = document.createElement("h4");

      // Check parent type
      // console.log(trait);
      // console.log(data[trait.type])
      if (trait.subtype) {
        // console.log("subtype")
        typeLabel.innerText = data[trait.type].options[trait.subtype].title;
      }
      else {
        // console.log("type")
        typeLabel.innerText = data[trait.type].title;
      }
      parent.appendChild(typeLabel);
      parent.appendChild(newTrait);
      traitList.appendChild(parent);
    }
    else {
      parent.appendChild(newTrait);
    }

  },

  removeTrait(key) {
    console.log("sidebar.removeTrait(" + key + ")");
    console.log(key);
    console.log(document.querySelector("#trait-" + key));
    var traitList = this.getTraitList();
    var traitItem = traitList.querySelector("#trait-" + key);
    var theTrait = traits[key];
    if (traitItem) {
      // It exists

      // delete the item
      traitItem.remove();

      // check for parent
      var parent = traitList.querySelector(".trait-type-" + theTrait.type);
      if (parent.querySelector(".trait-item") == null) {
        parent.remove();
      }
    }

    if (theTrait.traittype && theTrait.options.hasOwnProperty("type")) {
      console.log(theTrait.options)
      setProperty(theTrait.options.type, data[theTrait.options.type].baseValue);
    }
  },

  refreshLanguages() {
    var toReturn = "";
    var spokenLanguages = [data.languages.baseValue];
    if (properties.language2 !== "none" && properties.language2.length > 0) {
      spokenLanguages.push(data.languages.options[properties.language2]);
    }
    getPropertyValues("languages").forEach(language => {
      spokenLanguages.push(data.languages.options[language]);
    });

    spokenLanguages.forEach(language => {
      toReturn += `<p class='language'>${language}</p>`;
    });


    document.querySelector("#stat-languages").innerHTML = toReturn;
  },

  canAfford(cost) {
    var newTotal = cost + this.totalSpent;
    console.log(`This costs ${cost} and you've spent ${this.totalSpent}. Your new total will be ${newTotal}`);
    console.log(newTotal <= this.totalPoints);
    if (newTotal > this.totalPoints) {
      console.log("You can NOT afford this, loser.");
    }
    return newTotal <= this.totalPoints;
  },

  getRemainingPoints() {
    return this.totalPoints - this.totalSpent;
  }
}