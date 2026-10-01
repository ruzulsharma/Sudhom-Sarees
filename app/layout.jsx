import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "SUDHOM — The Art of Banarasi Silk",
  description:
    "Handwoven Banarasi sarees crafted with pure mulberry silk and genuine zari — the living heritage of Kashi, blessed by Mahadev.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased" style={{ background: "#12050A", color: "#FFFDF7" }}>
        <CartProvider>
          <Preloader />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
