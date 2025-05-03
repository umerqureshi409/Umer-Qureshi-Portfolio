
import React, { useRef, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={24} />,
      label: "Email",
      value: "aa1660025@gmail.com",
      link: "mailto:aa1660025@gmail.com"
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      label: "Phone",
      value: "03213021673",
      link: "tel:03213021673"
    },
    {
      icon: <Github className="text-primary" size={24} />,
      label: "GitHub",
      value: "umerqureshi409",
      link: "https://github.com/umerqureshi409"
    },
    {
      icon: <Linkedin className="text-primary" size={24} />,
      label: "LinkedIn",
      value: "Umer Qureshi",
      link: "https://www.linkedin.com/in/umer-qureshi-526118259"
    }
  ];
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-4 text-center transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className={`text-center text-muted-foreground max-w-xl mx-auto mb-12 transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          Have a question or want to discuss a project? Feel free to reach out using the form below or through my contact information.
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`col-span-1 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-card rounded-lg p-6 border border-border h-full">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1">{info.icon}</div>
                    <div>
                      <div className="text-muted-foreground text-sm">{info.label}:</div>
                      <div className="font-medium group-hover:text-primary transition-colors">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-muted-foreground">
                  Mehran University of Engineering and Technology<br />
                  Jamshoro, Pakistan
                </p>
              </div>
            </div>
          </div>
          
          <div className={`col-span-1 md:col-span-2 transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="text-sm text-muted-foreground mb-2 block">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
