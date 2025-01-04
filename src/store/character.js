import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('character', {
  state: () => ({
    stats: {
      strength: 0,
      intelligence: 0,
      charisma: 0,
      dexterity: 0,
      wisdom: 0,
      constitution: 0
    },
    classType: ''
  }),
  actions: {
    setStats(zodiacSign, chineseZodiac) {
      // Generate stats based on zodiac signs
      const stats = generateStatsFromZodiac(zodiacSign, chineseZodiac);
      this.stats = stats;
      this.classType = determineClassType(stats);
    }
  }
});

function generateStatsFromZodiac(zodiacSign, chineseZodiac) {
  const baseStats = {
    Aries: { strength: 80, charisma: 60 },
    Taurus: { constitution: 80, strength: 60 },
    Gemini: { intelligence: 70, dexterity: 70 },
    Cancer: { wisdom: 80, constitution: 60 },
    Leo: { charisma: 80, strength: 60 },
    Virgo: { intelligence: 80, wisdom: 60 },
    Libra: { charisma: 70, wisdom: 70 },
    Scorpio: { strength: 70, intelligence: 70 },
    Sagittarius: { dexterity: 80, charisma: 60 },
    Capricorn: { constitution: 70, wisdom: 70 },
    Aquarius: { intelligence: 80, dexterity: 60 },
    Pisces: { wisdom: 80, charisma: 60 }
  };

  const chineseModifiers = {
    Dragon: { strength: 10, charisma: 5 },
    Tiger: { dexterity: 10, strength: 5 },
    Rat: { intelligence: 10, dexterity: 5 },
    Ox: { constitution: 10, strength: 5 },
    Rabbit: { dexterity: 10, charisma: 5 },
    Snake: { wisdom: 10, intelligence: 5 },
    Horse: { dexterity: 10, strength: 5 },
    Goat: { wisdom: 10, charisma: 5 },
    Monkey: { intelligence: 10, dexterity: 5 },
    Rooster: { dexterity: 10, intelligence: 5 },
    Dog: { constitution: 10, wisdom: 5 },
    Pig: { constitution: 10, charisma: 5 }
  };

  // Initialize all stats with base values
  const stats = {
    strength: 40,
    intelligence: 40,
    charisma: 40,
    dexterity: 40,
    wisdom: 40,
    constitution: 40
  };

  // Apply zodiac modifiers
  const zodiacModifiers = baseStats[zodiacSign];
  for (const [stat, value] of Object.entries(zodiacModifiers)) {
    stats[stat] = value;
  }

  // Apply Chinese zodiac modifiers
  const modifier = chineseModifiers[chineseZodiac];
  for (const [stat, value] of Object.entries(modifier)) {
    stats[stat] = Math.min(100, stats[stat] + value);
  }

  return stats;
}

function determineClassType(stats) {
  const classThresholds = {
    Warrior: { strength: 70, constitution: 60 },
    Mage: { intelligence: 70, wisdom: 60 },
    Rogue: { dexterity: 70, charisma: 60 },
    Paladin: { strength: 60, charisma: 70 },
    Druid: { wisdom: 70, constitution: 60 },
    Bard: { charisma: 70, dexterity: 60 }
  };

  for (const [className, requirements] of Object.entries(classThresholds)) {
    let meetsRequirements = true;
    for (const [stat, threshold] of Object.entries(requirements)) {
      if (stats[stat] < threshold) {
        meetsRequirements = false;
        break;
      }
    }
    if (meetsRequirements) return className;
  }

  return 'Adventurer'; // Default class if no specific requirements are met
}