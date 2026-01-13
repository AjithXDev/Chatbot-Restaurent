import { Award, Heart, Users, Clock } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized with multiple culinary awards for excellence in fine dining',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every dish is prepared with passion and the finest ingredients',
    },
    {
      icon: Users,
      title: 'Expert Chefs',
      description: 'Our team of master chefs brings decades of experience',
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'We source fresh, local ingredients every single day',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 leading-tight">
                Where Tradition Meets Innovation
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded in 2010, Savoria has been a culinary landmark in the heart of the city.
              Our journey began with a simple vision: to create unforgettable dining experiences
              that celebrate both traditional flavors and contemporary techniques.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Today, we continue to push boundaries while honoring the timeless art of cooking.
              Each plate that leaves our kitchen is a testament to our commitment to excellence,
              creativity, and the joy of sharing exceptional food.
            </p>
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-4xl font-bold text-amber-600">15+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">50+</div>
                <div className="text-sm text-gray-600 mt-1">Signature Dishes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-600">10k+</div>
                <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-amber-600 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-stone-200 rounded-2xl -z-10" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:bg-stone-50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
