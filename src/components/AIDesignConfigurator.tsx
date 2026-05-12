import React, { useState, useRef } from 'react';
import { Sparkles, Upload, Loader2, Send, X } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const AIDesignConfigurator = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCake, setGeneratedCake] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages(prev => {
             const newImages = [...prev, event.target?.result as string];
             return newImages.slice(0, 2); // limit to 2
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && images.length === 0) return;
    
    setIsGenerating(true);
    setGeneratedCake(null);
    
    try {
      const parts: any[] = [];
      images.forEach(img => {
        const mimeType = img.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';
        const base64Data = img.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType,
          }
        });
      });
      
      parts.push({
        text: (prompt || "A beautiful cake") + "\nGenerate a high-quality photo of a bespoke cake design following this description and reference images if provided.",
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts,
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let loadedImg = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          loadedImg = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
      
      if (loadedImg) {
        setGeneratedCake(loadedImg);
      } else {
        alert("Could not generate image. Please try again.");
      }
    } catch (e) {
      console.error("AI Generation error:", e);
      alert("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-12 bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-[0_30px_60px_rgba(59,37,22,0.08)] border border-[#E5DCC5]">
      <div className="flex flex-col gap-10 flex-1">
        <h3 className="text-4xl md:text-5xl font-medium tracking-tighter text-[#3B2516]">AI Cake Designer</h3>
        <p className="text-lg text-[#8C7A6B]">Bring your wildest cake dreams to life. Describe your vision, upload an inspiration, and let our AI craft your bespoke design.</p>
        
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-end">
            <label className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B]">Inspiration Images <span className="text-xs font-normal normal-case opacity-70">(Optional, up to 2)</span></label>
            {images.length > 0 && images.length < 2 && (
              <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-[#C89B3C] hover:text-[#B08530]">
                + ADD ANOTHER
              </button>
            )}
          </div>
          
          {images.length > 0 ? (
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-1/2 rounded-[2rem] border-2 border-dashed border-[#C89B3C]/40 bg-[#FCF9F2] h-48 md:h-[300px] overflow-hidden group">
                   <img src={img} className="w-full h-full object-contain p-2 rounded-[2rem]" alt={`Reference ${idx + 1}`}/>
                   <button 
                     onClick={(e) => removeImage(idx, e)}
                     className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-[#3B2516] hover:bg-white hover:text-red-500 transition shadow-sm opacity-0 group-hover:opacity-100"
                   >
                     <X size={16} />
                   </button>
                </div>
              ))}
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#C89B3C]/40 rounded-[2rem] h-48 md:h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-[#C89B3C] hover:bg-[#FAF7F0] transition bg-[#FCF9F2]">
              <div className="text-[#8C7A6B] flex flex-col items-center gap-3"><Upload size={32} className="text-[#C89B3C]" /> <span className="font-semibold text-lg text-[#3B2516]">Upload Inspiration</span><span className="text-sm">Drag and drop or click</span></div>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" multiple className="hidden" />
        </div>

        <div className="flex flex-col gap-5">
          <label className="text-sm font-bold uppercase tracking-widest text-[#8C7A6B]">Design Vision</label>
          <textarea 
            placeholder="E.g. A three-tier wedding cake adorned with edible gold leaf, cascading sugar orchids in blush pink, and a velvet matte finish..." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-8 rounded-[2rem] border-2 border-transparent bg-[#FCF9F2] text-[#3B2516] h-40 md:h-48 font-medium focus:border-[#C89B3C] focus:bg-white outline-none resize-none placeholder:text-[#8C7A6B]/50 transition-all text-lg shadow-sm"
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          className="w-full py-6 mt-4 bg-[#2B5B43] text-white rounded-[2rem] font-bold flex items-center justify-center gap-3 uppercase tracking-widest text-sm hover:bg-[#1E4330] transition shadow-xl shadow-[#2B5B43]/20"
          disabled={isGenerating || !prompt}
        >
          {isGenerating ? <Loader2 className="animate-spin w-6 h-6" /> : <><Sparkles size={20} /> Generate Masterpiece</>}
        </motion.button>
      </div>

      <div className="flex flex-col min-h-[400px] md:min-h-[600px] items-center justify-center bg-gradient-to-br from-[#FAF7F0] to-[#F4EFE6] rounded-[2.5rem] p-8 border border-[#E5DCC5]/50 flex-1 relative overflow-hidden">
        {generatedCake ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-10 w-full h-full justify-between z-10">
            <div className="flex-1 rounded-[2rem] overflow-hidden shadow-2xl relative border-8 border-white group">
              <img src={generatedCake} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Generated Cake" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} className="w-full py-6 bg-[#3B2516] text-[#FCF9F2] rounded-[2rem] font-bold flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-xl hover:bg-[#2A1A0E] transition-colors">
               Request this Bespoke Design <Send size={18} />
            </motion.button>
          </motion.div>
        ) : (
          <div className="text-center text-[#8C7A6B] p-12 border-2 border-dashed border-[#E5DCC5] rounded-[2rem] w-full h-full flex flex-col items-center justify-center gap-6 relative z-10 bg-[#FCF9F2]/50 backdrop-blur-sm">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
              <Sparkles size={56} className="text-[#C89B3C]/40" />
            </motion.div>
            <p className="font-medium text-xl text-[#8C7A6B]/80 max-w-sm">Your AI-generated masterpiece will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
