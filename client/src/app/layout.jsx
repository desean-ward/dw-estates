import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/redux-provider/redux-provider";

import "./globals.css";
import Header from "@/components/header/header.component";
import Footer from "@/components/footer/footer.component";

const inter = Inter({ subsets: ["latin"] });

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "LuxeLiving Estates",
  description: "Destined to be the best real estate agency in the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          <main id='app'>
            {children}
            <ToastContainer />
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
