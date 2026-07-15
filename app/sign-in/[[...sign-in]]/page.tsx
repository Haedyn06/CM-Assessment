import { SignIn } from "@clerk/nextjs";
import "@/styles/Auth.css";

export default function SignInPage() {
  return (
    <main className="auth-page">
      <div className="auth-page__panel">
        <p className="auth-page__logo">convey.</p>
        <p className="auth-page__hint">Sign in to continue — Google recommended</p>
        <SignIn
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
