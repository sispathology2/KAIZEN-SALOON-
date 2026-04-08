import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Phone, 
  MapPin, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  ExternalLink,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Trash2
} from "lucide-react";

const services = [
  "Haircut", "Hair Spa", "Hair Wash", "Blow Dry", 
  "Hair Coloring", "Keratin Treatment", "D-Tan Cleanup", 
  "Facial", "Korean Facial", "Hydra Facial", "Waxing", 
  "Threading", "Manicure", "Pedicure", "Head Massage", 
  "Beard Styling", "Nail Extensions", "Gel Polish"
];

const offers = [
  { id: 'any2', title: "Pick Any 2 Services", price: "₹799", count: 2, description: "Choose any 2 services from our menu" },
  { id: 'any3', title: "Pick Any 3 Services", price: "₹1099", count: 3, description: "Choose any 3 services from our menu" },
  { id: 'any5', title: "Pick Any 5 Services", price: "₹1399", count: 5, description: "Choose any 5 services from our menu" },
  { id: 'keratin', title: "Keratin + Hair Spa", price: "₹1999", fixed: ["Keratin Treatment", "Hair Spa"], description: "Premium hair care package" },
  { id: 'facial', title: "Facial + Cleanup + D-Tan", price: "₹1499", fixed: ["Facial", "D-Tan Cleanup"], description: "Complete face rejuvenation" },
  { id: 'mani', title: "Mani + Pedi + Wax", price: "₹999", fixed: ["Manicure", "Pedicure", "Waxing"], description: "Essential grooming bundle" },
];

export default function App() {
  const [cart, setCart] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeOffer, setActiveOffer] = useState<{id: string, count: number} | null>(null);

  const whatsappNumber = "919755221512";

  const toggleService = (service: string) => {
    setCart(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      }
      // If we have an active offer with a limit, check it
      if (activeOffer && prev.length >= activeOffer.count) {
        return prev;
      }
      return [...prev, service];
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = `Hi Kaizen Salon, I'd like to book an appointment.\n\n`;
    
    if (activeOffer) {
      const offer = offers.find(o => o.id === activeOffer.id);
      message += `*Offer:* ${offer?.title} (${offer?.price})\n`;
    }
    
    message += `*Selected Services:*\n`;
    cart.forEach((s, i) => {
      message += `${i + 1}. ${s}\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const clearCart = () => {
    setCart([]);
    setActiveOffer(null);
  };

  const selectOffer = (offerId: string, count: number) => {
    setActiveOffer({ id: offerId, count });
    setCart([]); // Clear cart to start fresh selection for the offer
    setIsCartOpen(false);
    // Scroll to services
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold/30 px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <h1 className="text-2xl font-bold tracking-tighter text-gold-gradient">KAIZEN</h1>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 -mt-1">Salon & Spa</span>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gold hover:text-gold-light transition-colors"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          <motion.a 
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gold hover:bg-gold-light text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            Book Now
          </motion.a>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-accent z-[70] shadow-2xl border-l border-white/10 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="text-gold" /> Your Selection
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeOffer && (
                  <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Active Offer</p>
                      <p className="font-bold">{offers.find(o => o.id === activeOffer.id)?.title}</p>
                      <p className="text-xs text-gray-400">Select {activeOffer.count} services ({cart.length}/{activeOffer.count})</p>
                    </div>
                    <button onClick={() => setActiveOffer(null)} className="text-gray-500 hover:text-white">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <Scissors size={48} className="mb-4" />
                    <p>No services selected yet.</p>
                    <p className="text-sm">Browse our menu and add your favorites.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(service => (
                      <div key={service} className="flex justify-between items-center p-4 bg-dark rounded-xl border border-white/5">
                        <span className="font-medium">{service}</span>
                        <button 
                          onClick={() => toggleService(service)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Minus size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-black/40">
                {activeOffer && cart.length < activeOffer.count && (
                  <p className="text-gold text-xs text-center mb-4 animate-pulse">
                    Please select {activeOffer.count - cart.length} more service(s) to complete the offer.
                  </p>
                )}
                <div className="flex gap-4">
                  <button 
                    onClick={clearCart}
                    className="flex-1 py-4 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors"
                  >
                    Clear
                  </button>
                  <button 
                    disabled={cart.length === 0 || (activeOffer ? cart.length < activeOffer.count : false)}
                    onClick={handleCheckout}
                    className="flex-[2] py-4 bg-gold text-black rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Checkout <Phone size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" 
            alt="Salon Interior" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/60 to-dark" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-sm font-medium mb-4 block">Premium Grooming</span>
            <h2 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
              Where Beauty Meets <br />
              <span className="italic font-normal text-gold-gradient">Perfection</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Experience the art of transformation at Indore's most exclusive unisex salon. 
              Crafted for those who value excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gold text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Book Appointment <ChevronRight size={18} />
              </button>
              <a 
                href="#services"
                className="border border-white/20 hover:border-gold/50 px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all flex items-center justify-center"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6" />
          <p className="text-gray-400 max-w-xl mx-auto">
            {activeOffer 
              ? `Select ${activeOffer.count} services for your "${offers.find(o => o.id === activeOffer.id)?.title}"`
              : "Select services to add to your appointment."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => {
            const isSelected = cart.includes(service);
            const isDisabled = !isSelected && activeOffer && cart.length >= activeOffer.count;
            
            return (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                viewport={{ once: true }}
                onClick={() => !isDisabled && toggleService(service)}
                className={`group border p-6 rounded-2xl transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? "bg-gold border-gold text-black" 
                    : isDisabled 
                      ? "bg-dark-accent border-white/5 opacity-30 cursor-not-allowed" 
                      : "bg-dark-accent border-white/5 hover:border-gold/30"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? "bg-black/10 text-black" : "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black"
                }`}>
                  {isSelected ? <CheckCircle2 size={20} /> : <Scissors size={20} />}
                </div>
                <span className="text-sm font-medium tracking-tight">{service}</span>
                
                {!isSelected && !isDisabled && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={14} className="text-gold" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-24 bg-dark-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Offers</h2>
              <p className="text-gray-400">Curated packages designed for your complete transformation.</p>
            </div>
            <div className="bg-gold/10 border border-gold/20 px-4 py-2 rounded-full flex items-center gap-2 text-gold text-sm font-bold">
              <Clock size={16} /> Limited Time Only
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-dark border p-8 rounded-3xl flex flex-col justify-between group transition-all ${
                  activeOffer?.id === offer.id ? "border-gold ring-1 ring-gold" : "border-white/10 hover:border-gold/50"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <Sparkles className="text-gold" size={32} />
                    {activeOffer?.id === offer.id && (
                      <span className="bg-gold text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Active</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{offer.title}</h3>
                  {offer.description && <p className="text-gray-500 text-sm mb-4">{offer.description}</p>}
                  {offer.fixed && (
                    <div className="space-y-1 mb-4">
                      {offer.fixed.map(s => (
                        <div key={s} className="text-xs text-gray-400 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-gold" /> {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <div className="text-3xl font-bold text-gold-gradient mb-4">{offer.price}</div>
                  <button 
                    onClick={() => {
                      if (offer.count) {
                        selectOffer(offer.id, offer.count);
                      } else if (offer.fixed) {
                        setCart(offer.fixed);
                        setActiveOffer({ id: offer.id, count: offer.fixed.length });
                        setIsCartOpen(true);
                      }
                    }}
                    className={`w-full py-3 rounded-xl border transition-all text-xs font-bold uppercase tracking-widest ${
                      activeOffer?.id === offer.id 
                        ? "bg-gold text-black border-gold" 
                        : "border-white/10 group-hover:bg-gold group-hover:text-black group-hover:border-gold"
                    }`}
                  >
                    {activeOffer?.id === offer.id ? "Selecting Services..." : "Choose Offer"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] mb-8 shadow-2xl shadow-pink-500/20">
          <Instagram size={40} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
        <p className="text-gray-400 mb-10 text-lg">
          Follow us on Instagram for the latest trends, behind-the-scenes, and exclusive flash sales.
        </p>
        <a 
          href="https://www.instagram.com/_the_kaizen_?igsh=d2JvZWdtM2lmcW43" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold transition-colors"
        >
          Visit Instagram <ExternalLink size={18} />
        </a>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8 italic">Find Us</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-dark-accent flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Location</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Lg 1, Amar Darshan Building, <br />
                    beside Saket Pan Corner, <br />
                    Near Saket Square, Indore
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-dark-accent flex items-center justify-center text-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Call Us</h4>
                  <p className="text-gray-400 text-xl font-medium">+91 9755221512</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-dark-accent flex items-center justify-center text-gold shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Open Hours</h4>
                  <p className="text-gray-400">Monday - Sunday: 10:00 AM - 09:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d75.89!3d22.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzQ4LjAiTiA3NcKwNTMnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold tracking-tighter text-gold-gradient">KAIZEN</h1>
            <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 -mt-1">Salon & Spa</span>
          </div>
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            © 2026 KAIZEN Salon | Designed by Prajjwal Patidar
          </p>
        </div>
      </footer>
    </div>
  );
}
