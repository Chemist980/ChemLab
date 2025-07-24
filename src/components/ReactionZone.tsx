import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Element, elements as elementsDatabase } from '@/data/elements';
import ElementCard from './ElementCard';
import ElementSuggestions from './ElementSuggestions';
import { simulateReaction, ReactionResult, reactions } from '../utils/reactionUtils';
import { Button } from '@/components/ui/button';
import { RotateCw, Bomb, Flame, Sparkles, Droplets, FlaskConical, Atom, Beaker, Zap, Hexagon } from 'lucide-react';

interface ReactionZoneProps {
  onElementClick: (element: Element) => void;
}

const ReactionZone: React.FC<ReactionZoneProps> = ({ onElementClick }) => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [reaction, setReaction] = useState<ReactionResult | null>(null);
  const [animating, setAnimating] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);
  const [splash, setSplash] = useState(false);
  const [suggestedElements, setSuggestedElements] = useState<Element[]>([]);
  const [steam, setSteam] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [colorChange, setColorChange] = useState(false);
  const [precipitation, setPrecipitation] = useState(false);
  const [radioactiveGlow, setRadioactiveGlow] = useState(false);
  const [chemicalSpiral, setChemicalSpiral] = useState(false);
  const [molecularDance, setMolecularDance] = useState(false);
  const [quantumFlicker, setQuantumFlicker] = useState(false);
  const [windEffect, setWindEffect] = useState(false);
  const [heatWaves, setHeatWaves] = useState(false);
  const [explosion, setExplosion] = useState(false);
  const [flames, setFlames] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false); // NEW STATE

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { element: Element }) => {
      addElement(item.element);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const shuffleArray = (array: any[]): any[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const findCompatibleElements = (element: Element): Element[] => {
    const reactionKeys = Object.keys(reactions);
    const compatibleSymbols = new Set<string>();

    reactionKeys.forEach(key => {
        const symbols = key.split('-');
        if (symbols[0] === element.symbol) {
            compatibleSymbols.add(symbols[1]);
        } else if (symbols[1] === element.symbol) {
            compatibleSymbols.add(symbols[0]);
        }
    });

    const compatibleElements = elementsDatabase.filter((e: Element) => compatibleSymbols.has(e.symbol));
    
    const currentSymbols = new Set(selectedElements.map(e => e.symbol));
    const finalSuggestions = compatibleElements.filter(e => !currentSymbols.has(e.symbol) && e.symbol !== element.symbol);

    return shuffleArray(finalSuggestions).slice(0, 4);
  };

  const addElement = (element: Element) => {
    if (selectedElements.length < 4) {
      setSplash(true);
      setTimeout(() => setSplash(false), 700);
      
      const newBubbles = [...bubbles];
      for (let i = 0; i < 8; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      
      setSelectedElements((prev) => {
        const newElements = [...prev, element];
        setSuggestedElements(findCompatibleElements(element));
        setShowSuggestions(true);
        return newElements;
      });
    }
  };

  const addCompound = (compound: { name: string; formula: string; description: string }) => {
    setColorChange(true);
    setSteam(true);
    
    const newBubbles = [...bubbles];
    for (let i = 0; i < 15; i++) {
      newBubbles.push(Math.random());
    }
    setBubbles(newBubbles);

    setTimeout(() => {
      setColorChange(false);
      setSteam(false);
    }, 2000);
  };

  const clearReaction = () => {
    setSelectedElements([]);
    setReaction(null);
    setAnimating(false);
    setBubbles([]);
    setSplash(false);
    setSuggestedElements([]);
    setSteam(false);
    setShowSuggestions(true);
    setColorChange(false);
    setPrecipitation(false);
    setRadioactiveGlow(false);
    setChemicalSpiral(false);
    setMolecularDance(false);
    setQuantumFlicker(false);
    setWindEffect(false);
    setHeatWaves(false);
    setExplosion(false);
    setShowExplanation(false); // Reset explanation toggle
  };

  const simulateCurrentReaction = () => {
    if (selectedElements.length >= 2) {
      setAnimating(true);
      const result = simulateReaction(selectedElements[0], selectedElements[1]);
      const newBubbles = [...bubbles];
      for (let i = 0; i < 35; i++) {
        newBubbles.push(Math.random());
      }
      setBubbles(newBubbles);
      // Animation overlays logic
      setRadioactiveGlow(false);
      setChemicalSpiral(false);
      setMolecularDance(false);
      setQuantumFlicker(false);
      setWindEffect(false);
      setHeatWaves(false);
      setExplosion(false);
      // --- Condensation effect ---
      if (result.animationType === 'explosion') {
        setSteam(true);
        setTimeout(() => {
          setSteam(false);
        }, 4000);
      } else if (result.animationType === 'combustion') {
        setSteam(true);
        setTimeout(() => {
          setSteam(false);
        }, 4000);
      } else if (result.animationType === 'gas') {
        setSteam(true);
        setWindEffect(true);
        setChemicalSpiral(true);
        setTimeout(() => {
          setSteam(false);
          setWindEffect(false);
          setChemicalSpiral(false);
        }, 5000);
      } else if (result.animationType === 'crystallization') {
        setPrecipitation(true);
        setSteam(true);
        setTimeout(() => {
          setPrecipitation(false);
          setSteam(false);
        }, 4500);
      } else if (result.animationType === 'neutralization') {
        setColorChange(true);
        setSteam(true);
        setQuantumFlicker(true);
        setTimeout(() => {
          setColorChange(false);
          setSteam(false);
          setQuantumFlicker(false);
        }, 3500);
      } else if (result.animationType === 'radioactive') {
        setRadioactiveGlow(true);
        setQuantumFlicker(true);
        setTimeout(() => {
          setRadioactiveGlow(false);
          setQuantumFlicker(false);
        }, 6000);
      } else if (result.animationType === 'plasma') {
        setSteam(true);
        setTimeout(() => {
          setSteam(false);
        }, 3500);
      }
      setSplash(true);
      setTimeout(() => setSplash(false), 700);
      setTimeout(() => {
        setShowSuggestions(true);
      }, 2000);
      setTimeout(() => {
        setReaction(result);
        try {
          const reactionLog = JSON.parse(localStorage.getItem('reactionLog') || '[]');
          const newLogEntry = {
            id: new Date().toISOString(),
            reactants: selectedElements.slice(0, 2).map(e => ({ name: e.name, symbol: e.symbol })),
            product: result.result,
            description: result.description,
            timestamp: new Date().toISOString()
          };
          const updatedLog = [newLogEntry, ...reactionLog].slice(0, 20);
          localStorage.setItem('reactionLog', JSON.stringify(updatedLog));
        } catch (error) {
          console.error("Failed to write to localStorage", error);
        }
      }, 600);
      setTimeout(() => {
        setAnimating(false);
      }, 2500);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bubbles.length > 0) {
        setBubbles(prev => prev.slice(Math.floor(prev.length / 2)));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [bubbles]);

  useEffect(() => {
    if (selectedElements.length >= 2) {
      simulateCurrentReaction();
      setShowExplanation(false); // Reset explanation toggle on new reaction
    } else {
      setReaction(null);
    }
    
    if (selectedElements.length === 1) {
      setSuggestedElements(findCompatibleElements(selectedElements[0]));
      setShowSuggestions(true);
    } else if (selectedElements.length === 0) {
      setSuggestedElements([]);
      setShowSuggestions(true);
    }
  }, [selectedElements]);

  // Dynamic temperature calculation based on selected elements and reaction type
  function getDynamicTemperature(type: string, elements: Element[]): number {
    if (!elements || elements.length === 0) return 25;
    const sumAtomic = elements.reduce((sum, el) => sum + (el.atomicNumber || 0), 0);
    switch (type) {
      case 'explosion': return Math.round(sumAtomic * 40 + 200 + Math.random() * 100);
      case 'combustion': return Math.round(sumAtomic * 30 + 100 + Math.random() * 60);
      case 'plasma': return Math.round(sumAtomic * 50 + 500 + Math.random() * 200);
      case 'crystallization': return Math.round(sumAtomic * 5 + Math.random() * 10);
      case 'gas': return Math.round(sumAtomic * 15 + 50 + Math.random() * 20);
      case 'neutralization': return Math.round(sumAtomic * 8 + 30 + Math.random() * 10);
      case 'radioactive': return Math.round(sumAtomic * 20 + 200 + Math.random() * 100);
      default: return Math.round(sumAtomic * 8 + 25 + Math.random() * 10);
    }
  }

  // Timeline stages and icons
  const timelineStages = [
    { key: 'mixing', label: 'Mixing', icon: <span role="img" aria-label="Mixing">🧪</span> },
    { key: 'activation', label: 'Activation', icon: <span role="img" aria-label="Activation">⚡</span> },
    { key: 'reaction', label: 'Reaction', icon: <span role="img" aria-label="Reaction">💥</span> },
    { key: 'product', label: 'Product', icon: <span role="img" aria-label="Product">🔬</span> },
    { key: 'cooling', label: 'Cooling', icon: <span role="img" aria-label="Cooling">❄️</span> },
  ];

  // Track reaction progress for timeline animation
  const [timelineStage, setTimelineStage] = React.useState(0);
  React.useEffect(() => {
    if (!reaction) {
      setTimelineStage(0);
      return;
    }
    setTimelineStage(0);
    const timers = [
      setTimeout(() => setTimelineStage(1), 500),
      setTimeout(() => setTimelineStage(2), 1200),
      setTimeout(() => setTimelineStage(3), 2000),
      setTimeout(() => setTimelineStage(4), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reaction]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Suggestions button at the top right */}
      <div className="flex justify-end w-full mb-2">
        {selectedElements.length === 1 && showSuggestions && (
          <ElementSuggestions 
            element={selectedElements[selectedElements.length - 1]} 
            onSelectElement={addElement}
            onAddCompound={addCompound}
            suggestedElements={suggestedElements}
            isReacting={animating}
          />
        )}
      </div>
      <div 
        ref={drop}
        className={`
          relative h-96 p-6 rounded-xl flex flex-col items-center justify-center overflow-hidden
          ${isOver ? 'border-primary/70 bg-primary/5' : 'border-0'}
          transition-all duration-300 shadow-lg
          ios-liquid-glass
        `}
      >
        {selectedElements.length > 0 && showSuggestions && (
          null
        )}
        {/* All overlays except vapor/gas are now inside the beaker */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 w-full h-full mx-auto">
            {/* Animation overlays inside beaker */}
            {/* Only vapor/gas overlays are allowed outside the beaker */}
            {/* Explosion, plasma, crystallization, etc. overlays go here */}
        {radioactiveGlow && (
          <div className="absolute inset-0 z-15 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-green-400/30 via-yellow-400/20 to-transparent animate-pulse"></div>
            {[...Array(30)].map((_, i) => (
              <div 
                key={`radiation-${i}`}
                className="absolute bg-green-400/60 rounded-full"
                style={{
                  width: Math.random() * 8 + 3 + 'px',
                  height: Math.random() * 8 + 3 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `radioactive-glow ${Math.random() * 2 + 1}s ease-in-out infinite`,
                  boxShadow: '0 0 15px #4ade80',
                  opacity: Math.random() * 0.8 + 0.2
                }}
              ></div>
            ))}
          </div>
        )}
        {chemicalSpiral && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                <div 
                  key={`spiral-${i}`}
                    className="absolute rounded-full"
                  style={{
                      width: Math.random() * 10 + 5 + 'px',
                      height: Math.random() * 10 + 5 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #4f46e5, #6366f1, #8b5cf6)`,
                      boxShadow: '0 0 20px #8b5cf6, 0 0 40px #6366f1',
                      animation: `spiral-spin ${Math.random() * 2 + 1}s linear infinite`,
                      opacity: Math.random() * 0.8 + 0.1
                  }}
                ></div>
                ))}
          </div>
        )}
        {molecularDance && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                    key={`dance-${i}`}
                    className="absolute rounded-full"
                style={{
                      width: Math.random() * 15 + 10 + 'px',
                      height: Math.random() * 15 + 10 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #ef4444, #f59e0b, #10b981)`,
                      boxShadow: '0 0 20px #10b981, 0 0 40px #f59e0b',
                  animation: `molecular-dance ${Math.random() * 3 + 2}s ease-in-out infinite`,
                      opacity: Math.random() * 0.9 + 0.1
                }}
              ></div>
            ))}
          </div>
        )}
        {quantumFlicker && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
              <div 
                    key={`flicker-${i}`}
                    className="absolute rounded-full"
                style={{
                      width: Math.random() * 10 + 5 + 'px',
                      height: Math.random() * 10 + 5 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #3b82f6, #1d4ed8, #60a5fa)`,
                      boxShadow: '0 0 20px #1d4ed8, 0 0 40px #3b82f6',
                      animation: `quantum-flicker ${Math.random() * 2 + 1}s ease-in-out infinite alternate`,
                  opacity: Math.random() * 0.9 + 0.1
                }}
              ></div>
            ))}
          </div>
        )}
        {flames && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
              <div 
                key={`flame-${i}`}
                    className="absolute rounded-full"
                style={{
                      width: Math.random() * 15 + 10 + 'px',
                      height: Math.random() * 15 + 10 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #ef4444, #f59e0b, #10b981)`,
                      boxShadow: '0 0 20px #10b981, 0 0 40px #f59e0b',
                      animation: `flame-pulse ${Math.random() * 2 + 1}s ease-in-out infinite alternate`,
                      opacity: Math.random() * 0.9 + 0.1
                }}
              ></div>
            ))}
          </div>
        )}
        {windEffect && (
              <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={`wind-${i}`}
                    className="absolute rounded-full"
                style={{
                      width: Math.random() * 10 + 5 + 'px',
                      height: Math.random() * 10 + 5 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #3b82f6, #1d4ed8, #60a5fa)`,
                      boxShadow: '0 0 20px #1d4ed8, 0 0 40px #3b82f6',
                      animation: `wind-effect ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
                      opacity: Math.random() * 0.9 + 0.1
                }}
              ></div>
            ))}
          </div>
        )}
        {heatWaves && (
              <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div 
                key={`heat-${i}`}
                    className="absolute rounded-full"
                style={{
                      width: Math.random() * 10 + 5 + 'px',
                      height: Math.random() * 10 + 5 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #f59e0b, #ef4444, #10b981)`,
                      boxShadow: '0 0 20px #10b981, 0 0 40px #f59e0b',
                      animation: `heat-waves ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
                      opacity: Math.random() * 0.9 + 0.1
                }}
              ></div>
            ))}
          </div>
        )}
        {explosion && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={`explosion-${i}`}
                    className="absolute rounded-full"
                style={{
                      width: Math.random() * 20 + 10 + 'px',
                      height: Math.random() * 20 + 10 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      background: `radial-gradient(circle, #ef4444, #f59e0b, #10b981)`,
                      boxShadow: '0 0 30px #10b981, 0 0 60px #f59e0b',
                      animation: `explosion-burst ${Math.random() * 2 + 1}s ease-out forwards`,
                      opacity: Math.random() * 0.9 + 0.1
                    }}
              ></div>
            ))}
          </div>
        )}
          </div>
          {/* Beaker glass and liquid visuals remain here, overlays are now inside */}
          {/* Reaction name above the liquid */}
          {reaction && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30 px-4 py-1 rounded-xl pointer-events-none max-w-[80%]">
              <span className="text-2xl md:text-3xl font-black font-orbitron bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                {reaction.result}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 w-full h-full rounded-b-3xl rounded-t-lg overflow-hidden beaker-3d">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent border-2 border-gray-300/50 rounded-b-3xl rounded-t-lg backdrop-blur-sm shadow-2xl beaker-glass-3d">
              <div className="absolute top-8 left-4 w-16 h-32 bg-white/25 rounded-full transform -rotate-12 blur-sm"></div>
              <div className="absolute top-12 right-6 w-8 h-24 bg-white/20 rounded-full transform rotate-12 blur-sm"></div>
              <div className="absolute bottom-16 left-8 w-12 h-16 bg-white/15 rounded-full transform -rotate-45 blur-sm"></div>
              <div className="absolute inset-0 border border-gray-200/40 rounded-b-3xl rounded-t-lg"></div>
              <div className="absolute inset-1 border border-gray-100/30 rounded-b-3xl rounded-t-lg"></div>
              {/* 3D highlight and shadow overlays */}
              <div className="absolute left-6 top-6 w-24 h-8 rounded-full bg-white/30 blur-lg opacity-30 pointer-events-none" style={{ transform: 'rotate(-18deg)' }} />
              <div className="absolute right-8 bottom-8 w-20 h-6 rounded-full bg-blue-200/20 blur-lg opacity-20 pointer-events-none" style={{ transform: 'rotate(12deg)' }} />
              <div className="absolute inset-0 rounded-b-3xl rounded-t-lg pointer-events-none" style={{ boxShadow: 'inset 0 8px 32px 0 rgba(31,38,135,0.10), 0 2px 16px 0 rgba(96,170,255,0.08)' }} />
            </div>
            <div className="absolute -top-[1px] left-[8%] w-[35%] h-5 border-t-2 border-l-2 border-r-2 border-gray-300/50 bg-gradient-to-b from-white/8 to-transparent" 
                 style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)' }}>
              <div className="absolute top-0 left-2 w-4 h-2 bg-white/15 rounded-full blur-sm"></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/15 rounded-full blur-lg"></div>
          </div>
          {/* Liquid and bubbles remain unchanged */}
              <div className={`absolute bottom-0 w-full transition-all duration-700 ease-out overflow-hidden rounded-b-2xl ${selectedElements.length > 0 ? 'h-[70%]' : 'h-[15%]'}`}>
                <div className={`w-full h-full relative ${reaction?.animationType === 'crystallization' ? 'bg-gradient-to-b from-white/80 via-blue-300/80 to-blue-600/80' : (reaction?.productColor ? reaction.productColor : 'bg-gradient-to-b from-blue-100/50 to-blue-200/40 dark:from-blue-800/40 dark:to-blue-700/30')} ${animating ? 'animate-pulse' : ''}`}>
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full"></div>
                  <div className="absolute inset-x-2 top-0 h-1 bg-white/40 rounded-full"></div>
                  {bubbles.map((bubble, index) => (
                      <div key={index} 
                           className="absolute rounded-full bg-white/90 dark:bg-white/60 animate-rise shadow-lg" 
                           style={{
                              width: Math.max(4, Math.random() * 12) + 'px',
                              height: Math.max(4, Math.random() * 12) + 'px',
                              bottom: bubble * 100 + '%',
                              left: Math.random() * 80 + 10 + '%',
                              animationDuration: Math.random() * 2 + 1 + 's',
                              opacity: Math.random() * 0.8 + 0.2,
                              boxShadow: 'inset 0 0 4px rgba(255,255,255,0.9), 0 0 4px rgba(0,0,0,0.2)'
                           }} />
                  ))}
                  {selectedElements.length > 1 && (
                    <>
                      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/15 to-transparent"></div>
                      <div className="absolute bottom-1/4 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pt-8 pb-4">
                  {selectedElements.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                          <Beaker className="mx-auto h-12 w-12 mb-3 opacity-50" />
                          <p>Drag elements here</p>
                          <p className="text-xs mt-1 text-muted-foreground/80">to start a reaction</p>
                      </div>
                  ) : (
                    <>
                      {/* Centered elements in the beaker */}
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-2 mt-32">
                          {selectedElements.map((element, index) => (
                              <div key={index} className={`${animating ? 'animate-shake' : ''}`}>
                                  <ElementCard element={element} onClick={() => onElementClick(element)} size="xs" isDraggable={false} />
                              </div>
                          ))}
                      </div>
                      {/* Explanation below the elements, inside the beaker */}
                      {reaction && (
                        <div className="w-full text-center mt-2">
                          <p className="text-sm leading-relaxed text-white/90 bg-black/30 rounded-lg px-3 py-2 inline-block max-w-xs mx-auto shadow-lg">
                            {reaction.description}
                          </p>
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="flex items-center gap-1">
                              {reaction.animationType === 'crystallization'
                                ? <span className="text-white">{getReactionIcon(reaction.animationType)}</span>
                                : getReactionIcon(reaction.animationType)}
                              <span className={`text-xs ${reaction.animationType === 'crystallization' ? 'text-white' : 'text-muted-foreground'}`}>{getReactionTypeName(reaction.animationType)}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
              </div>
          </div>
        {/* No overlays for crystallization or plasma reactions */}
        {((reaction && reaction.animationType === 'gas') || steam) && (
          <div className="absolute left-1/2 top-0 w-40 h-32 -translate-x-1/2 pointer-events-none z-40 flex items-center justify-center">
            <div className="w-40 h-32 rounded-full bg-gradient-to-t from-white/60 to-blue-200/30 blur-2xl opacity-40 animate-fade-up"></div>
          </div>
        )}
        {splash && (
          <div className="absolute left-1/2 bottom-20 w-32 h-16 -translate-x-1/2 pointer-events-none z-30 flex items-center justify-center">
            <div className="w-32 h-16 rounded-full" style={{
              background: 'radial-gradient(ellipse at center, #fff8 60%, #60aaff44 100%)',
              opacity: 0.5,
              filter: 'blur(8px)',
              animation: 'vapour-splash 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}></div>
          </div>
        )}
        {/* Minimal soft pulse during reactions */}
        {animating && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full ultra-plasma-glow opacity-30"></div>
          </div>
        )}
        {/* Restore vapor/steam overlays except for ultra-swirl-vapor */}
        {steam && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div 
                key={`steam-${i}`}
                className="absolute bg-white/40 rounded-full"
                style={{
                  width: Math.random() * 40 + 8 + 'px',
                  height: Math.random() * 40 + 8 + 'px',
                  left: Math.random() * 70 + 15 + '%',
                  top: Math.random() * 20 + 50 + '%',
                  animationDuration: Math.random() * 5 + 2 + 's',
                  animationDelay: Math.random() * 1 + 's',
                  animation: `gas-rise ${Math.random() * 5 + 2}s ease-out infinite`,
                  filter: 'blur(3px)',
                  opacity: Math.random() * 0.6 + 0.2
                }}
              ></div>
            ))}
        </div>
        )}
        {reaction && reaction.animationType === 'precipitation' && steam && (
          <>
            <div className="absolute bottom-0 left-0 w-full h-2/3 pointer-events-none z-40 animate-rise-smoke"
              style={{
                background: 'linear-gradient(0deg, rgba(180,220,255,0.22) 0%, rgba(255,255,255,0.18) 60%, transparent 100%)',
                filter: 'blur(8px)',
                opacity: 0.7
              }}
            />
            {/* Escaping vapor blobs above the beaker (more than gas) */}
            {[...Array(14)].map((_, i) => (
              <div
                key={`precip-vapor-${i}`}
                className="absolute left-1/2 -top-12 pointer-events-none z-50 animate-vapor-plume"
                style={{
                  width: `${28 + Math.random() * 28}px`,
                  height: `${20 + Math.random() * 18}px`,
                  background: 'radial-gradient(ellipse at center, rgba(180,220,255,0.18) 60%, transparent 100%)',
                  filter: 'blur(10px)',
                  opacity: 0.7,
                  transform: `translate(-50%, 0) translateX(${(Math.random() - 0.5) * 40}px)`,
                  animationDelay: `${i * 0.2 + Math.random() * 0.15}s`,
                  animationDuration: `${2.5 + Math.random() * 1.1}s`,
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* (Timeline and Fun Fact removed) */}
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={clearReaction}
          disabled={selectedElements.length === 0}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30"
        >
          <RotateCw className="h-4 w-4" /> Clear Reaction
        </Button>
      </div>

    </div>
  );
};

const getReactionTypeName = (animationType: string): string => {
  switch (animationType) {
    case 'explosion':
      return 'Explosive Reaction';
    case 'gas':
      return 'Gas Formation';
    case 'bubble':
      return 'Aqueous Reaction';
    case 'fade':
      return 'Subtle Reaction';
    case 'crystallization':
      return 'Crystallization';
    case 'precipitation':
      return 'Precipitation';
    case 'combustion':
      return 'Combustion Reaction';
    case 'neutralization':
      return 'Neutralization';
    case 'radioactive':
      return 'Nuclear Reaction';
    default:
      return 'Chemical Reaction';
  }
};

const getReactionIcon = (animationType: string): React.ReactNode => {
  switch (animationType) {
    case 'explosion':
      return <Bomb className="h-4 w-4 text-orange-500" />;
    case 'gas':
      return <Sparkles className="h-4 w-4 text-green-500" />;
    case 'bubble':
      return <Droplets className="h-4 w-4 text-blue-500" />;
    case 'fade':
      return <FlaskConical className="h-4 w-4 text-purple-500" />;
    case 'crystallization':
      return <FlaskConical className="h-4 w-4 text-white" />;
    case 'precipitation':
      return <Droplets className="h-4 w-4 text-yellow-500" />;
    case 'combustion':
      return <Flame className="h-4 w-4 text-red-500" />;
    case 'neutralization':
      return <Atom className="h-4 w-4 text-teal-500" />;
    case 'radioactive':
      return <Zap className="h-4 w-4 text-green-500" />;
    default:
      return <FlaskConical className="h-4 w-4 text-gray-500" />;
  }
};

export default ReactionZone;
