import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { FacebookPixel } from "@/components/FacebookPixel";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Evolución Digital | Soluciones de Alta Precisión",
    description: "Consultoría estratégica y arquitectura digital para potenciar el crecimiento de tu negocio.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <Suspense fallback={null}>
                    <FacebookPixel />
                </Suspense>
                {children}
            </body>
        </html>
    );
}
