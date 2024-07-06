import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-white py-10 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p className="text-sm">
            We are dedicated to providing the best learning experience for
            children through gamified coding lessons.
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Resources</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Algonauts. <br></br> All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
