"use client"

import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">We'd love to hear from you. Reach out to our team!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you have questions about our platform, need support, or are interested in partnership opportunities, our team is ready to assist you.
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center text-lg">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <span>support@staxmore.com</span>
                </li>
                <li className="flex items-center text-lg">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center text-lg">
                  <MapPin className="h-6 w-6 text-primary mr-3" />
                  <span>123 Trading Street, Financial District, London, UK</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Business Hours</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our support team is available during the following hours:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-4">
                <li>Monday - Friday: 9:00 AM - 5:00 PM (GMT)</li>
                <li>Saturday - Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-modern p-8 bg-card text-card-foreground">
            <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground">Your Name</Label>
                <Input id="name" type="text" placeholder="John Doe" className="bg-background text-foreground border-border" />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Your Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-background text-foreground border-border" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input id="subject" type="text" placeholder="Inquiry about..." className="bg-background text-foreground border-border" />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground">Your Message</Label>
                <Textarea id="message" rows={5} placeholder="Type your message here..." className="bg-background text-foreground border-border" />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
