import React, { useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { AIDesignConfigurator } from './AIDesignConfigurator';

const CakeModel = ({ color, shape, materialType, texture }: { color: string; shape: string; materialType: string; texture: string | null }) => {
  const textureObj = useMemo(() => {
    if (!texture) return null;
    const loader = new THREE.TextureLoader();
    return loader.load(texture);
  }, [texture]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        {shape === 'cylinder' && <cylinderGeometry args={[1, 1, 1, 64]} />}
        {shape === 'box' && <boxGeometry args={[1.6, 1, 1.6]} />}
        <meshPhysicalMaterial 
          color={color} 
          map={textureObj}
          roughness={materialType === 'cream' ? 0.1 : 0.6}
          metalness={materialType === 'chocolate' ? 0.3 : 0}
          clearcoat={materialType === 'cream' ? 1 : 0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

export const CakeConfigurator = () => {
  const [activeTab, setActiveTab] = useState<'3d' | 'ai'>('3d');
  const [color, setColor] = useState('#C89B3C');
  const [shape, setShape] = useState('cylinder');
  const [materialType, setMaterialType] = useState('cake'); // cake, cream, chocolate
  const [texture, setTexture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTexture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-10 font-sans">
      <div className="flex bg-[#F4EFE6] rounded-full p-1 w-fit">
        <button onClick={() => setActiveTab('3d')} className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition ${activeTab === '3d' ? 'bg-white shadow-md text-[#2B5B43]' : 'text-[#8C7A6B]'}`}>3D Design</button>
        <button onClick={() => setActiveTab('ai')} className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition ${activeTab === 'ai' ? 'bg-white shadow-md text-[#2B5B43]' : 'text-[#8C7A6B]'}`}>AI Generation</button>
      </div>

      {activeTab === 'ai' ? <AIDesignConfigurator /> : (
        <div className="flex flex-col lg:flex-row gap-12 p-8 lg:p-12 bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(59,37,22,0.08)] border border-[#E5DCC5]">
          <div className="w-full lg:w-2/3 min-h-[500px] lg:min-h-[700px] bg-gradient-to-b from-[#FAF7F0] to-[#F4EFE6] rounded-3xl overflow-hidden relative border border-[#E5DCC5]/50">
            <Canvas shadows camera={{ position: [0, 2, 4], fov: 45 }}>
              <ambientLight intensity={0.4} />
              <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} castShadow />
              <CakeModel color={color} shape={shape} materialType={materialType} texture={texture} />
              <ContactShadows resolution={1024} scale={6} blur={3} opacity={0.4} far={4} color="#3B2516" />
              <Environment preset="city" />
              <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} autoRotate autoRotateSpeed={0.5} enablePan={false} />
            </Canvas>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col gap-10 lg:py-6">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-[#3B2516]">Craft Your Masterpiece</h2>
            
            <div className="space-y-5">
              <label className="block text-sm font-bold uppercase tracking-widest text-[#8C7A6B]">Structure</label>
              <select value={shape} onChange={(e) => setShape(e.target.value)} className="w-full p-5 rounded-2xl bg-[#FCF9F2] text-[#3B2516] border-2 border-transparent transition-all font-medium focus:border-[#C89B3C] focus:bg-white outline-none cursor-pointer appearance-none shadow-sm">
                <option value="cylinder">Classic Tier (Cylinder)</option>
                <option value="box">Modern Block (Square)</option>
              </select>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-bold uppercase tracking-widest text-[#8C7A6B]">Surface Material</label>
              <select value={materialType} onChange={(e) => setMaterialType(e.target.value)} className="w-full p-5 rounded-2xl bg-[#FCF9F2] text-[#3B2516] border-2 border-transparent transition-all font-medium focus:border-[#C89B3C] focus:bg-white outline-none cursor-pointer appearance-none shadow-sm">
                <option value="cake">Velvet Matte</option>
                <option value="cream">Silky Buttercream</option>
                <option value="chocolate">Mirror Glaze Chocolate</option>
              </select>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-bold uppercase tracking-widest text-[#8C7A6B]">Base Color</label>
              <div className="flex items-center gap-4 bg-[#FCF9F2] p-3 rounded-2xl border-2 border-transparent focus-within:border-[#C89B3C] focus-within:bg-white transition-all shadow-sm">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-14 h-14 rounded-xl cursor-pointer bg-transparent border-none p-0" />
                <span className="font-mono text-[#8C7A6B] font-medium">{color.toUpperCase()}</span>
              </div>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-bold uppercase tracking-widest text-[#8C7A6B]">Custom Artwork</label>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full p-6 bg-[#FCF9F2] rounded-2xl font-medium text-center border-2 border-dashed border-[#C89B3C]/40 hover:border-[#C89B3C] hover:bg-[#FAF7F0] transition-colors text-[#3B2516] shadow-sm flex flex-col items-center justify-center gap-2">
                {texture ? (
                   <span className="text-[#2B5B43] font-semibold">Image Uploaded Successfully</span>
                ) : (
                   <>
                     <span className="text-[#C89B3C]">+ Upload Image Overlay</span>
                     <span className="text-xs text-[#8C7A6B] font-normal">Apply photos or patterns directly onto the cake</span>
                   </>
                )}
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
