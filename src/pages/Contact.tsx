import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/primitives/button/button";
import ContactInfoCard from "@/components/cards/contact-info-card";
import SocialLinks from "@/components/primitives/social-links/social-links";

const Contact = () => {
  return (
    <section className="min-h-screen px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <ContactInfoCard
                  icon={<Mail className="h-5 w-5 text-primary" />}
                  title="Email"
                  value="sush104@outlook.com"
                />
                <ContactInfoCard
                  icon={<Phone className="h-5 w-5 text-primary" />}
                  title="Phone"
                  value="+44 7826352101"
                />
                <ContactInfoCard
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  title="Location"
                  value="Glasgow, UK"
                />
              </div>
            </div>

            <SocialLinks />
          </div>

          {/* Contact Form */}
          <div className="border border-border rounded-lg p-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="How can I help?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
