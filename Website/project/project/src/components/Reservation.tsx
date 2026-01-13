import { useState } from 'react';
import { Calendar, Clock, Users, Send } from 'lucide-react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');

    setTimeout(() => {
      setSubmitStatus('idle');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="reservation" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Book a Table</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Reserve Your Experience
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Secure your table for an unforgettable dining experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-700 font-medium">Monday - Friday</span>
                  <span className="text-amber-600 font-semibold">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-700 font-medium">Saturday</span>
                  <span className="text-amber-600 font-semibold">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Sunday</span>
                  <span className="text-amber-600 font-semibold">10:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-600 p-8 rounded-2xl shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Special Events</h3>
              <p className="leading-relaxed mb-6">
                Planning a special celebration? We offer private dining experiences and customized menus
                for groups of 10 or more. Contact us to discuss your event.
              </p>
              <button className="bg-white text-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors">
                Contact for Events
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                  <option value="9+">9+ Guests</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all resize-none"
                  placeholder="Any dietary restrictions or special occasions?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  submitStatus === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg'
                } disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : submitStatus === 'success' ? (
                  <span>Reservation Received!</span>
                ) : (
                  <>
                    <span>Confirm Reservation</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="text-center text-green-600 text-sm">
                  Thank you! We'll contact you shortly to confirm your reservation.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
