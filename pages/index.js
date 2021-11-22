import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import MessengerController from "../components/messengerController";

export default function Home() {


  return (
      <div className={styles.row}>
          <div className={styles.nav}>
              navbar
          </div>
          <div className={styles.messenger}>
                  <MessengerController/>
          </div>
      </div>
  )
}
