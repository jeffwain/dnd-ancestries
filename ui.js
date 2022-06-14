/*
 * --------------------------------
 * Generate a top level accordion
 * -------------------------------- 
 */
function generateAccordion(type, content, showPoints = false) {
  var description = type.description.replace("\n", `</p><p class="section-description">`);
  var extraControls = ""
  if (type.type === "bloodline" || type.type === "culture") {
    extraControls = `
      <div class="picked">0 of 2</div>
      <span class="visibility-toggle">
        <a class="hide-all" onclick="hideShow(false, '${type.type}')">Hide all</a> | 
        <a class="show-all" onclick="hideShow(true, '${type.type}')">Show all</a>
      </span>
    `;
  }
  var points = showPoints ? `<div class="cost">0 points</div>` : "";
  return `
  <div class='accordion'>
    <div class="section-title-container">
      <h2 class='section-title show'>${type.title}</h2>
      ${extraControls}
      ${points}
    </div>
    <div class='accordion-content'>
      <p class='section-description'>${description}</p>
      ${content}
    </div>
  </div>`;
}

/*
 * --------------------------------
 * Generate category of traits (e.g. Size)
 * -------------------------------- 
 */
function generateCategory(subtype, parentType, handler, format = "checkbox", categoryFormat = "checkbox") {
  console.log(`generateCategory(${subtype.name}, ${parentType}, ${handler}, ${format}, ${categoryFormat})`);
  var children = "";
  var childTraits = Object.values(traits).filter(item => (item.hasOwnProperty("subtype") && item.subtype === subtype.name));
  Object.values(childTraits).forEach(childTrait => {
    children += generateTraitBasic(childTrait.key, format);
  });
  // Also check if we should hide the checkbox for certain types.
  var isSubtype = categoryFormat === "";
  var hideCategorySelector = isSubtype ? "category-selection--hidden" : "";
  if (isSubtype) { categoryFormat = "checkbox"; }

  return `
  <div id="subtype-${subtype.name}" class="${isSubtype ? "two-columns" : categoryFormat} trait-subtype">
    <input type="${categoryFormat}" name="${parentType}" value="${subtype.name}" id="${parentType}-${subtype.name}" onclick="${handler}" class="category-selection ${hideCategorySelector}">
    <label class="h4" for="${parentType}-${subtype.name}">${subtype.title}</label>
    <p class="section-description">${subtype.description}</p>
    <div class="${parentType}-${subtype.name}-traits ${parentType}-traits traits-list">
      <div class="trait-format--${format}">
      ${children}
      </div>
    </div>
  </div>
  `;
}


/*
 * --------------------------------
 * Generate category of traits (e.g. Size)
 * -------------------------------- 
 */
function generateSubtypeCategory(subtype, parentType, handler) {
  // console.log(`generateCategory(${subtype.name}, ${parentType}, ${handler})`);
  var children = "";
  var childTraits = Object.values(traits).filter(item => (item.hasOwnProperty("subtype") && item.subtype === subtype.name));
  Object.values(childTraits).forEach(childTrait => {
    if (childTrait.hasOwnProperty("traittype")) {
      console.log(`traittype = ${childTrait.traittype}`)
      children += generateTrait(childTrait);
    }
    else {
      children += generateTraitBasic(childTrait.key, "checkbox");
    }
  });

  return `
  <div id="subtype-${subtype.name}" class="two-columns trait-subtype">
    <input type="checkbox" name="${parentType}" value="${subtype.name}" id="${parentType}-${subtype.name}" onclick="${handler}" class="category-selection category-selection--hidden">
    <div class="accordion">
      <label class="h4 section-title show" for="${parentType}-${subtype.name}">${subtype.title}</label>
      <div class='accordion-content ${parentType}-${subtype.name}-traits ${parentType}-traits'>
        <p class='section-description'>${subtype.description}</p>
        <div class="trait-format--checkbox traits-list">
        ${children}
        </div>
      </div>
    </div>
  </div>
  `;
}


/*
 * --------------------------------
 * Generate a single trait checkbox/radio
 * -------------------------------- 
 */
function generateTraitBasic(key, inputType) {
  var trait = traits[key];
  var type = trait.hasOwnProperty('subtype') ?
    trait.subtype : trait.type;

  var cost = trait.cost == 0 ? `<span class="required">(required)</span>` : `(${trait.cost})`;
  return ` 
  <div class='${inputType} trait'>
    <label for='${type}-${trait.key}'>
      <input id='${type}-${trait.key}' name='${type}' type='${inputType}' value='${trait.key}' onclick='selectTheTrait(this)'>
      <span class='option-title'>${trait.title} ${cost}.</span>
      <span class='option-description'>${trait.description}</span>
    </label>
  </div>`;
}

function generateTrait(trait) {
  var type = trait.hasOwnProperty('subtype') ?
    trait.subtype : trait.type;
  var toReturn = `
    <div class='checkbox trait'>
      <label for='${type}-${trait.key}'>
        <input id='${type}-${trait.key}' name='${type}' type='checkbox' value='${trait.key}' onclick='selectTheTrait(this)'>
        <span class='option-title'>${trait.title} (${trait.cost}).</span>
        <span class='option-description'>${trait.description}</span>
        <ul class="trait-options">
  `;
  switch (trait.traittype) {
    case "choice":
      console.log(trait.options[0].key);
      for (let i = 0; i < trait.options.length; i++) {
        var option = trait.options[i];
        console.log(option)

        toReturn += `
        <li class="trait-option" id="${option.key}">
          <p><span class="trait-option-title">${option.title}.</span> <span class="trait-option-description">${option.description}</span></p>
        </li>
        `;
      }
      break;
  
    default:
      break;
  }
  return toReturn += `
      </ul>
    </label>
  </div>`;
}


/*
 * --------------------------------
 * Generate a select trait (e.g. language).
 * -------------------------------- 
 */
function generateSelect(name, labelText, options, handler) {
  //console.log(`generateSelect(${name}, ${labelText}, ${handler})`);
  var toReturn = "";
  Object.entries(options).forEach(item => {
    toReturn += `<option value="${item[0]}">${item[1]}</option>`
  });

  return `
  <div>
    <label for="${name}">${labelText}</label>
    <select name="${name}" onchange="${handler}" id="${name}-select">
      ${toReturn}
    </select>
  </div>`;
}