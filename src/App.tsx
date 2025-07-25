import { useState, useMemo } from 'react'
import { Search, Zap, Gauge, Fuel, Calendar, Star, Heart, Eye } from 'lucide-react'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

interface Car {
  id: string
  brand: string
  model: string
  year: number
  image: string
  engine: string
  horsepower: number
  acceleration: string
  topSpeed: string
  fuelType: string
  price: string
  rating: number
  views: number
}

const sampleCars: Car[] = [
  {
    id: '1',
    brand: 'Mercedes',
    model: 'AMG GT 63 S',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
    engine: '4.0L V8 Biturbo',
    horsepower: 630,
    acceleration: '3.2s 0-60mph',
    topSpeed: '196 mph',
    fuelType: 'Gasoline',
    price: '$159,000',
    rating: 4.8,
    views: 1250
  },
  {
    id: '2',
    brand: 'Mercedes',
    model: 'S-Class',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
    engine: '3.0L I6 Turbo',
    horsepower: 429,
    acceleration: '4.4s 0-60mph',
    topSpeed: '155 mph',
    fuelType: 'Gasoline',
    price: '$115,000',
    rating: 4.6,
    views: 890
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    engine: '3.0L I6 Twin-Turbo',
    horsepower: 503,
    acceleration: '3.8s 0-60mph',
    topSpeed: '180 mph',
    fuelType: 'Gasoline',
    price: '$74,000',
    rating: 4.7,
    views: 2100
  },
  {
    id: '4',
    brand: 'BMW',
    model: 'X5 M',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop',
    engine: '4.4L V8 Twin-Turbo',
    horsepower: 617,
    acceleration: '3.8s 0-60mph',
    topSpeed: '177 mph',
    fuelType: 'Gasoline',
    price: '$108,000',
    rating: 4.5,
    views: 1680
  },
  {
    id: '5',
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 591,
    acceleration: '3.6s 0-60mph',
    topSpeed: '190 mph',
    fuelType: 'Gasoline',
    price: '$116,000',
    rating: 4.9,
    views: 3200
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop',
    engine: 'Dual Electric Motors',
    horsepower: 469,
    acceleration: '3.9s 0-60mph',
    topSpeed: '152 mph',
    fuelType: 'Electric',
    price: '$107,000',
    rating: 4.4,
    views: 1450
  },
  {
    id: '7',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop',
    engine: '3.8L H6 Twin-Turbo',
    horsepower: 640,
    acceleration: '2.6s 0-60mph',
    topSpeed: '205 mph',
    fuelType: 'Gasoline',
    price: '$207,000',
    rating: 4.9,
    views: 4500
  },
  {
    id: '8',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&h=400&fit=crop',
    engine: 'Dual Electric Motors',
    horsepower: 750,
    acceleration: '2.6s 0-60mph',
    topSpeed: '161 mph',
    fuelType: 'Electric',
    price: '$186,000',
    rating: 4.8,
    views: 2800
  },
  {
    id: '9',
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    engine: '3.9L V8 Twin-Turbo',
    horsepower: 710,
    acceleration: '2.9s 0-60mph',
    topSpeed: '211 mph',
    fuelType: 'Gasoline',
    price: '$280,000',
    rating: 4.9,
    views: 5200
  },
  {
    id: '10',
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop',
    engine: '5.2L V10',
    horsepower: 630,
    acceleration: '2.9s 0-60mph',
    topSpeed: '202 mph',
    fuelType: 'Gasoline',
    price: '$248,000',
    rating: 4.8,
    views: 6100
  }
]

const brands = ['All', 'Mercedes', 'BMW', 'Audi', 'Porsche', 'Ferrari', 'Lamborghini']

const brandColors = {
  'Mercedes': 'from-gray-600 to-gray-800',
  'BMW': 'from-blue-500 to-blue-700',
  'Audi': 'from-red-500 to-red-700',
  'Porsche': 'from-yellow-500 to-orange-600',
  'Ferrari': 'from-red-600 to-red-800',
  'Lamborghini': 'from-green-500 to-green-700'
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')

  const filteredCars = useMemo(() => {
    return sampleCars.filter(car => {
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand
      return matchesSearch && matchesBrand
    })
  }, [searchTerm, selectedBrand])

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-bg opacity-10 animate-pulse-slow"></div>
      
      {/* Header */}
      <header className="relative z-10 glass-effect border-b">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <div className="animate-float mb-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
                🚗 Car Brand Explorer
              </h1>
            </div>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
              Discover the world's most luxurious cars with detailed specifications and stunning visuals
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6 group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search by brand or model... (e.g., Mercedes, BMW, Ferrari)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>
          </div>

          {/* Brand Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`brand-chip px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium ${
                  selectedBrand === brand ? 'active' : ''
                }`}
              >
                {brand}
                {brand !== 'All' && (
                  <span className="ml-2 text-xs opacity-75">
                    {sampleCars.filter(car => car.brand === brand).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {/* Results Counter */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <p className="text-muted-foreground font-medium">
              Found <span className="font-bold text-primary text-xl">{filteredCars.length}</span> cars
              {selectedBrand !== 'All' && (
                <span> from <span className="font-bold text-accent">{selectedBrand}</span></span>
              )}
            </p>
          </div>
        </div>

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredCars.map((car, index) => (
              <Card key={car.id} className={`car-card-hover overflow-hidden border-0 shadow-xl bg-white/95 backdrop-blur-sm`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${brandColors[car.brand as keyof typeof brandColors] || 'from-gray-600 to-gray-800'} opacity-20`}></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-white/90 text-gray-800 font-semibold shadow-lg">
                        {car.year}
                      </Badge>
                      <Badge 
                        className={`font-semibold shadow-lg ${
                          car.fuelType === 'Electric' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-orange-500 text-white'
                        }`}
                      >
                        {car.fuelType}
                      </Badge>
                    </div>
                    
                    {/* Rating & Views */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">{car.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                        <Eye className="h-3 w-3 text-gray-600" />
                        <span className="text-xs font-semibold">{car.views}</span>
                      </div>
                    </div>
                    
                    {/* Heart Icon */}
                    <div className="absolute bottom-3 right-3">
                      <button className="bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-300 hover:scale-110 shadow-lg">
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-4">
                    <CardTitle className="text-lg sm:text-xl mb-1 font-bold">
                      {car.brand} <span className="text-muted-foreground font-normal">{car.model}</span>
                    </CardTitle>
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      {car.price}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-muted-foreground block">Engine</span>
                        <span className="font-semibold text-sm truncate block">{car.engine}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1">
                        <Gauge className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-muted-foreground block">Power</span>
                        <span className="font-semibold text-sm">{car.horsepower} HP</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-1">
                          <Calendar className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-muted-foreground block">0-60mph</span>
                          <span className="font-semibold text-xs">{car.acceleration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-1">
                          <Fuel className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-muted-foreground block">Top Speed</span>
                          <span className="font-semibold text-xs">{car.topSpeed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="animate-bounce mb-6">
              <div className="text-6xl sm:text-8xl mb-4">🔍</div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              No cars found
            </h3>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto">
              Try searching for a different brand or model. We have Mercedes, BMW, Audi, Porsche, Ferrari, and Lamborghini!
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App