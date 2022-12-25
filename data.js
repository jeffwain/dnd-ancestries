var data = {
  intro: {
    name: "intro",
    title: "1. Creating Your Character",
    description: "Your first step in creating a character is to consider your character's ancestry, the culture they grew up in, and any exceptional occurrences that may have shaped them. Start by determining what you look like and what <dfn></dfn>race(s) make up your unique ancestry. You choose which ability scores you are proficient in, your size, if you have darkvision, bloodlines representing your ancestry, cultures representing your shaping influences, and what languages you know.</p><h3> Start with an existing race template</h3><select id='race-templates' name='races' onchange='setRace(this)'></select><h3>Heritage Point Buy Rules</h3><p class='section-description'>You have <strong>16 points to spend on your heritage traits</strong>. You may pick traits from <strong>up to two bloodlines</strong> and <strong>up to two cultures</strong>. The cost of each score is shown in parenthesis following the name of the trait.You can only take a unique trait once from any one source. You are not required to spend all your heritage trait points, but you cannot spend above your maximum."
  },
  abilityscores: {
    name: "abilityscores",
    title: "3. Choose Ability Score Increases",
    type: "select",
    description: "FPO",
    options: {
      two: "+2 / +1",
      three: "+1 / +1 / +1"
    },
    stats: [
      "Strength",
      "Dexterity",
      "Constitution",
      "Intelligence",
      "Wisdom",
      "Charisma"
    ]
  },
  languages: {
    name: "languages",
    title: "4. Choose a Second Language",
    description: "Your character can speak, read, and write Common and one other language that you and your DM agree is appropriate for the character.",
    type: "select",
    options: {
      none: "None",
      abyssal: "Abyssal",
      celestial: "Celestial",
      deepspeech: "Deep Speech",
      demonic: "Demonic",
      draconic: "Draconic",
      dwarvish: "Dwarvish",
      elemental: "Elemental",
      elvish: "Elvish",
      gnomish: "Gnomish",
      giant: "Giant",
      gith: "Gith",
      infernal: "Infernal",
      loxodon: "Loxodon",
      orcish: "Orcish",
      primordial: "Primordial",
      sylvan: "Sylvan",
      undercommon: "Undercommon",
    },
    baseValue: "Common"
  },
  creaturetype: {
    name: "creaturetype",
    title: "2. Determine Your Creature Type",
    description: "Every creature in D&D, including every player character, has a special tag in the rules that identifies the type of creature they are. Most player characters are of the Humanoid type. Unless you and your DM decide otherwise, your character's creature type is Humanoid.   </p><p class='section-description'>Here's a list of the game's creature types in alphabetical order: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead. These types don't have rules themselves, but some rules in the game affect creatures of certain types in different ways. For example, the cure wounds spell doesn't work on a Construct or an Undead.",
    type: "text"
  },
  size: {
    name: "size",
    title: "5. Determine Your Size",
    description: "Some heritage traits are only available to creatures of a certain size. Choose one of the following options:",
    type: "pickonetype",
    options: {
      medium: {
        name: "medium",
        title: "Medium",
        description: "Medium creatures vary widely in height and build from barely 5 feet to over 8 feet tall and from nearly 100 to over 400 pounds."
      },
      small: {
        name: "small",
        title: "Small",
        description: "Small creatures are short and light, often shorter than 4 feet tall and less than 80 pounds."
      }
    }
  },
  speed: {
    name: "speed",
    title: "Walking speed",
    description: "Your base walking speed is <strong>30 feet</strong>. You can choose to increase this speed:",
    type: "pickonetrait",
    baseValue: "30 ft."
  },
  vision: {
    name: "vision",
    title: "Darkvision",
    description: "Many races have the ability to naturally see in the dark. Choose if your heritage grants you this ability.",
    type: "pickonetrait",
    baseValue: "Normal vision"
  },
  bloodline: {
    name: "bloodline",
    title: "Choose your bloodline traits",
    description: "You can <strong>choose up to 2 bloodlines</strong> from the following options to make up your heritage.",
    type: "bloodline",
    categories: {
      planar: "Subtype: Planar Bloodlines",
      bestial: "Subtype: Bestial Bloodlines",
      other: "Subtype: Other physiologies",
    },
    options: {
      celestial: { 
        category: "planar", 
        name: "celestial", 
        title: "Celestial", 
        description: "You have the blood of a celestial in your ancestry or you have been blessed by the gods." },
      elemental: { 
        category: "planar", 
        name: "elemental", 
        title: "Elemental", 
        description: "You have the blood of an elemental, such as a genie, in your ancestry, or have been altered by elemental energy." },
      fey: { 
        category: "planar", 
        name: "fey", 
        title: "Fey", 
        description: "You have the blood of a fey in your ancestry, such as through elvish or gnomish heritage, or you have been otherwise touched by the fey." },
      fiend: { 
        category: "planar", 
        name: "fiend", 
        title: "Fiend", 
        description: "You have the blood of a devil or demon in your ancestry, or one of your ancestors made a corrupt deal with a fiend." },
      shadowborn: { 
        category: "planar", 
        name: "shadowborn", 
        title: "Shadowborn", 
        description: "You have the blood of a creature from the Shadowfell or have been otherwise touched by its dark magic." },
      aquatic: { 
        category: "bestial", 
        name: "aquatic", 
        title: "Aquatic", 
        description: "You have the blood of an aquatic creature in your ancestry, such as a sea elf or triton, or otherwise have aquatic traits from an aquatic creature like a fish, shark, salamander, crab, or frog." },
      feline: { 
        category: "bestial", 
        name: "feline", 
        title: "Feline", 
        description: "You have the blood of a feline creature in your ancestry, such as a tabaxi, or otherwise have feline traits." },
      flying: { 
        category: "bestial", 
        name: "flying", 
        title: "Flying", 
        description: "You have the blood of a flying creature like an aarakocra in your ancestry, or otherwise have traits (e.g. birdlike, mothlike, batlike) that stem from that ancestry." },
      mammalian: { 
        category: "bestial", 
        name: "mammalian", 
        title: "Mammalian", 
        description: "You have the blood and features of another non-feline type of mammalian creature, such as an elephant, dog, monkey, or antelope. The features you choose below must match your physical features." },
      reptilian: { 
        category: "bestial", 
        name: "reptilian", 
        title: "Reptilian", 
        description: "You have the blood of a reptilian creature in your ancestry, such as a lizardfolk, tortle, or yuan-ti, or otherwise have reptilian traits." },
      construct: { 
        category: "other", 
        name: "construct", 
        title: "Construct", 
        description: "You have a constructed nature. You may have been an organic creature that has been partially replaced by machinery, or a wholly unique construct with a specific purpose." },
      draconic: { 
        category: "other", 
        name: "draconic", 
        title: "Draconic", 
        description: "You have the blood of a dragon in your ancestry." },
      psionic: { 
        category: "other", 
        name: "psionic", 
        title: "Psionic", 
        description: "You have an innate knack for psionics, having a psionic race in your ancestry or having been twisted by the far realm." },
      stout: { 
        category: "other", 
        name: "stout", 
        title: "Stout", 
        description: "You are exceptionally sturdy, perhaps having dwarves, orcs, or giants in your ancestry." }
    }
  },
  culture: {
    name: "culture",
    title: "Culture",
    description: "culture!!!",
    type: "culture",
    options: {
      artisan: { 
        name: "artisan", 
        title: "Artisan", 
        description: "You come from a culture that values the art of craftsmanship." },
      criminal: { 
        name: "criminal", 
        title: "Criminal", 
        description: "You grew up living outside the bounds of the law." },
      friendly: { 
        name: "friendly", 
        title: "Friendly", 
        description: "You come from a hospitable culture with an open heart." },
      mage: { 
        name: "mage", 
        title: "Mage", 
        description: "Arcane magic is common in the society you came from." },
      skirmisher: { 
        name: "skirmisher", 
        title: "Skirmisher", 
        description: "You come from a background specializing in ambush tactics." },
      survivalist: { 
        name: "survivalist", 
        title: "Survivalist", 
        description: "You come from a frontier culture, skilled in survival and woodcraft." },
      warrior: { 
        name: "warrior", 
        title: "Warrior", 
        description: "You were raised in a society dedicated to the arts of war." },
      waterborne: { 
        name: "waterborne", 
        title: "Waterborne", 
        description: "You were raised to feel at home with the sea." },
      theocratic: { 
        name: "theocratic", 
        title: "Theocratic", 
        description: "The society you hail from values devotion to the gods." },
    }
  }
};