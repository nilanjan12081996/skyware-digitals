import './globals.css';
import db from '../Database/db.json';

export const metadata = {
  title: `${db.companyInfo.name} | The AI Revolution`,
  description: db.hero.subtitle,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
