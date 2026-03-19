import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { eventTypes } from '../data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  city: string;
  location: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    city: '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Il telefono è obbligatorio';
    } else if (!/^[0-9\s]{8,}$/.test(formData.phone.replace(/[^0-9\s]/g, ''))) {
      newErrors.phone = 'Inserisci un numero di telefono valido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Raccontami qualcosa sul tuo evento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      date: '',
      city: '',
      location: '',
      message: '',
    });

    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome e Cognome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-secondary border rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.name ? 'border-red-500' : 'border-accent/20'
            }`}
            placeholder="Mario Rossi"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-secondary border rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.email ? 'border-red-500' : 'border-accent/20'
            }`}
            placeholder="mario.rossi@email.it"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Telefono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-secondary border rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.phone ? 'border-red-500' : 'border-accent/20'
            }`}
            placeholder="+39 333 1234567"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium mb-2">
            Tipo di Evento
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full bg-secondary border border-accent/20 rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Seleziona un tipo</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Data Evento
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-secondary border border-accent/20 rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            Città
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-secondary border border-accent/20 rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Milano"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full bg-secondary border border-accent/20 rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Villa Melzi"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Messaggio *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full bg-secondary border rounded px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
            errors.message ? 'border-red-500' : 'border-accent/20'
          }`}
          placeholder="Raccontami qualcosa sul tuo evento: numero di ospiti, atmosfera desiderata, brani preferiti, richieste particolari..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-accent text-primary px-8 py-4 text-lg font-semibold rounded hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Invio in corso...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Invia Richiesta
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="w-5 h-5" />
            <span>Messaggio inviato! Ti ricontatterò presto.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span>Errore nell'invio. Riprova più tardi.</span>
          </div>
        )}
      </div>

      <p className="text-text-muted text-sm">
        I campi contrassegnati con * sono obbligatori. Ti risponderò entro 24 ore.
      </p>
    </form>
  );
}
