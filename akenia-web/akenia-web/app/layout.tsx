import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AkenIA | Reino de Akenco",
  description: "La asistente inteligente oficial del Reino de Akenco.",
  metadataBase: new URL("https://ia.akenco.aprblox.es"),
  openGraph: {
    title: "AkenIA | Reino de Akenco",
    description: "Pregunta a AkenIA sobre Akenco y Minecraft 1.21.1 NeoForge.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
