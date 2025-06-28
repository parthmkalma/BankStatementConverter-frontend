import Link from "next/link"
import { FileText, Check, ArrowRight } from "lucide-react"

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for trying out our service",
            features: ["5 conversions per month", "Basic PDF parsing", "Excel download", "Email support"],
            cta: "Get Started",
            popular: false,
        },
        {
            name: "Pro",
            price: "$19",
            period: "per month",
            description: "Best for regular users and small businesses",
            features: [
                "Unlimited conversions",
                "Advanced PDF parsing",
                "Multiple export formats",
                "Priority support",
                "Batch processing",
                "API access",
            ],
            cta: "Upgrade to Pro",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "per month",
            description: "For large organizations with custom needs",
            features: [
                "Everything in Pro",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantee",
                "On-premise deployment",
                "Custom training",
            ],
            cta: "Contact Sales",
            popular: false,
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">StatementPro</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link
                                href="/login"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Simple, transparent pricing</h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Choose the plan that's right for you. Upgrade or downgrade at any time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl shadow-sm border ${plan.popular ? "border-blue-200 ring-2 ring-blue-600" : "border-gray-200"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-2 text-gray-600">{plan.description}</p>

                                <div className="mt-6">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                                </div>

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="ml-3 text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.popular
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
                            <p className="text-gray-600">
                                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                            <p className="text-gray-600">
                                Absolutely. We use bank-level encryption and never store your files longer than necessary for
                                processing.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">What file formats do you support?</h3>
                            <p className="text-gray-600">
                                We currently support PDF bank statements from major banks. Excel output is available in XLSX format.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                            <p className="text-gray-600">
                                Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
                        <p className="mt-4 text-xl text-blue-100">Start converting your bank statements today.</p>
                        <Link
                            href="/login"
                            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
