import { useState } from 'react';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Course' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];

  const menuItems: MenuItem[] = [
    {
      name: 'Duck Confit',
      description: 'Slow-cooked duck leg with crispy skin, served with garlic jus and roasted potatoes',
      price: '$34',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'starters',
    },
    {
      name: 'Wagyu Beef Tenderloin',
      description: 'Premium wagyu with roasted vegetables and red wine reduction',
      price: '$58',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
    },
    {
      name: 'Pan-Seared Lamb Chops',
      description: 'Succulent lamb chops with mint jus, caramelized onions, and herb-roasted root vegetables',
      price: '$48',
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
    },
    {
      name: 'Crème Brûlée',
      description: 'Classic French vanilla custard with caramelized sugar',
      price: '$14',
      image: 'https://images.pexels.com/photos/4110378/pexels-photo-4110378.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'desserts',
    },
    {
      name: 'Lobster Bisque',
      description: 'Creamy lobster soup with tender lobster meat and crispy croutons',
      price: '$22',
      image: 'https://images.pexels.com/photos/5737452/pexels-photo-5737452.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'starters',
    },
    {
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
      price: '$38',
      image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
    },
    {
      name: 'Chocolate Fondant',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      price: '$16',
      image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'desserts',
    },
    {
      name: 'Filet Mignon with Mushroom Sauce',
      description: 'Tender beef filet with burgundy mushroom sauce and truffle mashed potatoes',
      price: '$52',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
    },
    {
      name: 'Prosciutto-Wrapped Figs',
      description: 'Fresh figs wrapped in prosciutto with burrata cheese and balsamic glaze',
      price: '$19',
      image: 'https://images.pexels.com/photos/1213317/pexels-photo-1213317.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'starters',
    },
    {
      name: 'Garlic Butter Prawns',
      description: 'Jumbo prawns sautéed in garlic butter with white wine and fresh herbs',
      price: '$36',
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'mains',
    },
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
      price: '$13',
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'desserts',
    },
    {
      name: 'Premium Red Wine',
      description: 'Curated selection of fine wines paired with our signature dishes',
      price: '$45',
      image: 'https://images.pexels.com/photos/3407813/pexels-photo-3407813.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'drinks',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Culinary Masterpieces
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Explore our carefully curated selection of dishes, each crafted with passion and precision
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full font-bold">
                  {item.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
