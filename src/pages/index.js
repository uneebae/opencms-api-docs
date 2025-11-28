import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import OpenCMSImage from '../assets/OpenCMS.png';
import OpenCMSLogo from '../assets/OpenCMSLogo.png';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header
      style={{
        background: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <img
        src={OpenCMSLogo}   // apni image ka path lagao
        alt="Open CMS Logo"
        style={{ maxWidth: '280px', width: '100%', height: 'auto' }}
      />
    
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#000' }}>
        🚀 Introduction
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', color: '#444' }}>
        Welcome to the Open CMS API Portal, your complete reference for integrating with Paysys Labs’ Card Management System (OpenCMS). This portal enables banks, fintechs, and partner systems to perform full card lifecycle operations through a secure, RESTful interface — from card issuance and activation to limit management, blocking rules, and channel preferences. OpenCMS serves as a centralized platform to manage debit, prepaid, and credit cards in real-time, providing seamless connectivity with external systems such as core banking, middleware, and mobile channels.
      </p>

      <img
        src={OpenCMSImage}   // apni image ka path lagao
        alt="Open CMS"
        style={{ maxWidth: '600px', width: '100%', height: 'auto' }}
      />
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures />  ← REMOVE THIS */}
      </main>
    </Layout>
  );
}
