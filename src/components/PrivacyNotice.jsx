import React, { useState, useEffect } from "react";
import { FiInfo } from "react-icons/fi";

export default function PrivacyNotice() {
  const [visible, setVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const openPrivacy = () => {
    setVisible(true);
    setTimeout(() => setShowContent(true), 100);
  };

  const closePrivacy = () => {
    setShowContent(false);
    setTimeout(() => setVisible(false), 300);
  };

  useEffect(() => {
    const handleOpen = () => openPrivacy();
    document.addEventListener("openPrivacy", handleOpen);
    return () => document.removeEventListener("openPrivacy", handleOpen);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="privacy"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ opacity: showContent ? 1 : 0 }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Privacy Policy</h2>
          <button
            onClick={closePrivacy}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold transition"
          >
            &times;
          </button>
        </div>

        <div className="text-gray-700 text-sm space-y-4">
          <p><strong>Effective Date:</strong> [Insert Date]</p>
          <p>
            Feed the Hunger (“we,” “our,” “us”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, mobile application, or services.
          </p>

          <h3 className="font-semibold mt-4">1. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc ml-6">
            <li>Personal Information: Name, email address, phone number, payment details (when you donate or register).</li>
            <li>Financial Information: When you make a donation, we collect payment information like credit/debit card numbers, expiration dates, and billing information.</li>
          </ul>

          <h3 className="font-semibold mt-4">2. How We Use Your Information</h3>
          <ul className="list-disc ml-6">
            <li>Process donations and provide receipts.</li>
            <li>Communicate with you about our activities, events, and impact.</li>
            <li>Improve our website, services, and user experience.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </ul>

          <h3 className="font-semibold mt-4">3. Sharing of Information</h3>
          <p>We do not sell or rent your personal information. We may share your information only with:</p>
          <ul className="list-disc ml-6">
            <li>Service Providers: Third parties who help us process payments, manage communications, or operate our platform.</li>
            <li>Legal Authorities: If required by law, regulation, or legal process.</li>
          </ul>

          <h3 className="font-semibold mt-4">4. Data Security</h3>
          <p>
            We use appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, misuse, or disclosure. However, no method of transmission over the internet is 100% secure.
          </p>

          <h3 className="font-semibold mt-4">5. Cookies and Tracking</h3>
          <p>
            Our website may use cookies or similar technologies to enhance user experience, analyze traffic, and personalize content. You may disable cookies through your browser settings.
          </p>

          <h3 className="font-semibold mt-4">6. Your Rights</h3>
          <p>
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc ml-6">
            <li>Access, update, or correct your personal information.</li>
            <li>Request deletion of your data.</li>
            <li>Opt-out of receiving marketing communications.</li>
          </ul>
          <p>To exercise these rights, please contact us at <strong>feedthehunger.india2025@gmail.com</strong>.</p>

          <h3 className="font-semibold mt-4">7. Children’s Privacy</h3>
          <p>
            Our services are not directed to children under the age of 13 (or the applicable age of consent in your region). We do not knowingly collect personal information from children.
          </p>

          <h3 className="font-semibold mt-4">8. Updates to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. The revised version will be posted on our website with the updated effective date.
          </p>

          <h3 className="font-semibold mt-4">9. Contact Us</h3>
          <p>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <ul className="list-disc ml-6">
            <li>Email: feedthehunger.india2025@gmail.com</li>
            <li>Phone: 8884260100</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
