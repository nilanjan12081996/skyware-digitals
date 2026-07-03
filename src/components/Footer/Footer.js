import db from '../../Database/db.json';

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center', 
      padding: '40px 20px', 
      borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-secondary)'
    }}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} {db.companyInfo.name}. All rights reserved.
      </p>
    </footer>
  );
}
