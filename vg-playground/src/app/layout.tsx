import "@/styles/globals.css";
import GlobalFrame from "@/components/layout/GlobalFrame/GlobalFrame";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GlobalFrame />
      </body>
    </html>
  );
}
