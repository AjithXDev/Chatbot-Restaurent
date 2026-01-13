export default function Gallery() {
  const images = [
    {
      url: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Gourmet Dish 1',
    },
    {
      url: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Restaurant Ambiance',
    },
    {
      url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Gourmet Dish 2',
    },
    {
      url: 'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Chef at Work',
    },
    {
      url: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Gourmet Dish 3',
    },
    {
      url: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Elegant Dining',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Gallery</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Visual Journey
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            A glimpse into our culinary artistry and elegant atmosphere
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${
                index === 0 || index === 5 ? 'h-64 md:h-full' : 'h-48'
              }`}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
