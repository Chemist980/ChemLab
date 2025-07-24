
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import PeriodicTable from '@/components/PeriodicTable';
import ReactionZone from '@/components/ReactionZone';
import ElementDetail from '@/components/ElementDetail';

import { Element } from '@/data/elements';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Atom, Beaker, Bot, ArrowRight, Brain, FlaskConical, Flame, Zap, Hexagon, Info, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setDetailOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative min-h-screen bg-black">
        {/* Hero Section with Modern Black/Gold Theme */}
        <section className="relative overflow-hidden">
          {/* Remove background image overlays for higher contrast */}
          
          {/* Background pattern with Breaking Bad vibes */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, hsl(var(--primary) / 0.05) 0%, transparent 60%)
                `,
              }}
            />
          </div>
          
          <div className="container mx-auto py-12 px-4 relative z-10">
            {/* Hero Header with Modern Black/Gold Theme */}
            <header className="mb-12 text-center">
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h1 className="text-5xl md:text-6xl font-black tracking-tight font-orbitron bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    ChemLab
                  </h1>
                </div>
                <p className="text-xl max-w-2xl mx-auto subheading-gradient">
                  Interactive Chemistry Laboratory - Explore molecular interactions
                </p>
                
                {/* Breaking Bad inspired stats - centered */}
                <div className="flex justify-center items-center gap-8 mt-8">
                  <div className="text-center glass-effect px-3 py-2 border border-primary/50">
                    <div className="text-xl font-black text-primary">118</div>
                    <div className="text-sm font-bold text-white mt-1">Elements</div>
                  </div>
                  <div className="text-center glass-effect px-3 py-2 border border-primary/50">
                    <div className="text-xl font-black text-primary">∞</div>
                    <div className="text-sm font-bold text-white mt-1">Possibilities</div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
             <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-16">   
              {/* Periodic Table */}
              <div className="xl:col-span-3">
                <div className="glass-effect rounded-2xl p-6 border border-primary/30">
                  <div className="flex flex-row items-center justify-between mb-0 gap-0 pl-0 ml-0 -ml-4">
                    <div className="flex items-center gap-4 pl-0 ml-0">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center ml-0">
                        <Atom className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground font-orbitron leading-tight">Periodic Table</h2>
                        <p className="text-muted-foreground text-sm">Interactive periodic table of elements</p>
                      </div>
                    </div>
                  </div>
                  
                  <PeriodicTable onElementClick={handleElementClick} />
                </div>
              </div>

              {/* Lab Equipment Sidebar with Breaking Bad theme */}
              <div>
                <div className="glass-effect rounded-2xl p-6 border border-primary/30 h-full">
                  <Tabs defaultValue="reaction" className="h-full">
                    <TabsList className="w-full mb-6 bg-muted/20 rounded-xl p-1">
                      <TabsTrigger 
                        value="reaction" 
                        className="flex-1 rounded-lg data-[state=active]:bg-black data-[state=active]:text-primary"
                      >
                        <FlaskConical className="w-4 h-4 mr-2" />
                        Lab
                      </TabsTrigger>
                      <TabsTrigger 
                        value="info" 
                        className="flex-1 rounded-lg data-[state=active]:bg-black data-[state=active]:text-primary"
                      >
                        <Info className="w-4 h-4 mr-2" />
                        Info
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="reaction" className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <FlaskConical className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-bold font-orbitron text-foreground">Chemical Reactor</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Drag elements to create chemical reactions
                        </p>
                      </div>
                      <Separator className="bg-primary/30" />
                      <ReactionZone onElementClick={handleElementClick} />
                    </TabsContent>
                    
                    <TabsContent value="info" className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <FlaskConical className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-bold font-orbitron text-primary">How to Use</h3>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div className="glass-effect p-4 rounded-xl border border-primary/30">
                            <h4 className="font-bold text-primary mb-3">Quick Guide</h4>
                            <ul className="space-y-2 text-muted-foreground text-xs">
                              <li>• Click elements for detailed information</li>
                              <li>• Search the periodic table</li>
                              <li>• Drag elements to reaction chamber</li>
                              <li>• Explore chemical reactions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ElementDetail 
          element={selectedElement} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)}
        />
        
        
      </div>
    </DndProvider>
  );
};

export default Index;
