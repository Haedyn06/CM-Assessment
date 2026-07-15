import { SignUp } from "@clerk/nextjs";
import "@/styles/Auth.css";

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <div className="auth-page__panel">
        <p className="auth-page__logo">convey.</p>
        <p className="auth-page__hint">Create an account to access Convey</p>
        <SignUp
          appearance={{
            elements: {
              rootBox: "auth-page__clerk",
              card: "auth-page__card",
            },
          }}
        />
      </div>
    </main>
  );
}
