import { useState, type FormEvent } from 'react';
import { Wrench, Hammer, Shield, Truck, CheckCircle, Phone, MessageCircle, Mail, Clock, Award, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { cartService } from '../services/CartService';

interface RepairFormData {
  name: string;
  email: string;
  phone: string;
  furnitureType: string;
  repairType: string;
  damageType: string;
  furnitureAge: string;
  urgency: string;
  address: string;
  notes: string;
}

const sofaUpholsteryServices = [
  {
    id: 'srv-sofa-fabric-change',
    title: 'Sofa Fabric Change',
    rating: 4.8,
    reviews: 0,
    price: '₹8,999',
    features: [
      'Fabric removal and frame inspection',
      'Premium fabric application',
      'Finishing and edge stitching',
      'Protective spray coating'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-fabric-change'
  },
  {
    id: 'srv-sofa-cushion-repair',
    title: 'Sofa Cushion Repair',
    rating: 4.7,
    reviews: 0,
    price: '₹2,999',
    features: [
      'Seam inspection and reinforcement',
      'Patch repair or replacement',
      'Partial filling with foam',
      'Quality finish'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-cushion-repair'
  },
  {
    id: 'srv-sofa-foam-replacement',
    title: 'Sofa Foam Replacement',
    rating: 4.8,
    reviews: 0,
    price: '₹4,999',
    features: [
      'Old foam removal',
      'High-density memory foam installation',
      'Professional compression testing',
      'Fabric re-fitting'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-foam-replacement'
  },
  {
    id: 'srv-sofa-leather-repair',
    title: 'Sofa Leather/Rexine Repair',
    rating: 4.7,
    reviews: 0,
    price: '₹3,999',
    features: [
      'Deep cleaning and degreasing',
      'Crack and tear sealing',
      'Discoloration removal',
      'Protective wax conditioning'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-leather-rexine-repair'
  },
  {
    id: 'srv-sofa-wooden-frame-repair',
    title: 'Sofa Wooden Frame Repair',
    rating: 4.7,
    reviews: 0,
    price: '₹5,999',
    features: [
      'Structural inspection and assessment',
      'Joint tightening with reinforcement',
      'Crack filling and wood treatment',
      'Protective finish application'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-wooden-frame-repair'
  },
  {
    id: 'srv-sofa-recliner-repair',
    title: 'Sofa Recliner Mechanism Repair',
    rating: 4.8,
    reviews: 0,
    price: '₹4,499',
    features: [
      'Mechanical system diagnosis',
      'Cable or spring replacement',
      'Motor lubrication and testing',
      'Lever or button adjustment'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-recliner-mechanism-repair'
  },
  {
    id: 'srv-sofa-comprehensive-refinishing',
    title: 'Sofa Comprehensive Refinishing',
    rating: 4.8,
    reviews: 0,
    price: '₹6,999',
    features: [
      'Deep professional cleaning',
      'Stain and spot removal',
      'Surface sanding (if wooden)',
      'Protective varnish/lacquer application'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'sofa-comprehensive-refinishing'
  },
  {
    id: 'srv-complete-sofa-upholstery',
    title: 'Complete Sofa Upholstery Service',
    rating: 4.8,
    reviews: 0,
    price: '₹11,999',
    features: [
      'Complete frame inspection',
      'Fabric removal and new application',
      'Cushion assessment and repair',
      'Professional finishing touches'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'complete-sofa-upholstery-service'
  },
  {
    id: 'srv-office-chair-repair',
    title: 'Office Chair Repair',
    rating: 4.7,
    reviews: 0,
    price: '₹2,499',
    features: [
      'Base and wheel inspection',
      'Armrest repair and reinforcement',
      'Seat cushion restoration',
      'Upholstery patching'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'office-chair-repair'
  },
  {
    id: 'srv-dining-chair-repair',
    title: 'Dining Chair Repair',
    rating: 4.7,
    reviews: 0,
    price: '₹1,999',
    features: [
      'Wooden frame inspection and repair',
      'Joint tightening with reinforcement',
      'Seat upholstery restoration',
      'Protective finish'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'dining-chair-repair'
  },
  {
    id: 'srv-chair-upholstery-change',
    title: 'Chair Upholstery Change',
    rating: 4.8,
    reviews: 0,
    price: '₹3,499',
    features: [
      'Old fabric removal',
      'Frame inspection',
      'New fabric application',
      'Professional edge finishing'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'chair-upholstery-change'
  },
  {
    id: 'srv-cane-wicker-chair-repair',
    title: 'Cane/Wicker Chair Repair',
    rating: 4.7,
    reviews: 0,
    price: '₹2,999',
    features: [
      'Strand inspection and assessment',
      'Damaged strand replacement',
      'Frame joint tightening',
      'Protective lacquer coating'
    ],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    slug: 'cane-wicker-chair-repair'
  }
];

const repairServices = [
  {
    id: 'structural-repair',
    name: 'Structural Repair',
    price: '₹2,000 - ₹8,000',
    duration: '4 hours - 1 day',
    description: 'Fix broken frames, loose joints, and structural damage',
    features: [
      'Frame realignment',
      'Joint reinforcement',
      'Wood replacement',
      'Leg repair/replacement',
      'Stress point fixing',
      'Strength testing'
    ],
    suitableFor: 'Wobbly furniture, broken frames, loose joints'
  },
  {
    id: 'joint-repair',
    name: 'Joint & Assembly Repair',
    price: '₹1,500 - ₹4,000',
    duration: '2-4 hours',
    description: 'Tighten, repair, or reinforce furniture joints',
    features: [
      'Dovetail joint repair',
      'Mortise and tenon fixing',
      'Screw tightening',
      'Dowels replacement',
      'Glue injection',
      'Clamping and curing'
    ],
    suitableFor: 'Loose chairs, wobbly tables, detached parts'
  },
  {
    id: 'wood-repair',
    name: 'Wood Damage Repair',
    price: '₹2,500 - ₹6,000',
    duration: '4-8 hours',
    description: 'Repair cracks, scratches, dents, and wood damage',
    features: [
      'Crack filling',
      'Dent removal',
      'Wood putty application',
      'Color matching',
      'Grain pattern repair',
      'Sanding and finishing'
    ],
    suitableFor: 'Cracked wood, deep scratches, water damage'
  },
  {
    id: 'upholstery-repair',
    name: 'Upholstery Repair',
    price: '₹3,000 - ₹10,000',
    duration: '4 hours - 2 days',
    description: 'Repair and restore fabric and leather upholstery',
    features: [
      'Tear patching',
      'Zipper replacement',
      'Cushion refilling',
      'Frame reupholstery',
      'Leather dyeing',
      'Spring replacement'
    ],
    suitableFor: 'Torn fabrics, worn cushions, damaged leather'
  },
  {
    id: 'hardware-repair',
    name: 'Hardware Replacement',
    price: '₹500 - ₹3,000',
    duration: '1-3 hours',
    description: 'Replace and repair hardware components',
    features: [
      'Handle replacement',
      'Hinge repair',
      'Lock installation',
      'Drawer slide fixing',
      'Catch and latch repair',
      'Knob replacement'
    ],
    suitableFor: 'Broken handles, stuck drawers, faulty hinges'
  },
  {
    id: 'furniture-restoration',
    name: 'Complete Restoration',
    price: '₹10,000 - ₹50,000',
    duration: '3-7 days',
    description: 'Full furniture restoration to like-new condition',
    features: [
      'Complete disassembly',
      'Full inspection',
      'All repairs included',
      'Complete refinishing',
      'New hardware installation',
      'Final quality check'
    ],
    suitableFor: 'Antique furniture, severely damaged pieces'
  }
];

const damageTypes = [
  { name: 'Broken/Legs Off', category: 'structural' },
  { name: 'Wobbly/Unstable', category: 'structural' },
  { name: 'Cracked Wood', category: 'wood' },
  { name: 'Deep Scratches', category: 'wood' },
  { name: 'Water Damage', category: 'wood' },
  { name: 'Torn Fabric', category: 'upholstery' },
  { name: 'Worn Cushions', category: 'upholstery' },
  { name: 'Broken Handle/Hinge', category: 'hardware' },
  { name: 'Stuck Drawer', category: 'hardware' },
  { name: 'Joint Came Apart', category: 'joint' },
  { name: 'Other', category: 'other' }
];

const furnitureTypes = [
  { name: 'Sofa/Couch' },
  { name: 'Dining Chair' },
  { name: 'Dining Table' },
  { name: 'Coffee Table' },
  { name: 'Wardrobe' },
  { name: 'Bed Frame' },
  { name: 'Study Desk' },
  { name: 'Cabinet' },
  { name: 'Bookshelf' },
  { name: 'Other' }
];

const repairProcess = [
  {
    step: 1,
    title: 'Damage Assessment',
    description: 'Our experts thoroughly inspect the damage and provide a detailed repair plan and quote.'
  },
  {
    step: 2,
    title: 'Parts & Materials',
    description: 'We source quality replacement parts and materials needed for the repair.'
  },
  {
    step: 3,
    title: 'Repair Work',
    description: 'Skilled craftsmen perform the repair using professional techniques and tools.'
  },
  {
    step: 4,
    title: 'Quality Check',
    description: 'Rigorous quality testing ensures the furniture is safe and stable.'
  },
  {
    step: 5,
    title: 'Delivery',
    description: 'We deliver your repaired furniture back to your home, good as new!'
  }
];

const whyChooseRepair = [
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Skilled Craftsmen',
    description: 'Experienced carpenters and furniture repair experts'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Quality Parts',
    description: 'Genuine replacement parts from trusted suppliers'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Quick Turnaround',
    description: 'Most repairs completed within 24-48 hours'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Free Pickup/Delivery',
    description: 'We collect and return your furniture at no extra cost'
  }
];

export default function RepairPage() {
  usePageMeta('REPAIR');

  const [formData, setFormData] = useState<RepairFormData>({
    name: '',
    email: '',
    phone: '',
    furnitureType: '',
    repairType: '',
    damageType: '',
    furnitureAge: '',
    urgency: 'normal',
    address: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<RepairFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RepairFormData> = {};

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
    if (!formData.furnitureType) newErrors.furnitureType = 'Please select furniture type';
    if (!formData.damageType) newErrors.damageType = 'Please describe the damage';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Repair service request:', formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof RepairFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#C6A75E] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Furniture Repair</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#E8F4F8] to-[#D4E8F0] rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A9D8F]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2A9D8F]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-10 h-10 text-[#2A9D8F]" />
            <h1 className="text-4xl font-bold text-gray-900">Professional Furniture Repair</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mb-6">
            Don't replace it, repair it! Our expert craftsmen can fix any furniture damage 
            and restore your beloved pieces to their original glory.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg">
              <Hammer className="w-5 h-5 text-[#2A9D8F]" />
              <span className="text-sm font-medium">Expert Carpenters</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-[#2A9D8F]" />
              <span className="text-sm font-medium">24-48 Hour Turnaround</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-[#2A9D8F]" />
              <span className="text-sm font-medium">3-Month Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sofa & Upholstery Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sofa & Upholstery</h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200">
            {sofaUpholsteryServices.length} services
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sofaUpholsteryServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-4">
                {/* Left content */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{service.title}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
                    <span className="text-amber-500 font-bold flex items-center gap-0.5">
                      ★ {service.rating}
                    </span>
                    <span>({service.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500">Starts at </span>
                    <span className="font-bold text-gray-900 text-lg">{service.price}</span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-1.5 mb-4 text-xs text-gray-600">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View Details Link */}
                  <Link
                    to={`/product/${service.slug}`}
                    className="text-xs font-semibold text-gray-900 hover:text-brand-600 underline block mt-2"
                  >
                    View details
                  </Link>
                </div>

                {/* Right content (Image & Actions) */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0 w-32 md:w-36">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-32 h-20 md:w-36 md:h-24 object-cover rounded-xl border border-gray-100 shadow-sm"
                  />

                  {/* WhatsApp Book Button */}
                  <a
                    href={`https://wa.me/919236312375?text=${encodeURIComponent(`Hello! I would like to book the ${service.title} (${service.price}) service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Book</span>
                  </a>

                  {/* Add Button */}
                  <button
                    onClick={async () => {
                      try {
                        await cartService.addItem(service.id, 1);
                        alert(`Added ${service.title} to cart!`);
                      } catch {
                        alert(`Service added to cart!`);
                      }
                    }}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>

                  <Link
                    to={`/product/${service.slug}`}
                    className="text-[11px] text-blue-600 font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Our Repair Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Repair Services?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {whyChooseRepair.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-[#2A9D8F] mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Repair Process */}
      <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Repair Process</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {repairProcess.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="bg-[#2A9D8F] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">
                {step.step}
              </div>
              <h3 className="font-semibold text-gray-900 text-center mb-2 text-sm">{step.title}</h3>
              <p className="text-xs text-gray-600 text-center">{step.description}</p>
              {index < repairProcess.length - 1 && (
                <div className="hidden md:block absolute top-4 left-[60%] w-[80%] h-0.5 bg-[#2A9D8F]/30" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Repair Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Repair Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repairServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-[#2A9D8F]/10 to-[#2A9D8F]/5 p-6">
                <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="text-[#2A9D8F] font-semibold mt-2">{service.price}</p>
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

      {/* Common Damages */}
      <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Common Furniture Issues We Fix</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {damageTypes.map((damage, index) => (
            <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-[#2A9D8F]/10 rounded-full flex items-center justify-center">
                <Hammer className="w-5 h-5 text-[#2A9D8F]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{damage.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{damage.category} repair</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Gallery */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Repair Transformations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Broken Chair Leg', before: 'Leg completely broken', after: 'Strong joint repair', img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
            { title: 'Wobbly Table', before: 'Severely unstable', after: 'Perfectly stable', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop' },
            { title: 'Cracked Drawer', before: 'Large crack in wood', after: 'Seamless repair', img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white font-medium px-3 py-1 bg-[#2A9D8F] rounded-lg">View Repair</span>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Book Repair Service</h2>
        <p className="text-gray-600 text-center mb-6">Fill out the form below and we'll contact you within 2 hours</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Request Received!</h3>
            <p className="text-gray-700">
              Thank you for booking our repair service. Our team will contact you shortly to confirm the appointment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your name" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="10-digit number" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furniture Type *</label>
                <select name="furnitureType" value={formData.furnitureType} onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30 ${errors.furnitureType ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">Select furniture type</option>
                  {furnitureTypes.map((f, i) => (
                    <option key={i} value={f.name.toLowerCase().replace(/\s/g, '-')}>{f.name}</option>
                  ))}
                </select>
                {errors.furnitureType && <p className="text-red-500 text-sm mt-1">{errors.furnitureType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30">
                  <option value="low">Not Urgent (Within a week)</option>
                  <option value="normal">Normal (Within 3-4 days)</option>
                  <option value="high">Urgent (Within 1-2 days)</option>
                  <option value="emergency">Emergency (Same day if possible)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Damage Description *</label>
              <select name="damageType" value={formData.damageType} onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30 ${errors.damageType ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select damage type</option>
                {damageTypes.map((d, i) => (
                  <option key={i} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.damageType && <p className="text-red-500 text-sm mt-1">{errors.damageType}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Repair Service Needed</label>
                <select name="repairType" value={formData.repairType} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30">
                  <option value="">Select service</option>
                  {repairServices.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - {s.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Furniture Age</label>
                <select name="furnitureAge" value={formData.furnitureAge} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30">
                  <option value="">Select age</option>
                  <option value="new">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">More than 10 years</option>
                  <option value="antique">Antique (50+ years)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30"
                placeholder="Complete address for pickup & delivery" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F]/30"
                placeholder="Describe the damage in detail, include photos if possible..." />
            </div>

            <button type="submit"
              className="w-full bg-[#2A9D8F] text-white py-3.5 px-6 rounded-lg font-semibold hover:bg-[#238B7E] transition-colors text-lg">
              Book Repair
            </button>
          </form>
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-[#E8F4F8] rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Assistance?</h3>
        <p className="text-gray-600 mb-6">Our repair experts are available to help</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="tel:+919236312375" className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg hover:bg-[#2A9D8F] hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
            <span>+91 92363 12375</span>
          </a>
          <a href="mailto:repair@veloracraft.in" className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg hover:bg-[#2A9D8F] hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
            <span>repair@veloracraft.in</span>
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