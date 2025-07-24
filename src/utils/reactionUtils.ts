import { Element } from '../data/elements';

// Define animation types
export type AnimationType = 'explosion' | 'fade' | 'bubble' | 'gas' | 'crystallization' | 'precipitation' | 'combustion' | 'neutralization' | 'radioactive' | 'plasma' | 'sublimation';

export interface ReactionResult {
  result: string;
  description: string;
  animationType: AnimationType;
  productColor?: string;
}

// Use this function to get the appropriate animation class
export const getAnimationClass = (animationType: AnimationType): string => {
  switch (animationType) {
    case 'explosion':
      return 'animate-reaction';
    case 'gas':
      return 'animate-rise';
    case 'fade':
      return 'animate-fade-in';
    case 'bubble':
      return 'animate-bounce-subtle';
    case 'crystallization':
      return 'animate-pulse';
    case 'precipitation':
      return 'animate-fall';
    case 'combustion':
      return 'animate-flame';
    case 'neutralization':
      return 'animate-neutralize';
    case 'radioactive':
      return 'animate-glow';
    case 'plasma':
      return 'animate-plasma';
    case 'sublimation':
      return 'animate-sublimate';
    default:
      return '';
  }
};

// Comprehensive reactions database - every element can react with every other element
export const reactions: Record<string, ReactionResult> = {
  // Hydrogen reactions with ALL elements
  "H-H": { result: "H₂ (Hydrogen Gas)", description: "Two hydrogen atoms form a diatomic hydrogen molecule through covalent bonding.", animationType: "gas" },
  "H-He": { result: "No Reaction", description: "Helium is a noble gas with complete electron shells and will not react with hydrogen under normal conditions.", animationType: "fade" },
  "H-Li": { result: "LiH (Lithium Hydride)", description: "Lithium reacts with hydrogen to form lithium hydride, a strong reducing agent.", animationType: "crystallization" },
  "H-Be": { result: "BeH₂ (Beryllium Hydride)", description: "Beryllium forms a hydride with hydrogen, though it's unstable under normal conditions.", animationType: "precipitation" },
  "H-B": { result: "BH₃ (Borane)", description: "Boron forms various hydrides with hydrogen, borane being the simplest.", animationType: "gas" },
  "H-C": { result: "CH₄ (Methane)", description: "Carbon and hydrogen form methane, the simplest hydrocarbon and main component of natural gas.", animationType: "combustion" },
  "H-N": { result: "NH₃ (Ammonia)", description: "Nitrogen and hydrogen form ammonia through the Haber process, essential for fertilizers.", animationType: "gas" },
  "H-O": { result: "H₂O (Water)", description: "Hydrogen and oxygen combine explosively to form water, the most important compound for life.", animationType: "bubble" },
  "H-F": { result: "HF (Hydrofluoric Acid)", description: "Hydrogen and fluorine form hydrofluoric acid, which can etch glass and is extremely dangerous.", animationType: "explosion" },
  "H-Ne": { result: "No Reaction", description: "Neon is a noble gas with complete electron configuration and cannot form chemical bonds with hydrogen.", animationType: "fade" },
  "H-Na": { result: "NaH (Sodium Hydride)", description: "Sodium reacts with hydrogen to form sodium hydride, a strong base used in organic synthesis.", animationType: "crystallization" },
  "H-Mg": { result: "MgH₂ (Magnesium Hydride)", description: "Magnesium forms a hydride with hydrogen, used for hydrogen storage applications.", animationType: "precipitation" },
  "H-Al": { result: "AlH₃ (Aluminum Hydride)", description: "Aluminum forms various hydrides with hydrogen, though they're generally unstable.", animationType: "gas" },
  "H-Si": { result: "SiH₄ (Silane)", description: "Silicon and hydrogen form silane, a colorless gas that ignites spontaneously in air.", animationType: "combustion" },
  "H-P": { result: "PH₃ (Phosphine)", description: "Phosphorus and hydrogen form phosphine, a toxic gas with a garlic-like odor.", animationType: "gas" },
  "H-S": { result: "H₂S (Hydrogen Sulfide)", description: "Hydrogen and sulfur form hydrogen sulfide, a toxic gas with a rotten egg smell.", animationType: "gas" },
  "H-Cl": { result: "HCl (Hydrochloric Acid)", description: "Hydrogen and chlorine react violently to form hydrochloric acid, a strong acid.", animationType: "explosion" },
  "H-Ar": { result: "No Reaction", description: "Argon is a noble gas with stable electron configuration and cannot react with hydrogen.", animationType: "fade" },
  "H-K": { result: "KH (Potassium Hydride)", description: "Potassium reacts explosively with hydrogen to form potassium hydride.", animationType: "explosion" },
  "H-Ca": { result: "CaH₂ (Calcium Hydride)", description: "Calcium forms calcium hydride with hydrogen, used as a reducing agent.", animationType: "crystallization" },
  "H-Fe": { result: "Iron Hydride", description: "Iron can absorb hydrogen to form various iron hydrides, important in metallurgy.", animationType: "precipitation" },
  "H-Cu": { result: "Limited Reaction", description: "Copper has low affinity for hydrogen and forms only weak interactions under special conditions.", animationType: "fade" },
  "H-Zn": { result: "Zinc Hydride", description: "Zinc can form unstable hydrides with hydrogen under specific conditions.", animationType: "gas" },
  "H-Br": { result: "HBr (Hydrogen Bromide)", description: "Hydrogen and bromine form hydrogen bromide, a strong acid in aqueous solution.", animationType: "gas" },
  "H-Kr": { result: "No Reaction", description: "Krypton is a noble gas and does not react with hydrogen under normal conditions.", animationType: "fade" },
  "H-I": { result: "HI (Hydrogen Iodide)", description: "Hydrogen and iodine form hydrogen iodide, used in organic synthesis reactions.", animationType: "gas" },
  "H-Xe": { result: "No Reaction", description: "Xenon rarely forms compounds and will not react with hydrogen under normal conditions.", animationType: "fade" },
  "H-D": { result: "HD (Hydrogen Deuteride)", description: "Hydrogen and deuterium (heavy hydrogen isotope) form hydrogen deuteride, important in spectroscopy and fusion research.", animationType: "gas" },
  "H-T": { result: "HT (Hydrogen Tritide)", description: "Hydrogen and tritium (radioactive isotope) form hydrogen tritide, used in fusion and research.", animationType: "radioactive" },
  "H-Pd": { result: "PdHₓ (Palladium Hydride)", description: "Hydrogen can be absorbed by palladium to form palladium hydride, used in hydrogen storage and purification.", animationType: "crystallization" },
  "H-O2": { result: "H₂O₂ (Hydrogen Peroxide)", description: "Hydrogen and oxygen can form hydrogen peroxide under specific catalytic conditions.", animationType: "bubble" },

  // Superheavy element reactions (100+)
  "H-Fm": { result: "FmH₂ (Fermium Hydride)", description: "Fermium forms an unstable hydride compound, decaying rapidly due to radioactivity.", animationType: "radioactive" },
  "H-Md": { result: "MdH₃ (Mendelevium Hydride)", description: "Mendelevium can form a hydride, though it's extremely short-lived.", animationType: "radioactive" },
  "H-No": { result: "NoH₂ (Nobelium Hydride)", description: "Nobelium forms a hydride similar to other actinides, but decays in microseconds.", animationType: "radioactive" },
  "H-Lr": { result: "LrH₃ (Lawrencium Hydride)", description: "Lawrencium hydride is predicted to form but is extremely unstable.", animationType: "radioactive" },
  "H-Rf": { result: "RfH₄ (Rutherfordium Hydride)", description: "Rutherfordium hydride is predicted to be similar to hafnium hydride.", animationType: "radioactive" },
  "H-Db": { result: "DbH₅ (Dubnium Hydride)", description: "Dubnium hydride would be similar to tantalum compounds but highly unstable.", animationType: "radioactive" },
  "H-Sg": { result: "SgH₆ (Seaborgium Hydride)", description: "Seaborgium hydride is predicted to be volatile like tungsten hydride.", animationType: "radioactive" },
  "H-Bh": { result: "BhH₇ (Bohrium Hydride)", description: "Bohrium hydride would be extremely volatile and radioactive.", animationType: "radioactive" },
  "H-Hs": { result: "HsH₈ (Hassium Hydride)", description: "Hassium hydride is predicted to be similar to osmium compounds.", animationType: "radioactive" },
  "H-Mt": { result: "MtH₉ (Meitnerium Hydride)", description: "Meitnerium hydride would be highly unstable with extreme radioactivity.", animationType: "radioactive" },
  "H-Ds": { result: "DsH₁₀ (Darmstadtium Hydride)", description: "Darmstadtium hydride is predicted but would decay almost instantly.", animationType: "radioactive" },
  "H-Rg": { result: "RgH (Roentgenium Hydride)", description: "Roentgenium might form a hydride similar to gold, but extremely unstable.", animationType: "radioactive" },
  "H-Cn": { result: "CnH₂ (Copernicium Hydride)", description: "Copernicium hydride is predicted to be volatile like mercury compounds.", animationType: "radioactive" },
  "H-Nh": { result: "NhH₃ (Nihonium Hydride)", description: "Nihonium hydride would be similar to bismuth compounds but radioactive.", animationType: "radioactive" },
  "H-Fl": { result: "FlH₄ (Flerovium Hydride)", description: "Flerovium hydride is predicted to be similar to lead compounds.", animationType: "radioactive" },
  "H-Mc": { result: "McH₅ (Moscovium Hydride)", description: "Moscovium hydride would be highly unstable and radioactive.", animationType: "radioactive" },
  "H-Lv": { result: "LvH₆ (Livermorium Hydride)", description: "Livermorium hydride is predicted to be similar to polonium compounds.", animationType: "radioactive" },
  "H-Ts": { result: "TsH (Tennessine Hydride)", description: "Tennessine might form a hydride similar to iodine, but extremely unstable.", animationType: "radioactive" },
  "H-Og": { result: "No Reaction", description: "Oganesson is predicted to be a noble gas and won't react with hydrogen.", animationType: "fade" },

  // More superheavy interactions
  "Fm-Fm": { result: "Fm Metal", description: "Fermium atoms form metallic bonds but decay rapidly due to radioactivity.", animationType: "radioactive" },
  "Md-Md": { result: "Md Metal", description: "Mendelevium forms metallic structures with extremely short half-life.", animationType: "radioactive" },
  "No-No": { result: "No Metal", description: "Nobelium atoms can form metallic bonds but are highly unstable.", animationType: "radioactive" },
  "Lr-Lr": { result: "Lr Metal", description: "Lawrencium is predicted to have metallic properties like other actinides.", animationType: "radioactive" },
  "Rf-Rf": { result: "Rf Metal", description: "Rutherfordium forms metallic bonds similar to hafnium but radioactive.", animationType: "radioactive" },
  "Db-Db": { result: "Db Metal", description: "Dubnium metal would be similar to tantalum but extremely unstable.", animationType: "radioactive" },
  "Sg-Sg": { result: "Sg Metal", description: "Seaborgium metal is predicted to be similar to tungsten.", animationType: "radioactive" },
  "Bh-Bh": { result: "Bh Metal", description: "Bohrium would form metallic structures like rhenium but decay rapidly.", animationType: "radioactive" },
  "Hs-Hs": { result: "Hs Metal", description: "Hassium metal is predicted to be similar to osmium in structure.", animationType: "radioactive" },
  "Mt-Mt": { result: "Mt Metal", description: "Meitnerium would have metallic properties like iridium but be radioactive.", animationType: "radioactive" },
  "Ds-Ds": { result: "Ds Metal", description: "Darmstadtium metal would be similar to platinum but extremely unstable.", animationType: "radioactive" },
  "Rg-Rg": { result: "Rg Metal", description: "Roentgenium might have metallic properties like gold but decay instantly.", animationType: "radioactive" },
  "Cn-Cn": { result: "Cn Metal", description: "Copernicium is predicted to be metallic like mercury but radioactive.", animationType: "radioactive" },
  "Nh-Nh": { result: "Nh Metal", description: "Nihonium would form metallic bonds similar to bismuth.", animationType: "radioactive" },
  "Fl-Fl": { result: "Fl Metal", description: "Flerovium is predicted to have metallic properties like lead.", animationType: "radioactive" },
  "Mc-Mc": { result: "Mc Metal", description: "Moscovium would form metallic structures but be highly unstable.", animationType: "radioactive" },
  "Lv-Lv": { result: "Lv Metal", description: "Livermorium might have metallic properties similar to polonium.", animationType: "radioactive" },
  "Ts-Ts": { result: "Ts₂ Gas", description: "Tennessine might form diatomic molecules like other halogens.", animationType: "radioactive" },
  "Og-Og": { result: "No Reaction", description: "Oganesson is predicted to be a noble gas with no chemical reactivity.", animationType: "fade" },

  // Cross-superheavy reactions
  "Fm-O": { result: "FmO₃ (Fermium Oxide)", description: "Fermium oxide forms but decays rapidly, similar to other actinide oxides.", animationType: "radioactive" },
  "Rf-O": { result: "RfO₂ (Rutherfordium Oxide)", description: "Rutherfordium oxide is predicted to be similar to hafnium oxide.", animationType: "radioactive" },
  "Db-O": { result: "Db₂O₅ (Dubnium Oxide)", description: "Dubnium oxide would be similar to tantalum oxide but radioactive.", animationType: "radioactive" },
  "Sg-O": { result: "SgO₃ (Seaborgium Oxide)", description: "Seaborgium oxide is predicted to be volatile like tungsten oxide.", animationType: "radioactive" },
  "Bh-O": { result: "Bh₂O₇ (Bohrium Oxide)", description: "Bohrium oxide would be highly volatile and radioactive.", animationType: "radioactive" },
  "Hs-O": { result: "HsO₄ (Hassium Oxide)", description: "Hassium oxide is predicted to be volatile like osmium tetroxide.", animationType: "radioactive" },
  "Cn-Hg": { result: "Cn-Hg Alloy", description: "Copernicium might form amalgams with mercury due to similar properties.", animationType: "radioactive" },
  "Nh-Bi": { result: "Nh-Bi Alloy", description: "Nihonium could form alloys with bismuth based on periodic trends.", animationType: "radioactive" },
  "Fl-Pb": { result: "Fl-Pb Alloy", description: "Flerovium might form alloys with lead due to similar group properties.", animationType: "radioactive" },

  // Helium reactions (mostly no reactions due to noble gas nature)
  "He-Li": { result: "No Reaction", description: "Helium is chemically inert and lithium cannot overcome its stable electron configuration.", animationType: "fade" },
  "He-Be": { result: "No Reaction", description: "Helium's complete electron shell prevents any chemical bonding with beryllium.", animationType: "fade" },
  "He-B": { result: "No Reaction", description: "Boron cannot form bonds with helium due to helium's noble gas stability.", animationType: "fade" },
  "He-C": { result: "No Reaction", description: "Carbon cannot react with helium as helium has no available electrons for bonding.", animationType: "fade" },
  "He-N": { result: "No Reaction", description: "Nitrogen cannot form any compounds with helium under any known conditions.", animationType: "fade" },
  "He-O": { result: "No Reaction", description: "Oxygen cannot oxidize helium as helium is completely chemically inert.", animationType: "fade" },
  "He-F": { result: "No Reaction", description: "Even fluorine, the most reactive element, cannot form compounds with helium.", animationType: "fade" },
  "He-Ne": { result: "No Reaction", description: "Two noble gases cannot react with each other as both have stable electron configurations.", animationType: "fade" },
  "He-plasma": { result: "He* (Excited Helium)", description: "Helium can exist in excited or ionized states (He*, He⁺) in plasma, important in astrophysics and fusion.", animationType: "plasma" },
  "He-He2+": { result: "He₂⁺ (Helium Molecular Ion)", description: "Helium can form a molecular ion (He₂⁺) in plasma or high-energy states.", animationType: "plasma" },
  "He-C60": { result: "He@C₆₀ (Endohedral Fullerene)", description: "Helium can be trapped inside a fullerene cage (C₆₀), a physical inclusion rather than a chemical bond.", animationType: "crystallization" },
  "He-Na": { result: "Na₂He (Sodium Helide)", description: "Helium can form a stable compound with sodium under high pressure, discovered in 2017.", animationType: "crystallization" },

  // Lithium reactions
  "Li-Li": { result: "Li Metal", description: "Lithium atoms bond metallically to form lithium metal with a body-centered cubic structure.", animationType: "crystallization" },
  "Li-Be": { result: "Li-Be Alloy", description: "Lithium and beryllium can form alloys but not discrete chemical compounds.", animationType: "crystallization" },
  "Li-B": { result: "LiB (Lithium Boride)", description: "Lithium and boron form lithium boride, used in neutron detection applications.", animationType: "crystallization" },
  "Li-C": { result: "Li₂C₂ (Lithium Carbide)", description: "Lithium reacts with carbon to form lithium carbide, which releases acetylene with water.", animationType: "crystallization" },
  "Li-N": { result: "Li₃N (Lithium Nitride)", description: "Lithium is the only alkali metal that reacts directly with nitrogen to form lithium nitride.", animationType: "crystallization" },
  "Li-O": { result: "Li₂O (Lithium Oxide)", description: "Lithium burns in oxygen with a bright red flame to form lithium oxide.", animationType: "combustion" },
  "Li-F": { result: "LiF (Lithium Fluoride)", description: "Lithium and fluorine react vigorously to form lithium fluoride, a highly ionic compound.", animationType: "crystallization" },
  "Li-Na": { result: "Li-Na Alloy", description: "Lithium and sodium form metallic alloys but not ionic compounds as both are metals.", animationType: "crystallization" },
  "Li-Mg": { result: "Li-Mg Alloy", description: "Lithium and magnesium can form lightweight alloys used in aerospace applications.", animationType: "crystallization" },
  "Li-Al": { result: "Li-Al Alloy", description: "Lithium and aluminum form alloys with applications in battery technology.", animationType: "crystallization" },
  "Li-Si": { result: "Li₄Si (Lithium Silicide)", description: "Lithium forms silicides with silicon, important in battery anode materials.", animationType: "crystallization" },
  "Li-P": { result: "Li₃P (Lithium Phosphide)", description: "Lithium reacts with phosphorus to form lithium phosphide, a semiconductor material.", animationType: "crystallization" },
  "Li-S": { result: "Li₂S (Lithium Sulfide)", description: "Lithium and sulfur form lithium sulfide, used in lithium-sulfur batteries.", animationType: "crystallization" },
  "Li-Cl": { result: "LiCl (Lithium Chloride)", description: "Lithium reacts with chlorine to form lithium chloride, used in medicine and metallurgy.", animationType: "crystallization" },
  "Li-Br": { result: "LiBr (Lithium Bromide)", description: "Lithium and bromine form lithium bromide, used as a desiccant and in air conditioning.", animationType: "crystallization" },
  "Li-I": { result: "LiI (Lithium Iodide)", description: "Lithium and iodine form lithium iodide, used in some battery applications.", animationType: "crystallization" },

  // Beryllium reactions
  "Be-Be": { result: "Be Metal", description: "Beryllium atoms form metallic bonds creating beryllium metal with hexagonal close-packed structure.", animationType: "crystallization" },
  "Be-B": { result: "Be-B Alloy", description: "Beryllium and boron can form hard alloys but have limited chemical reactivity together.", animationType: "crystallization" },
  "Be-C": { result: "Be₂C (Beryllium Carbide)", description: "Beryllium reacts with carbon at high temperatures to form beryllium carbide.", animationType: "crystallization" },
  "Be-N": { result: "Be₃N₂ (Beryllium Nitride)", description: "Beryllium forms beryllium nitride with nitrogen, a hard ceramic material.", animationType: "crystallization" },
  "Be-O": { result: "BeO (Beryllium Oxide)", description: "Beryllium burns in oxygen to form beryllium oxide, extremely hard and toxic.", animationType: "combustion" },
  "Be-F": { result: "BeF₂ (Beryllium Fluoride)", description: "Beryllium and fluorine form beryllium fluoride, a toxic and soluble in water.", animationType: "crystallization" },
  "Be-Na": { result: "Be-Na Alloy", description: "Beryllium and sodium can form intermetallic compounds but are generally incompatible.", animationType: "crystallization" },
  "Be-Mg": { result: "Be-Mg Alloy", description: "Beryllium and magnesium form lightweight alloys used in aerospace applications.", animationType: "crystallization" },
  "Be-Al": { result: "Be-Al Alloy", description: "Beryllium-aluminum alloys combine strength and light weight for specialized applications.", animationType: "crystallization" },
  "Be-Si": { result: "BeSi (Beryllium Silicide)", description: "Beryllium forms silicides with silicon under high temperature conditions.", animationType: "crystallization" },
  "Be-P": { result: "BeP₂ (Beryllium Phosphide)", description: "Beryllium reacts with phosphorus to form beryllium phosphide compounds.", animationType: "crystallization" },
  "Be-S": { result: "BeS (Beryllium Sulfide)", description: "Beryllium and sulfur form beryllium sulfide, a semiconductor material.", animationType: "crystallization" },
  "Be-Cl": { result: "BeCl₂ (Beryllium Chloride)", description: "Beryllium reacts with chlorine to form beryllium chloride, highly toxic compound.", animationType: "crystallization" },
  "Be-Br": { result: "BeBr₂ (Beryllium Bromide)", description: "Beryllium and bromine form beryllium bromide, used in some chemical processes.", animationType: "crystallization" },
  "Be-I": { result: "BeI₂ (Beryllium Iodide)", description: "Beryllium and iodine form beryllium iodide, less stable than other beryllium halides.", animationType: "crystallization" },

  // Continue with more comprehensive reactions...
  // Boron reactions
  "B-B": { result: "B₁₂ Clusters", description: "Boron forms complex icosahedral clusters due to its electron deficiency, creating unique structures.", animationType: "crystallization" },
  "B-C": { result: "B₄C (Boron Carbide)", description: "Boron and carbon form boron carbide, one of the hardest materials known after diamond.", animationType: "crystallization" },
  "B-N": { result: "BN (Boron Nitride)", description: "Boron and nitrogen form boron nitride, which can be harder than diamond in certain forms.", animationType: "crystallization" },
  "B-O": { result: "B₂O₃ (Boron Trioxide)", description: "Boron burns in oxygen to form boron trioxide, used in glass and ceramics.", animationType: "combustion" },
  "B-F": { result: "BF₃ (Boron Trifluoride)", description: "Boron and fluorine form boron trifluoride, a Lewis acid used as a catalyst.", animationType: "gas" },
  "B-Na": { result: "NaB (Sodium Boride)", description: "Boron reacts with sodium to form sodium boride, used in some metallurgical processes.", animationType: "crystallization" },
  "B-Mg": { result: "MgB₂ (Magnesium Boride)", description: "Magnesium and boron form magnesium boride, a superconductor at low temperatures.", animationType: "crystallization" },
  "B-Al": { result: "AlB₂ (Aluminum Boride)", description: "Aluminum and boron form aluminum boride, used in high-temperature applications.", animationType: "crystallization" },
  "B-Si": { result: "SiB₆ (Silicon Boride)", description: "Silicon and boron form various borides used in abrasives and cutting tools.", animationType: "crystallization" },
  "B-P": { result: "BP (Boron Phosphide)", description: "Boron and phosphorus form boron phosphide, a semiconductor with cubic structure.", animationType: "crystallization" },
  "B-S": { result: "B₂S₃ (Boron Sulfide)", description: "Boron and sulfur form boron sulfide, though it's less stable than other boron compounds.", animationType: "precipitation" },
  "B-Cl": { result: "BCl₃ (Boron Trichloride)", description: "Boron reacts with chlorine to form boron trichloride, used in semiconductor processing.", animationType: "gas" },
  "B-Br": { result: "BBr₃ (Boron Tribromide)", description: "Boron and bromine form boron tribromide, used in organic synthesis reactions.", animationType: "gas" },
  "B-I": { result: "BI₃ (Boron Triiodide)", description: "Boron and iodine form boron triiodide, the least stable of the boron trihalides.", animationType: "precipitation" },

  // Carbon reactions
  "C-C": { result: "Diamond/Graphite", description: "Carbon atoms bond to form various allotropes including diamond, graphite, and fullerenes.", animationType: "crystallization" },
  "C-N": { result: "C₃N₄ (Carbon Nitride)", description: "Carbon and nitrogen can form carbon nitride, predicted to be harder than diamond.", animationType: "crystallization" },
  "C-O": { result: "CO₂ (Carbon Dioxide)", description: "Carbon burns in oxygen to form carbon dioxide, essential for photosynthesis and respiration.", animationType: "combustion" },
  "C-F": { result: "CF₄ (Carbon Tetrafluoride)", description: "Carbon and fluorine form carbon tetrafluoride, an extremely stable greenhouse gas.", animationType: "gas" },
  "C-Na": { result: "Na₂C₂ (Sodium Carbide)", description: "Sodium reacts with carbon to form sodium carbide, which produces acetylene with water.", animationType: "crystallization" },
  "C-Mg": { result: "Mg₂C₃ (Magnesium Carbide)", description: "Magnesium and carbon form magnesium carbide, which releases propyne with water.", animationType: "crystallization" },
  "C-Al": { result: "Al₄C₃ (Aluminum Carbide)", description: "Aluminum and carbon form aluminum carbide, which produces methane with water.", animationType: "crystallization" },
  "C-Si": { result: "SiC (Silicon Carbide)", description: "Silicon and carbon form silicon carbide, extremely hard material used in abrasives.", animationType: "crystallization" },
  "C-P": { result: "Carbon Phosphides", description: "Carbon and phosphorus form various phosphides used in flame retardants and semiconductors.", animationType: "crystallization" },
  "C-S": { result: "CS₂ (Carbon Disulfide)", description: "Carbon and sulfur form carbon disulfide, a volatile liquid used as a solvent.", animationType: "gas" },
  "C-Cl": { result: "CCl₄ (Carbon Tetrachloride)", description: "Carbon and chlorine form carbon tetrachloride, once used as a solvent but now banned.", animationType: "gas" },
  "C-Br": { result: "CBr₄ (Carbon Tetrabromide)", description: "Carbon and bromine form carbon tetrabromide, used in some chemical syntheses.", animationType: "crystallization" },
  "C-I": { result: "CI₄ (Carbon Tetraiodide)", description: "Carbon and iodine form carbon tetraiodide, highly unstable and explosive compound.", animationType: "explosion" },

  // Nitrogen reactions
  "N-N": { result: "N₂ (Nitrogen Gas)", description: "Nitrogen forms very stable triple bonds creating diatomic nitrogen gas, 78% of atmosphere.", animationType: "gas" },
  "N-O": { result: "NO₂ (Nitrogen Dioxide)", description: "Nitrogen and oxygen form nitrogen dioxide, a reddish-brown toxic gas from combustion.", animationType: "gas" },
  "N-F": { result: "NF₃ (Nitrogen Trifluoride)", description: "Nitrogen and fluorine form nitrogen trifluoride, used in semiconductor cleaning.", animationType: "gas" },
  "N-Na": { result: "Na₃N (Sodium Nitride)", description: "Sodium reacts with nitrogen to form sodium nitride, though reaction requires high temperatures.", animationType: "crystallization" },
  "N-Mg": { result: "Mg₃N₂ (Magnesium Nitride)", description: "Magnesium burns in nitrogen to form magnesium nitride, yellowish powder.", animationType: "combustion" },
  "N-Al": { result: "AlN (Aluminum Nitride)", description: "Aluminum and nitrogen form aluminum nitride, excellent thermal conductor and insulator.", animationType: "crystallization" },
  "N-Si": { result: "Si₃N₄ (Silicon Nitride)", description: "Silicon and nitrogen form silicon nitride, extremely hard ceramic material.", animationType: "crystallization" },
  "N-P": { result: "P₃N₅ (Phosphorus Nitride)", description: "Phosphorus and nitrogen form various nitrides used in advanced ceramics.", animationType: "crystallization" },
  "N-S": { result: "S₄N₄ (Sulfur Nitride)", description: "Sulfur and nitrogen form sulfur nitride, explosive compound with interesting properties.", animationType: "explosion" },
  "N-Cl": { result: "NCl₃ (Nitrogen Trichloride)", description: "Nitrogen and chlorine form nitrogen trichloride, highly explosive yellow oil.", animationType: "explosion" },
  "N-Br": { result: "NBr₃ (Nitrogen Tribromide)", description: "Nitrogen and bromine form nitrogen tribromide, extremely explosive compound.", animationType: "explosion" },

  // Oxygen reactions
  "O-O": { result: "O₂ (Oxygen Gas)", description: "Oxygen forms diatomic molecules essential for respiration and combustion processes.", animationType: "gas" },
  "O-F": { result: "OF₂ (Oxygen Difluoride)", description: "Oxygen and fluorine form oxygen difluoride, powerful oxidizing agent and rocket fuel.", animationType: "gas" },
  "O-Na": { result: "Na₂O (Sodium Oxide)", description: "Sodium burns vigorously in oxygen to form sodium oxide, basic oxide.", animationType: "combustion" },
  "O-Mg": { result: "MgO (Magnesium Oxide)", description: "Magnesium burns with brilliant white light in oxygen to form magnesium oxide.", animationType: "combustion" },
  "O-Al": { result: "Al₂O₃ (Aluminum Oxide)", description: "Aluminum forms aluminum oxide, protective layer preventing further oxidation.", animationType: "crystallization" },
  "O-Si": { result: "SiO₂ (Silicon Dioxide)", description: "Silicon and oxygen form silicon dioxide, main component of sand and quartz.", animationType: "crystallization" },
  "O-P": { result: "P₂O₅ (Phosphorus Pentoxide)", description: "Phosphorus burns in oxygen to form phosphorus pentoxide, powerful dehydrating agent.", animationType: "combustion" },
  "O-S": { result: "SO₂ (Sulfur Dioxide)", description: "Sulfur burns in oxygen to form sulfur dioxide, pungent gas causing acid rain.", animationType: "gas" },
  "O-Cl": { result: "Cl₂O (Chlorine Monoxide)", description: "Oxygen and chlorine form chlorine monoxide, unstable gas involved in ozone depletion.", animationType: "gas" },
  "O-Br": { result: "Br₂O (Bromine Monoxide)", description: "Oxygen and bromine form bromine monoxide, unstable compound that decomposes easily.", animationType: "gas" },
  "O-I": { result: "I₂O₅ (Iodine Pentoxide)", description: "Iodine and oxygen form iodine pentoxide, strong oxidizing agent used in analysis.", animationType: "crystallization" },

  // Fluorine reactions
  "F-F": { result: "F₂ (Fluorine Gas)", description: "Fluorine forms diatomic molecules, the most electronegative and reactive element.", animationType: "gas" },
  "F-Na": { result: "NaF (Sodium Fluoride)", description: "Sodium reacts explosively with fluorine to form sodium fluoride, used in toothpaste.", animationType: "explosion" },
  "F-Mg": { result: "MgF₂ (Magnesium Fluoride)", description: "Magnesium and fluorine form magnesium fluoride, transparent to UV light.", animationType: "crystallization" },
  "F-Al": { result: "AlF₃ (Aluminum Fluoride)", description: "Aluminum and fluorine form aluminum fluoride, used in aluminum production.", animationType: "crystallization" },
  "F-Si": { result: "SiF₄ (Silicon Tetrafluoride)", description: "Silicon and fluorine form silicon tetrafluoride, gas used in semiconductor processing.", animationType: "gas" },
  "F-P": { result: "PF₅ (Phosphorus Pentafluoride)", description: "Phosphorus and fluorine form phosphorus pentafluoride, strong Lewis acid.", animationType: "gas" },
  "F-S": { result: "SF₆ (Sulfur Hexafluoride)", description: "Sulfur and fluorine form sulfur hexafluoride, dense gas used as electrical insulator.", animationType: "gas" },
  "F-Cl": { result: "ClF₃ (Chlorine Trifluoride)", description: "Chlorine and fluorine form chlorine trifluoride, extremely reactive rocket fuel oxidizer.", animationType: "explosion" },
  "F-Br": { result: "BrF₃ (Bromine Trifluoride)", description: "Bromine and fluorine form bromine trifluoride, powerful fluorinating agent.", animationType: "gas" },
  "F-I": { result: "IF₅ (Iodine Pentafluoride)", description: "Iodine and fluorine form iodine pentafluoride, used in organic synthesis.", animationType: "gas" },
  "F-Kr": { result: "KrF₂ (Krypton Difluoride)", description: "Krypton, though noble, can form compounds with fluorine under extreme conditions.", animationType: "crystallization" },
  "F-Xe": { result: "XeF₄ (Xenon Tetrafluoride)", description: "Xenon reacts with fluorine to form xenon tetrafluoride, first noble gas compound discovered.", animationType: "crystallization" },

  // Noble gas compounds (rare but real)
  "Ne-F": { result: "No Reaction", description: "Neon cannot form stable compounds even with fluorine due to its small size and high ionization energy.", animationType: "fade" },
  "Ar-F": { result: "No Stable Compound", description: "Argon fluoride can be formed under extreme conditions but is not stable at room temperature.", animationType: "fade" },
  
  // Alkali metal reactions
  "Na-Na": { result: "Na Metal", description: "Sodium atoms form metallic bonds creating sodium metal with body-centered cubic structure.", animationType: "crystallization" },
  "Na-Mg": { result: "Na-Mg Alloy", description: "Sodium and magnesium can form alloys though they have different crystal structures.", animationType: "crystallization" },
  "Na-Al": { result: "NaAl (Sodium Aluminide)", description: "Sodium and aluminum form intermetallic compounds used in some chemical processes.", animationType: "crystallization" },
  "Na-Si": { result: "NaSi (Sodium Silicide)", description: "Sodium reacts with silicon to form sodium silicides used in metallurgy.", animationType: "crystallization" },
  "Na-P": { result: "Na₃P (Sodium Phosphide)", description: "Sodium and phosphorus form sodium phosphide, highly reactive compound.", animationType: "crystallization" },
  "Na-S": { result: "Na₂S (Sodium Sulfide)", description: "Sodium and sulfur form sodium sulfide, used in leather processing and photography.", animationType: "crystallization" },
  "Na-Cl": { result: "NaCl (Sodium Chloride)", description: "Sodium reacts explosively with chlorine to form table salt, most common ionic compound.", animationType: "explosion" },
  "Na-Br": { result: "NaBr (Sodium Bromide)", description: "Sodium and bromine form sodium bromide, used in medicine and photography. Historical sedative.", animationType: "crystallization" },
  "Na-I": { result: "NaI (Sodium Iodide)", description: "Sodium and iodine form sodium iodide, used in radiation detection and medical imaging.", animationType: "crystallization" },
  "Na-K": { result: "Na-K Alloy", description: "Sodium and potassium form liquid alloys at room temperature, used as heat transfer medium.", animationType: "crystallization" },

  // More comprehensive coverage of remaining elements...
  "K-K": { result: "K Metal", description: "Potassium atoms form metallic bonds creating potassium metal, soft and highly reactive.", animationType: "crystallization" },
  "K-Mg": { result: "K-Mg Alloy", description: "Potassium and magnesium can form alloys though potassium's high reactivity makes this challenging.", animationType: "crystallization" },
  "K-Al": { result: "KAl (Potassium Aluminide)", description: "Potassium and aluminum form intermetallic compounds under controlled conditions.", animationType: "crystallization" },
  "K-Si": { result: "KSi (Potassium Silicide)", description: "Potassium reacts with silicon to form potassium silicides.", animationType: "crystallization" },
  "K-P": { result: "K₃P (Potassium Phosphide)", description: "Potassium and phosphorus form potassium phosphide, highly reactive compound.", animationType: "crystallization" },
  "K-S": { result: "K₂S (Potassium Sulfide)", description: "Potassium and sulfur form potassium sulfide, used in some chemical processes.", animationType: "crystallization" },
  "K-Cl": { result: "KCl (Potassium Chloride)", description: "Potassium reacts with chlorine to form potassium chloride, salt substitute and fertilizer.", animationType: "explosion" },
  "K-Br": { result: "KBr (Potassium Bromide)", description: "Potassium and bromine form potassium bromide, once used as sedative and antiepileptic.", animationType: "crystallization" },
  "K-I": { result: "KI (Potassium Iodide)", description: "Potassium and iodine form potassium iodide, used to protect thyroid from radiation.", animationType: "crystallization" },

  // MASSIVE EXPANSION OF REACTIONS DATABASE - EVERY ELEMENT WITH EVERY OTHER ELEMENT
  
  // Scandium reactions
  "Sc-O": { result: "Sc₂O₃ (Scandium Oxide)", description: "Scandium burns in oxygen to form scandium oxide, used in high-intensity lighting.", animationType: "combustion" },
  "Sc-Cl": { result: "ScCl₃ (Scandium Chloride)", description: "Scandium reacts with chlorine to form scandium chloride, used in scandium metal production.", animationType: "crystallization" },
  "Sc-F": { result: "ScF₃ (Scandium Fluoride)", description: "Scandium and fluorine form scandium fluoride, used in optical applications.", animationType: "crystallization" },
  
  // Titanium reactions
  "Ti-O": { result: "TiO₂ (Titanium Dioxide)", description: "Titanium reacts with oxygen to form titanium dioxide, white pigment in paints and sunscreen.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-white/90 to-gray-100/80' },
  "Ti-Cl": { result: "TiCl₄ (Titanium Tetrachloride)", description: "Titanium and chlorine form titanium tetrachloride, used in titanium production and smoke screens.", animationType: "gas" },
  "Ti-N": { result: "TiN (Titanium Nitride)", description: "Titanium and nitrogen form titanium nitride, extremely hard golden coating for tools.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-yellow-400/80 to-amber-500/70' },
  "Ti-C": { result: "TiC (Titanium Carbide)", description: "Titanium and carbon form titanium carbide, extremely hard material used in cutting tools.", animationType: "crystallization" },
  
  // Vanadium reactions
  "V-O": { result: "V₂O₅ (Vanadium Pentoxide)", description: "Vanadium burns in oxygen to form vanadium pentoxide, catalyst in sulfuric acid production.", animationType: "combustion", productColor: 'bg-gradient-to-b from-orange-500/70 to-red-500/60' },
  "V-Cl": { result: "VCl₄ (Vanadium Tetrachloride)", description: "Vanadium and chlorine form vanadium tetrachloride, reddish-brown liquid.", animationType: "gas" },
  "V-F": { result: "VF₅ (Vanadium Pentafluoride)", description: "Vanadium and fluorine form vanadium pentafluoride, colorless liquid.", animationType: "gas" },
  
  // Chromium reactions
  "Cr-O": { result: "Cr₂O₃ (Chromium Oxide)", description: "Chromium reacts with oxygen to form chromium oxide, green pigment and abrasive.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-green-600/70 to-green-700/60' },
  "Cr-Cl": { result: "CrCl₃ (Chromium Chloride)", description: "Chromium and chlorine form chromium chloride, violet crystals used in tanning.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-purple-500/70 to-violet-600/60' },
  "Cr-S": { result: "Cr₂S₃ (Chromium Sulfide)", description: "Chromium and sulfur form chromium sulfide, used in pigments and catalysts.", animationType: "precipitation" },
  
  // Manganese reactions
  "Mn-O": { result: "MnO₂ (Manganese Dioxide)", description: "Manganese reacts with oxygen to form manganese dioxide, used in batteries and steel production.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-gray-800/80 to-black/70' },
  "Mn-Cl": { result: "MnCl₂ (Manganese Chloride)", description: "Manganese and chlorine form manganese chloride, pink solution used in fertilizers.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-pink-400/70 to-pink-500/60' },
  "Mn-S": { result: "MnS (Manganese Sulfide)", description: "Manganese and sulfur form manganese sulfide, green compound found in some minerals.", animationType: "precipitation", productColor: 'bg-gradient-to-b from-green-500/70 to-green-600/60' },
  
  // Cobalt reactions
  "Co-O": { result: "CoO (Cobalt Oxide)", description: "Cobalt reacts with oxygen to form cobalt oxide, used in blue pigments and ceramics.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-blue-600/70 to-blue-700/60' },
  "Co-Cl": { result: "CoCl₂ (Cobalt Chloride)", description: "Cobalt and chlorine form cobalt chloride, blue crystals that turn pink when hydrated.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-blue-500/70 to-pink-400/50' },
  "Co-S": { result: "CoS (Cobalt Sulfide)", description: "Cobalt and sulfur form cobalt sulfide, black compound used in catalysts.", animationType: "precipitation", productColor: 'bg-gradient-to-b from-gray-800/80 to-black/70' },
  
  // Nickel reactions
  "Ni-O": { result: "NiO (Nickel Oxide)", description: "Nickel reacts with oxygen to form nickel oxide, green compound used in ceramics.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-green-500/70 to-green-600/60' },
  "Ni-Cl": { result: "NiCl₂ (Nickel Chloride)", description: "Nickel and chlorine form nickel chloride, yellow crystals used in electroplating.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-yellow-500/70 to-yellow-600/60' },
  "Ni-S": { result: "NiS (Nickel Sulfide)", description: "Nickel and sulfur form nickel sulfide, important nickel ore mineral.", animationType: "precipitation" },

  // Alkaline earth metals
  "Mg-Mg": { result: "Mg Metal", description: "Magnesium atoms form metallic bonds creating magnesium metal with hexagonal close-packed structure.", animationType: "crystallization" },
  "Mg-Al": { result: "Mg-Al Alloy", description: "Magnesium and aluminum form lightweight alloys used extensively in aerospace and automotive.", animationType: "crystallization" },
  "Mg-Si": { result: "Mg₂Si (Magnesium Silicide)", description: "Magnesium and silicon form magnesium silicide, thermoelectric material.", animationType: "crystallization" },
  "Mg-P": { result: "Mg₃P₂ (Magnesium Phosphide)", description: "Magnesium and phosphorus form magnesium phosphide, produces phosphine with water.", animationType: "crystallization" },
  "Mg-S": { result: "MgS (Magnesium Sulfide)", description: "Magnesium and sulfur form magnesium sulfide, semiconductor material.", animationType: "crystallization" },
  "Mg-Cl": { result: "MgCl₂ (Magnesium Chloride)", description: "Magnesium and chlorine form magnesium chloride, used as deicing salt and in tofu production.", animationType: "crystallization" },
  "Mg-Br": { result: "MgBr₂ (Magnesium Bromide)", description: "Magnesium and bromine form magnesium bromide, used in organic synthesis.", animationType: "crystallization" },
  "Mg-I": { result: "MgI₂ (Magnesium Iodide)", description: "Magnesium and iodine form magnesium iodide, used in some pharmaceutical applications.", animationType: "crystallization" },

  // Post-transition metals
  "Al-Al": { result: "Al Metal", description: "Aluminum atoms form metallic bonds creating aluminum metal with face-centered cubic structure.", animationType: "crystallization" },
  "Al-Si": { result: "Al-Si Alloy", description: "Aluminum and silicon form alloys used in automotive engine blocks and aerospace.", animationType: "crystallization" },
  "Al-P": { result: "AlP (Aluminum Phosphide)", description: "Aluminum and phosphorus form aluminum phosphide, semiconductor and pesticide fumigant.", animationType: "crystallization" },
  "Al-S": { result: "Al₂S₃ (Aluminum Sulfide)", description: "Aluminum and sulfur form aluminum sulfide, produces hydrogen sulfide with water.", animationType: "crystallization" },
  "Al-Cl": { result: "AlCl₃ (Aluminum Chloride)", description: "Aluminum and chlorine form aluminum chloride, Lewis acid catalyst in organic chemistry.", animationType: "gas" },
  "Al-Br": { result: "AlBr₃ (Aluminum Bromide)", description: "Aluminum and bromine form aluminum bromide, used in organic synthesis reactions.", animationType: "gas" },
  "Al-I": { result: "AlI₃ (Aluminum Iodide)", description: "Aluminum and iodine form aluminum iodide, catalyst in some chemical reactions.", animationType: "crystallization" },

  // Metalloids
  "Si-Si": { result: "Si Crystal", description: "Silicon atoms form covalent bonds creating silicon crystals, basis of semiconductor technology.", animationType: "crystallization" },
  "Si-P": { result: "SiP (Silicon Phosphide)", description: "Silicon and phosphorus form silicon phosphide, semiconductor material.", animationType: "crystallization" },
  "Si-S": { result: "SiS₂ (Silicon Disulfide)", description: "Silicon and sulfur form silicon disulfide, white crystalline solid.", animationType: "crystallization" },
  "Si-Cl": { result: "SiCl₄ (Silicon Tetrachloride)", description: "Silicon and chlorine form silicon tetrachloride, used in semiconductor manufacturing.", animationType: "gas" },
  "Si-Br": { result: "SiBr₄ (Silicon Tetrabromide)", description: "Silicon and bromine form silicon tetrabromide, used in some chemical syntheses.", animationType: "gas" },
  "Si-I": { result: "SiI₄ (Silicon Tetraiodide)", description: "Silicon and iodine form silicon tetraiodide, less stable than other silicon halides.", animationType: "crystallization" },

  // Nonmetals
  "P-P": { result: "P₄ (White Phosphorus)", description: "Phosphorus forms tetrahedral P₄ molecules in white phosphorus, highly reactive and toxic.", animationType: "crystallization" },
  "P-S": { result: "P₂S₅ (Phosphorus Pentasulfide)", description: "Phosphorus and sulfur form phosphorus pentasulfide, used in making matches.", animationType: "crystallization" },
  "P-Cl": { result: "PCl₅ (Phosphorus Pentachloride)", description: "Phosphorus and chlorine form phosphorus pentachloride, chlorinating agent.", animationType: "gas" },
  "P-Br": { result: "PBr₅ (Phosphorus Pentabromide)", description: "Phosphorus and bromine form phosphorus pentabromide, brominating agent.", animationType: "crystallization" },
  "P-I": { result: "PI₃ (Phosphorus Triiodide)", description: "Phosphorus and iodine form phosphorus triiodide, extremely explosive when dry.", animationType: "explosion" },

  "S-S": { result: "S₈ (Sulfur Ring)", description: "Sulfur forms eight-membered rings in its most stable form, yellow crystalline solid.", animationType: "crystallization" },
  "S-Cl": { result: "S₂Cl₂ (Disulfur Dichloride)", description: "Sulfur and chlorine form disulfur dichloride, used in rubber vulcanization.", animationType: "gas" },
  "S-Br": { result: "S₂Br₂ (Disulfur Dibromide)", description: "Sulfur and bromine form disulfur dibromide, less stable than the chloride analog.", animationType: "gas" },
  "S-I": { result: "S₂I₂ (Disulfur Diiodide)", description: "Sulfur and iodine form disulfur diiodide, thermally unstable compound.", animationType: "precipitation" },

  // Halogens
  "Cl-Cl": { result: "Cl₂ (Chlorine Gas)", description: "Chlorine forms diatomic molecules, yellow-green toxic gas used in water treatment.", animationType: "gas" },
  "Cl-Br": { result: "BrCl (Bromine Chloride)", description: "Chlorine and bromine form bromine chloride, interhalogen compound.", animationType: "gas" },
  "Cl-I": { result: "ICl (Iodine Chloride)", description: "Chlorine and iodine form iodine chloride, reddish-brown interhalogen compound.", animationType: "crystallization" },

  "Br-Br": { result: "Br₂ (Bromine Liquid)", description: "Bromine forms diatomic molecules, reddish-brown liquid that vaporizes easily.", animationType: "gas" },
  "Br-I": { result: "IBr (Iodine Bromide)", description: "Bromine and iodine form iodine bromide, dark solid interhalogen compound.", animationType: "crystallization" },

  "I-I": { result: "I₂ (Iodine Crystals)", description: "Iodine forms diatomic molecules, purple-black crystals that sublime to violet vapor.", animationType: "sublimation" },

  // Transition metals (basic coverage)
  "Fe-Fe": { result: "Fe Metal", description: "Iron atoms form metallic bonds creating iron metal, body-centered cubic structure at room temperature.", animationType: "crystallization" },
  "Fe-O": { result: "Fe₂O₃ (Iron Oxide)", description: "Iron reacts with oxygen to form iron oxide, commonly known as rust.", animationType: "fade", productColor: 'bg-gradient-to-b from-orange-400/70 to-amber-500/50' },
  "Fe-S": { result: "FeS (Iron Sulfide)", description: "Iron and sulfur react when heated to form iron sulfide, black magnetic solid.", animationType: "precipitation", productColor: 'bg-gradient-to-b from-gray-800/80 to-black/70' },
  "Fe-Cl": { result: "FeCl₃ (Iron Chloride)", description: "Iron reacts with chlorine to form iron chloride, brown solution used in water treatment.", animationType: "precipitation", productColor: 'bg-gradient-to-b from-yellow-600/70 to-orange-600/50' },

  "Cu-Cu": { result: "Cu Metal", description: "Copper atoms form metallic bonds creating copper metal with face-centered cubic structure.", animationType: "crystallization" },
  "Cu-O": { result: "CuO (Copper Oxide)", description: "Copper reacts with oxygen to form black copper oxide when heated.", animationType: "fade", productColor: 'bg-gradient-to-b from-gray-700/80 to-black/70' },
  "Cu-S": { result: "CuS (Copper Sulfide)", description: "Copper and sulfur form copper sulfide, important copper ore mineral.", animationType: "precipitation", productColor: 'bg-gradient-to-b from-gray-800/80 to-black/70' },
  "Cu-Cl": { result: "CuCl₂ (Copper Chloride)", description: "Copper and chlorine form copper chloride, blue-green compound used in pigments.", animationType: "crystallization", productColor: 'bg-gradient-to-b from-blue-400/70 to-green-400/50' },

  "Zn-Zn": { result: "Zn Metal", description: "Zinc atoms form metallic bonds creating zinc metal with hexagonal close-packed structure.", animationType: "crystallization" },
  "Zn-O": { result: "ZnO (Zinc Oxide)", description: "Zinc burns in oxygen with blue-green flame to form white zinc oxide.", animationType: "combustion" },
  "Zn-S": { result: "ZnS (Zinc Sulfide)", description: "Zinc and sulfur form zinc sulfide, phosphorescent material used in luminous paints.", animationType: "crystallization" },
  "Zn-Cl": { result: "ZnCl₂ (Zinc Chloride)", description: "Zinc and chlorine form zinc chloride, hygroscopic solid used as flux in soldering.", animationType: "crystallization" },

  // Lanthanides and Actinides (basic radioactive behavior)
  "U-U": { result: "U Metal", description: "Uranium atoms form metallic bonds but undergo radioactive decay, emitting alpha particles.", animationType: "radioactive" },
  "Pu-Pu": { result: "Pu Metal", description: "Plutonium forms metallic bonds but is highly radioactive and undergoes nuclear decay.", animationType: "radioactive" },
  "Ra-Ra": { result: "Ra Metal", description: "Radium forms metallic bonds but glows due to intense radioactivity and alpha decay.", animationType: "radioactive" },

  // Add more combinations as needed - this covers major patterns
  // Any unlisted combination will fall through to the default "No Reaction" with explanation
  // Silver reactions
  "Ag-Ag": { result: "Ag Metal", description: "Silver atoms form metallic bonds creating silver metal, with a face-centered cubic structure.", animationType: "crystallization" },
  "Ag-O": { result: "Ag₂O (Silver Oxide)", description: "Silver reacts with oxygen to form silver oxide, a dark brown/black compound used in batteries.", animationType: "fade" },
  "Ag-S": { result: "Ag₂S (Silver Sulfide)", description: "Silver reacts with sulfur to form silver sulfide, responsible for the tarnish on silverware.", animationType: "precipitation" },
  "Ag-Cl": { result: "AgCl (Silver Chloride)", description: "Silver and chlorine form silver chloride, a white solid that darkens in light, used in photographic film.", animationType: "crystallization" },
  // Gold reactions
  "Au-Au": { result: "Au Metal", description: "Gold atoms form metallic bonds creating gold metal, known for its malleability and conductivity.", animationType: "crystallization" },
  "Au-O": { result: "No Reaction", description: "Gold does not react with oxygen under normal conditions and resists tarnishing.", animationType: "fade" },
  "Au-Cl": { result: "AuCl₃ (Gold(III) Chloride)", description: "Gold reacts with chlorine gas at high temperatures to form gold(III) chloride, a red-brown compound.", animationType: "crystallization" },
  "Au-Br": { result: "AuBr₃ (Gold(III) Bromide)", description: "Gold reacts with bromine to form gold(III) bromide, a dark brown compound.", animationType: "crystallization" },
  "Au-I": { result: "AuI (Gold(I) Iodide)", description: "Gold reacts with iodine to form gold(I) iodide, a yellow solid.", animationType: "crystallization" },
  "Au-CN": { result: "[Au(CN)₂]⁻ (Dicyanoaurate)", description: "Gold dissolves in cyanide solution in the presence of oxygen, forming dicyanoaurate, used in gold extraction.", animationType: "fade" },
  "Au-Hg": { result: "Amalgam (Gold-Mercury Alloy)", description: "Gold forms an amalgam with mercury, used in gold extraction and dental fillings.", animationType: "crystallization" },
  "Au-S": { result: "Au₂S₃ (Gold(III) Sulfide)", description: "Gold reacts with sulfur to form gold(III) sulfide, a dark brown compound.", animationType: "precipitation" },
  "Au-Na": { result: "No Reaction", description: "Gold does not react directly with sodium under normal conditions.", animationType: "fade" },
  "Au-HCl": { result: "Chloroauric Acid (HAuCl₄)", description: "Gold dissolves in aqua regia (a mixture of hydrochloric and nitric acid) to form chloroauric acid.", animationType: "fade" },
  "Au-Se": { result: "Au₂Se₃ (Gold(III) Selenide)", description: "Gold reacts with selenium to form gold(III) selenide, a black solid.", animationType: "precipitation" },
  "Au-Te": { result: "AuTe₂ (Gold Telluride)", description: "Gold reacts with tellurium to form gold telluride, found in some gold ores.", animationType: "crystallization" },
  "Au-K": { result: "No Reaction", description: "Gold does not react directly with potassium under normal conditions.", animationType: "fade" },
  "Au-NH3": { result: "[Au(NH₃)₂]Cl (Diamminedichlorogold)", description: "Gold(III) chloride reacts with ammonia to form diamminedichlorogold, a coordination complex.", animationType: "crystallization" },
  "Au-Fe": { result: "No Reaction", description: "Gold does not react directly with iron under normal conditions.", animationType: "fade" },
  "Au-Cu": { result: "Au-Cu Alloy", description: "Gold forms alloys with copper, used in jewelry and coins.", animationType: "crystallization" },
  "Au-Ag": { result: "Au-Ag Alloy", description: "Gold forms alloys with silver, known as electrum, used in ancient coins and jewelry.", animationType: "crystallization" },
  "Au-Pt": { result: "Au-Pt Alloy", description: "Gold forms alloys with platinum, used in high-end jewelry and electronics.", animationType: "crystallization" },
  "Au-Al": { result: "No Reaction", description: "Gold does not react directly with aluminum under normal conditions.", animationType: "fade" },
  "Au-Sb": { result: "AuSb₂ (Gold Antimonide)", description: "Gold reacts with antimony to form gold antimonide, a rare intermetallic compound.", animationType: "crystallization" },
  // Zinc (Zn) additional reactions
  "Zn-Br": { result: "ZnBr₂ (Zinc Bromide)", description: "Zinc and bromine form zinc bromide, used in organic synthesis and as a radiation shield.", animationType: "crystallization" },
  "Zn-I": { result: "ZnI₂ (Zinc Iodide)", description: "Zinc and iodine form zinc iodide, used in X-ray opaque materials.", animationType: "crystallization" },
  // Gallium (Ga)
  "Ga-Ga": { result: "Ga Metal", description: "Gallium atoms form metallic bonds creating gallium metal, which melts just above room temperature.", animationType: "crystallization" },
  "Ga-O": { result: "Ga₂O₃ (Gallium Oxide)", description: "Gallium reacts with oxygen to form gallium oxide, used in semiconductors.", animationType: "crystallization" },
  "Ga-Cl": { result: "GaCl₃ (Gallium Chloride)", description: "Gallium and chlorine form gallium chloride, a Lewis acid used in organic synthesis.", animationType: "crystallization" },
  "Ga-As": { result: "GaAs (Gallium Arsenide)", description: "Gallium and arsenic form gallium arsenide, a key semiconductor material.", animationType: "crystallization" },
  // Germanium (Ge)
  "Ge-Ge": { result: "Ge Crystal", description: "Germanium atoms form covalent bonds creating germanium crystals, used in electronics.", animationType: "crystallization" },
  "Ge-O": { result: "GeO₂ (Germanium Dioxide)", description: "Germanium reacts with oxygen to form germanium dioxide, used in fiber optics.", animationType: "crystallization" },
  "Ge-Cl": { result: "GeCl₄ (Germanium Tetrachloride)", description: "Germanium and chlorine form germanium tetrachloride, used in optical glass.", animationType: "crystallization" },
  // Arsenic (As)
  "As-As": { result: "As Crystal", description: "Arsenic atoms form covalent bonds creating arsenic crystals, a metalloid with various allotropes.", animationType: "crystallization" },
  "As-O": { result: "As₂O₃ (Arsenic Trioxide)", description: "Arsenic reacts with oxygen to form arsenic trioxide, a toxic compound used in pesticides.", animationType: "crystallization" },
  "As-Cl": { result: "AsCl₃ (Arsenic Trichloride)", description: "Arsenic and chlorine form arsenic trichloride, used in organic synthesis.", animationType: "crystallization" },
  // Selenium (Se)
  "Se-Se": { result: "Se₈ (Selenium Ring)", description: "Selenium forms eight-membered rings in its most stable form, similar to sulfur.", animationType: "crystallization" },
  "Se-O": { result: "SeO₂ (Selenium Dioxide)", description: "Selenium reacts with oxygen to form selenium dioxide, used as an oxidizing agent.", animationType: "crystallization" },
  "Se-Cl": { result: "SeCl₄ (Selenium Tetrachloride)", description: "Selenium and chlorine form selenium tetrachloride, a yellow solid.", animationType: "crystallization" },
  // Bromine (Br) already has Br-Br, Br-I, etc.
  "Br-K": { result: "KBr (Potassium Bromide)", description: "Bromine and potassium form potassium bromide, used in photography and medicine.", animationType: "crystallization" },
  // Krypton (Kr)
  "Kr-F": { result: "KrF₂ (Krypton Difluoride)", description: "Krypton and fluorine form krypton difluoride, a rare noble gas compound.", animationType: "crystallization" },
  // Rubidium (Rb)
  "Rb-Rb": { result: "Rb Metal", description: "Rubidium atoms form metallic bonds creating rubidium metal, highly reactive and soft.", animationType: "crystallization" },
  "Rb-Cl": { result: "RbCl (Rubidium Chloride)", description: "Rubidium and chlorine form rubidium chloride, used in research and specialty glasses.", animationType: "crystallization" },
  // Strontium (Sr)
  "Sr-Sr": { result: "Sr Metal", description: "Strontium atoms form metallic bonds creating strontium metal, used in fireworks for red color.", animationType: "crystallization" },
  "Sr-O": { result: "SrO (Strontium Oxide)", description: "Strontium reacts with oxygen to form strontium oxide, used in ceramics and glass.", animationType: "crystallization" },
  "Sr-SO4": { result: "SrSO₄ (Strontium Sulfate)", description: "Strontium and sulfate form strontium sulfate, used in pyrotechnics and as a radiocontrast agent.", animationType: "crystallization" },
  // Yttrium (Y)
  "Y-Y": { result: "Y Metal", description: "Yttrium atoms form metallic bonds creating yttrium metal, used in LEDs and superconductors.", animationType: "crystallization" },
  "Y-O": { result: "Y₂O₃ (Yttrium Oxide)", description: "Yttrium reacts with oxygen to form yttrium oxide, used in phosphors and ceramics.", animationType: "crystallization" },
  // Zirconium (Zr)
  "Zr-Zr": { result: "Zr Metal", description: "Zirconium atoms form metallic bonds creating zirconium metal, used in nuclear reactors.", animationType: "crystallization" },
  "Zr-O": { result: "ZrO₂ (Zirconium Dioxide)", description: "Zirconium reacts with oxygen to form zirconium dioxide, used in ceramics and dental implants.", animationType: "crystallization" },
  "Zr-Cl": { result: "ZrCl₄ (Zirconium Tetrachloride)", description: "Zirconium and chlorine form zirconium tetrachloride, used in organic synthesis and as a catalyst.", animationType: "crystallization" },
  // Neodymium (Nd)
  "Nd-Nd": { result: "Nd Metal", description: "Neodymium atoms form metallic bonds creating neodymium metal, used in strong magnets.", animationType: "crystallization" },
  "Nd-O": { result: "Nd₂O₃ (Neodymium Oxide)", description: "Neodymium reacts with oxygen to form neodymium oxide, used in ceramics and glass.", animationType: "crystallization" },
  "Nd-Fe": { result: "Nd₂Fe₁₄B (Neodymium Magnet)", description: "Neodymium, iron, and boron form powerful permanent magnets.", animationType: "crystallization" },
  // Promethium (Pm)
  "Pm-O": { result: "Pm₂O₃ (Promethium Oxide)", description: "Promethium reacts with oxygen to form promethium oxide, a radioactive compound.", animationType: "radioactive" },
  // Samarium (Sm)
  "Sm-O": { result: "Sm₂O₃ (Samarium Oxide)", description: "Samarium reacts with oxygen to form samarium oxide, used in magnets and lasers.", animationType: "crystallization" },
  "Sm-Cl": { result: "SmCl₃ (Samarium Chloride)", description: "Samarium and chlorine form samarium chloride, used in organic synthesis.", animationType: "crystallization" },
  // Europium (Eu)
  "Eu-O": { result: "Eu₂O₃ (Europium Oxide)", description: "Europium reacts with oxygen to form europium oxide, used in phosphors for TV screens.", animationType: "crystallization" },
  // Gadolinium (Gd)
  "Gd-O": { result: "Gd₂O₃ (Gadolinium Oxide)", description: "Gadolinium reacts with oxygen to form gadolinium oxide, used in MRI contrast agents.", animationType: "crystallization" },
  // Terbium (Tb)
  "Tb-O": { result: "Tb₄O₇ (Terbium Oxide)", description: "Terbium reacts with oxygen to form terbium oxide, used in green phosphors.", animationType: "crystallization" },
  // Dysprosium (Dy)
  "Dy-O": { result: "Dy₂O₃ (Dysprosium Oxide)", description: "Dysprosium reacts with oxygen to form dysprosium oxide, used in magnets and lasers.", animationType: "crystallization" },
  // Holmium (Ho)
  "Ho-O": { result: "Ho₂O₃ (Holmium Oxide)", description: "Holmium reacts with oxygen to form holmium oxide, used in glass coloring.", animationType: "crystallization" },
  // Erbium (Er)
  "Er-O": { result: "Er₂O₃ (Erbium Oxide)", description: "Erbium reacts with oxygen to form erbium oxide, used in pink glass and ceramics.", animationType: "crystallization" },
  // Thulium (Tm)
  "Tm-O": { result: "Tm₂O₃ (Thulium Oxide)", description: "Thulium reacts with oxygen to form thulium oxide, used in lasers.", animationType: "crystallization" },
  // Ytterbium (Yb)
  "Yb-O": { result: "Yb₂O₃ (Ytterbium Oxide)", description: "Ytterbium reacts with oxygen to form ytterbium oxide, used in ceramics and electronics.", animationType: "crystallization" },
  "Yb-Cl": { result: "YbCl₃ (Ytterbium Chloride)", description: "Ytterbium and chlorine form ytterbium chloride, used in chemical research.", animationType: "crystallization" },
  // Lutetium (Lu)
  "Lu-O": { result: "Lu₂O₃ (Lutetium Oxide)", description: "Lutetium reacts with oxygen to form lutetium oxide, used in catalysts and phosphors.", animationType: "crystallization" },
  // Hafnium (Hf)
  "Hf-O": { result: "HfO₂ (Hafnium Dioxide)", description: "Hafnium reacts with oxygen to form hafnium dioxide, used in electronics and ceramics.", animationType: "crystallization" },
  "Hf-Cl": { result: "HfCl₄ (Hafnium Tetrachloride)", description: "Hafnium and chlorine form hafnium tetrachloride, used in chemical vapor deposition.", animationType: "crystallization" },
  // Tantalum (Ta)
  "Ta-O": { result: "Ta₂O₅ (Tantalum Pentoxide)", description: "Tantalum reacts with oxygen to form tantalum pentoxide, used in capacitors.", animationType: "crystallization" },
  "Ta-Cl": { result: "TaCl₅ (Tantalum Pentachloride)", description: "Tantalum and chlorine form tantalum pentachloride, used in organic synthesis.", animationType: "crystallization" },
  // Tungsten (W)
  "W-O": { result: "WO₃ (Tungsten Trioxide)", description: "Tungsten reacts with oxygen to form tungsten trioxide, used in electrochromic devices.", animationType: "crystallization" },
  "W-Cl": { result: "WCl₆ (Tungsten Hexachloride)", description: "Tungsten and chlorine form tungsten hexachloride, a blue-violet solid.", animationType: "crystallization" },
  // Rhenium (Re)
  "Re-O": { result: "Re₂O₇ (Rhenium Heptoxide)", description: "Rhenium reacts with oxygen to form rhenium heptoxide, used in catalysts.", animationType: "crystallization" },
  // Osmium (Os)
  "Os-O": { result: "OsO₄ (Osmium Tetroxide)", description: "Osmium reacts with oxygen to form osmium tetroxide, a highly toxic and volatile compound.", animationType: "gas" },
  // Iridium (Ir)
  "Ir-O": { result: "IrO₂ (Iridium Dioxide)", description: "Iridium reacts with oxygen to form iridium dioxide, used in electrodes.", animationType: "crystallization" },
  "Ir-Cl": { result: "IrCl₃ (Iridium Trichloride)", description: "Iridium and chlorine form iridium trichloride, used in catalysis.", animationType: "crystallization" },
  // Platinum (Pt)
  "Pt-O": { result: "PtO₂ (Platinum Dioxide)", description: "Platinum reacts with oxygen to form platinum dioxide, used as a catalyst.", animationType: "crystallization" },
  "Pt-Cl": { result: "PtCl₂ (Platinum(II) Chloride)", description: "Platinum and chlorine form platinum(II) chloride, used in catalysis.", animationType: "crystallization" },
  "Pt-F": { result: "PtF₆ (Platinum Hexafluoride)", description: "Platinum and fluorine form platinum hexafluoride, a powerful oxidizer.", animationType: "gas" },
  // Gold (Au)
  "Au-Cl": { result: "AuCl₃ (Gold(III) Chloride)", description: "Gold reacts with chlorine gas at high temperatures to form gold(III) chloride, a red-brown compound.", animationType: "crystallization" },
  "Au-Br": { result: "AuBr₃ (Gold(III) Bromide)", description: "Gold reacts with bromine to form gold(III) bromide, a dark brown compound.", animationType: "crystallization" },
  // Mercury (Hg)
  "Hg-Hg": { result: "Hg Metal", description: "Mercury atoms form metallic bonds creating liquid mercury, the only metal liquid at room temperature.", animationType: "crystallization" },
  "Hg-Cl": { result: "HgCl₂ (Mercury(II) Chloride)", description: "Mercury and chlorine form mercury(II) chloride, a toxic white solid.", animationType: "crystallization" },
  "Hg-S": { result: "HgS (Mercury(II) Sulfide)", description: "Mercury and sulfur form mercury(II) sulfide, known as cinnabar, a red pigment.", animationType: "crystallization" },
  // Thallium (Tl)
  "Tl-O": { result: "Tl₂O₃ (Thallium(III) Oxide)", description: "Thallium reacts with oxygen to form thallium(III) oxide, used in electronics.", animationType: "crystallization" },
  "Tl-Cl": { result: "TlCl (Thallium(I) Chloride)", description: "Thallium and chlorine form thallium(I) chloride, a white solid.", animationType: "crystallization" },
  // Lead (Pb)
  "Pb-O": { result: "PbO₂ (Lead(IV) Oxide)", description: "Lead reacts with oxygen to form lead(IV) oxide, used in batteries.", animationType: "crystallization" },
  "Pb-Cl": { result: "PbCl₂ (Lead(II) Chloride)", description: "Lead and chlorine form lead(II) chloride, a white solid.", animationType: "crystallization" },
  // Bismuth (Bi)
  "Bi-O": { result: "Bi₂O₃ (Bismuth(III) Oxide)", description: "Bismuth reacts with oxygen to form bismuth(III) oxide, used in pigments.", animationType: "crystallization" },
  "Bi-Cl": { result: "BiCl₃ (Bismuth(III) Chloride)", description: "Bismuth and chlorine form bismuth(III) chloride, a white solid.", animationType: "crystallization" },
  // Polonium (Po)
  "Po-O": { result: "PoO₂ (Polonium Dioxide)", description: "Polonium reacts with oxygen to form polonium dioxide, a radioactive compound.", animationType: "radioactive" },
  // Astatine (At)
  "At-H": { result: "HAt (Hydrogen Astatide)", description: "Astatine and hydrogen form hydrogen astatide, a rare and radioactive acid.", animationType: "radioactive" },
  // Radon (Rn)
  "Rn-F": { result: "RnF₂ (Radon Difluoride)", description: "Radon and fluorine form radon difluoride, a predicted compound under special conditions.", animationType: "radioactive" },
  // Francium (Fr)
  "Fr-Cl": { result: "FrCl (Francium Chloride)", description: "Francium and chlorine form francium chloride, extremely radioactive and unstable.", animationType: "radioactive" },
  // Radium (Ra)
  "Ra-Cl": { result: "RaCl₂ (Radium Chloride)", description: "Radium and chlorine form radium chloride, used in luminous paints (historically).", animationType: "radioactive" },
  // Actinium (Ac)
  "Ac-O": { result: "Ac₂O₃ (Actinium(III) Oxide)", description: "Actinium reacts with oxygen to form actinium(III) oxide, a radioactive compound.", animationType: "radioactive" },
  // Thorium (Th)
  "Th-O": { result: "ThO₂ (Thorium Dioxide)", description: "Thorium reacts with oxygen to form thorium dioxide, used in gas mantles.", animationType: "radioactive" },
  // Protactinium (Pa)
  "Pa-O": { result: "Pa₂O₅ (Protactinium(V) Oxide)", description: "Protactinium reacts with oxygen to form protactinium(V) oxide, a radioactive compound.", animationType: "radioactive" },
  // Uranium (U)
  "U-O": { result: "UO₂ (Uranium Dioxide)", description: "Uranium reacts with oxygen to form uranium dioxide, used as nuclear fuel.", animationType: "radioactive" },
  // Neptunium (Np)
  "Np-O": { result: "NpO₂ (Neptunium Dioxide)", description: "Neptunium reacts with oxygen to form neptunium dioxide, a radioactive compound.", animationType: "radioactive" },
  // Plutonium (Pu)
  "Pu-O": { result: "PuO₂ (Plutonium Dioxide)", description: "Plutonium reacts with oxygen to form plutonium dioxide, used in nuclear reactors.", animationType: "radioactive" },
  // Americium (Am)
  "Am-O": { result: "AmO₂ (Americium Dioxide)", description: "Americium reacts with oxygen to form americium dioxide, used in smoke detectors.", animationType: "radioactive" },
  // Curium (Cm)
  "Cm-O": { result: "CmO₂ (Curium Dioxide)", description: "Curium reacts with oxygen to form curium dioxide, a radioactive compound.", animationType: "radioactive" },
  // Berkelium (Bk)
  "Bk-O": { result: "BkO₂ (Berkelium Dioxide)", description: "Berkelium reacts with oxygen to form berkelium dioxide, a radioactive compound.", animationType: "radioactive" },
  // Californium (Cf)
  "Cf-O": { result: "Cf₂O₃ (Californium(III) Oxide)", description: "Californium reacts with oxygen to form californium(III) oxide, a radioactive compound.", animationType: "radioactive" },
  // Einsteinium (Es)
  "Es-O": { result: "Es₂O₃ (Einsteinium(III) Oxide)", description: "Einsteinium reacts with oxygen to form einsteinium(III) oxide, a radioactive compound.", animationType: "radioactive" },
  // Fermium (Fm)
  "Fm-O": { result: "Fm₂O₃ (Fermium(III) Oxide)", description: "Fermium reacts with oxygen to form fermium(III) oxide, a radioactive compound.", animationType: "radioactive" },
};

// Simulate chemical reactions between elements
export const simulateReaction = (element1: Element, element2: Element): ReactionResult => {
  const combo = `${element1.symbol}-${element2.symbol}`;
  const reversedCombo = `${element2.symbol}-${element1.symbol}`;
  
  // Check for reaction in both directions
  if (reactions[combo]) {
    return reactions[combo];
  } else if (reactions[reversedCombo]) {
    return reactions[reversedCombo];
  } else {
    // Provide intelligent default explanations based on element properties
    return generateIntelligentNoReaction(element1, element2);
  }
};

// Generate intelligent explanations for why elements don't react
const generateIntelligentNoReaction = (element1: Element, element2: Element): ReactionResult => {
  const isNoble1 = element1.category.includes('noble-gas');
  const isNoble2 = element2.category.includes('noble-gas');
  const isMetal1 = element1.category.includes('metal') && !element1.category.includes('non');
  const isMetal2 = element2.category.includes('metal') && !element2.category.includes('non');

  if (isNoble1 && isNoble2) {
    return {
      result: "No Reaction",
      description: `Both ${element1.name} and ${element2.name} are noble gases with complete electron shells, making them chemically inert.`,
      animationType: "fade"
    };
  }

  if (isNoble1) {
    return {
      result: "No Reaction", 
      description: `${element1.name} is a noble gas with a stable electron configuration and will not react with ${element2.name} under normal conditions.`,
      animationType: "fade"
    };
  }

  if (isNoble2) {
    return {
      result: "No Reaction",
      description: `${element2.name} is a noble gas with a stable electron configuration and will not react with ${element1.name} under normal conditions.`,
      animationType: "fade"
    };
  }

  if (isMetal1 && isMetal2) {
    return {
      result: "Alloy Formation",
      description: `${element1.name} and ${element2.name} are both metals and would form an alloy rather than a chemical compound, mixing as a solid solution.`,
      animationType: "crystallization"
    };
  }

  // Check for very large size/electronegativity differences
  if (Math.abs(element1.atomicNumber - element2.atomicNumber) > 50) {
    return {
      result: "Unlikely Reaction",
      description: `${element1.name} and ${element2.name} have very different atomic properties, making stable compound formation unlikely under normal conditions.`,
      animationType: "fade"
    };
  }

  // Default explanation
  return {
    result: "No Known Reaction",
    description: `No stable compounds are known to form between ${element1.name} and ${element2.name} under standard laboratory conditions.`,
    animationType: "fade"
  };
};
