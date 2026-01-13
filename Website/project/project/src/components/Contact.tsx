import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Culinary Street', 'Downtown District, NY 10001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@savoria.com', 'reservations@savoria.com'],
    },
    {
      icon: Clock,
      title: 'Open Hours',
      details: ['Mon-Fri: 11AM - 10PM', 'Sat-Sun: 10AM - 11PM'],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-stone-50 hover:bg-amber-50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4">
                <info.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-stone-50 rounded-2xl overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946234!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
