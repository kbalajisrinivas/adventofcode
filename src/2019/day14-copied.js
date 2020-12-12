const quantityKey = Symbol();
let input = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
81 HVMC, 68 CXFTF => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`

const reactions = input.trim().split('\n').reduce((map, line) => {
  const [ ingredientList, result ] = line.split(' => ');
  const [ quantity, chemical ] = result.split(' ');
  map[chemical] = ingredientList.split(', ').reduce((ingredientMap, combo) => {
    const [ qty, chem ] = combo.split(' ');
    ingredientMap[chem] = +qty;
    return ingredientMap;
  }, { [quantityKey]: +quantity });
  return map;
}, {});

function getNeededOre(fuel) {
  let neededChemicals = { FUEL: fuel };
  const reserves = {};
  while (Object.keys(neededChemicals).length !== 1 || !('ORE' in neededChemicals)) {
    const newNeededList = {};
    for (const [ chemical, quantity ] of Object.entries(neededChemicals)) {
      if (chemical === 'ORE') {
        newNeededList.ORE = (newNeededList.ORE || 0) + quantity;
        continue;
      }
      const reaction = reactions[chemical];
      const reactionQuantity = reaction[quantityKey];
      const reactionCount = Math.ceil((quantity - (reserves[chemical] || 0)) / reactionQuantity);
      for (const [ ingredient, amount ] of Object.entries(reaction)) {
        console.log(`ingredient: ${ingredient}, reactionCount: ${reactionCount}, amount: ${amount}`);
        newNeededList[ingredient] = (newNeededList[ingredient] || 0) + reactionCount * amount;
      }
      reserves[chemical] = (reserves[chemical] || 0) + reactionCount * reactionQuantity - quantity;
    }
    neededChemicals = newNeededList;
  }
  return neededChemicals.ORE;
}

const orePer1Fuel = getNeededOre(1);

console.log('Part 1:', orePer1Fuel);
