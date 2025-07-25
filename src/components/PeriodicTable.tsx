
import React, { useState, useEffect, useRef } from 'react';
import ElementCard from './ElementCard';
import { Element, elements, periodicTableLayout, categoryNames } from '../data/elements';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Atom, Search, X, Beaker } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PeriodicTableProps {
  onElementClick: (element: Element) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedElements, setHighlightedElements] = useState<number[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const getElementByAtomicNumber = (atomicNumber: number): Element | undefined => {
    return elements.find(element => element.atomicNumber === atomicNumber);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setSearchQuery('');
    setHighlightedElements([]);
  };

  // Enhanced search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setHighlightedElements([]);
      return;
    }
    const lowerQuery = query.toLowerCase().trim();
    // Only highlight elements whose name or symbol starts with the query
    const filtered = elements.filter(element =>
      element.name.toLowerCase().startsWith(lowerQuery) ||
      element.symbol.toLowerCase().startsWith(lowerQuery)
    );
    setHighlightedElements(filtered.map(el => el.atomicNumber));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setHighlightedElements([]);
    setSelectedCategory(null);
  };

  const filteredElements = selectedCategory 
    ? elements.filter(element => element.category === selectedCategory)
    : [];

  const searchResults = searchQuery.trim() ? elements.filter(element => {
    const lowerQuery = searchQuery.toLowerCase().trim();
    return element.name.toLowerCase().includes(lowerQuery) ||
           element.symbol.toLowerCase().includes(lowerQuery) ||
           element.atomicNumber.toString().includes(lowerQuery) ||
           element.category.toLowerCase().includes(lowerQuery);
  }) : [];

  return (
    <div className="space-y-0">
      {/* Search Bar */}
      <div className="flex flex-row items-center justify-between mb-6 gap-4">
        {/* Left side: (empty or add heading if needed) */}
        <div></div>
        {/* Right side: search bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input 
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 glass-effect border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Periodic Table */}
      <div className="glass-effect rounded-2xl overflow-hidden border border-primary/30">
        <ScrollArea className="h-auto w-full">
          <div className="p-4 flex justify-center overflow-x-auto">
            <div 
              ref={tableRef}
              className="periodic-table-grid" 
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(18, 50px)',
                gridGap: '2px',
                justifyContent: 'center',
              }}
            >
              {periodicTableLayout.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'contents' }}>
                  {row.map((atomicNumber, colIndex) => {
                    const element = atomicNumber > 0 ? getElementByAtomicNumber(atomicNumber) : null;
                    
                    let isDimmed = false;
                    let isHighlighted = false;
                    
                    if (searchQuery && element) {
                      const matchesQuery = highlightedElements.includes(element.atomicNumber);
                      isDimmed = !matchesQuery;
                      isHighlighted = matchesQuery;
                    }

                    return (
                      <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className="element-cell"
                        style={{
                          width: '50px',
                          height: '50px'
                        }}
                      >
                        {element && (
                          <ElementCard
                            element={element}
                            onClick={() => onElementClick(element)}
                            size="xs"
                            isDimmed={isDimmed}
                            className={cn(
                              "transition-all duration-300",
                              isHighlighted && "element-highlighted",
                              isDimmed && searchQuery && "blur-[2px] opacity-40"
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      {/* Legend */}
      <div className="glass-effect rounded-2xl border border-primary/30 p-6">
        <div className="text-center mb-4">
          <h4 className="text-lg font-bold font-orbitron text-breaking-bad">Element Categories</h4>
          <p className="text-muted-foreground text-sm">Click to filter by category</p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(categoryNames).map(([category, name]) => (
            <div 
              key={category} 
              className={cn(
                `px-3 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-all duration-300`,
                `bg-chemistry-${category} hover:scale-105`,
                selectedCategory === category && `ring-2 ring-primary scale-105`
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={`w-3 h-3 rounded-full bg-chemistry-${category}`}></div>
              <span className="font-medium text-xs">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Display filtered elements */}
      {selectedCategory && (
        <div className="glass-effect rounded-2xl border border-primary/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full bg-chemistry-${selectedCategory}`}></div>
            <h4 className="text-lg font-bold text-breaking-bad">
              {categoryNames[selectedCategory as keyof typeof categoryNames]} Elements
            </h4>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {filteredElements.map(element => (
              <ElementCard
                key={element.id}
                element={element}
                onClick={() => onElementClick(element)}
                size="md"
                className="hover:scale-105 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
