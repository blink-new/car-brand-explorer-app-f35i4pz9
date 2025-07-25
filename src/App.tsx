import { useState, useMemo } from 'react'
import { Search, Zap, Gauge, Fuel, Calendar } from 'lucide-react'
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
}

const sampleCars: Car[] = [
  {
    id: '1',
    brand: 'Mercedes',
    model: 'AMG GT 63 S',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop',
    engine: '4.0L V8 Biturbo',
    horsepower: 630,
    acceleration: '3.2s 0-60mph',
    topSpeed: '196 mph',
    fuelType: 'Gasoline',
    price: '$159,000'
  },
  {
    id: '2',
    brand: 'Mercedes',
    model: 'S-Class',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&h=300&fit=crop',
    engine: '3.0L I6 Turbo',
    horsepower: 429,
    acceleration: '4.4s 0-60mph',
    topSpeed: '155 mph',
    fuelType: 'Gasoline',
    price: '$115,000'
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
    engine: '3.0L I6 Twin-Turbo',
    horsepower: 503,
    acceleration: '3.8s 0-60mph',
    topSpeed: '180 mph',
    fuelType: 'Gasoline',
    price: '$74,000'
  },
  {
    id: '4',
    brand: 'BMW',
    model: 'X5 M',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&h=300&fit=crop',
    engine: '4.4L V8 Twin-Turbo',
    horsepower: 617,
    acceleration: '3.8s 0-60mph',
    topSpeed: '177 mph',
    fuelType: 'Gasoline',
    price: '$108,000'
  },
  {
    id: '5',
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop',
    engine: '4.0L V8 Twin-Turbo',
    horsepower: 591,
    acceleration: '3.6s 0-60mph',
    topSpeed: '190 mph',
    fuelType: 'Gasoline',
    price: '$116,000'
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&h=300&fit=crop',
    engine: 'Dual Electric Motors',
    horsepower: 469,
    acceleration: '3.9s 0-60mph',
    topSpeed: '152 mph',
    fuelType: 'Electric',
    price: '$107,000'
  },
  {
    id: '7',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500&h=300&fit=crop',
    engine: '3.8L H6 Twin-Turbo',
    horsepower: 640,
    acceleration: '2.6s 0-60mph',
    topSpeed: '205 mph',
    fuelType: 'Gasoline',
    price: '$207,000'
  },
  {
    id: '8',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=500&h=300&fit=crop',
    engine: 'Dual Electric Motors',
    horsepower: 750,
    acceleration: '2.6s 0-60mph',
    topSpeed: '161 mph',
    fuelType: 'Electric',
    price: '$186,000'
  }
]

const brands = ['All', 'Mercedes', 'BMW', 'Audi', 'Porsche']

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Car Brand Explorer</h1>
            <p className="text-muted-foreground text-lg">Discover luxury cars and their specifications</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Brand Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {brands.map((brand) => (
              <Badge
                key={brand}
                variant={selectedBrand === brand ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
                  selectedBrand === brand 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-secondary hover:bg-accent/10'
                }`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredCars.length}</span> cars
            {selectedBrand !== 'All' && (
              <span> from <span className="font-semibold text-foreground">{selectedBrand}</span></span>
            )}
          </p>
        </div>

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <Card key={car.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        {car.year}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant="secondary" 
                        className={`${car.fuelType === 'Electric' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {car.fuelType}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-1">{car.brand} {car.model}</CardTitle>
                  <p className="text-2xl font-bold text-accent mb-4">{car.price}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Engine:</span>
                      <span className="font-medium">{car.engine}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Power:</span>
                      <span className="font-medium">{car.horsepower} HP</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">0-60mph:</span>
                      <span className="font-medium">{car.acceleration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Top Speed:</span>
                      <span className="font-medium">{car.topSpeed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold mb-2">No cars found</h3>
            <p className="text-muted-foreground">Try searching for a different brand or model</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App