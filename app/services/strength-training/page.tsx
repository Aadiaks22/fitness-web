import Link from "next/link"
import Image from "next/image"
import { Dumbbell, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookDemoDialog } from "@/components/book-demo-dialog"
import { ServiceHeader } from "@/components/service-header"

export const metadata = {
  title: "Posture Restoration | BalancePro",
  description:
    "Improve your posture and alleviate discomfort with our specialized posture restoration training programs at BalancePro.",
  alternates: {
    canonical: "https://www.balancepro.in/services/strength-training",
  },
}

export default function StrengthTrainingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <ServiceHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-custom-dark to-custom-deep-blue text-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/posturemg.png"
              alt="Posture Restoration"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center mb-6">
              <div className="bg-primary p-3 rounded-full mr-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Posture Restoration</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Improve your posture and alleviate discomfort with our specialized posture restoration programs.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-custom-off-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6 text-custom-deep-blue">About Our Posture Restoration Program</h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="mb-6 text-custom-text">
                  Our posture restoration program is designed to help you correct misalignment, reduce pain, and enhance
                  your overall well-being. Whether you're dealing with slouching from long hours at a desk or recovering
                  from an injury, our certified trainers will create a personalized plan to meet your needs.
                </p>
                <p className="mb-6 text-custom-text">
                  Posture restoration is not just about standing straight; it’s about improving your overall health and
                  mobility. Regular posture training can help you:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Reduce back and neck pain",
                    "Improve spinal alignment and flexibility",
                    "Enhance breathing and circulation",
                    "Boost confidence and body awareness",
                    "Prevent long-term musculoskeletal issues",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-custom-text">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-6 text-custom-text">
                  Our state-of-the-art facility is equipped with the latest stretching and strengthening equipment,
                  including posture-specific tools and functional training areas. Our trainers will guide you with
                  proper techniques to ensure you get the most out of your sessions while minimizing the risk of injury.
                </p>
                <h3 className="text-2xl font-bold mb-4 text-custom-deep-blue">What to Expect</h3>
                <p className="mb-6 text-custom-text">
                  In the Posture Restoration program, you can expect a personalized approach that focuses on identifying
                  and correcting imbalances in your body through targeted mobility, activation, and strengthening
                  exercises. The goal is to realign your posture, relieve tension, and build long-term stability. As you
                  progress, you’ll experience improved body awareness, reduced discomfort, and a more confident, upright
                  posture in your daily life.
                </p>
                <div className="mt-8">
                  <BookDemoDialog>
                    <Button className="bg-primary hover:bg-custom-deep-blue text-white font-bold rounded-full transition-all duration-300">
                      Book a Free Consultation
                    </Button>
                  </BookDemoDialog>
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-custom-deep-blue">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-custom-deep-blue">Duration</h4>
                      <p className="text-custom-text">Flexible programs from 4 to 12 weeks</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-custom-deep-blue">Frequency</h4>
                      <p className="text-custom-text">2-4 sessions per week recommended</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-custom-deep-blue">Suitable For</h4>
                      <p className="text-custom-text">All fitness levels, from beginners to advanced</p>
                    </div>
                  </div>
                  <div className="border-t border-custom-pale-blue my-6 pt-6">
                    <h3 className="text-xl font-bold mb-4 text-custom-deep-blue">Related Programs</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/services/cardio-fitness"
                          className="text-primary hover:text-custom-deep-blue transition-colors flex items-center"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Weight Management
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/weight-loss"
                          className="text-primary hover:text-custom-deep-blue transition-colors flex items-center"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Pain Management
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services/personal-training"
                          className="text-primary hover:text-custom-deep-blue transition-colors flex items-center"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Nutrition Counseling
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-custom-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Posture Restoration Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join BalancePro today and take the first step towards a stronger, healthier you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <BookDemoDialog>
                <Button className="bg-white text-primary hover:bg-custom-off-white font-bold rounded-full transition-all duration-300">
                  Book a Free Demo
                </Button>
              </BookDemoDialog>
              <Link
                href="https://wa.me/917355519301?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20Posture%20Restoration%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 px-6 py-3 text-white font-bold transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Ask Your Query
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-custom-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Balance Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
