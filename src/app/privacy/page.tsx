import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and GDPR Compliance Information',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us through our contact form, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Message content</li>
            <li>Company name (for recruiter inquiries)</li>
            <li>Salary information (for recruiter inquiries)</li>
            <li>Technical stack details (for recruiter inquiries)</li>
            <li>Location information (for non-remote positions)</li>
            <li>Project description (for freelance inquiries)</li>
            <li>Budget information (for freelance inquiries)</li>
            <li>Time constraints (for freelance inquiries)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to your inquiries and messages</li>
            <li>Process job opportunities and freelance project requests</li>
            <li>Communicate with you about potential opportunities</li>
            <li>Improve our services and user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Processing and Storage</h2>
          <p className="mb-4">
            Your information is processed and stored securely through our form submission service provider, Web3Forms. 
            You can review their privacy policy at{' '}
            <a href="https://web3forms.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              https://web3forms.com/privacy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights Under GDPR</h2>
          <p className="mb-4">
            Under the General Data Protection Regulation (GDPR), you have the following rights:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
          <p className="mb-4">
            We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, 
            including legal, accounting, or reporting requirements. Typically, this means we will keep your data for up to 12 months 
            after our last interaction with you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us through our contact form.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
            on this page and updating the "Last Updated" date.
          </p>
          <p className="text-sm text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
} 