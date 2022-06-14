var properties = {
  modified: false,
  abilityscores: "21",
  language1: "common",
  language2: "",
  languages: [],
  size: "medium",
  speed: "30 ft.",
  speedclimbing: "15 ft.",
  speedflying: "none",
  speedswimming: "15 ft.",
  vision: "none",
  spellcasting: "none",
  selectedTraits: []
}

var templates = {
  elf: {
    title: "Elf",
    properties: {

    }
  },
  gnome: {
    title: "Gnome",
    properties: {

    }
  },
  human: {
    title: "Human",
    properties: {

    }
  },
  loxodon: {
    title: "Loxodon",
    properties: {
      abilityscores: "21",
      abilities: ["CON", "WIS"],
      language1: "common",
      language2: "",
      languages: ["loxodon"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "none",
      speedswimming: "15 ft.",
      vision: "none",
      spellcasting: "none",
      selectedTraits: ["powerful", "trunk", "keensmell", "stoutnaturalarmor", "serenity"]
    }
  },
  seaelf: {
    title: "Sea Elf",
    properties: {
      abilityscores: "21",
      abilities: ["DEX", "CON"],
      language1: "common",
      language2: "",
      languages: ["elvish"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "none",
      speedswimming: "15 ft.",
      vision: "Darkvision (60ft.)",
      spellcasting: "none",
      selectedTraits: ["darkvision","trance", "charmresistance", "emissaryofthesea", "amphibious", "swimspeed", "martialtraining"],
      traitSettings: {
        martialtraining: ["trident", "net"]
      }
    }
  },
  aarakocra: {
    title: "Aarakocra",
    properties: {
      abilityscores: "21",
      abilities: ["DEX", "WIS"],
      language1: "common",
      language2: "",
      languages: ["primordial"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "30 ft.",
      speedswimming: "15 ft.",
      vision: "normal",
      spellcasting: "wisdom",
      selectedTraits: ["flyingnaturalweapons", "flyingcantrip", "wings", "naturalmagic"],
      traitSettings: {
      }
    }
  },
  aasimar: {
    title: "Aasimar",
    properties: {
      abilityscores: "21",
      abilities: ["WIS", "CHA"],
      language1: "common",
      language2: "",
      languages: ["celestial"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "none",
      speedswimming: "15 ft.",
      vision: "Darkvision (60ft.)",
      spellcasting: "charisma",
      selectedTraits: ["darkvision", "healinghands", "celestialresistance", "necroticresistance", "celestialrevelation", "celestialcantrip"],
      traitSettings: {
        celestialcantrip: ["light"],
        celestialrevelation: ["radiantsoul"]
      }
    }
  },
  bugbear: {
    title: "Bugbear",
    properties: {
      abilityscores: "21",
      abilities: ["STR", "DEX"],
      language1: "common",
      language2: "",
      languages: ["orcish"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "none",
      speedswimming: "15 ft.",
      vision: "Darkvision (60ft.)",
      spellcasting: "charisma",
      selectedTraits: ["darkvision", "charmresistance", "reach", "powerful", "surpriseattack", "sneaky"],
      traitSettings: {
      }
    }
  },
  changeling: {
    title: "Changeling",
    properties: {
      abilityscores: "21",
      abilities: ["STR", "DEX"],
      language1: "common",
      language2: "",
      languages: ["sylvan"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "none",
      speedswimming: "15 ft.",
      vision: "normal",
      spellcasting: "charisma",
      selectedTraits: ["fey", "shapechanger", "survivalistskillproficiency", "artisanskillproficiency"],
      traitSettings: {
      }
    }
  },
  deepgnome: {
    title: "Deep Gnome",
    properties: {
      abilityscores: "21",
      abilities: ["STR", "DEX"],
      language1: "common",
      language2: "",
      languages: ["sylvan"],
      size: "medium",
      speed: "30 ft.",
      speedclimbing: "15 ft.",
      speedflying: "none",
      speedswimming: "15 ft.",
      vision: "Darkvision (120ft.)",
      spellcasting: "charisma",
      selectedTraits: ["darkvision2", "deepmagic", "feycunning", "criminalcamoflage"],
      traitSettings: {
      }
    }
  },

}