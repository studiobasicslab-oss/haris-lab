"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Shadows+Into+Light&family=Special+Elite&display=swap');

  :root {
    --paper-bg: #f4ecd8;
    --ink-black: #2c2a25;
    --ink-blue: #234b6b;
    --ink-red: #8a3324;
    --tape-pink: rgba(220, 150, 150, 0.7);
    --tape-yellow: rgba(230, 210, 120, 0.7);
    --tape-blue: rgba(150, 180, 210, 0.7);
  }

  body {
    background-color: var(--paper-bg);
    color: var(--ink-black);
    background-image: url('/vintage-map.jpg');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-blend-mode: multiply;
  }

  .font-handwriting { font-family: 'Caveat', cursive; }
  .font-typewriter { font-family: 'Special Elite', cursive; }
  .font-marker { font-family: 'Shadows Into Light', cursive; }
  
  ::-webkit-scrollbar { width: 0px; background: transparent; }
`;

type Category = 'Mains' | 'Breakfast' | 'Drinks' | 'Desserts';

const categories: { name: Category, emoji: string }[] = [
  { name: 'Mains', emoji: '🌮' },
  { name: 'Breakfast', emoji: '🍳' },
  { name: 'Drinks', emoji: '🍹' },
  { name: 'Desserts', emoji: '🍰' },
];

const recipes = [
  {
    id: 'chicken-quesadilla',
    category: 'Mains' as Category,
    title: 'Chicken Quesadilla',
    notes: 'A perfect crispy, cheesy wedge of joy! The homemade salsa makes all the difference. Reminds me of late night cravings.',
    materials: ['2 Flour Tortillas 🌮', '1 cup Shredded Cheddar & Monterey Jack 🧀', '1/2 cup Cooked Shredded Chicken 🍗', '1/4 cup Diced Bell Peppers 🫑', 'Sour cream & Salsa for dipping 🍅'],
    procedures: [
      'Heat a large skillet over medium heat and lightly butter it.',
      'Place one tortilla down and scatter half the cheese.',
      'Evenly distribute the chicken and bell peppers.',
      'Add the rest of the cheese and top with the second tortilla.',
      'Cook for 3-4 minutes until golden, carefully flip, and cook the other side.',
      'Cut into wedges and serve hot with dips! 🍽️'
    ],
    sticker: '/chicken-quesadilla.jpg',
    stickerRotation: -3,
    tapeColor: 'var(--tape-yellow)',
    rating: 5,
    country: 'Mexico',
    stamp: '/stamp-mexico.jpg'
  },
  {
    id: 'dragon-mocktail',
    category: 'Drinks' as Category,
    title: '🌺 Dragon Mocktail',
    notes: 'Vibrant, refreshing, and absolutely gorgeous to look at. Perfect for a sunny afternoon lounging on the porch!',
    materials: ['Hibiscus Tea (chilled) 🫖', 'Fresh Dragon Fruit (cubed) 🐉', 'Lemon Juice 🍋', 'Sparkling Soda 🫧', '1 tsp Chia Seeds 🥄', 'Ice Cubes 🧊'],
    procedures: [
      'Brew hibiscus tea and let it chill completely.',
      'In a tall glass, muddle a few cubes of dragon fruit.',
      'Fill the glass with ice and add the chia seeds.',
      'Pour in the hibiscus tea and a squeeze of fresh lemon juice.',
      'Top off with sparkling soda and stir gently.',
      'Garnish with a lemon slice and a sprig of mint. Cheers! 🥂'
    ],
    sticker: '/dragon-mocktail.jpg',
    stickerRotation: 5,
    tapeColor: 'var(--tape-pink)',
    rating: 5,
    country: 'Tropical',
    stamp: '/stamp-tropical.jpg'
  },
  {
    id: 'apple-cinnamon-toast',
    category: 'Breakfast' as Category,
    title: 'Apple Cinnamon Toast 🍏',
    notes: 'The perfect cozy autumn morning breakfast. The honey crystallizes slightly over the warm apples. So comforting!',
    materials: ['1 slice Sourdough Bread 🍞', '1/2 Apple, thinly sliced 🍎', '1 tsp Cinnamon 🤎', '1 tbsp Honey 🍯', 'Butter 🧈'],
    procedures: [
      'Toast the sourdough slice to your preferred crispness.',
      'Spread a generous layer of butter while still hot.',
      'Arrange the apple slices in an overlapping pattern.',
      'Drizzle with honey and dust heavily with cinnamon.',
      'Enjoy with a warm cup of coffee or tea! ☕'
    ],
    sticker: '/apple-cinnamon-toast.jpg',
    stickerRotation: 2,
    tapeColor: 'var(--tape-green)',
    rating: 5,
    country: 'Home',
    stamp: '/stamp-cafe.jpg'
  },
  {
    id: 'plum-earl-grey',
    category: 'Drinks' as Category,
    title: 'Plum Earl Grey Fizz 🍹',
    notes: 'Such an elegant drink! The bergamot from the Earl Grey pairs beautifully with the sweet tartness of the plum.',
    materials: ['1 cup Earl Grey Tea (chilled) 🫖', '1 Ripe Plum, sliced 🫐', 'Sparkling Soda 🫧', 'Ice Cubes 🧊', 'Sprig of Thyme 🌿'],
    procedures: [
      'Brew a strong cup of Earl Grey tea and let it chill.',
      'Muddle a few slices of plum at the bottom of a tall glass.',
      'Fill the glass with ice.',
      'Pour in the chilled Earl Grey tea until 2/3 full.',
      'Top with sparkling soda and garnish with thyme and a plum slice.',
      'Stir gently and serve! 🧊'
    ],
    sticker: '/plum-tea-mocktail.jpg',
    stickerRotation: -4,
    tapeColor: 'var(--tape-blue)',
    rating: 5,
    country: 'British',
    stamp: '/stamp-cafe.jpg'
  }
];

const InteractiveRating = ({ initialRating }: { initialRating: number }) => {
  const [ratings, setRatings] = useState<number[]>([initialRating, initialRating, initialRating, 4]); 
  const [hovered, setHovered] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  
  const handleRate = (val: number) => {
    if (hasRated) return;
    setRatings([...ratings, val]);
    setHasRated(true);
  }

  return (
    <div className="flex flex-col mb-6">
      <div className="flex gap-1 text-3xl cursor-pointer transition-transform" onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span 
            key={i} 
            className={(hovered ? i < hovered : i < Math.round(average)) ? "text-yellow-500 hover:scale-110" : "text-gray-300 hover:scale-110 grayscale opacity-60"}
            onMouseEnter={() => !hasRated && setHovered(i + 1)}
            onClick={() => handleRate(i + 1)}
            style={{ transition: 'all 0.2s' }}
          >
            ⭐
          </span>
        ))}
      </div>
      <div className="font-typewriter text-xs text-[var(--ink-black)] opacity-60 mt-2 ml-1">
        {average.toFixed(1)} / 5.0 ({ratings.length} ratings) {hasRated && "- Thanks for rating!"}
      </div>
    </div>
  )
}

export default function CookingJournal() {
  const scrollToRecipe = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory relative scroll-smooth">
        
        {/* Navigation Return */}
        <div className="fixed top-6 left-6 z-50">
          <Link href="/" className="inline-flex items-center gap-2 font-handwriting text-2xl text-[var(--ink-black)] hover:text-[var(--ink-red)] transition-colors group px-4 py-2 bg-[#fbf8f1]/90 backdrop-blur-md rounded-full shadow-md border border-black/10">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Close Journal</span>
          </Link>
        </div>

        {/* Title Page */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center relative p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#fbf8f1]/95 backdrop-blur-md p-12 md:p-24 shadow-2xl border border-black/10 max-w-2xl text-center transform rotate-1"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[var(--tape-blue)] rotate-[-2deg] shadow-sm mix-blend-multiply"></div>
            
            <h1 className="font-marker text-6xl md:text-8xl text-[var(--ink-black)] mb-6 tracking-wide">
              From My Kitchen
            </h1>
            <p className="font-handwriting text-3xl md:text-4xl text-[var(--ink-blue)]">
              first attempts to favorite meals
            </p>
            
            <div className="mt-12 font-typewriter text-sm text-[var(--ink-black)] opacity-60">
              <p>Scroll down to open</p>
              <div className="animate-bounce mt-4 text-2xl">↓</div>
            </div>
          </motion.div>
        </section>

        {/* Index Page */}
        <section className="h-screen w-full snap-start snap-always relative flex items-center justify-center p-4 md:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full max-w-7xl h-full max-h-[90vh] bg-[#fbf8f1]/95 shadow-2xl rounded-sm border border-black/10 relative p-8 md:p-16 overflow-y-auto"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
          >
            <h2 className="font-marker text-6xl text-[var(--ink-black)] mb-12 text-center border-b-2 border-dashed border-[var(--ink-black)]/20 pb-6">
              Recipe Index 📖
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {categories.map(cat => {
                const catRecipes = recipes.filter(r => r.category === cat.name);
                return (
                  <div key={cat.name} className="relative">
                    <h3 className="font-handwriting text-4xl text-[var(--ink-red)] mb-4 flex items-center gap-3">
                      <span>{cat.emoji}</span> {cat.name}
                    </h3>
                    <ul className="space-y-4 pl-8">
                      {catRecipes.length === 0 ? (
                        <li className="font-typewriter text-sm text-black/40 italic">No recipes yet...</li>
                      ) : (
                        catRecipes.map(recipe => (
                          <li key={recipe.id}>
                            <button 
                              onClick={() => scrollToRecipe(recipe.id)}
                              className="font-marker text-3xl text-[var(--ink-blue)] hover:text-[var(--ink-red)] hover:underline decoration-wavy underline-offset-4 transition-colors text-left leading-tight"
                            >
                              {recipe.title}
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute bottom-12 right-16 opacity-40 pointer-events-none hidden md:block">
              <span className="font-handwriting text-4xl text-[var(--ink-black)]">Pick something delicious! ➔</span>
            </div>
          </motion.div>
        </section>

        {/* Recipe Pages */}
        {recipes.map((recipe) => (
          <section id={recipe.id} key={recipe.id} className="h-screen w-full snap-start snap-always relative flex items-center justify-center p-4 md:p-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="w-full max-w-7xl h-full max-h-[90vh] bg-[#fbf8f1]/95 shadow-2xl rounded-sm border border-black/10 relative flex flex-col md:flex-row overflow-hidden"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
            >
              <div className="absolute top-0 bottom-0 left-1/2 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none hidden md:block"></div>

              {/* Left Page */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col overflow-y-auto">
                
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-marker text-5xl md:text-7xl text-[var(--ink-black)] leading-tight flex-1 pr-6">
                    {recipe.title}
                  </h2>
                  
                  {/* Image Passport Stamp */}
                  <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 mix-blend-multiply opacity-80 transform rotate-12 -mt-4 -mr-4">
                    <img src={recipe.stamp} alt={`${recipe.country} stamp`} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                </div>
                
                <InteractiveRating initialRating={recipe.rating} />

                <p className="font-handwriting text-3xl md:text-4xl text-[var(--ink-blue)] leading-relaxed mb-8 flex-1">
                  &quot;{recipe.notes}&quot;
                </p>

                {recipe.sticker && (
                  <div className="relative mt-auto w-56 h-56 md:w-80 md:h-80 self-center group shrink-0 mb-6">
                    <div 
                      className="absolute inset-0 bg-white p-4 pb-16 shadow-lg transition-transform duration-500 group-hover:scale-105 border border-black/5"
                      style={{ transform: `rotate(${recipe.stickerRotation}deg)` }}
                    >
                      <div 
                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 shadow-sm mix-blend-multiply z-10"
                        style={{ backgroundColor: recipe.tapeColor, transform: 'rotate(-4deg)' }}
                      ></div>
                      <div className="relative w-full h-full bg-gray-100 overflow-hidden border border-gray-200">
                        <img src={recipe.sticker} alt={recipe.title} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Page */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-black/10">
                
                <div className="mb-12 relative">
                  <h3 className="font-marker text-5xl text-[var(--ink-black)] mb-6 inline-block relative">
                    Ingredients 🛒
                    <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200/60 -z-10 rotate-1"></div>
                  </h3>
                  <ul className="space-y-4">
                    {recipe.materials.map((item, i) => (
                      <li key={i} className="font-handwriting text-3xl md:text-4xl text-[var(--ink-black)] flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full border border-[var(--ink-black)] shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <h3 className="font-marker text-5xl text-[var(--ink-black)] mb-8 inline-block relative">
                    Process 👩‍🍳
                    <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200/60 -z-10 -rotate-1"></div>
                  </h3>
                  <ol className="space-y-8">
                    {recipe.procedures.map((step, i) => (
                      <li key={i} className="font-handwriting text-3xl md:text-4xl text-[var(--ink-black)] flex gap-4 leading-relaxed">
                        <span className="font-typewriter text-[var(--ink-red)] text-3xl font-bold mt-1 shrink-0">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </motion.div>
          </section>
        ))}

        {/* End Page */}
        <section className="h-screen w-full snap-start snap-always flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="text-center bg-[#fbf8f1]/95 backdrop-blur-sm p-16 shadow-2xl border border-black/10 rotate-[-1deg]"
          >
            <p className="font-handwriting text-5xl text-[var(--ink-black)] mb-10">
              More deliciousness coming soon... 🍽️
            </p>
            <button className="animate-bounce text-4xl text-[var(--ink-black)] cursor-pointer font-marker hover:text-[var(--ink-red)] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              ↑ Back to Index
            </button>
          </motion.div>
        </section>

      </div>
    </>
  );
}
