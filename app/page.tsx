'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SkillsSection from '@/components/ui/SkillsSelection';

import {Github, Linkedin, Mail, Moon, Send, Sun, FolderCode, ChartCandlestick, ChevronDown} from "lucide-react";
import { useTheme } from "next-themes";
import Link from 'next/link';

import Image from 'next/image';

const sections = ['Home', 'Projects', 'About', 'Contact'];

//cloudflare
export const runtime = "edge";

export default function Portfolio() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('Home');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Using IntersectionObserver to handle section highlighting on scroll
  useEffect(() => {
    const sectionElements = sections.map((section) =>
      document.getElementById(section.toLowerCase())
    );

    const observerOptions = {
      root: null, // Use the viewport as the root
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    sectionElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      sectionElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth', // Enables smooth scrolling
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Header */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <Card className="w-full max-w-lg mx-auto bg-background/80 backdrop-blur-sm">
          <CardContent className="py-2 px-4">
            <nav className="flex items-center justify-between header-nav">
              {sections.map((section) => (
                <Button
                  key={section}
                  variant="ghost"
                  className={`px-2 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === section
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  onClick={() => scrollToSection(section.toLowerCase())}
                >
                  {section}
                </Button>
              ))}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
            </nav>
          </CardContent>
        </Card>
      </header>

      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-10">
        <div className="mb-8">
          <Image
            src="/images/IMG_7948.jpg"
            alt="Jeremy Myo"
            width={250}
            height={250}
            className="rounded-full border-2 border-primary"
          />
        </div>

        <h1 className="text-4xl md:text-5xl mb-4 bg-clip-text pt-5">
          Jeremy Myo
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Software Engineer
          <span className="block mt-2 text-muted-foreground">Full Stack & Data Solutions</span>
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Button>
        </div>
         {/* Scroll down button */}
        <button
          onClick={() => smoothScrollTo('projects')} // Scrolls to the Projects section
          className="mt-8 animate-bounce text-primary" // Optional bounce animation for attention
        >
          <ChevronDown className="h-[2.2rem] w-[2.2rem]" />
        </button>
      </section>

      {/* Projects Section */}
      <section id="projects" className="flex flex-col items-center justify-center min-h-screen text-center px-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'property-management-app',
                title: 'Property Management Platform',
                description: 'A full-stack property management solution designed to help users track, manage, and optimize their real estate investments',
                image: '/images/property_nirvana_logo.png', // Assuming it's located in the public/images folder
                sourceCode: 'https://github.com/BT3103AppDev1/final-project-group-1'
              },
              { 
                id: 'task-manager',
                title: 'Task Management App', 
                description: 'A productivity app created using React Native and Firebase',
                image: '/placeholder.svg?height=200&width=400',
                sourceCode: 'https://github.com/example/task-manager'
              },
              { 
                id: 'data-viz',
                title: 'Data Visualization Dashboard', 
                description: 'An interactive dashboard built with D3.js and Express',
                image: '/placeholder.svg?height=200&width=400',
                sourceCode: 'https://github.com/example/data-viz'
              }
            ].map((project) => (
              <Card key={project.id} className="overflow-hidden flex flex-col justify-between h-full">
                <div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </div>
                
                {/* Footer is at the bottom */}
                <CardFooter className="flex justify-between mt-auto">
                  <Button variant="outline" asChild>
                    <Link href={`/projects/${project.id}`}>View Project</Link>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20 px-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Profile Summary */}
            <p className="mb-6">
              Passionate about full-stack development and data-driven solutions, I bring expertise in building complex applications, integrating machine learning models, and optimizing operations through innovative technology. I enjoy solving problems that deliver meaningful outcomes.
            </p>

            {/* Education Section */}
            <div className="flex flex-col justify-center items-center mb-6">
              <div className="text-center">
                <Image 
                  src="/images/school.svg"  // Correct relative path
                  alt="Education" 
                  width={70} 
                  height={70} 
                  priority={true}
                  className="mx-auto"  // Ensures the image is centered
                />
                <p className="font-semibold mt-4">National University of Singapore NUS</p>
                <p className="text-sm text-muted-foreground">BSc Business Analytics, 2021-2025</p>
              </div>
            </div>
            
            {/* Experience Section */}
            <h3 className="text-2xl font-semibold mb-4">Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">  
              {/* Software Engineer Intern */}
              <div className="flex flex-col items-center text-center">
              <FolderCode className="h-[2.2rem] w-[2.2rem] rotate-0 scale-100 transition-all text-foreground" />
                <p className="font-semibold mt-4">Software Engineer Intern</p>
                <p className="text-sm text-muted-foreground">ATT Systems Group, 2024</p>
                <p className="text-sm">Developed data-driven applications and integrated machine learning solutions for real-time decision-making in transport and enviromental sectors.</p>
              </div>
              
              {/* Quantitative Developer Intern */}
              <div className="flex flex-col items-center text-center">
              <ChartCandlestick className="h-[2.2rem] w-[2.2rem] rotate-0 scale-100 transition-all text-foreground" />
                <p className="font-semibold mt-4">Quantitative Developer Intern</p>
                <p className="text-sm text-muted-foreground">Namara Wealth, 2023</p>
                <p className="text-sm">Built financial models and automated portfolio strategies for risk management using Python-based algorithms.</p>
              </div>
            </div>
            
            {/* Skills */}
            <h3 className="text-2xl font-semibold mb-4 text-center">Skills</h3>
            <SkillsSection/>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-10">
        <div className="container mx-auto max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
          <Card>
            <CardHeader>
              <CardTitle>Get in touch</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
