import { SignUp } from "@clerk/nextjs";
import "@/styles/Auth.css";

export default function SignUpPage() {
  return (
    <main className="authPage">
      <div className="authPagePanel">
        <p className="authPageLogo">bear.</p>
        <p className="authPageHint">Create an account to access Bear</p>
        <SignUp
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
