import Link from "next/link"
import Image from "next/image"
import { Dumbbell, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookDemoDialog } from "@/components/book-demo-dialog"
import { ServiceHeader } from "@/components/service-header"

export const metadata = {
  title: "Nutrition Counseling | BalancePro",
  description:
    "Improve your posture and alleviate discomfort with our specialized posture restoration training programs at BalancePro.",
  alternates: {
    canonical: "https://www.balancepro.in/services/nutrition-counseling",
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
              src="/nutrition.jpg"
              alt="Nutrition Counseling"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center mb-6">
              <div className="bg-primary p-3 rounded-full mr-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Nutrition Counseling</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Optimize your health and wellness with our expert nutrition counseling services.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-custom-off-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6 text-custom-deep-blue">
                  About Our Nutrition Counseling Program
                </h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="mb-6 text-custom-text">
                  Our nutrition guide plan program is designed to help you achieve your health goals through
                  personalized dietary guidance. Whether you're looking to lose weight, build muscle, manage a medical
                  condition, or simply adopt a balanced diet, our certified nutritionists will create a tailored plan to
                  meet your needs.
                </p>
                <p className="mb-6 text-custom-text">
                  Nutrition guidance is more than just meal planning; it’s about fostering sustainable eating habits and
                  understanding your body’s unique requirements. Regular sessions can help you:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Achieve weight management goals",
                    "Boost energy levels and mental clarity",
                    "Improve digestion and gut health",
                    "Support muscle growth and recovery",
                    "Manage conditions like diabetes or hypertension",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-custom-text">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-6 text-custom-text">
                  Our state-of-the-art facility offers access to the latest nutritional analysis tools, including food
                  tracking apps and metabolic assessments. Our nutritionists will guide you with evidence-based advice
                  and practical strategies to ensure you thrive while maintaining a healthy lifestyle.
                </p>
                <h3 className="text-2xl font-bold mb-4 text-custom-deep-blue">What to Expect</h3>
                <p className="mb-6 text-custom-text">
                  In the Nutrition Counseling program, you can expect a personalized and practical approach to eating
                  that supports your health, fitness, and lifestyle goals. Rather than focusing on restrictions, the
                  program emphasizes balance, education, and sustainable habits—helping you understand what your body
                  needs, how to fuel it properly, and how to build a healthy relationship with food for
                  long-term success.
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
                      <p className="text-custom-text">1-2 sessions per week recommended</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-custom-deep-blue">Suitable For</h4>
                      <p className="text-custom-text">
                        All fitness levels, from beginners to advanced, and those with specific dietary needs Related
                        Programs
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-custom-pale-blue my-6 pt-6">
                    <h3 className="text-xl font-bold mb-4 text-custom-deep-blue">Related Programs</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/services/strength-training"
                          className="text-primary hover:text-custom-deep-blue transition-colors flex items-center"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Posture Restoration
                        </Link>
                      </li>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Nutrition Counseling Journey?</h2>
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
                href="https://wa.me/917355519301?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20Nutrition%20Counseling%20services."
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
