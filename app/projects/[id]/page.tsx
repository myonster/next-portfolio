'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Github, Globe } from "lucide-react"
import Link from 'next/link'
import Image from 'next/image'
import LoadingSpinner from "@/components/LoadingSpinner";

const projects = [
  {
    id: 'property-management-app',
    title: 'Singapore Property Management Platform',
    description: 'A full-stack property management solution designed to help users track, manage, and optimize their real estate investments',
    image: '/images/OverviewArchitecture.jpg',
    sourceCode: 'https://github.com/BT3103AppDev1/final-project-group-1',
    liveDemo: 'https://propertynirvana-82d24.web.app/',
    features: [
      'Comprehensive Property Analytics Dashboard',
      'Investment Property Tenancy Tracker',
      'Property Expense Tracker',
      'Insights Tracker for Comparable Properties',
      'AI-Powered Advisory Bot (PropBot)',
      'Tailored Property News (PropNews)',
      'Mortgage Calculator',
      'User authentication and registration',
      'Interactive Google Maps for property display',
      'Test user login details, User: testuser@test.com Password: 123456'
    ],
    technologies: ['Vue.js', 'Firebase', 'Bootstrap 5', 'OpenAI API', 'URA API', 'TheNewsAPI', 'OneMAP Singapore API']
  },
  { 
    id: 'task-manager',
    title: 'Task Management App', 
    description: 'A productivity app created using React Native and Firebase',
    image: '/placeholder.svg?height=400&width=800',
    sourceCode: 'https://github.com/example/task-manager',
    liveDemo: 'https://example-taskmanager.vercel.app',
    features: [
      'User authentication',
      'Create, edit, and delete tasks',
      'Organize tasks into projects',
      'Set due dates and priorities',
      'Push notifications for task reminders',
    ],
    technologies: ['React Native', 'Firebase', 'Expo', 'Redux', 'Push Notifications API']
  },
  { 
    id: 'data-viz',
    title: 'Data Visualization Dashboard', 
    description: 'An interactive dashboard built with D3.js and Express',
    image: '/placeholder.svg?height=400&width=800',
    sourceCode: 'https://github.com/example/data-viz',
    liveDemo: 'https://example-dataviz.vercel.app',
    features: [
      'Real-time data updates',
      'Multiple chart types (line, bar, pie, scatter)',
      'Interactive filters and date range selection',
      'Data export functionality',
      'Responsive layout for various screen sizes',
    ],
    technologies: ['D3.js', 'Express', 'Socket.io', 'PostgreSQL', 'Chart.js']
  }
]

export const runtime = "edge";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === params.id)
    if (foundProject) {
      setProject(foundProject)
    } else {
      router.push('/') // Redirect to home if project not found
    }
  }, [params.id, router])

  if (!project) {
    // return <div>Loading...</div>
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6">
          <Link href ="/">
            <ArrowLeft className="mr-2 h-4 w-4 inline-block" /> Back to Portfolio
          </Link>
        </Button>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
            <CardDescription className="text-xl">{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Replacing <img> with the Next.js Image component */}
            <Image 
              src={project.image}
              alt={project.title}
              width={800}
              height={400}
              quality={100}
              unoptimized
              className="w-full h-auto rounded-lg mb-6"
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Features</h3>
                <ul className="list-disc list-inside space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild>
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </a>
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Other Projects</h3>
          <div className="flex justify-center space-x-4">
            {projects.filter(p => p.id !== project.id).map(p => (
              <Button key={p.id} variant="outline" asChild>
                <Link href={`/projects/${p.id}`}>{p.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}