/* eslint-disable react/react-in-jsx-scope */
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Providers from "@/lib/Providers/Provider";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-orbitron", // This allows us to use it in CSS/SX props
});

export const metadata = {
  title: "Wisdora",
  description: "Master your mind with Wisdora",
  icons: {
    icon: "/favicon.png",
  },
};

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${inter.className} ${orbitron.variable}`}>
        <InitColorSchemeScript attribute="data-mui-color-scheme" />
        <Providers>
          <AppRouterCacheProvider>
            <ThemeProvider
              theme={theme}
              defaultMode="system"
              disableTransitionOnChange
            >
              <CssBaseline enableColorScheme />
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
