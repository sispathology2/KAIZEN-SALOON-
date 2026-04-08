import { motion } from "motion/react";
import { 
  Instagram, 
  Phone, 
  MapPin, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  ExternalLink
} from "lucide-react";

const services = [
  "Haircut", "Hair Spa", "Hair Wash", "Blow Dry", 
  "Hair Coloring", "Keratin Treatment", "D-Tan Cleanup", 
  "Facial", "Korean Facial", "Hydra Facial", "Waxing", 
  "Threading", "Manicure", "Pedicure", "Head Massage", 
  "Beard Styling", "Nail Extensions", "Gel Polish"
];

const offers = [
  { title: "Pick Any 2 Services", price: "₹799" },
  { title: "Pick Any 3 Services", price: "₹1099" },
  { title: "Pick Any 5 Services", price: "₹1399" },
  { title: "Keratin + Hair Spa", price: "₹1999" },
  { title: "Facial + Cleanup + D-Tan", price: "₹1499" },
  { title: "Mani + Pedi + Wax", price: "₹999" },
  { title: "Flat 20% OFF", description: "On bills above ₹1500" },
];

export default function App() {
  const whatsappLink = "https://wa.me/919755221512?text=Hi%20Kaizen%20Salon,%20I'd%20like%20to%20book%20an%20appointment.";

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
        
        <motion.a 
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gold hover:bg-gold-light text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          Book Now
        </motion.a>
      </nav>

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
              <a 
                href={whatsappLink}
                className="bg-gold text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Book Appointment <ChevronRight size={18} />
              </a>
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
          <p className="text-gray-400 max-w-xl mx-auto">From precision cuts to rejuvenating facials, we offer a comprehensive range of luxury services.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-dark-accent border border-white/5 p-6 rounded-2xl hover:border-gold/30 transition-all text-center flex flex-col items-center justify-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                <Scissors size={20} />
              </div>
              <span className="text-sm font-medium tracking-tight group-hover:text-gold transition-colors">{service}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-24 bg-dark-accent relative overflow-hidden">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark border border-white/10 p-8 rounded-3xl flex flex-col justify-between group hover:border-gold/50 transition-all"
              >
                <div>
                  <Sparkles className="text-gold mb-6" size={32} />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{offer.title}</h3>
                  {offer.description && <p className="text-gray-500 text-sm mb-4">{offer.description}</p>}
                </div>
                <div className="mt-8">
                  {offer.price && (
                    <div className="text-3xl font-bold text-gold-gradient mb-4">{offer.price}</div>
                  )}
                  <button 
                    onClick={() => window.open(whatsappLink, '_blank')}
                    className="w-full py-3 rounded-xl border border-white/10 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    Claim Offer
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
