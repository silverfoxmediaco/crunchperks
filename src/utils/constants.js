// Restricted business types that cannot apply
export const RESTRICTED_BUSINESS_TYPES = [
  'liquor-stores',
  'adult-entertainment',
  'vape-shops',
  'competing-gyms',
  'payday-loans',
  'firearms',
  'cannabis',
  'political-campaigns'
];

// All business categories
export const BUSINESS_CATEGORIES = [
  {
    value: 'restaurant',
    label: 'Restaurant',
    description: 'Dining establishments, cafes, food services',
    icon: '🍽️'
  },
  {
    value: 'health-wellness',
    label: 'Health & Wellness',
    description: 'Chiropractors, massage therapy, medical spas',
    icon: '🧘'
  },
  {
    value: 'retail',
    label: 'Retail',
    description: 'Clothing, equipment, general merchandise',
    icon: '🛍️'
  },
  {
    value: 'professional-services',
    label: 'Professional Services',
    description: 'Legal, accounting, consulting, insurance',
    icon: '💼'
  },
  {
    value: 'automotive',
    label: 'Automotive',
    description: 'Car dealerships, repair shops, detailing',
    icon: '🚗'
  },
  {
    value: 'home-services',
    label: 'Home Services',
    description: 'Cleaning, landscaping, contractors, remodeling',
    icon: '🏡'
  },
  {
    value: 'beauty-salon',
    label: 'Beauty & Salon',
    description: 'Hair salons, nail salons, barbershops',
    icon: '💇'
  },
  {
    value: 'entertainment',
    label: 'Entertainment',
    description: 'Bowling, movies, family fun centers',
    icon: '🎭'
  },
  {
    value: 'pet-services',
    label: 'Pet Services',
    description: 'Grooming, veterinary, pet stores',
    icon: '🐾'
  },
  {
    value: 'education',
    label: 'Education',
    description: 'Tutoring, training, educational services',
    icon: '📚'
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Other legitimate business types',
    icon: '📋'
  }
];

// Tier options
export const TIER_OPTIONS = [
  {
    value: 'dfw',
    label: 'DFW Metro',
    price: 160,
    description: 'Advertise across Dallas-Fort Worth Crunch locations',
    locations: '15+ locations'
  },
  {
    value: 'statewide',
    label: 'Statewide',
    price: 'TBD',
    description: 'Reach members across Texas',
    locations: 'All Texas locations',
    comingSoon: true
  },
  {
    value: 'nationwide',
    label: 'Nationwide',
    price: 'TBD',
    description: 'National reach across all Crunch locations',
    locations: 'All US locations',
    comingSoon: true
  }
];

// Location count options
export const LOCATION_COUNT_OPTIONS = [
  {
    value: 'single',
    label: '1 Location',
    description: 'Single business location',
    routesTo: 'Area Manager'
  },
  {
    value: 'multi-small',
    label: '2-9 Locations',
    description: 'Small multi-location business',
    routesTo: 'VP of Sales'
  },
  {
    value: 'multi-large',
    label: '10+ Locations',
    description: 'Enterprise or franchise',
    routesTo: 'VP of Sales'
  }
];

// US States for address form
export const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];
