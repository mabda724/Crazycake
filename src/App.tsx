/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, Sparkles, Cake, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CakeConfigurator } from './components/CakeConfigurator';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [showConfig, setShowConfig] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: '1', titleAr: 'بان كيك الزعفران', titleEn: 'Saffron Dream Cake', descAr: 'كيكة اسفنجية بالزعفران مع كريمة الفانيليا، مزينة بماء الورد والذهب الصالح للأكل.', descEn: 'Saffron sponge cake with vanilla cream, garnished with rose water and edible gold.', price: '320 SAR', category: 'cakes', image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&q=80&w=800' },
    { id: '2', titleAr: 'تارت التمر والفستق', titleEn: 'Date & Pistachio Tart', descAr: 'عجينة التارت الهشة المحشوة بتمور الخلاص الفاخرة والفستق الحلبي المقرمش.', descEn: 'Crispy tart crust filled with premium Khalas dates and crunchy Aleppo pistachios.', price: '180 SAR', category: 'tarts', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800' },
    { id: '3', titleAr: 'تشيز كيك البقلاوة', titleEn: 'Baklava Cheesecake', descAr: 'مزيج ساحر بين الجبن الكريمي وطبقات البقلاوة المقرمشة مع العسل الطبيعي والمكسرات.', descEn: 'A magical blend of cream cheese and crispy baklava layers with natural honey and nuts.', price: '250 SAR', category: 'cakes', image: 'https://images.unsplash.com/photo-1534432231-1555df3fb304?auto=format&fit=crop&q=80&w=800' },
    { id: '4', titleAr: 'صندوق شوكولاتة الهيل', titleEn: 'Cardamom Chocolate', descAr: 'حبات شوكولاتة بلجيكية فاخرة محشوة بغاناش الهيل والقهوة العربية الخالصة.', descEn: 'Premium Belgian chocolate truffles filled with cardamom and pure Arabic coffee ganache.', price: '150 SAR', category: 'mini', image: 'https://images.unsplash.com/photo-1614088647000-0e9566eabff9?auto=format&fit=crop&q=80&w=800' },
    { id: '5', titleAr: 'تورتة الورد الجوري', titleEn: 'Rose Water Torte', descAr: 'تورتة كلاسيكية ناعمة بنكهة الورد الجوري والراسبري مع لمسات من الفانيليا.', descEn: 'Soft classic torte flavored with damask rose and raspberry with hints of vanilla.', price: '290 SAR', category: 'cakes', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800' },
    { id: '6', titleAr: 'ميني تارت الليمون والمستكة', titleEn: 'Lemon Mastic Mini Tarts', descAr: 'حبات تارت صغيرة بحشوة الليمون المنعش والمستكة اليونانية الفواحة.', descEn: 'Mini tarts filled with refreshing lemon and fragrant Greek mastic.', price: '120 SAR', category: 'mini', image: 'https://images.unsplash.com/photo-1501431613936-cb7088b209c1?auto=format&fit=crop&q=80&w=800' },
  ];

  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'cakes', labelAr: 'كعكات وتورتات', labelEn: 'Cakes & Tortes' },
    { id: 'tarts', labelAr: 'تارت', labelEn: 'Tarts' },
    { id: 'mini', labelAr: 'توزيعات وحلى صغير', labelEn: 'Mini Bites' },
  ];

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  const content = {
    ar: {
      brand: "CRAZYCAKE+",
      title: "كعك خيالي، نصنعه لك",
      desc: "تعبير فني يتجسد في قوالب كيك ثلاثية الأبعاد. تفاصيل دقيقة، طعم لا يُنسى.",
      shop: "تصفح التشكيلة",
      customize: "ابدأ تصميمك الخاص",
      features: ["نكهات محلية مستوحاة", "دقة متناهية في التصميم", "توصيل مبرد"],
      readyMade: "التشكيلة الجاهزة",
      customSection: "صمم كعكة أحلامك",
      customDesc: "استخدم محاكي الـ 3D الخاص بنا لبناء كعكة لا مثيل لها.",
    },
    en: {
      brand: "CRAZYCAKE+",
      title: "Hyper-Real Cakes, Customized",
      desc: "Artistic expression in edible 3D models. Impeccable detail, unforgettable flavor.",
      shop: "Explore Collection",
      customize: "Start Custom Design",
      features: ["Authentic Local Flavors", "Precision 3D Artistry", "Chilled Delivery"],
      readyMade: "Ready-Made Collection",
      customSection: "Design Your Dream Cake",
      customDesc: "Use our interactive 3D configurator to build a one-of-a-kind masterpiece.",
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-[#3B2516] font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="flex items-center justify-between p-8 max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold tracking-tight text-[#3B2516]">CRAZYCAKE+</motion.h1>
        <div className="flex items-center gap-8">
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="text-xs font-semibold uppercase tracking-widest text-[#8C7A6B] hover:text-[#3B2516] transition">
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
          <div className="relative group cursor-pointer bg-white p-3 rounded-full shadow-sm hover:shadow-md transition border border-[#E5DCC5]">
            <ShoppingBag className="w-5 h-5 text-[#3B2516]" />
            <div className="absolute -top-1 -right-1 bg-[#C89B3C] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#FCF9F2]">0</div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-8 py-16">
        {showConfig ? (
          <div className="py-20">
            <button onClick={() => setShowConfig(false)} className="mb-10 font-bold uppercase text-xs tracking-widest underline underline-offset-4 text-[#8C7A6B] hover:text-[#3B2516] transition">
              {lang === 'ar' ? 'عودة للرئيسية' : 'Back to Home'}
            </button>
            <CakeConfigurator />
          </div>
        ) : (
          <>
            <motion.header 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-start lg:items-center gap-16 pb-32 pt-16"
            >
              <div className="flex-1 flex flex-col items-start gap-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B3C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> {lang === 'ar' ? 'فن الأكل حسب الطلب' : 'Bespoke Edible Art'}
                </span>
                <h2 className="text-6xl md:text-[6rem] font-medium text-[#3B2516] tracking-tighter leading-[0.9]">
                  {t.title}
                </h2>
                <p className="text-xl md:text-2xl text-[#8C7A6B] max-w-xl leading-relaxed">{t.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-[#2B5B43] text-white text-sm font-medium uppercase tracking-widest hover:bg-[#1E4330] transition flex items-center gap-2 rounded-full shadow-[0_10px_20px_rgba(43,91,67,0.2)]">
                    {t.shop} <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button 
                    onClick={() => setShowConfig(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-white text-[#2B5B43] border border-[#2B5B43] text-sm font-medium uppercase tracking-widest shadow-sm hover:shadow-md transition rounded-full">
                    {t.customize}
                  </motion.button>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full relative"
              >
                 <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white/50 backdrop-blur-sm">
                    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Hero Cake" />
                 </div>
                 <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-[#E5DCC5] flex items-center gap-4 hidden md:flex">
                    <div className="w-16 h-16 bg-[#FAF7F0] rounded-full flex items-center justify-center text-[#C89B3C]">
                      <Cake size={32} />
                    </div>
                    <div>
                      <p className="text-sm text-[#8C7A6B] font-bold uppercase tracking-widest">{lang === 'ar' ? 'مخبوزة بحب يومياً' : 'Baked Fresh Daily'}</p>
                      <p className="text-xl font-medium text-[#3B2516]">100% {lang === 'ar' ? 'طبيعي' : 'Natural'}</p>
                    </div>
                 </div>
              </motion.div>
            </motion.header>

            <section className="py-24 border-t border-[#E5DCC5]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-[#3B2516] mb-4">{t.readyMade}</h3>
                  <p className="text-[#8C7A6B] max-w-lg">{lang === 'ar' ? 'اكتشف مجموعتنا المُعدة يومياً من أجود المكونات المحلية والعالمية لتشكيل تحف فنية قابلة للأكل.' : 'Discover our daily prepared collection of the finest local and international ingredients, crafting edible masterpieces.'}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                        selectedCategory === cat.id 
                          ? 'bg-[#3B2516] text-[#FCF9F2] shadow-md' 
                          : 'bg-[#FAF7F0] text-[#8C7A6B] hover:bg-[#E5DCC5] hover:text-[#3B2516]'
                      }`}
                    >
                      {lang === 'ar' ? cat.labelAr : cat.labelEn}
                    </button>
                  ))}
                </div>
              </div>
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={product.id}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(59,37,22,0.06)] border border-[#E5DCC5] flex flex-col group cursor-pointer"
                  >
                    <div className="h-72 overflow-hidden relative">
                      <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={lang === 'ar' ? product.titleAr : product.titleEn} />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      <button className="absolute top-5 right-5 bg-white/90 backdrop-blur-md p-4 rounded-full text-[#3B2516] hover:bg-[#C89B3C] hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 disabled:opacity-0">
                        <ShoppingBag className="w-5 h-5"/>
                      </button>
                    </div>
                    <div className="p-8 flex flex-col gap-5 flex-1 bg-white">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-bold text-2xl text-[#3B2516] leading-tight">{lang === 'ar' ? product.titleAr : product.titleEn}</h4>
                      </div>
                      <p className="text-[#8C7A6B] leading-relaxed flex-1 text-sm">{lang === 'ar' ? product.descAr : product.descEn}</p>
                      <div className="pt-5 border-t border-[#E5DCC5] flex justify-between items-center">
                         <span className="text-lg text-[#2B5B43] font-bold tracking-widest uppercase">{product.price}</span>
                         <button className="text-sm font-bold uppercase tracking-widest text-[#C89B3C] hover:text-[#3B2516] transition-colors">
                           {lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </>
        )}

        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#E5DCC5] mt-10">
            {t.features.map((feature, i) => (
                <div key={i} className="flex flex-col gap-4">
                    <Cake className="w-8 h-8 text-[#C89B3C]" />
                    <p className="font-semibold text-lg text-[#3B2516]">{feature}</p>
                    <p className="text-[#8C7A6B] text-sm leading-relaxed">Artfully crafted for the modern palate, blending tradition with cutting-edge 3D design.</p>
                </div>
            ))}
        </motion.section>
      </main>
    </div>
  );
}
