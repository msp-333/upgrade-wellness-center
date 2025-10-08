import Container from '@/components/Container';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Your privacy matters.',
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="prose max-w-3xl section">
      <h1>Privacy Policy</h1>
      <p>
        This is placeholder copy. Replace with your organization&apos;s privacy policy.
        We respect your privacy and only collect information necessary to operate our services.
      </p>
      <h2>What we collect</h2>
      <p>
        When you contact us, we may collect your name, email, and message content. We do not sell your data.
      </p>
      <h2>How we use information</h2>
      <p>
        We use information to respond to inquiries and improve our programs. You can request deletion at any time.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:hello@upgradewellness.example">hello@upgradewellness.example</a>.
      </p>
    </Container>
  );
}
