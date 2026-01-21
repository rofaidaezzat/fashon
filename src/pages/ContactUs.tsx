import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useContactUs } from "../api/contactUs";
import { useLanguage } from "../context/LanguageContext";

const ContactUs = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { mutate, isPending } = useContactUs();
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: () => {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSent(false), 5000);
      },
      onError: (error) => {
        console.error("Failed to send message:", error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Card Container */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Contact Information */}
        <div className="lg:w-5/12 bg-gray-900 p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.phone}</h3>
                  <a href={`tel:${t.contact.phone_number}`} className="text-gray-400 hover:text-white transition-colors" dir="ltr">{t.contact.phone_number}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.email}</h3>
                  <a href={`mailto:${t.contact.email_value}`} className="text-gray-400 hover:text-white transition-colors">{t.contact.email_value}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t.contact.office}</h3>
                  <p className="text-gray-400">
                   {t.contact.office_address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
             <div className="flex gap-2 mb-4">
                 <div className="w-8 h-1 bg-rose-500 rounded"></div>
                 <div className="w-4 h-1 bg-rose-500/50 rounded"></div>
                 <div className="w-2 h-1 bg-rose-500/20 rounded"></div>
             </div>
            <p className="text-sm text-gray-500">
              {t.contact.rights}
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:w-7/12 p-10 lg:p-12 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.form.placeholders.name}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.form.placeholders.email}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.form.placeholders.message}
                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Submit Button & Status */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending || isSent}
                className={`w-full flex items-center justify-center py-4 px-6 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 
                  ${
                    isSent
                      ? "bg-green-500 cursor-default hover:translate-y-0"
                      : "bg-gray-900 hover:bg-gray-800 hover:shadow-gray-500/30"
                  } 
                  ${isPending ? "opacity-75 cursor-wait" : ""}
                `}
              >
                {isPending ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.contact.form.sending}
                  </span>
                ) : isSent ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {t.contact.form.sent}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {t.contact.form.send}
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
