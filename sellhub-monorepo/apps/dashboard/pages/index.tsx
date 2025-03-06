import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <Link href='/dashboard'>Login</Link>
      </div>
    </main>
  );
}
