import { useState, type FormEvent } from 'react';
import { Sparkles, Shield, Truck, CheckCircle, Phone, MessageCircle, Mail, Clock, Award, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

interface PolishFormData {
  name: string;
  email: string;
  phone: string;
  furnitureType: string;
  woodType: string;
  serviceType: string;
  furnitureCondition: string;
  address: string;
  notes: string;
}

const polishServices = [
  {
    id: 'basic-polish',
    name: 'Basic Polish',
    price: '₹1,500 - ₹3,000',
    duration: '2-4 hours',
    description: 'Surface cleaning and polish application for regular maintenance',
    features: [
      'Surface dust removal',
      'Light cleaning',
      'Standard polish application',
      'Quick drying',
      'Suitable for well-maintained furniture'
    ],
    suitableFor: 'Regular maintenance, quarterly polishing'
  },
  {
    id: 'deep-polish',
    name: 'Deep Polish',
    price: '₹3,500 - ₹7,000',
    duration: '4-8 hours',
    description: 'Complete refinishing with scratch removal and restoration',
    features: [
      'Deep surface cleaning',
      'Scratch and mark removal',
      'Minor dent filling',
      'Multi-coat polish application',
      'Buffing and finishing',
      'Protective coating'
    ],
    suitableFor: 'Furniture with visible wear, annual restoration'
  },
  {
    id: 'gloss-polish',
    name: 'High Gloss Polish',
    price: '₹4,000 - ₹8,000',
    duration: '6-10 hours',
    description: 'Premium high-gloss finish for a showroom look',
    features: [
      'Surface preparation',
      'Sanding (if needed)',
      'Primer application',
      'High-gloss paint/polish',
      'Multiple clear coats',
      'Professional buffing'
    ],
    suitableFor: 'Modern furniture, dining tables, statement pieces'
  },
  {
    id: 'matt-polish',
    name: 'Matte/Natural Finish',
    price: '₹3,500 - ₹6,500',
    duration: '4-8 hours',
    description: 'Elegant matte finish that preserves natural wood texture',
    features: [
      'Surface preparation',
      'Matte primer application',
      'Natural-tone polish',
      'Sealer coating',
      'Protective finish'
    ],
    suitableFor: 'Contemporary interiors, natural aesthetic'
  },
  {
    id: 'antique-restoration',
    name: 'Antique Restoration',
    price: '₹8,000 - ₹25,000',
    duration: '2-5 days',
    description: 'Expert restoration of antique and heirloom furniture',
    features: [
      'Assessment and documentation',
      'Careful cleaning',
      'Original finish preservation',
      'Structural repairs',
      'Period-accurate materials',
      'Conservation treatment'
    ],
    suitableFor: 'Antique furniture, heirlooms, vintage pieces'
  },
  {
    id: 'duco-polish',
    name: 'Duco Polish',
    price: '₹5,000 - ₹12,000',
    duration: '1-2 days',
    description: 'Premium automotive-grade polish for ultimate shine',
    features: [
      'Surface preparation',
      'Colour matching (if needed)',
      'Duco paint application',
      'Multiple polish stages',
      'High-wear resistance coating',
      'Long-lasting finish'
    ],
    suitableFor: 'Premium furniture, hotel projects, commercial spaces'
  }
];

const furnitureTypes = [
  { name: 'Dining Tables', pricePerSqFt: '₹80-150' },
  { name: 'Coffee Tables', pricePerSqFt: '₹100-180' },
  { name: 'Study Desks', pricePerSqFt: '₹90-160' },
  { name: 'Wardrobes', pricePerSqFt: '₹70-130' },
  { name: 'Bed Frames', pricePerSqFt: '₹75-140' },
  { name: 'Sofas (Wooden Base)', pricePerSqFt: '₹100-180' },
  { name: 'Cabinets & Sideboards', pricePerSqFt: '₹80-150' },
  { name: 'Door Panels', pricePerSqFt: '₹60-120' },
  { name: 'Window Frames', pricePerSqFt: '₹50-100' }
];

const polishProcess = [
  {
    step: 1,
    title: 'Inspection & Assessment',
    description: 'Our experts examine your furniture to determine the best polish approach and identify any repair needs.'
  },
  {
    step: 2,
    title: 'Surface Preparation',
    description: 'Thorough cleaning to remove dust, dirt, and old polish layers for proper adhesion.'
  },
  {
    step: 3,
    title: 'Repair & Restoration',
    description: 'Minor scratches, dents, and imperfections are filled and smoothed before polishing.'
  },
  {
    step: 4,
    title: 'Polish Application',
    description: 'Multiple coats of premium polish are applied using professional techniques.'
  },
  {
    step: 5,
    title: 'Buffing & Finishing',
    description: 'Final buffing creates a smooth, brilliant finish that enhances your furniture\'s beauty.'
  }
];

const whyChoosePolish = [
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Expert Craftsmanship',
    description: '20+ years of experience in wood polishing and finishing'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Premium Materials',
    description: 'Only the finest polishes and finishes from trusted brands'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Timely Service',
    description: 'We respect your time with scheduled appointments and on-time completion'
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: 'Eco-Friendly Options',
    description: 'Low-VOC and non-toxic polish options available'
  }
];

export default function PolishPage() {
  usePageMeta('REPAIR_POLISH');

  const [formData, setFormData] = useState<PolishFormData>({
    name: '',
    email: '',
    phone: '',
    furnitureType: '',
    woodType: '',
    serviceType: '',
    furnitureCondition: 'good',
    address: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<PolishFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<PolishFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    if (!formData.furnitureType) newErrors.furnitureType = 'Please select furniture type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Polish service request:', formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PolishFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#C6A75E] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Furniture Polish</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FFF8E7] to-[#FFF0D4] rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A75E]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C6A75E]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-[#C6A75E]" />
            <h1 className="text-4xl font-bold text-gray-900">Professional Furniture Polish</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mb-6">
            Restore the natural beauty of your furniture with our expert polishing services. 
            From basic maintenance to complete restoration, we bring back the shine and elegance of your wooden furniture.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-[#C6A75E]" />
              <span className="text-sm font-medium">Same-Week Service</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg">
              <Truck className="w-5 h-5 text-[#C6A75E]" />
              <span className="text-sm font-medium">Free Pickup & Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-[#C6A75E]" />
              <span className="text-sm font-medium">6-Month Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our Polish Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Polish Services?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {whyChoosePolish.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-[#C6A75E] mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Polish Process */}
      <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Polishing Process</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {polishProcess.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="bg-[#C6A75E] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                {step.step}
              </div>
              <h3 className="font-semibold text-gray-900 text-center mb-2 text-sm">{step.title}</h3>
              <p className="text-xs text-gray-600 text-center">{step.description}</p>
              {index < polishProcess.length - 1 && (
                <div className="hidden md:block absolute top-4 left-[60%] w-[80%] h-0.5 bg-[#C6A75E]/30" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Polish Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Polishing Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polishServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-[#C6A75E]/10 to-[#C6A75E]/5 p-6">
                <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="text-[#C6A75E] font-semibold mt-2">{service.price}</p>
                <p className="text-gray-500 text-sm mt-1">Duration: {service.duration}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4">{service.description}</p>
                
                <h4 className="font-semibold text-gray-900 text-sm mb-2">What's Included:</h4>
                <ul className="space-y-1 mb-4">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best For</p>
                  <p className="text-sm text-gray-700">{service.suitableFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Furniture Type Pricing */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing by Furniture Type</h2>
        <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          Prices vary based on furniture size, condition, and wood type. Get a free quote for exact pricing.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {furnitureTypes.map((furniture, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-semibold text-gray-900">{furniture.name}</h3>
                <p className="text-[#C6A75E] font-medium text-sm">{furniture.pricePerSqFt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Gallery */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Transformation Gallery</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Dining Table Restoration', before: 'Dull, worn surface', after: 'Mirror-like gloss finish', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop' },
            { title: 'Coffee Table Polish', before: 'Scratched and faded', after: 'Smooth natural finish', img: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=300&fit=crop' },
            { title: 'Wardrobe Makeover', before: 'Old worn finish', after: 'Rich mahogany polish', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white font-medium px-3 py-1 bg-[#C6A75E] rounded-lg">View Transformation</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-500">Before: {item.before}</span>
                  <span className="text-gray-300">→</span>
                  <span className="text-green-600">After: {item.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Book Polishing Service</h2>
        <p className="text-gray-600 text-center mb-6">Fill out the form below and we'll contact you within 2 hours</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Request Received!</h3>
            <p className="text-gray-700">
              Thank you for booking our polish service. Our team will contact you shortly to confirm the appointment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your name" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="10-digit number" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furniture Type *</label>
                <select name="furnitureType" value={formData.furnitureType} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30 ${errors.furnitureType ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">Select furniture type</option>
                  <option value="dining-table">Dining Table</option>
                  <option value="coffee-table">Coffee Table</option>
                  <option value="study-desk">Study Desk</option>
                  <option value="wardrobe">Wardrobe</option>
                  <option value="bed-frame">Bed Frame</option>
                  <option value="sofa">Sofa (Wooden Base)</option>
                  <option value="cabinet">Cabinet/Sideboard</option>
                  <option value="other">Other</option>
                </select>
                {errors.furnitureType && <p className="text-red-500 text-sm mt-1">{errors.furnitureType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wood Type</label>
                <select name="woodType" value={formData.woodType} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30">
                  <option value="">Select wood type</option>
                  <option value="teak">Teak Wood</option>
                  <option value="sheesham">Sheesham Wood</option>
                  <option value="mango">Mango Wood</option>
                  <option value="pine">Pine Wood</option>
                  <option value="plywood">Plywood</option>
                  <option value="mdf">MDF</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30 ${errors.serviceType ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select service</option>
                {polishServices.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - {s.price}</option>
                ))}
              </select>
              {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Condition</label>
              <select name="furnitureCondition" value={formData.furnitureCondition} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30">
                <option value="excellent">Excellent - Well maintained</option>
                <option value="good">Good - Minor wear</option>
                <option value="fair">Fair - Visible wear</option>
                <option value="poor">Poor - Needs restoration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30"
                placeholder="Complete address for pickup & delivery" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A75E]/30"
                placeholder="Any specific requirements or concerns..." />
            </div>

            <button type="submit"
              className="w-full bg-[#C6A75E] text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-[#B0914A] transition-colors text-lg">
              Book Service
            </button>
          </form>
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-[#F5EFE6] rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h3>
        <p className="text-gray-600 mb-6">Our team is available to answer all your questions</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="tel:+919236312375" className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg hover:bg-[#C6A75E] hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
            <span>+91 92363 12375</span>
          </a>
          <a href="mailto:polish@veloracraft.in" className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg hover:bg-[#C6A75E] hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            <span>polish@veloracraft.in</span>
          </a>
          <a href="https://wa.me/919236312375" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg hover:bg-[#25D366] hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}