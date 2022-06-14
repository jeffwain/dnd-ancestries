function setup() {
  // storageClear();
  // console.log(localStorage);
  nav.init();
  loadPage();
  validateTraits();

  if (properties.modified === false) {
    initializeStorage();
    sidebar.init();
    properties.modified = true;
  }
  debugRefresh();
}

function loadPage() {
  document.getElementById("content").innerHTML = "";
  var form = document.createElement("form");
  form.id = nav.activePage;
  var content = document.getElementById("content");
  switch (nav.activePage) {
    case "bloodlines":
      content.appendChild(form);
      initializeSection("bloodline");
      break;
    case "cultures":
      content.appendChild(form);
      initializeSection("culture");
      break;
    case "summary":
      initSummary();
      break;
    default:
      content.appendChild(form);
      initializeSection("intro");
      initializeRaces();
      initializeSection("creaturetype");
      initializeSection("abilityscores");
      initializeSection("languages", "setLanguage(this)");
      initializeSection("size", "setSize(this)");
      initializeSize();
      initializeSection("speed");
      initializeSection("vision");
      break;
  }

  // After initializing UI, select traits
  loadAccordions();
}


function loadAccordions(){
  var acc = document.querySelectorAll(".accordion");
  var i;
  // console.log(acc);

  for (i = 0; i < acc.length; i++) {
    
    var firstChild = acc[i].querySelector(".section-title");
    // console.log(firstChild);
    firstChild.addEventListener("click", function () {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("show");
      // console.log(this);

      /* Toggle between hiding and showing the active panel */
      var panel = this.parentElement.parentElement.querySelector(".accordion-content");
      if (panel.classList.contains("hide")) {
        panel.classList.remove("hide");
      } else {
        panel.classList.add("hide");
      }
    });
  }
}


function initializeRaces() {
  var toReturn = "";
  Object.entries(templates).forEach(template => {
    var key = template[0];
    var race = template[1];
    toReturn += `<option value="${key}">${race.title}</option>`
  });
  document.getElementById("race-templates").innerHTML = toReturn;
}


function initializeTraits() {
  console.log("initializeTraits()");
  var selectedTraits = [];
  if (localStorage.getItem("selectedTraits")) {
    selectedTraits = localStorage.getItem("selectedTraits").split(",");
  }
  else {
    selectedTraits = properties.selectedTraits;
  }

  // Select all preset traits
  // console.log("Which traits are selected?");
  // console.log(selectedTraits);
  for (let i = 0; i < selectedTraits.length; i++) {
    var trait = selectedTraits[i];
    var toCheck = document.querySelector("input[value=" + trait + "]");
    // console.log(toCheck);
    if (toCheck) { 
      toCheck.checked = true; 
      sidebar.addTrait(trait);
    }

    // If it's a size, deal with it separately.
    if (traits[trait].type == "size") {
    }
  }
}


function initializeSection(key, handler) {
  //console.log(`initialize(${key})`);

  var type = data[key];

  // Generate the content.
  var section = document.createElement("div");
  section.id = type.name;
  var content = `<div class='${key}-traits'>`;
  var showPoints = false;
  // console.log(type);

  switch (type.type){
    case "select":
      console.log(`Generating a select for ${type.name}.`);
      content += generateSelect(type.name, type.title, type.options, handler);
      break;

    case "pickonetype":
      console.log(`Generating a type picker for ${type.name}.`);
      Object.values(type.options).forEach(subtype => {
        content += generateCategory(subtype, type.name, handler, "checkbox", "radio");
      });
      showPoints = true;
      break;

    case "pickonetrait":
      // Find the matching traits
      console.log(`Generating a pick-only-one for ${type.name}.`);
      for (const [name, trait] of Object.entries(traits)) {
        if (trait.type === key) {
          content += generateTraitBasic(trait.key, "radio");
        }
      }
      showPoints = true;
      break;

    case "bloodline":
      console.log(`Generating bloodlines for ${type.name}.`);
      Object.entries(type.categories).forEach(category => {
        console.log(` - Creating category of ${category[1]}`);

        content += `<h3 class="trait-category">${category[1]}</h3>`;
        var inCategory = Object.values(type.options).filter(subtype => subtype.category == category[0]);
        console.log(inCategory);

        inCategory.forEach(subtype => {
          content += generateSubtypeCategory(subtype, type.name, "")
        });
      });
      showPoints = true;
      break;

    case "culture":
      console.log(`Generating cultures for ${type.name}.`);
      Object.values(type.options).forEach(category => {
        //console.log(` - Creating category of ${category.title}`);
        content += generateSubtypeCategory(category, type.name, "", "checkbox", "")
      });
      showPoints = true;
      break;

    default:
      // No inner content, just a description.
      break;
  }
  content += `</div>`;

  // Create and set the accordion.
  section.innerHTML = generateAccordion(type, content, showPoints);
  
  // Add it to the page!
  document.querySelector("form").appendChild(section);
}

function initializeSize() {
  console.log("initializeSize()");
  var otherSize = "";
  // console.log(localStorage);
  if (localStorage.getItem("size")) {
    properties.size = localStorage.getItem("size");
  }
  else {
    localStorage.setItem("size", properties.size);
  }

  Object.values(data.size.options).forEach(size => {
    // console.log(size);
    if (size.name != properties.size) {
      otherSize = size.name;
    }
  });
  // console.log("other size is " + otherSize);

  var sizeContainer = document.querySelector("input[value=" + properties.size + "]");
  sizeContainer.checked = true;

  var otherSizeContainer = document.querySelector("input[value=" + otherSize +"]");
  // console.log(otherSizeContainer);
  otherSizeContainer.checked = false;
  otherSizeContainer.parentElement.querySelector(".size-traits").classList.add('disabled');

  var checkboxes = document.querySelectorAll(".size-traits input[type=checkbox]");
  checkboxes.forEach(checkbox => {
    if (checkbox.name.includes(properties.size)) {
      checkbox.removeAttribute("disabled");
    }
    else {
      // console.log(checkbox.id); 
      checkbox.setAttribute("disabled", ""); 
    }
  });
}

function getFirstChild(el) {
  var firstChild = el.firstChild;
  while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
}



function initSummary() {
  document.getElementById("content").innerHTML = `
    <div id="summary">
      <section id="character-summary">
        <h2>Your character</h2><div class="points property">
          <h3 id="cost-title">Total points</h3>
          <div class="cost-label">
            <div class="cost-spent">0</div>
            <div class="cost-available">/15</div>
          </div>
        </div>
      </section>
      <div class="two-columns">
        <section id="selected-stats" class="col">
          <div class="property">
            <h3 class="stat-title">Size</h3>
            <div id="stat-size">Medium</div>
          </div>
          <div class="property">
            <h3 class="stat-title">Speed</h3>
            <div class="stat-group stat-speeds">
              <div class="stat stat-speed">
                <h4>Walking speed</h4>
                <div id="stat-speed-walking">30 ft.</div>
              </div>
              <div class="stat stat-speed">
                <h4>Climbing speed</h4>
                <div id="stat-speed-climbing">15 ft.</div>
              </div>
              <div class="stat stat-speed">
                <h4>Swimming speed</h4>
                <div id="stat-speed-swimming">15 ft.</div>
              </div>
              <div class="stat stat-speed">
                <h4>Flying speed</h4>
                <div id="stat-speed-flying">--</div>
              </div>
            </div>
          </div>
          <div class="property">
            <h3 class="stat-title">Vision</h3>
            <div id="stat-vision">Normal vision</div>
          </div>
          <div class="property">
            <h3 class="stat-title">Languages</h3>
            <div class="stat-group" id="stat-languages">
            </div>
          </div>
        </section>
        <section class="character-traits col">
            <h3>Traits</h3>
            <div class="selected-trait-list">
          
            </div>
            <div class="total-cost">
              <h4>Total Cost</h4>
              <div class="cost-spent align-right"></div>
            </div>
        </section>
      </div>
    </div>
  `;

  console.log(`Load the summary page.`);
  console.log(localStorage);

  // Size
  document.getElementById("stat-size").innerHTML = localStorage.size;

  // Speed
  document.getElementById("stat-speed-walking").innerHTML = localStorage.speed;
  document.getElementById("stat-speed-climbing").innerHTML = localStorage.speedclimbing;
  document.getElementById("stat-speed-swimming").innerHTML = localStorage.speedswimming;
  var flyingSpeed = localStorage.speedflying == "none" ? "--" : localStorage.speedflying;
  document.getElementById("stat-speed-flying").innerHTML = flyingSpeed;


  // Languages
  var setLanguage = "";
  var chosenLanguages = [localStorage.language1];
  if (localStorage.language2 !== "") { chosenLanguages.push(localStorage.language2) };
  getPropertyValues("languages").forEach(language => {
    chosenLanguages.push(language)
  });
  console.log(chosenLanguages)

  for (let i = 0; i < chosenLanguages.length; i++) {
    var key = chosenLanguages[i];
    if (data.languages.options.hasOwnProperty(key)) {
      chosenLanguages[i] = data.languages.options[key];
    }
    else {
      chosenLanguages[i] = data.languages.baseValue;
    }
  }
  console.log(chosenLanguages)

  chosenLanguages.forEach(language => {
    setLanguage += `<div class="language">${language}</div>`
  });
  document.getElementById("stat-languages").innerHTML = setLanguage;


  // Traits
  var setTraits = "";
  var totalCost = 0;
  var toExport = {
  };
  // Sort traits by type
  getPropertyValues("selectedTraits").forEach(chosenTrait => {
    var trait = traits[chosenTrait];
    totalCost += trait.cost;
    var toReturn = `
      <div class="trait trait-${trait.key}">
        <h4>${trait.title}</h4>
        <div class="trait-cost align-right">${trait.cost}</div>
        <div class="trait-description">${trait.description}</div>
      </div>
    `;

    var parent = data[trait.type];
    var parentKey = trait.hasOwnProperty("subtype") ? parent.options[trait.subtype].name : parent.name;
    var parentTitle = trait.hasOwnProperty("subtype") ? parent.options[trait.subtype].title : parent.title;
    if (trait.type === "bloodline") {
      parentTitle += " <span>bloodline</span>";
    }
    else if (trait.type === "culture") {
      parentTitle += " <span>culture</span>";
    }

    if (toExport.hasOwnProperty(trait.type)) {
      toExport[trait.type].traits.push(toReturn);
    }
    else {
      toExport[trait.type] = {
        key: parentKey,
        title: parentTitle,
        traits: [toReturn]
      };
    }
  });
  // Now sort by the order in the Data file.
  Object.keys(data).forEach(key => {
    // Time to add all our generated HTML
    Object.entries(toExport).forEach(traitType => {
      console.log(`Key: ${key} and type: ${traitType.key}. Match? ${traitType[0] == key}`)
      // If we have traits...
      if (traitType[0] == key) {
        // ... then set the name and traits.
        setTraits += `
        <div class="trait-type">
        <h3>${traitType[1].title}</h3>
        `;
        for (let i = 0; i < traitType[1].traits.length; i++) {
          setTraits += traitType[1].traits[i];
        }
        setTraits += "</div>";
      }
    });
  }
  );
  console.log(toExport);
  document.querySelector(".selected-trait-list").innerHTML = setTraits;

  // Set costs
  document.querySelectorAll(".cost-spent").forEach(div => {
    div.innerHTML = totalCost;
  })
}