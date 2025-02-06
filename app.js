function selectTheTrait(selected) {
  console.log(" ");
  console.log(" ");
  console.log("___________________________");
  var trait = selected.value;
  var type = selected.name;
  console.log(`selectTheTrait(${trait}, ${type}) ---------------`);
  console.log(selected);
  var parentItem = selected.closest(".trait");
  console.log(parentItem);


  // If we're already selected, remove it.
  if (isSelectedTrait(trait)) {
    // this is already selected
    console.log("   This trait is already selected.");
    selected.checked = false;
    parentItem.classList.remove("selected");
    removeTrait(trait);
  }
  else {
    // First make sure you can afford it.
    if (!sidebar.canAfford(traits[trait].cost)) {
      parentItem.classList.remove("selected");
      selected.checked = false;
      return;
    }
    // Remove other traits
    if (traits[trait].isExclusive == true) {
      removeMutuallyExclusiveTraits(trait, type);
    }

    // Otherwise, select it!
    parentItem.classList.add("selected");
    setTrait(trait);
  }
  validateTraits(trait);
  console.log("___________________________");
}


/* --------
 * Used to deselect sibling traits if the traits 
 * are mutually exclusive.
 */
function removeMutuallyExclusiveTraits(trait, type) {
  var selectedTraits = getPropertyValues("selectedTraits");

  Object.values(traits).filter(item => item.type === type).forEach(toCheck => {
    if (toCheck.key != trait && selectedTraits.includes(toCheck.key)) {
      console.log("Need to remove " + toCheck.title);
      removeTrait(toCheck.key);
    }
  });
}


/* --------
 * Because sizes are nested weird, this is a custom
 * size selection manager.
 */
function setSize(selected) {
  var selectedSize = selected.value;
  console.log("   setSize(" + selectedSize + ")");
  // console.log(selected);
  if (localStorage.getItem("size") == selectedSize) {
    // this is already selected
    console.log("   already selected, dummy!");
    return;
  }
  var otherSize = "";
  Object.values(data.size.options).forEach(size => {
    // console.log(size);
    if (size.name != selectedSize) {
      otherSize = size.name;
      console.log(`#subtype-${selectedSize}`);
      var thisSize = document.getElementById(`subtype-${selectedSize}`);
      thisSize.classList.remove("subtype--disabled");
      var theOtherSize = document.getElementById(`subtype-${otherSize}`);
      theOtherSize.classList.add("subtype--disabled");
    }
  });

  // Enable this section
  var thisSection = document.querySelector(".size-" + selectedSize + "-traits");
  thisSection.classList.remove("disabled");

  // Disable the other section.
  var otherSection = document.querySelector(".size-" + otherSize + "-traits");
  otherSection.classList.add("disabled");

  // Deselect all checkboxes.
  var checkboxes = document.querySelectorAll(".size-traits input[type=checkbox]");
  // console.log(checkboxes);
  checkboxes.forEach(checkbox => {
    if (checkbox.checked === true) {
      checkbox.checked = false;
      removeTrait(checkbox.value);
      checkbox.classList.remove("selected");
    }
    if (checkbox.name.includes(selectedSize)) {
      checkbox.removeAttribute("disabled");
    }
    else { checkbox.disabled = true; }
  });

  // Finally, update the size.
  setProperty(selected.name, selected.value);
}


/* --------
 * Sets a language and updates the side panel.
 */
function setLanguage(element) {

  console.log("** TODO: CHANGE TO ADD/REMOVE LANGUAGES **");
  var secondLanguage = document.querySelector("#languages-select");
  var newValue = secondLanguage.options[secondLanguage.selectedIndex].value;
  console.log(`setLanguage(${newValue})`);
  console.log(element);

  setProperty("language2",newValue);
  sidebar.refreshLanguages();
}

//restart the local storage
function storageClear() {
	localStorage.clear();
}

function storageShow() {
  console.log("LOCALSTORAGE ------");
  console.log(localStorage);
  console.log("------------------");
}

function initializeStorage(race = properties) {
  console.log("initializeStorage()");
  var overwrite = properties.modified;
  Object.keys(race).forEach(property => {
    var key = property;
    var value = race[key];

    if (overwrite || !localStorage.hasOwnProperty(key)) {
      localStorage.setItem(key, value);
    }
  });
  console.log(localStorage);
}


function hideShow(show, type) {
  console.log(`hide/show ${show} ${type}`);

  var accordionTitles = document.querySelectorAll(`#${type} .trait-subtype .accordion .section-title`);
  var accordionContent = document.querySelectorAll(`#${type} .trait-subtype .accordion .accordion-content`);

  /* Toggle between adding and removing the "shown" classes,
  to highlight the button that controls the panel */
  accordionTitles.forEach(element => {
    if (show) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
  accordionContent.forEach(element => {
    if (show) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}

function debugRefresh() {
  console.log("debugRefresh()");
  console.log(localStorage);

  var key = "";
  var list = "<tr><th>Item</th><th>Value</th></tr>\n";
  var i = 0;
  //for more advance feature, you can set cap on max items in the cart
  for (i = 0; i <= localStorage.length - 1; i++) {
    key = localStorage.key(i);
    list += "<tr><td>" + key + "</td>\n<td>"
      + localStorage.getItem(key) + "</td></tr>\n";
  }
  //if no item exists in the cart
  if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
    list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
  }
  //bind the data to html table
  //you can use jQuery too....
  document.getElementById('list').innerHTML = list;

  // Now recalculate points
  refreshPoints();
}


function refreshPoints() {
  console.log("refreshPoints()");
  var totalSpent = 0;

  var selectedTraits = getPropertyValues("selectedTraits");
  selectedTraits.forEach(selected => {
    if (traits[selected]) {
      totalSpent = totalSpent + parseInt(traits[selected].cost);
    }
  });

  sidebar.totalSpent = totalSpent;
  document.querySelector('#cost-spent').innerHTML = totalSpent;
}

function setRace(element) {
  console.log(`setRace(${element.value})`);
  if (templates.hasOwnProperty(element.value)) {
    var race = templates[element.value].properties;
    console.log(properties);
    properties.modified = true;
    for (const [key, value] of Object.entries(race)) {
      properties[key] = value;
    };
    initializeStorage(properties);
    initializeSize();
    validateTraits();
    debugRefresh();
    sidebar.init();
  }
}


function setProperty(key, value) {
  console.log("setProperty(" + key + ", " + value + ")");
  var stat = document.querySelector("#stat-" + key);
  var toShow = value;

  // First check if this is a base property
  if (key == "speed" || key == "vision") {
    stat.innerHTML = toShow;
  }
  else if (data.hasOwnProperty(key)) {
    console.log("found the data key")
    if (data[key].hasOwnProperty("options") && data[key].options.hasOwnProperty(value)){
      toShow = data[key].options[value].title;
    }
    else {
      toShow = data[key].title;
    }
    console.log(toShow);
    stat.innerHTML = toShow;
  }

  localStorage.setItem(key, value);
  properties[key] = value;
  debugRefresh();
}




function setTrait(key) {
  console.log("setTrait(" + key + ")");
  if (!traits[key]) {
    console.log("!! couldn't find the trait '" + key + "' to add!!")
    return;
  }
  properties.modified = true;

  var activeTraits = getPropertyValues("selectedTraits");
  if (activeTraits.indexOf(key) === -1) {
    activeTraits.push(key);
  }
  // console.log(activeTraits);
  localStorage.setItem("selectedTraits",activeTraits);
  // console.log(localStorage.getItem("selectedTraits"));

  // Now check for the different traits that can modify properties
  if (traits[key].hasOwnProperty("traittype")) {
    var trait = traits[key];
    // console.log("Has a modifier!");
    switch (trait.traittype) {
      case "property":
        setProperty(trait.options.type, trait.options.value);
        break;
    
      default:
        break;
    }
  }

  sidebar.addTrait(key);
  debugRefresh();
}


function removeTrait(key) {
  console.log("removeTrait(" + key + ")");
  if (!traits[key]) {
    console.log("!! couldn't find the trait '" + key + "'  to remove !!")
    return;
  }
  properties.modified = true;
  
  var activeTraits = getPropertyValues("selectedTraits");
  var index = activeTraits.indexOf(key);
  if (index !== -1) {
    activeTraits.splice(index, 1);
  }
  // console.log(activeTraits);
  localStorage.setItem("selectedTraits", activeTraits);
  // console.log(localStorage.getItem("selectedTraits"));

  sidebar.removeTrait(key);
  debugRefresh();
}

//-------------------------------------------------

function isSelectedTrait(trait) {
  // console.log("isSelectedTrait(" + trait + ")");
  // console.log(localStorage.getItem("selectedTraits"));
  // console.log(localStorage.getItem("selectedTraits").indexOf(trait));
  var selectedTraits = getPropertyValues("selectedTraits");
  return selectedTraits.includes(trait);
}

function getPropertyValues(property) {
  var selectedTraits = [];
  if (localStorage.getItem(property)) {
    selectedTraits = localStorage.getItem(property).split(",");
  }
  else if (properties.modified === false) {
    // Only pull this if localStorage hasn't been edited yet.
    selectedTraits = properties[property];
  }
  // console.log("Which " + property + " traits are selected?");
  // console.log(selectedTraits);
  return selectedTraits;
}


function validateTraits(newTrait = "") {
  // console.log("TIME TO VALIDATE TRAITS");
  var selectedTraits = getPropertyValues("selectedTraits");
  console.log(`Validating these traits: ${selectedTraits}.`);
  


  var bloodlines = [];
  var cultures = [];
  var mutuallyExclusive = [];

  // console.log(selectedTraits);
  sidebar.pointsLeft = sidebar.totalPoints;
  for (let i = 0; i < selectedTraits.length; i++) {
    var theTrait = traits[selectedTraits[i]];
    var parent = data[theTrait.type];
    var parentName = (theTrait.hasOwnProperty("subtype")) ?
     parent.options[theTrait.subtype].name : parent.name;

    if (parent.name === "bloodline") {
      if (!bloodlines.includes(parentName)) {
        bloodlines.push(parentName);
      }
      // console.log(bloodlines);
    }
    else if (parent.name === "culture") {
      if (!cultures.includes(parentName)) {
        cultures.push(parentName);
      }
      // console.log(cultures);
    }
    
    if (theTrait.hasOwnProperty("duplicate")) {
      console.log(`Duplicate trait of type ${theTrait.duplicate}`)
      mutuallyExclusive.push(theTrait.duplicate);
    }

    // Make sure the sidebar cost is updated
    sidebar.pointsLeft -= theTrait.cost;
  }
  // console.log(`sidebar ${sidebar.pointsLeft}`)

  var disabledSubtypes = [];
  Object.values(data.bloodline.options).filter(item => !bloodlines.includes(item.name)).forEach(toHide => {
    if (bloodlines.length >= 2) {
      disabledSubtypes.push(toHide.name);
    }
  });
  Object.values(data.culture.options).filter(item => !cultures.includes(item.name)).forEach(toHide => {
    if (cultures.length >= 2) {
      disabledSubtypes.push(toHide.name);
    }
  });


  // console.log("disabledSubtypes = ");
  // console.log(disabledSubtypes);
  if (nav.activePage == "bloodlines") {
    Object.keys(data.bloodline.options).forEach(bloodline => {
      var element = document.getElementById("subtype-" + bloodline);
      if (disabledSubtypes.includes(bloodline)) {
        element.classList.add("subtype--disabled");
      }
      else {
        element.classList.remove("subtype--disabled");
      }
    });
  }
  else if (nav.activePage == "cultures") {
    Object.keys(data.culture.options).forEach(culture => {
      var element = document.getElementById("subtype-" + culture);
      if (disabledSubtypes.includes(culture)) {
        element.classList.add("subtype--disabled");
      }
      else {
        element.classList.remove("subtype--disabled");
      }
    });
  }

  // var bloodlines = document.querySelectorAll(".trait-subtype input[name='bloodline']");
  // console.log(bloodlines);

  // First, disable all the options you can't select any more.
  var allUITraits = document.querySelectorAll(".trait input");
  // console.log(allUITraits);
  allUITraits.forEach(input => {
    if (input.value == newTrait ||
        input.checked == true) {
      return;
    }
    var traitName = input.value;
    var traitCost = traits[traitName].cost;
    var isDuplicate = traits[traitName].hasOwnProperty("duplicate") && mutuallyExclusive.includes(traits[traitName].duplicate);
    // console.log(`${traitName} = ${traitCost} - ${sidebar.pointsLeft}`)

    var checked = selectedTraits.indexOf(input.value) !== -1;
    // console.log(checked);

    if (checked === false && (traitCost > sidebar.pointsLeft || disabledSubtypes.includes(traits[traitName.subtype]) || isDuplicate)) {
      if (!input.hasAttribute("disabled")) {
        // console.log(`(Can't afford ${traitName}.)`)
        // console.log(`(It's a duplicate ${traitName}.)`)
        input.setAttribute("disabled", "");
        var parent = input.closest('.trait');
        parent.classList.add("trait--disabled")
      }
    }
    else {
      // console.log(traitName);
      input.removeAttribute("disabled");
      var parent = input.closest('.trait');
      parent.classList.remove("trait--disabled")
    }

    if (checked) {
      input.checked = true;
    }
  });
}