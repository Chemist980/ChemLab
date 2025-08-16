import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Beaker, Flame, Snowflake, Thermometer, Atom, Zap, History, Lightbulb, Trash2, Save, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface Substance {
  name: string;
  symbol: string;
  color: string;
}

interface Reaction {
  reactants: string[];
  result: string;
  minTemp: number;
  maxTemp: number;
  type: 'explosion' | 'neutralization' | 'displacement' | 'fizzing' | 'curdling' | 'caramelization';
}

interface MoleculeAtom {
  symbol: string;
  name: string;
  color: string;
  atomicWeight: number;
}

const InteractiveLabPage = () => {
  // Sandbox state
  const [droppedSubstances, setDroppedSubstances] = useState<string[]>([]);
  const [temperature, setTemperature] = useState([25]);
  const [reactionHistory, setReactionHistory] = useState<string[]>([]);
  const [currentReaction, setCurrentReaction] = useState<string>('');
  const [isReacting, setIsReacting] = useState(false);

  // Molecular lab state
  const [currentMolecule, setCurrentMolecule] = useState<MoleculeAtom[]>([]);
  const [moleculeInfo, setMoleculeInfo] = useState<string>('');

  const beakerRef = useRef<HTMLDivElement>(null);

  const substances: Substance[] = [
    { name: 'Sodium', symbol: 'Na', color: '#ff9900' },
    { name: 'Water', symbol: 'H₂O', color: '#0099ff' },
    { name: 'Hydrochloric Acid', symbol: 'HCl', color: '#ff0000' },
    { name: 'Sodium Hydroxide', symbol: 'NaOH', color: '#00ff00' },
    { name: 'Iron', symbol: 'Fe', color: '#cc6600' },
    { name: 'Copper Sulfate', symbol: 'CuSO₄', color: '#0066cc' },
    { name: 'Baking Soda', symbol: 'NaHCO₃', color: '#ffffff' },
    { name: 'Vinegar', symbol: 'CH₃COOH', color: '#ffff99' },
    { name: 'Lemon Juice', symbol: 'C₆H₈O₇', color: '#ffff00' },
    { name: 'Milk', symbol: 'Milk', color: '#ffffff' },
    { name: 'Salt', symbol: 'NaCl', color: '#ffffff' },
    { name: 'Sugar', symbol: 'C₁₂H₂₂O₁₁', color: '#ffffff' }
  ];

  const reactions: Record<string, Reaction> = {
    'Na+H₂O': {
      reactants: ['Na', 'H₂O'],
      result: 'BOOM! Sodium reacts violently with water producing hydrogen gas!',
      minTemp: 25,
      maxTemp: 1000,
      type: 'explosion'
    },
    'HCl+NaOH': {
      reactants: ['HCl', 'NaOH'],
      result: 'Neutralization! Water and salt form with heat release.',
      minTemp: -50,
      maxTemp: 1000,
      type: 'neutralization'
    },
    'Fe+CuSO₄': {
      reactants: ['Fe', 'CuSO₄'],
      result: 'Iron displaces copper – beautiful color change from blue to brown!',
      minTemp: 100,
      maxTemp: 1000,
      type: 'displacement'
    },
    'NaHCO₃+CH₃COOH': {
      reactants: ['NaHCO₃', 'CH₃COOH'],
      result: 'Fizz and CO₂ bubbles released!',
      minTemp: -50,
      maxTemp: 1000,
      type: 'fizzing'
    },
    'C₆H₈O₇+NaHCO₃': {
      reactants: ['C₆H₈O₇', 'NaHCO₃'],
      result: 'Citric acid and baking soda create bubbling reaction!',
      minTemp: -50,
      maxTemp: 1000,
      type: 'fizzing'
    },
    'Milk+C₆H₈O₇': {
      reactants: ['Milk', 'C₆H₈O₇'],
      result: 'Milk proteins coagulate and curdle!',
      minTemp: -50,
      maxTemp: 50,
      type: 'curdling'
    },
    'C₁₂H₂₂O₁₁+Heat': {
      reactants: ['C₁₂H₂₂O₁₁'],
      result: 'Sugar caramelizes and turns golden brown!',
      minTemp: 300,
      maxTemp: 1000,
      type: 'caramelization'
    }
  };

  const elements: MoleculeAtom[] = [
    { symbol: 'H', name: 'Hydrogen', color: '#ff6b6b', atomicWeight: 1 },
    { symbol: 'C', name: 'Carbon', color: '#4a4a4a', atomicWeight: 12 },
    { symbol: 'N', name: 'Nitrogen', color: '#4dabf7', atomicWeight: 14 },
    { symbol: 'O', name: 'Oxygen', color: '#ff8cc8', atomicWeight: 16 },
    { symbol: 'F', name: 'Fluorine', color: '#51cf66', atomicWeight: 19 },
    { symbol: 'Na', name: 'Sodium', color: '#ffd43b', atomicWeight: 23 },
    { symbol: 'Mg', name: 'Magnesium', color: '#74c0fc', atomicWeight: 24 },
    { symbol: 'Al', name: 'Aluminum', color: '#ced4da', atomicWeight: 27 },
    { symbol: 'Si', name: 'Silicon', color: '#868e96', atomicWeight: 28 },
    { symbol: 'P', name: 'Phosphorus', color: '#ff922b', atomicWeight: 31 },
    { symbol: 'S', name: 'Sulfur', color: '#ffd43b', atomicWeight: 32 },
    { symbol: 'Cl', name: 'Chlorine', color: '#51cf66', atomicWeight: 35 },
    { symbol: 'K', name: 'Potassium', color: '#d0bfff', atomicWeight: 39 },
    { symbol: 'Ca', name: 'Calcium', color: '#ffd43b', atomicWeight: 40 },
    { symbol: 'Fe', name: 'Iron', color: '#fd7e14', atomicWeight: 56 },
    { symbol: 'Cu', name: 'Copper', color: '#fd7e14', atomicWeight: 64 },
    { symbol: 'Zn', name: 'Zinc', color: '#74c0fc', atomicWeight: 65 },
    { symbol: 'Br', name: 'Bromine', color: '#e03131', atomicWeight: 80 }
  ];

  const handleSubstanceDrop = (substance: Substance) => {
    if (droppedSubstances.length < 2) {
      const newDropped = [...droppedSubstances, substance.symbol];
      setDroppedSubstances(newDropped);
      
      if (newDropped.length === 2) {
        performReaction(newDropped);
      }
    }
  };

  const performReaction = (reactants: string[]) => {
    setIsReacting(true);
    const combo1 = `${reactants[0]}+${reactants[1]}`;
    const combo2 = `${reactants[1]}+${reactants[0]}`;
    const heatCombo = reactants.includes('C₁₂H₂₂O₁₁') && temperature[0] >= 300 ? 'C₁₂H₂₂O₁₁+Heat' : null;
    
    const reaction = reactions[combo1] || reactions[combo2] || (heatCombo ? reactions[heatCombo] : null);
    
    setTimeout(() => {
      if (reaction) {
        const currentTemp = temperature[0];
        if (currentTemp >= reaction.minTemp && currentTemp <= reaction.maxTemp) {
          setCurrentReaction(reaction.result);
          addToHistory(`${reaction.result} (at ${currentTemp}°C)`);
          toast.success('Reaction successful!');
          
          // Add visual effects based on reaction type
          if (reaction.type === 'explosion') {
            triggerExplosion();
          }
        } else {
          const tempMessage = currentTemp < reaction.minTemp 
            ? `Too cold! Need at least ${reaction.minTemp}°C` 
            : `Too hot! Maximum ${reaction.maxTemp}°C`;
          setCurrentReaction(`${tempMessage} for this reaction.`);
          addToHistory(`Failed: ${tempMessage}`);
          toast.error('Temperature not suitable for reaction');
        }
      } else {
        setCurrentReaction('No visible reaction occurs.');
        addToHistory('No visible reaction.');
        toast.info('No reaction detected');
      }
      
      setIsReacting(false);
      // Clear beaker after 3 seconds
      setTimeout(() => {
        setDroppedSubstances([]);
        setCurrentReaction('');
      }, 3000);
    }, 1000);
  };

  const triggerExplosion = () => {
    // Visual explosion effect
    if (beakerRef.current) {
      beakerRef.current.classList.add('animate-shake');
      setTimeout(() => {
        beakerRef.current?.classList.remove('animate-shake');
      }, 500);
    }
  };

  const addToHistory = (entry: string) => {
    setReactionHistory(prev => [entry, ...prev.slice(0, 5)]);
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 0) return { status: 'Freezing Cold', color: 'text-blue-400', icon: Snowflake };
    if (temp < 100) return { status: 'Normal Temperature', color: 'text-green-400', icon: Thermometer };
    if (temp < 500) return { status: 'Hot', color: 'text-orange-400', icon: Flame };
    return { status: 'Extreme Heat', color: 'text-red-400', icon: Flame };
  };

  const getBeakerStyle = (temp: number) => {
    if (temp < 0) return 'border-blue-400 shadow-blue-400/50';
    if (temp < 100) return 'border-primary shadow-primary/50';
    if (temp < 500) return 'border-orange-400 shadow-orange-400/50';
    return 'border-red-400 shadow-red-400/50 animate-pulse';
  };

  const addElementToMolecule = (element: MoleculeAtom) => {
    setCurrentMolecule(prev => [...prev, element]);
    toast.success(`Added ${element.name} to molecule`);
  };

  const clearMolecule = () => {
    setCurrentMolecule([]);
    setMoleculeInfo('');
    toast.info('Molecule cleared');
  };

  const analyzeMolecule = () => {
    if (currentMolecule.length === 0) {
      setMoleculeInfo('No molecule to analyze');
      return;
    }
    
    const formula = getFormula(currentMolecule);
    const molecularWeight = currentMolecule.reduce((sum, atom) => sum + atom.atomicWeight, 0);
    
    setMoleculeInfo(`Formula: ${formula} | Atoms: ${currentMolecule.length} | Weight: ${molecularWeight} u`);
    toast.success('Molecule analyzed!');
  };

  const getFormula = (molecule: MoleculeAtom[]) => {
    const counts: Record<string, number> = {};
    molecule.forEach(atom => {
      counts[atom.symbol] = (counts[atom.symbol] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([symbol, count]) => count > 1 ? `${symbol}${count}` : symbol)
      .join('');
  };

  const tempStatus = getTemperatureStatus(temperature[0]);
  const TempIcon = tempStatus.icon;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Interactive Chemistry Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore chemistry through interactive simulations and molecular building
        </p>
      </div>

      <Tabs defaultValue="sandbox" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="sandbox" className="flex items-center gap-2">
            <Beaker className="w-4 h-4" />
            What If? Sandbox
          </TabsTrigger>
          <TabsTrigger value="molecular" className="flex items-center gap-2">
            <Atom className="w-4 h-4" />
            Molecular Lab
          </TabsTrigger>
        </TabsList>

        {/* What If Sandbox */}
        <TabsContent value="sandbox">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Reaction Area */}
            <div className="lg:col-span-3">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Beaker className="w-5 h-5" />
                    Chemistry Sandbox
                  </CardTitle>
                  <CardDescription>
                    Drag substances into the beaker and watch them react
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative min-h-[500px] flex flex-col items-center justify-center">
                    {/* Floating Substances */}
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-8">
                      {substances.map((substance, index) => (
                        <Button
                          key={substance.symbol}
                          variant="outline"
                          className="h-16 w-16 rounded-full flex flex-col items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                          style={{ 
                            backgroundColor: `${substance.color}20`,
                            borderColor: substance.color,
                            color: substance.color
                          }}
                          onClick={() => handleSubstanceDrop(substance)}
                          disabled={droppedSubstances.length >= 2 || isReacting}
                        >
                          {substance.symbol}
                        </Button>
                      ))}
                    </div>

                    {/* Reaction Beaker */}
                    <div 
                      ref={beakerRef}
                      className={`relative w-64 h-80 border-4 rounded-2xl flex flex-wrap items-end justify-center p-4 transition-all duration-300 ${getBeakerStyle(temperature[0])}`}
                      style={{ 
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,255,255,0.1) 100%)',
                        boxShadow: `0 0 20px ${getBeakerStyle(temperature[0]).includes('blue') ? '#60a5fa' : getBeakerStyle(temperature[0]).includes('orange') ? '#fb923c' : getBeakerStyle(temperature[0]).includes('red') ? '#ef4444' : '#06b6d4'}50`
                      }}
                    >
                      {droppedSubstances.map((substance, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-white text-xs font-bold m-1 animate-bounce"
                        >
                          {substance}
                        </div>
                      ))}
                      
                      {isReacting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 animate-ping opacity-75"></div>
                        </div>
                      )}
                    </div>

                    {/* Reaction Result */}
                    {currentReaction && (
                      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg max-w-md text-center">
                        <p className="text-primary font-medium">{currentReaction}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-6">
              {/* Temperature Control */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TempIcon className={`w-5 h-5 ${tempStatus.color}`} />
                    Temperature Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${tempStatus.color}`}>
                        {temperature[0]}°C
                      </div>
                      <div className={`text-sm ${tempStatus.color}`}>
                        {tempStatus.status}
                      </div>
                    </div>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      max={1000}
                      min={-50}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>-50°C</span>
                      <span>1000°C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reaction History */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Reaction History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-32">
                    {reactionHistory.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No reactions yet</p>
                    ) : (
                      <div className="space-y-2">
                        {reactionHistory.map((entry, index) => (
                          <div key={index} className="text-xs p-2 bg-muted/50 rounded">
                            {entry}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Try Combining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div>Na + H₂O (25°C+)</div>
                    <div>HCl + NaOH (any temp)</div>
                    <div>Fe + CuSO₄ (100°C+)</div>
                    <div>Milk + Lemon Juice (cold)</div>
                    <div>Baking Soda + Vinegar</div>
                    <div>Sugar + Heat (300°C+)</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Molecular Lab */}
        <TabsContent value="molecular">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Element Selection */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Element Selection</CardTitle>
                <CardDescription>Click elements to add them to your molecule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {elements.map((element) => (
                    <Button
                      key={element.symbol}
                      variant="outline"
                      className="h-12 w-12 rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: `${element.color}20`,
                        borderColor: element.color,
                        color: element.color
                      }}
                      onClick={() => addElementToMolecule(element)}
                      title={element.name}
                    >
                      {element.symbol}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Molecule Builder */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Molecule Builder</CardTitle>
                <CardDescription>Build and analyze molecular structures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Molecule Display */}
                  <div className="min-h-[200px] border-2 border-dashed border-primary/30 rounded-lg flex flex-wrap items-center justify-center p-4">
                    {currentMolecule.length === 0 ? (
                      <p className="text-muted-foreground">Click elements to build your molecule</p>
                    ) : (
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {currentMolecule.map((atom, index) => (
                          <React.Fragment key={index}>
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse"
                              style={{ backgroundColor: atom.color }}
                              title={atom.name}
                            >
                              {atom.symbol}
                            </div>
                            {index < currentMolecule.length - 1 && (
                              <div className="text-2xl text-muted-foreground">—</div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={clearMolecule}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                    <Button variant="outline" onClick={analyzeMolecule}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyze
                    </Button>
                    <Button variant="outline" onClick={() => toast.success('Molecule saved!')}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>

                  {/* Molecule Info */}
                  {moleculeInfo && (
                    <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                      <p className="text-sm text-primary font-medium">{moleculeInfo}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveLabPage;