import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, Sun, Sprout, ShoppingBag, Bug, BookOpen, ChevronRight , Wheat} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import hero from '../assets/herosection.jpg'
import cargill from '../assets/cargill.webp'
import adm from '../assets/adm.webp'
import  olem from '../assets/olem.webp'
import sinar from '../assets/sinar.webp'
import pioneer from '../assets/pioneer.webp'
import { ModeToggle } from "@/components/ThemeToggle"

import { getAuthSession } from "@/lib/auth"


export default async function LandingPage() {
const session =await getAuthSession()
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto ">
      <header className="px-4 lg:px-6 h-14 flex items-center  border-b py-4">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-2xl font-bold text-primary flex gap-1 items-center"><Wheat /> Krishi</span>
        </Link>
        <div className="ml-auto flex item-center gap-4 ">
        <ModeToggle />
        {session?.user ?
        <Link href={'/dashboard'}>
          <Button >Dashboard</Button>
        </Link>:
        <Link href={'/login'}>
          <Button >Login</Button>
        </Link>
        }
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empowering Farmers with Integrated AgriTech Solutions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Revolutionize your farming practices with our comprehensive webapp. Get real-time updates,
                    personalized recommendations, and connect directly with buyers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                alt="Hero Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src={hero}
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32  border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're committed to achieving SDG 2: Zero Hunger by empowering farmers with cutting-edge technology and
                  sustainable practices.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Weather Information</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Real-time updates and personalized recommendations
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Sprout className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Soil Health Monitoring</h3>
                  <p className="text-sm text-center text-muted-foreground">Data-driven decisions for optimal growth</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <ShoppingBag className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Agricultural Marketplace</h3>
                  <p className="text-sm text-center text-muted-foreground">Direct farmer-buyer connections</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Bug className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Pest and Disease Detection</h3>
                  <p className="text-sm text-center text-muted-foreground">Using advanced image recognition</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <BookOpen className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Training and Awareness</h3>
                  <p className="text-sm text-center text-muted-foreground">Knowledge dissemination for farmers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Testimonials</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      
                <Card >
                  <CardContent className="flex flex-col space-y-2 p-6">
                    <p className="text-sm text-muted-foreground">
                      "Krishi has revolutionized how we monitor soil health and weather patterns, making farming more efficient."
                    </p>
                    <p className="font-semibold">- Singappa, Smallholder Farmer</p>
                  </CardContent>
                </Card>
      
                <Card >
                  <CardContent className="flex flex-col space-y-2 p-6">
                    <p className="text-sm text-muted-foreground">
                    "Krishi’s data insights allow us to make informed decisions, boosting overall farm efficiency."
                    </p>
                    <p className="font-semibold">-  Ravi, Farmer from Karnataka </p>
                  </CardContent>
                </Card>
      
                <Card >
                  <CardContent className="flex flex-col space-y-2 p-6">
                    <p className="text-sm text-muted-foreground">
                    "Krishi’s training modules make adopting sustainable farming practices easier."
                    </p>
                    <p className="font-semibold">-  Sunita, Farm Cooperative Leader </p>
                  </CardContent>
                </Card>
         
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Partners and Sponsors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
             
                <div className="flex flex-col items-center justify-center text-center">
                  <Image
                  src={cargill}
                  alt="Sponser"
                    width={180}
                    height={80}
                    className="max-w-[100px] md:max-w-[180px] mb-2 rounded-xl"
                  />
                  <p className="text-sm font-medium">Cargill</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Image
                  src={adm}
                  alt="Sponser"
                    width={180}
                    height={80}
                    className="max-w-[100px] md:max-w-[180px] mb-2 rounded-xl"
                  />
                  <p className="text-sm font-medium">ADM</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Image
                  src={olem}
                  alt="Sponser"
                    width={180}
                    height={80}
                    className="max-w-[100px] md:max-w-[180px] mb-2 rounded-xl"
                  />
                  <p className="text-sm font-medium">Olem</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <Image
                  src={pioneer}
                  alt="Sponser"
                    width={180}
                    height={80}
                    className="max-w-[100px] md:max-w-[180px] mb-2 rounded-xl"
                  />
                  <p className="text-sm font-medium">Pioneer</p>
                </div>
            
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-b border-t">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Contact Us</h2>
            <form className="max-w-md mx-auto space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 KRISHI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}