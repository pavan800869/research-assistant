import Link from 'next/link'

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 AI Research Assistant. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-blue-400 transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 