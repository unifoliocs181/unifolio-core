// app/auth/layout.tsx
import "./globals.css";
// import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
// import { ReactQueryClientProvider } from "@/utils/react-query";
// import LoginHeader from "@/components/LoginHeader"; // ensure this paths matches your project structure

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--montserrat-font",
});

export const metadata = {
  title: "Unifolio - Make Your Resume",
  description:
    "Create and customize your resume effortlessly with Unifolio just by linking your LinkedIn. Choose from a variety of templates and styles to showcase your skills and experience.",
};


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
