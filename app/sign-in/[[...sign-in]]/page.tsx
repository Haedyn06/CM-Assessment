import { SignIn } from "@clerk/nextjs";
import "@/styles/Auth.css";

export default function SignInPage() {
  return (
    <main className="authPage">
      <div className="authPagePanel">
        <p className="authPageLogo">bear.</p>
        <p className="authPageHint">Sign in to continue — Google recommended</p>
        <SignIn
          appearance={{
            elements: {
              rootBox: "authPageClerk",
              card: "authPageCard",
            },
          }}
        />
      </div>
    </main>
  );
}
