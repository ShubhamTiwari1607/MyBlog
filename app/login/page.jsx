import RisingStar from "../../components/Stunning/RisingStar.jsx";

import EmailPasswordAuthForm from "../auth/_components/EmailPasswordAuthForm.jsx";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6 py-16">
      <RisingStar className="-z-10" />
      <EmailPasswordAuthForm variant="login" />
    </main>
  );
}

