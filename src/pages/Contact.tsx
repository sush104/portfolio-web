import React, { useCallback } from "react";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/primitives/button/button";
import ContactInfoCard from "@/components/primitives/card/contact-info-card";
import SocialLinks from "@/components/primitives/social-links/social-links";

const Contact = () => {
  const downloadVCard = useCallback(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Shelke;Sushant;;;",
      "FN:Sushant Shelke",
      "EMAIL;TYPE=INTERNET:sush104@outlook.com",
      "TEL;TYPE=CELL:+447826352101",
      "ADR;TYPE=HOME:;;Glasgow;;;UK",
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sushant-shelke.vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, []);

  const openCalendly = useCallback(() => {
    // Replace with your scheduling URL
    window.open(
      "https://calendly.com/sush104",
      "_blank",
      "noopener,noreferrer",
    );
  }, []);

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

        <div className="grid md:grid-cols-2 gap-12 items-start">
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

          {/* Stylized Contact Card (replaces form) */}
          <div className="rounded-lg p-6 bg-gradient-to-tr from-primary/5 via-transparent to-transparent border border-border shadow-lg">
            <div className="flex flex-col h-full gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Let's collaborate</h3>
                  <p className="text-muted-foreground mt-1">
                    Quick ways to reach me — pick whichever works best for you.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  asChild={false}
                  onClick={() =>
                    (window.location.href = "mailto:sush104@outlook.com")
                  }
                  className="w-full"
                >
                  <Mail className="h-4 w-4" />
                  Email Me
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={openCalendly}
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a quick call
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={downloadVCard}
                >
                  Download vCard
                </Button>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="mt-3 text-sm text-muted-foreground text-center">
                  Or email me directly at{" "}
                  <a
                    href="mailto:sush104@outlook.com"
                    className="text-primary underline"
                  >
                    sush104@outlook.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
