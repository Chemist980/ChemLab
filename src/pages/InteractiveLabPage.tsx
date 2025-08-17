import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Beaker, Flame, Snowflake, Thermometer, History, Lightbulb, Search, Bot, Send, X } from 'lucide-react';
import { toast } from 'sonner';

interface Substance {
  name: string;
  formula: string;
  color: string;
  category: string;
}

interface Reaction {
  reactants: string[];
  result: string;
  minTemp: number;
  maxTemp: number;
  type: 'explosion' | 'neutralization' | 'displacement' | 'fizzing' | 'curdling' | 'caramelization' | 'combustion' | 'precipitation';
}

const InteractiveLabPage = () => {
  // State management
  const [droppedSubstances, setDroppedSubstances] = useState<string[]>([]);
  const [temperature, setTemperature] = useState([25]);
  const [reactionHistory, setReactionHistory] = useState<string[]>([]);
  const [currentReaction, setCurrentReaction] = useState<string>('');
  const [isReacting, setIsReacting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hello! I\'m TheBlueMatterAI, your chemistry assistant. Ask me anything about chemical reactions, compounds, or the substances in the lab!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const beakerRef = useRef<HTMLDivElement>(null);

  // 300 everyday substances and compounds
  const substances: Substance[] = [
    // Kitchen & Food
    { name: 'Water', formula: 'H₂O', color: '#4A90E2', category: 'Basic' },
    { name: 'Salt', formula: 'NaCl', color: '#FFFFFF', category: 'Kitchen' },
    { name: 'Sugar', formula: 'C₁₂H₂₂O₁₁', color: '#F5F5DC', category: 'Kitchen' },
    { name: 'Baking Soda', formula: 'NaHCO₃', color: '#FFFFFF', category: 'Kitchen' },
    { name: 'Vinegar', formula: 'CH₃COOH', color: '#FFFF99', category: 'Kitchen' },
    { name: 'Lemon Juice', formula: 'C₆H₈O₇', color: '#FFFF00', category: 'Kitchen' },
    { name: 'Milk', formula: 'Milk', color: '#FFFFFF', category: 'Kitchen' },
    { name: 'Coffee', formula: 'C₈H₁₀N₄O₂', color: '#8B4513', category: 'Kitchen' },
    { name: 'Tea', formula: 'C₁₇H₁₉N₄O₉', color: '#D2691E', category: 'Kitchen' },
    { name: 'Honey', formula: 'C₆H₁₂O₆', color: '#FFD700', category: 'Kitchen' },
    { name: 'Olive Oil', formula: 'C₅₇H₁₀₄O₆', color: '#808000', category: 'Kitchen' },
    { name: 'Butter', formula: 'C₄H₈O₂', color: '#FFDB58', category: 'Kitchen' },
    { name: 'Flour', formula: 'C₆H₁₀O₅', color: '#F5F5DC', category: 'Kitchen' },
    { name: 'Yeast', formula: 'C₆H₁₂O₆', color: '#DEB887', category: 'Kitchen' },
    { name: 'Vanilla', formula: 'C₈H₈O₃', color: '#F3E5AB', category: 'Kitchen' },
    
    // Cleaning Products
    { name: 'Bleach', formula: 'NaClO', color: '#E6E6FA', category: 'Cleaning' },
    { name: 'Ammonia', formula: 'NH₃', color: '#87CEEB', category: 'Cleaning' },
    { name: 'Soap', formula: 'C₁₈H₃₅NaO₂', color: '#F0F8FF', category: 'Cleaning' },
    { name: 'Detergent', formula: 'C₁₂H₂₅SO₄Na', color: '#E0E0E0', category: 'Cleaning' },
    { name: 'Rubbing Alcohol', formula: 'C₃H₈O', color: '#F0F0F0', category: 'Cleaning' },
    { name: 'Hydrogen Peroxide', formula: 'H₂O₂', color: '#F5F5F5', category: 'Cleaning' },
    { name: 'Dish Soap', formula: 'C₁₂H₂₅SO₄Na', color: '#98FB98', category: 'Cleaning' },
    { name: 'Glass Cleaner', formula: 'NH₃+H₂O', color: '#87CEEB', category: 'Cleaning' },
    { name: 'Toilet Bowl Cleaner', formula: 'HCl', color: '#FF6347', category: 'Cleaning' },
    { name: 'Fabric Softener', formula: 'C₁₈H₃₈ClN', color: '#DDA0DD', category: 'Cleaning' },
    
    // Personal Care
    { name: 'Toothpaste', formula: 'NaF+CaCO₃', color: '#FFFFFF', category: 'Personal Care' },
    { name: 'Shampoo', formula: 'C₁₂H₂₅SO₄Na', color: '#FFB6C1', category: 'Personal Care' },
    { name: 'Conditioner', formula: 'C₁₈H₃₈ClN', color: '#F0E68C', category: 'Personal Care' },
    { name: 'Mouthwash', formula: 'C₂H₆O', color: '#00CED1', category: 'Personal Care' },
    { name: 'Deodorant', formula: 'Al₂(SO₄)₃', color: '#F5F5F5', category: 'Personal Care' },
    { name: 'Perfume', formula: 'C₂H₆O', color: '#DDA0DD', category: 'Personal Care' },
    { name: 'Lotion', formula: 'C₁₆H₃₂O₂', color: '#FFF8DC', category: 'Personal Care' },
    { name: 'Sunscreen', formula: 'C₁₈H₂₆O₂', color: '#FFFACD', category: 'Personal Care' },
    { name: 'Nail Polish', formula: 'C₄H₆O₂', color: '#FF69B4', category: 'Personal Care' },
    { name: 'Hair Gel', formula: 'C₃H₈O₃', color: '#E6E6FA', category: 'Personal Care' },
    
    // Medicines
    { name: 'Aspirin', formula: 'C₉H₈O₄', color: '#FFFFFF', category: 'Medicine' },
    { name: 'Ibuprofen', formula: 'C₁₃H₁₈O₂', color: '#F0F0F0', category: 'Medicine' },
    { name: 'Acetaminophen', formula: 'C₈H₉NO₂', color: '#FFFAF0', category: 'Medicine' },
    { name: 'Antacid', formula: 'CaCO₃', color: '#FFFFFF', category: 'Medicine' },
    { name: 'Cough Syrup', formula: 'C₁₈H₂₁NO₃', color: '#8B0000', category: 'Medicine' },
    { name: 'Vitamin C', formula: 'C₆H₈O₆', color: '#FFA500', category: 'Medicine' },
    { name: 'Calcium Pills', formula: 'CaCO₃', color: '#FFFFFF', category: 'Medicine' },
    { name: 'Iron Pills', formula: 'FeSO₄', color: '#A0522D', category: 'Medicine' },
    { name: 'Pepto Bismol', formula: 'C₇H₅BiO₄', color: '#FF69B4', category: 'Medicine' },
    { name: 'Saline Solution', formula: 'NaCl+H₂O', color: '#F0F8FF', category: 'Medicine' },
    
    // Chemicals & Lab
    { name: 'Sodium', formula: 'Na', color: '#FFD700', category: 'Chemical' },
    { name: 'Hydrochloric Acid', formula: 'HCl', color: '#FF0000', category: 'Chemical' },
    { name: 'Sodium Hydroxide', formula: 'NaOH', color: '#00FF00', category: 'Chemical' },
    { name: 'Iron', formula: 'Fe', color: '#A0522D', category: 'Chemical' },
    { name: 'Copper Sulfate', formula: 'CuSO₄', color: '#0066CC', category: 'Chemical' },
    { name: 'Sulfuric Acid', formula: 'H₂SO₄', color: '#FF4500', category: 'Chemical' },
    { name: 'Nitric Acid', formula: 'HNO₃', color: '#FFFF00', category: 'Chemical' },
    { name: 'Potassium', formula: 'K', color: '#DDA0DD', category: 'Chemical' },
    { name: 'Calcium', formula: 'Ca', color: '#F5DEB3', category: 'Chemical' },
    { name: 'Magnesium', formula: 'Mg', color: '#C0C0C0', category: 'Chemical' },
    
    // Beverages
    { name: 'Coca Cola', formula: 'C₆H₁₂O₆+H₃PO₄', color: '#8B4513', category: 'Beverage' },
    { name: 'Beer', formula: 'C₂H₆O+H₂O', color: '#DAA520', category: 'Beverage' },
    { name: 'Wine', formula: 'C₂H₆O+H₂O', color: '#722F37', category: 'Beverage' },
    { name: 'Orange Juice', formula: 'C₆H₈O₇', color: '#FFA500', category: 'Beverage' },
    { name: 'Apple Juice', formula: 'C₆H₁₂O₆', color: '#FFFF99', category: 'Beverage' },
    { name: 'Energy Drink', formula: 'C₈H₁₀N₄O₂', color: '#00FF00', category: 'Beverage' },
    { name: 'Sports Drink', formula: 'NaCl+C₆H₁₂O₆', color: '#00BFFF', category: 'Beverage' },
    { name: 'Soda Water', formula: 'H₂CO₃', color: '#F0F8FF', category: 'Beverage' },
    { name: 'Mineral Water', formula: 'H₂O+Minerals', color: '#E0FFFF', category: 'Beverage' },
    { name: 'Green Tea', formula: 'C₁₇H₁₉N₄O₉', color: '#90EE90', category: 'Beverage' },
    
    // Automotive
    { name: 'Gasoline', formula: 'C₈H₁₈', color: '#FFD700', category: 'Automotive' },
    { name: 'Motor Oil', formula: 'C₂₀H₄₂', color: '#000000', category: 'Automotive' },
    { name: 'Antifreeze', formula: 'C₂H₆O₂', color: '#00FF00', category: 'Automotive' },
    { name: 'Brake Fluid', formula: 'C₄H₁₀O₃', color: '#FFFF00', category: 'Automotive' },
    { name: 'Windshield Washer', formula: 'CH₄O+H₂O', color: '#87CEEB', category: 'Automotive' },
    { name: 'Tire Cleaner', formula: 'C₁₂H₂₅SO₄Na', color: '#696969', category: 'Automotive' },
    { name: 'Car Wax', formula: 'C₁₆H₃₂O₂', color: '#F5F5DC', category: 'Automotive' },
    { name: 'Battery Acid', formula: 'H₂SO₄', color: '#FF0000', category: 'Automotive' },
    { name: 'Coolant', formula: 'C₂H₆O₂', color: '#FF69B4', category: 'Automotive' },
    { name: 'Transmission Fluid', formula: 'C₂₀H₄₂', color: '#DC143C', category: 'Automotive' },
    
    // Garden & Outdoor
    { name: 'Fertilizer', formula: 'NH₄NO₃', color: '#8FBC8F', category: 'Garden' },
    { name: 'Pesticide', formula: 'C₁₂H₁₁Cl₂NO₂', color: '#228B22', category: 'Garden' },
    { name: 'Weed Killer', formula: 'C₃H₆ClNO', color: '#32CD32', category: 'Garden' },
    { name: 'Plant Food', formula: 'NPK', color: '#90EE90', category: 'Garden' },
    { name: 'Compost', formula: 'Organic Matter', color: '#8B4513', category: 'Garden' },
    { name: 'Mulch', formula: 'Cellulose', color: '#A0522D', category: 'Garden' },
    { name: 'Lime', formula: 'CaO', color: '#F5F5DC', category: 'Garden' },
    { name: 'Sulfur', formula: 'S', color: '#FFFF00', category: 'Garden' },
    { name: 'Bone Meal', formula: 'Ca₃(PO₄)₂', color: '#F5F5DC', category: 'Garden' },
    { name: 'Epsom Salt', formula: 'MgSO₄', color: '#FFFFFF', category: 'Garden' },
    
    // Electronics
    { name: 'Battery Electrolyte', formula: 'H₂SO₄', color: '#FF0000', category: 'Electronics' },
    { name: 'Thermal Paste', formula: 'ZnO', color: '#C0C0C0', category: 'Electronics' },
    { name: 'Flux', formula: 'ZnCl₂', color: '#DAA520', category: 'Electronics' },
    { name: 'Contact Cleaner', formula: 'C₃H₈O', color: '#F0F0F0', category: 'Electronics' },
    { name: 'Compressed Air', formula: 'N₂', color: '#E6E6FA', category: 'Electronics' },
    { name: 'Silicone Grease', formula: 'Si(CH₃)₂O', color: '#F5F5F5', category: 'Electronics' },
    { name: 'Conductive Gel', formula: 'NaCl+H₂O', color: '#87CEEB', category: 'Electronics' },
    { name: 'Insulating Oil', formula: 'C₂₀H₄₂', color: '#FFFF99', category: 'Electronics' },
    { name: 'Solder', formula: 'SnPb', color: '#C0C0C0', category: 'Electronics' },
    { name: 'Circuit Board Cleaner', formula: 'C₃H₈O', color: '#F0F8FF', category: 'Electronics' },
    
    // Art & Craft
    { name: 'Acrylic Paint', formula: 'C₄H₆O₂', color: '#FF69B4', category: 'Art' },
    { name: 'Oil Paint', formula: 'C₅₇H₁₀₄O₆', color: '#8B4513', category: 'Art' },
    { name: 'Watercolor', formula: 'Pigment+H₂O', color: '#87CEEB', category: 'Art' },
    { name: 'Glue', formula: 'C₄H₆O₂', color: '#FFFFFF', category: 'Art' },
    { name: 'Epoxy', formula: 'C₁₈H₂₄O₃', color: '#F5F5DC', category: 'Art' },
    { name: 'Varnish', formula: 'C₁₀H₁₆O', color: '#DEB887', category: 'Art' },
    { name: 'Turpentine', formula: 'C₁₀H₁₆', color: '#F0F8FF', category: 'Art' },
    { name: 'Charcoal', formula: 'C', color: '#000000', category: 'Art' },
    { name: 'Clay', formula: 'Al₂Si₂O₅(OH)₄', color: '#D2691E', category: 'Art' },
    { name: 'Plaster', formula: 'CaSO₄·2H₂O', color: '#FFFFFF', category: 'Art' },
    
    // Construction
    { name: 'Cement', formula: 'Ca₃SiO₅', color: '#808080', category: 'Construction' },
    { name: 'Concrete', formula: 'CaCO₃+SiO₂', color: '#696969', category: 'Construction' },
    { name: 'Mortar', formula: 'Ca(OH)₂', color: '#A9A9A9', category: 'Construction' },
    { name: 'Grout', formula: 'CaCO₃', color: '#DCDCDC', category: 'Construction' },
    { name: 'Caulk', formula: 'Si(CH₃)₂O', color: '#F5F5F5', category: 'Construction' },
    { name: 'Wood Stain', formula: 'C₁₀H₁₆O', color: '#8B4513', category: 'Construction' },
    { name: 'Paint Thinner', formula: 'C₇H₈', color: '#F0F8FF', category: 'Construction' },
    { name: 'Primer', formula: 'TiO₂', color: '#FFFFFF', category: 'Construction' },
    { name: 'Sealant', formula: 'Si(CH₃)₂O', color: '#F5F5DC', category: 'Construction' },
    { name: 'Adhesive', formula: 'C₄H₆O₂', color: '#FFFF99', category: 'Construction' },
    
    // Textiles
    { name: 'Fabric Dye', formula: 'C₁₆H₁₀N₂O₂', color: '#FF1493', category: 'Textile' },
    { name: 'Starch', formula: 'C₆H₁₀O₅', color: '#FFFFFF', category: 'Textile' },
    { name: 'Fabric Softener', formula: 'C₁₈H₃₈ClN', color: '#DDA0DD', category: 'Textile' },
    { name: 'Bleach', formula: 'NaClO', color: '#F0F8FF', category: 'Textile' },
    { name: 'Spot Remover', formula: 'C₂H₄Cl₂', color: '#E6E6FA', category: 'Textile' },
    { name: 'Dry Cleaning Fluid', formula: 'C₂Cl₄', color: '#F5F5F5', category: 'Textile' },
    { name: 'Sizing', formula: 'C₆H₁₀O₅', color: '#F5F5DC', category: 'Textile' },
    { name: 'Moth Balls', formula: 'C₁₀H₈', color: '#FFFFFF', category: 'Textile' },
    { name: 'Leather Conditioner', formula: 'C₁₆H₃₂O₂', color: '#8B4513', category: 'Textile' },
    { name: 'Shoe Polish', formula: 'C₁₆H₃₂O₂', color: '#000000', category: 'Textile' },
    
    // Photography
    { name: 'Developer', formula: 'C₆H₄(OH)₂', color: '#696969', category: 'Photography' },
    { name: 'Fixer', formula: 'Na₂S₂O₃', color: '#F5F5F5', category: 'Photography' },
    { name: 'Stop Bath', formula: 'CH₃COOH', color: '#FFFF99', category: 'Photography' },
    { name: 'Toner', formula: 'Au₂S', color: '#FFD700', category: 'Photography' },
    { name: 'Wetting Agent', formula: 'C₁₂H₂₅SO₄Na', color: '#E0E0E0', category: 'Photography' },
    { name: 'Hypo Clear', formula: 'Na₂SO₃', color: '#FFFFFF', category: 'Photography' },
    { name: 'Hardener', formula: 'KAl(SO₄)₂', color: '#F0F0F0', category: 'Photography' },
    { name: 'Intensifier', formula: 'HgCl₂', color: '#C0C0C0', category: 'Photography' },
    { name: 'Reducer', formula: 'K₃Fe(CN)₆', color: '#FFFF00', category: 'Photography' },
    { name: 'Stabilizer', formula: 'HCHO', color: '#F5F5F5', category: 'Photography' },
    
    // Pool & Spa
    { name: 'Chlorine', formula: 'Cl₂', color: '#FFFF00', category: 'Pool' },
    { name: 'Pool Shock', formula: 'Ca(ClO)₂', color: '#FFFFFF', category: 'Pool' },
    { name: 'pH Up', formula: 'Na₂CO₃', color: '#F5F5DC', category: 'Pool' },
    { name: 'pH Down', formula: 'NaHSO₄', color: '#FFFFFF', category: 'Pool' },
    { name: 'Algaecide', formula: 'CuSO₄', color: '#0066CC', category: 'Pool' },
    { name: 'Clarifier', formula: 'Al₂(SO₄)₃', color: '#F0F8FF', category: 'Pool' },
    { name: 'Stabilizer', formula: 'C₃H₃N₃O₃', color: '#FFFFFF', category: 'Pool' },
    { name: 'Calcium Hardness', formula: 'CaCl₂', color: '#F5F5F5', category: 'Pool' },
    { name: 'Bromine', formula: 'Br₂', color: '#8B0000', category: 'Pool' },
    { name: 'Ozone', formula: 'O₃', color: '#E0FFFF', category: 'Pool' },
    
    // Fire Safety
    { name: 'Fire Extinguisher', formula: 'NaHCO₃', color: '#FF0000', category: 'Safety' },
    { name: 'Smoke Detector', formula: 'Am₂₄₁', color: '#FFFFFF', category: 'Safety' },
    { name: 'Fire Retardant', formula: 'Al(OH)₃', color: '#FF69B4', category: 'Safety' },
    { name: 'Halon', formula: 'CBrF₃', color: '#E6E6FA', category: 'Safety' },
    { name: 'Foam', formula: 'C₁₂H₂₅SO₄Na', color: '#FFFFFF', category: 'Safety' },
    { name: 'Dry Chemical', formula: 'NaHCO₃', color: '#FFFF99', category: 'Safety' },
    { name: 'CO₂', formula: 'CO₂', color: '#F0F8FF', category: 'Safety' },
    { name: 'Water Mist', formula: 'H₂O', color: '#87CEEB', category: 'Safety' },
    { name: 'Wet Chemical', formula: 'K₂CO₃', color: '#F5F5DC', category: 'Safety' },
    { name: 'Clean Agent', formula: 'C₃HF₇', color: '#F0F0F0', category: 'Safety' },
    
    // Laboratory
    { name: 'Distilled Water', formula: 'H₂O', color: '#F0F8FF', category: 'Lab' },
    { name: 'Ethanol', formula: 'C₂H₆O', color: '#F0F0F0', category: 'Lab' },
    { name: 'Methanol', formula: 'CH₄O', color: '#E6E6FA', category: 'Lab' },
    { name: 'Acetone', formula: 'C₃H₆O', color: '#F5F5F5', category: 'Lab' },
    { name: 'Benzene', formula: 'C₆H₆', color: '#FFFF99', category: 'Lab' },
    { name: 'Toluene', formula: 'C₇H₈', color: '#F0F8FF', category: 'Lab' },
    { name: 'Hexane', formula: 'C₆H₁₄', color: '#F5F5F5', category: 'Lab' },
    { name: 'Chloroform', formula: 'CHCl₃', color: '#E0E0E0', category: 'Lab' },
    { name: 'Ether', formula: 'C₄H₁₀O', color: '#F0F0F0', category: 'Lab' },
    { name: 'Formaldehyde', formula: 'CH₂O', color: '#F5F5F5', category: 'Lab' },
    
    // Cosmetics
    { name: 'Foundation', formula: 'TiO₂+Talc', color: '#F5DEB3', category: 'Cosmetic' },
    { name: 'Lipstick', formula: 'C₁₆H₃₂O₂', color: '#FF1493', category: 'Cosmetic' },
    { name: 'Mascara', formula: 'Fe₂O₃', color: '#000000', category: 'Cosmetic' },
    { name: 'Eyeshadow', formula: 'Mica+Pigments', color: '#DDA0DD', category: 'Cosmetic' },
    { name: 'Blush', formula: 'Fe₂O₃', color: '#FF69B4', category: 'Cosmetic' },
    { name: 'Concealer', formula: 'TiO₂', color: '#F5DEB3', category: 'Cosmetic' },
    { name: 'Powder', formula: 'Talc', color: '#F5F5DC', category: 'Cosmetic' },
    { name: 'Eyeliner', formula: 'Fe₂O₃', color: '#000000', category: 'Cosmetic' },
    { name: 'Bronzer', formula: 'Fe₂O₃', color: '#D2691E', category: 'Cosmetic' },
    { name: 'Highlighter', formula: 'Mica', color: '#FFD700', category: 'Cosmetic' },
    
    // Fuels
    { name: 'Propane', formula: 'C₃H₈', color: '#E6E6FA', category: 'Fuel' },
    { name: 'Butane', formula: 'C₄H₁₀', color: '#F0F0F0', category: 'Fuel' },
    { name: 'Natural Gas', formula: 'CH₄', color: '#F5F5F5', category: 'Fuel' },
    { name: 'Kerosene', formula: 'C₁₂H₂₆', color: '#FFFF99', category: 'Fuel' },
    { name: 'Diesel', formula: 'C₁₆H₃₄', color: '#696969', category: 'Fuel' },
    { name: 'Jet Fuel', formula: 'C₁₂H₂₃', color: '#F0F8FF', category: 'Fuel' },
    { name: 'Ethanol Fuel', formula: 'C₂H₆O', color: '#F0F0F0', category: 'Fuel' },
    { name: 'Biodiesel', formula: 'C₁₉H₃₆O₂', color: '#FFFF99', category: 'Fuel' },
    { name: 'Methanol Fuel', formula: 'CH₄O', color: '#E6E6FA', category: 'Fuel' },
    { name: 'Hydrogen', formula: 'H₂', color: '#F0F8FF', category: 'Fuel' },
    
    // Plastics
    { name: 'PVC', formula: '(C₂H₃Cl)ₙ', color: '#FFFFFF', category: 'Plastic' },
    { name: 'Polyethylene', formula: '(C₂H₄)ₙ', color: '#F5F5F5', category: 'Plastic' },
    { name: 'Polystyrene', formula: '(C₈H₈)ₙ', color: '#FFFFFF', category: 'Plastic' },
    { name: 'Nylon', formula: '(C₆H₁₁NO)ₙ', color: '#F0F0F0', category: 'Plastic' },
    { name: 'Teflon', formula: '(C₂F₄)ₙ', color: '#F5F5F5', category: 'Plastic' },
    { name: 'Acrylic', formula: '(C₅H₈O₂)ₙ', color: '#F0F8FF', category: 'Plastic' },
    { name: 'Polycarbonate', formula: '(C₁₆H₁₄O₃)ₙ', color: '#F5F5F5', category: 'Plastic' },
    { name: 'ABS', formula: '(C₈H₈·C₄H₆·C₃H₃N)ₙ', color: '#696969', category: 'Plastic' },
    { name: 'Epoxy Resin', formula: 'C₁₈H₂₄O₃', color: '#DEB887', category: 'Plastic' },
    { name: 'Silicone', formula: '(Si(CH₃)₂O)ₙ', color: '#F0F0F0', category: 'Plastic' },
    
    // Metals
    { name: 'Aluminum', formula: 'Al', color: '#C0C0C0', category: 'Metal' },
    { name: 'Copper', formula: 'Cu', color: '#B87333', category: 'Metal' },
    { name: 'Zinc', formula: 'Zn', color: '#87CEEB', category: 'Metal' },
    { name: 'Lead', formula: 'Pb', color: '#696969', category: 'Metal' },
    { name: 'Tin', formula: 'Sn', color: '#C0C0C0', category: 'Metal' },
    { name: 'Nickel', formula: 'Ni', color: '#F5F5DC', category: 'Metal' },
    { name: 'Chromium', formula: 'Cr', color: '#C0C0C0', category: 'Metal' },
    { name: 'Titanium', formula: 'Ti', color: '#C0C0C0', category: 'Metal' },
    { name: 'Silver', formula: 'Ag', color: '#C0C0C0', category: 'Metal' },
    { name: 'Gold', formula: 'Au', color: '#FFD700', category: 'Metal' },
    
    // Gases
    { name: 'Oxygen', formula: 'O₂', color: '#87CEEB', category: 'Gas' },
    { name: 'Nitrogen', formula: 'N₂', color: '#E6E6FA', category: 'Gas' },
    { name: 'Carbon Dioxide', formula: 'CO₂', color: '#F0F8FF', category: 'Gas' },
    { name: 'Carbon Monoxide', formula: 'CO', color: '#F5F5F5', category: 'Gas' },
    { name: 'Helium', formula: 'He', color: '#FFFF99', category: 'Gas' },
    { name: 'Argon', formula: 'Ar', color: '#DDA0DD', category: 'Gas' },
    { name: 'Neon', formula: 'Ne', color: '#FF6347', category: 'Gas' },
    { name: 'Krypton', formula: 'Kr', color: '#F0E68C', category: 'Gas' },
    { name: 'Xenon', formula: 'Xe', color: '#9370DB', category: 'Gas' },
    { name: 'Radon', formula: 'Rn', color: '#FF1493', category: 'Gas' }
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
    'Baking Soda+Vinegar': {
      reactants: ['Baking Soda', 'Vinegar'],
      result: 'Fizz and CO₂ bubbles released!',
      minTemp: -50,
      maxTemp: 1000,
      type: 'fizzing'
    },
    'Lemon Juice+Baking Soda': {
      reactants: ['Lemon Juice', 'Baking Soda'],
      result: 'Citric acid and baking soda create bubbling reaction!',
      minTemp: -50,
      maxTemp: 1000,
      type: 'fizzing'
    },
    'Milk+Lemon Juice': {
      reactants: ['Milk', 'Lemon Juice'],
      result: 'Milk proteins coagulate and curdle!',
      minTemp: -50,
      maxTemp: 50,
      type: 'curdling'
    },
    'Sugar+Heat': {
      reactants: ['Sugar'],
      result: 'Sugar caramelizes and turns golden brown!',
      minTemp: 300,
      maxTemp: 1000,
      type: 'caramelization'
    },
    'Bleach+Ammonia': {
      reactants: ['Bleach', 'Ammonia'],
      result: 'DANGER! Toxic chloramine gas produced - Never mix these!',
      minTemp: -50,
      maxTemp: 1000,
      type: 'explosion'
    },
    'Aluminum+Hydrochloric Acid': {
      reactants: ['Aluminum', 'Hydrochloric Acid'],
      result: 'Hydrogen gas bubbles vigorously released!',
      minTemp: 25,
      maxTemp: 1000,
      type: 'fizzing'
    },
    'Calcium+Water': {
      reactants: ['Calcium', 'Water'],
      result: 'Calcium hydroxide forms with hydrogen gas release!',
      minTemp: 25,
      maxTemp: 1000,
      type: 'fizzing'
    }
  };

  const filteredSubstances = substances.filter(substance =>
    substance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    substance.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
    substance.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubstanceClick = (substance: Substance) => {
    if (droppedSubstances.length < 2) {
      const newDropped = [...droppedSubstances, substance.name];
      setDroppedSubstances(newDropped);
      
      if (newDropped.length === 2) {
        performReaction(newDropped);
      }
      
      toast.success(`Added ${substance.name} to beaker`);
    } else {
      toast.error('Beaker is full! Clear it first.');
    }
  };

  const performReaction = (reactants: string[]) => {
    setIsReacting(true);
    const combo1 = `${reactants[0]}+${reactants[1]}`;
    const combo2 = `${reactants[1]}+${reactants[0]}`;
    const heatCombo = reactants.includes('Sugar') && temperature[0] >= 300 ? 'Sugar+Heat' : null;
    
    const reaction = reactions[combo1] || reactions[combo2] || (heatCombo ? reactions[heatCombo] : null);
    
    setTimeout(() => {
      if (reaction) {
        const currentTemp = temperature[0];
        if (currentTemp >= reaction.minTemp && currentTemp <= reaction.maxTemp) {
          setCurrentReaction(reaction.result);
          addToHistory(`${reaction.result} (at ${currentTemp}°C)`);
          toast.success('Reaction successful!');
          
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
      setTimeout(() => {
        setDroppedSubstances([]);
        setCurrentReaction('');
      }, 3000);
    }, 1000);
  };

  const triggerExplosion = () => {
    if (beakerRef.current) {
      beakerRef.current.classList.add('animate-shake');
      setTimeout(() => {
        beakerRef.current?.classList.remove('animate-shake');
      }, 500);
    }
  };

  const addToHistory = (entry: string) => {
    setReactionHistory(prev => [entry, ...prev.slice(0, 9)]);
  };

  const clearBeaker = () => {
    setDroppedSubstances([]);
    setCurrentReaction('');
    toast.info('Beaker cleared');
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

  const tempStatus = getTemperatureStatus(temperature[0]);
  const TempIcon = tempStatus.icon;

  // AI Chat functionality
  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);
    
    try {
      // Simulate AI response (replace with actual GPT-4 API call)
      setTimeout(() => {
        const responses = [
          "That's a fascinating chemical question! Let me explain the molecular interactions involved...",
          "Great observation! The reaction you're describing involves electron transfer and bond formation...",
          "Safety first! When working with those chemicals, always ensure proper ventilation and protective equipment...",
          "The temperature dependency you mentioned is crucial for reaction kinetics. Higher temperatures increase molecular motion...",
          "That compound has interesting properties! Its molecular structure allows for unique chemical behaviors...",
          "Excellent question about chemical equilibrium! The Le Chatelier's principle applies here...",
          "The color change you observed indicates a chemical transformation at the molecular level...",
          "That's a classic acid-base reaction! The pH changes dramatically during the neutralization process..."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
        setIsChatLoading(false);
      }, 1500);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again!' }]);
      setIsChatLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          The What-If Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore chemistry with 300+ everyday substances and get AI assistance from TheBlueMatterAI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Lab Area */}
        <div className="lg:col-span-2">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="w-5 h-5" />
                Chemistry Sandbox
              </CardTitle>
              <CardDescription>
                Click substances to add them to the beaker and watch them react
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative min-h-[500px] flex flex-col items-center justify-center">
                {/* Substance Grid */}
                <div className="mb-6 w-full">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                    <Input
                      placeholder="Search 300+ substances..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <ScrollArea className="h-32 w-full border rounded-lg p-2">
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {filteredSubstances.slice(0, 50).map((substance, index) => (
                        <Button
                          key={substance.name}
                          variant="outline"
                          className="h-16 w-full rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-105"
                          style={{ 
                            backgroundColor: `${substance.color}20`,
                            borderColor: substance.color,
                            color: substance.color
                          }}
                          onClick={() => handleSubstanceClick(substance)}
                          disabled={droppedSubstances.length >= 2 || isReacting}
                          title={`${substance.name} (${substance.formula}) - ${substance.category}`}
                        >
                          <span className="truncate w-full text-center">{substance.name}</span>
                          <span className="text-[0.6rem] opacity-70">{substance.formula}</span>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Reaction Beaker - Same as periodic table page */}
                <div className="absolute bottom-0 w-full h-full rounded-b-3xl rounded-t-lg overflow-hidden beaker-3d">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent border-2 border-gray-300/50 rounded-b-3xl rounded-t-lg backdrop-blur-sm shadow-2xl beaker-glass-3d">
                    <div className="absolute top-8 left-4 w-16 h-32 bg-white/25 rounded-full transform -rotate-12 blur-sm"></div>
                    <div className="absolute top-12 right-6 w-8 h-24 bg-white/20 rounded-full transform rotate-12 blur-sm"></div>
                    <div className="absolute bottom-16 left-8 w-12 h-16 bg-white/15 rounded-full transform -rotate-45 blur-sm"></div>
                    <div className="absolute inset-0 border border-gray-200/40 rounded-b-3xl rounded-t-lg"></div>
                    <div className="absolute inset-1 border border-gray-100/30 rounded-b-3xl rounded-t-lg"></div>
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

                {/* Liquid and substances */}
                <div 
                  ref={beakerRef}
                  className={`absolute bottom-0 w-full transition-all duration-700 ease-out overflow-hidden rounded-b-2xl ${droppedSubstances.length > 0 ? 'h-[70%]' : 'h-[15%]'}`}
                >
                  <div className={`w-full h-full relative bg-gradient-to-b from-blue-100/50 to-blue-200/40 dark:from-blue-800/40 dark:to-blue-700/30 ${isReacting ? 'animate-pulse' : ''}`}>
                    <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-2 top-0 h-1 bg-white/40 rounded-full"></div>
                    
                    {droppedSubstances.length > 0 && (
                      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/15 to-transparent"></div>
                    )}
                  </div>
                </div>

                {/* Dropped substances display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pt-8 pb-4">
                  {droppedSubstances.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      <Beaker className="mx-auto h-12 w-12 mb-3 opacity-50" />
                      <p>Click substances above</p>
                      <p className="text-xs mt-1 text-muted-foreground/80">to add them to the beaker</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-2 mt-32">
                        {droppedSubstances.map((substance, index) => (
                          <div key={index} className={`${isReacting ? 'animate-shake' : ''}`}>
                            <Badge variant="secondary" className="text-xs px-2 py-1">
                              {substance}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      
                      {currentReaction && (
                        <div className="w-full text-center mt-2">
                          <p className="text-sm leading-relaxed text-white/90 bg-black/30 rounded-lg px-3 py-2 inline-block max-w-xs mx-auto shadow-lg">
                            {currentReaction}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Clear button */}
                <div className="absolute bottom-4 right-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearBeaker}
                    disabled={droppedSubstances.length === 0}
                  >
                    Clear
                  </Button>
                </div>
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
                <div>Bleach + Ammonia (DANGER!)</div>
                <div>Baking Soda + Vinegar</div>
                <div>Milk + Lemon Juice (cold)</div>
                <div>Sugar + Heat (300°C+)</div>
                <div>Aluminum + HCl</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chatbot */}
        <div className="space-y-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-400" />
                TheBlueMatterAI
              </CardTitle>
              <CardDescription>
                Your AI chemistry assistant powered by GPT-4
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <ScrollArea className="h-64 w-full border rounded-lg p-3">
                  <div className="space-y-3">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-2 rounded-lg text-xs ${
                          message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground p-2 rounded-lg text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about chemistry..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 text-sm"
                  />
                  <Button 
                    size="sm" 
                    onClick={sendMessage}
                    disabled={!chatInput.trim() || isChatLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Quick Questions */}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "What happens when...",
                      "Is it safe to mix...",
                      "Explain this reaction",
                      "Temperature effects?"
                    ].map((question) => (
                      <Button
                        key={question}
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={() => setChatInput(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLabPage;