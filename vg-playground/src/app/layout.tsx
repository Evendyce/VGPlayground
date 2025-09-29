import "@/styles/globals.css";
import GlobalFrame from "@/components/layout/GlobalFrame/GlobalFrame";
import ShellController from "@/components/layout/ShellController";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShellController>{children}</ShellController>
        <GlobalFrame />
      </body>
    </html>
  );
}
