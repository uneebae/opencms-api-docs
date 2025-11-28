# Contents {#contents .TOC-Heading .unnumbered}

[Document Control [2](#document-control)](#document-control)

[1 Overview [2](#overview)](#overview)

[1.1 Business Objective [3](#business-objective)](#business-objective)

[2 Functional Requirements
[3](#functional-requirements)](#functional-requirements)

[3 RSA Key Algorithm [5](#rsa-key-algorithm)](#rsa-key-algorithm)

[3.1 RSA Keys Generation and Verification
[6](#rsa-keys-generation-and-verification)](#rsa-keys-generation-and-verification)

[3.2 Encryption & Decryption
[6](#encryption-decryption)](#encryption-decryption)

[4 Functional Flows [7](#functional-flows)](#functional-flows)

[4.1 Authenticate [7](#authenticate)](#authenticate)

[4.2 Get Customer Cards [8](#get-customer-cards)](#get-customer-cards)

[4.3 Set Card Status [10](#set-card-status)](#set-card-status)

[4.4 Create Card [11](#create-card)](#create-card)

[4.5 Reveal Card Details
[14](#reveal-card-details)](#reveal-card-details)

[4.6 Set Customer Card Limits
[15](#set-customer-card-limits)](#set-customer-card-limits)

[4.7 Get Customer Card Limits
[19](#get-customer-card-limits)](#get-customer-card-limits)

[4.8 Get All Product List
[21](#get-all-product-list)](#get-all-product-list)

[4.9 Get Physical Card Status (Deprecated)
[23](#get-physical-card-status-deprecated)](#get-physical-card-status-deprecated)

[4.10 Get Card Details [24](#get-card-details)](#get-card-details)

[4.11 Activate Card [25](#activate-card)](#activate-card)

[4.12 Get Card Block Rules
[27](#get-card-block-rules)](#get-card-block-rules)

[4.13 Update Card Block Rules
[29](#update-card-block-rules)](#update-card-block-rules)

[4.14 Get Card International Status (Deprecated)
[31](#get-card-international-status-deprecated)](#get-card-international-status-deprecated)

[4.15 Update Card International Status (Deprecated)
[32](#update-card-international-status-deprecated)](#update-card-international-status-deprecated)

[4.16 Customer Channel Preferences
[33](#customer-channel-preferences)](#customer-channel-preferences)

[4.17 Update Customer Channel Preferences
[34](#update-customer-channel-preferences)](#update-customer-channel-preferences)

[4.18 Channel Code [36](#channel-code)](#channel-code)

[4.19 Transaction Setup [36](#transaction-setup)](#transaction-setup)

[4.20 Response codes [37](#response-codes)](#response-codes)

[4.21 Card Request Status
[37](#card-request-status)](#card-request-status)

[4.22 Card Status [37](#card-status)](#card-status)

# 

# 

# Document Control

**Change Record**

+---------+-----------------------+------+---------------------------+
| Date    | Author                | Ver  | Change Reference          |
|         |                       | sion |                           |
+=========+=======================+======+===========================+
| 22      | Muhammad shariq       | 1.0  | Initial draft             |
| -Jan-25 |                       |      |                           |
+---------+-----------------------+------+---------------------------+
| 04      | Inzamam Ullah         | 1.1  | Added **statusCode** to   |
| -Mar-25 |                       |      | Get Customer Cards API    |
|         |                       |      | response                  |
+---------+-----------------------+------+---------------------------+
| 06      | Inzamam Ullah         | 1    | -Updated CRM Base URL &   |
| -Mar-25 |                       | .1.1 | endpoints for API         |
|         |                       |      | Versioning\               |
|         |                       |      | -Response structure       |
|         |                       |      | revamped for              |
|         |                       |      | getCustomerCards API      |
+---------+-----------------------+------+---------------------------+
| 30      | Inzamam Ullah         | 1    | Added cardId in the       |
| -May-25 |                       | .1.2 | Activate Card API for     |
|         |                       |      | internal pin block        |
|         |                       |      | generation                |
+---------+-----------------------+------+---------------------------+
| 03-     | Inzamam Ullah         | 1    | -Added card block rules   |
| June-25 |                       | .1.3 | and international status  |
|         |                       |      | APIs                      |
+---------+-----------------------+------+---------------------------+
| 11-     | Inzamam Ullah         | 2.0  | -Added service layer to   |
| July-25 |                       |      | access CMS APIs           |
+---------+-----------------------+------+---------------------------+
| 18-     | Muhammad Shariq       | 2.0  | \- Added Encryption       |
| July-25 |                       |      | Mechanism                 |
+---------+-----------------------+------+---------------------------+
| 09-     | Inzamam Ullah         | 2.0  | -Added revealCardDetail   |
| Sept-25 |                       |      | API for complete card     |
|         |                       |      | details                   |
+---------+-----------------------+------+---------------------------+
| 07      | Inzamam Ullah         | 2.0  | -Added channel            |
| -Oct-25 |                       |      | preferences APIs\         |
|         |                       |      | -Added rrn to all current |
|         |                       |      | APIs                      |
|         |                       |      |                           |
|         |                       |      | -Remove stan field        |
+---------+-----------------------+------+---------------------------+
| 14      | Inzamam Ullah         | 2.0  | -Updated                  |
| -Oct-25 |                       |      | channelPreferences        |
|         |                       |      | request body (cardId      |
|         |                       |      | added for card specific   |
|         |                       |      | preferences)              |
+---------+-----------------------+------+---------------------------+
| 22      | Inzamam Ullah         | 2.0  | -Added cardExpiry param   |
| -Oct-25 |                       |      | in Activate Card API      |
|         |                       |      | (Optional)                |
+---------+-----------------------+------+---------------------------+

**Reviews**

  -----------------------------------------------------------------------------
  Date         Reviewer                  Version   Comments
  ------------ ------------------------- --------- ----------------------------
  24-Jan-25    Ahmed Ashraf              1.0       

  21-July-25   Ahmed Ashraf              2.0       

  08-Oct-25    Ahmed Ashraf              2.0       

                                                   
  -----------------------------------------------------------------------------

# Overview

**Product / Project Name:** Open CMS

**Feature Name:** API Collection

## Business Objective

The **Card Management System (CMS)** serves as the central hub for
managing and facilitating seamless issuance, maintenance, and lifecycle
management of various types of cards, such as debit, and prepaid cards,
within a financial ecosystem.

Its business objective is to enable secure, scalable, and efficient
management of card-related operations, empowering stakeholders to
deliver superior card services and ensure customer satisfaction.

# Functional Requirements

**Essential Functional Requirements for the API Gateway**

The Card Management System (CMS) must adhere to the following functional
requirements to ensure compliance, security, performance, and high
availability for card issuance, management, and transactions:

1.  **Compliance Requirements**

    a.  **Regulatory Compliance:**

        i.  Ensure all card-related operations comply with relevant
            frameworks, including AML (Anti-Money Laundering), KYC (Know
            Your Customer), and PSD2 (if applicable).

        ii. Monitor card transactions for suspicious activities to
            adhere to local and international financial regulations.

    b.  **Data Privacy:**

        i.  Comply with data protection laws such as GDPR or local
            equivalents, ensuring the secure handling of sensitive
            cardholder information (e.g., PAN, CVV).

        ii. Mask, tokenize, or encrypt sensitive card data during
            transmission and storage.

    c.  **Audit Trail:**

        i.  Maintain comprehensive logs of all card management and
            transaction activities to ensure traceability and support
            compliance audits.

    d.  **Cross-Border Compliance:**

        i.  Handle cross-border regulatory requirements, including
            transaction monitoring, currency conversion, and sanction
            screening for international card operations.

2.  **Security Requirements**

    a.  **Authentication and Authorization:**

        i.  Enforce robust authentication mechanisms, such as OAuth 2.0,
            OpenID Connect, and JWT (JSON Web Tokens), for secure access
            control.

        ii. Implement role-based access control (RBAC) to manage API
            usage and restrict sensitive operations to authorized users.

    b.  **Data Encryption:**

        i.  Encrypt all API traffic using TLS (minimum version 1.2) to
            ensure secure data transmission.

        ii. Support end-to-end encryption for sensitive operations,
            including account or card-based transactions.

    c.  **Rate Limiting and Throttling:**

        i.  Implement rate limiting to prevent API abuse, DDoS attacks,
            or excessive usage by clients.

        ii. Dynamically throttle traffic to ensure fair usage and
            prioritize mission-critical requests.

    d.  **Fraud Detection:**

        i.  Integrate fraud detection mechanisms for real-time
            transaction risk assessment, including card and
            account-based fraud prevention.

        ii. Flag and block unauthorized or anomalous API requests.

    e.  **API Gateway Hardening:**

        i.  Protect APIs against common vulnerabilities, such as SQL
            injection, XSS, CSRF, and XML/JSON parser attacks.

        ii. Implement WAF (Web Application Firewall) and API-specific
            security filters.

3.  **Performance Requirements**

    a.  **High Throughput:**

        i.  Support high transaction volumes for real-time card and
            account-based processing, with minimal latency (\<100 ms for
            API response times).

        ii. Scale horizontally to handle peak loads without performance
            degradation.

    b.  **Caching:**

        i.  Enable intelligent caching for non-sensitive, frequently
            accessed data (e.g., account balance inquiries) to improve
            response times.

    c.  **Load Balancing:**

        i.  Distribute incoming API requests across multiple servers to
            ensure optimal utilization of resources and prevent
            overloading.

    d.  **Latency Optimization:**

        i.  Optimize database queries and connections for faster backend
            processing.

4.  **High Availability Requirements**

    a.  **Redundancy and Failover:**

        i.  Deploy redundant API gateway instances across multiple data
            centers or availability zones.

        ii. Implement automatic failover mechanisms to ensure seamless
            continuity during service disruptions.

    b.  **Uptime Guarantee:**

        i.  Provide at least 99.9% uptime (three nines) to ensure
            availability of APIs for mission-critical card and
            account-based transactions.

    c.  **Disaster Recovery:**

        i.  Set up disaster recovery mechanisms, including data
            replication and automated failback procedures, to recover
            services in case of catastrophic failures.

    d.  **Health Monitoring and Auto-Healing:**

        i.  Continuously monitor API gateway health and resource
            utilization.

        ii. Automatically detect and recover failed nodes or services to
            maintain uninterrupted operations.

    e.  **Session Persistence:**

        i.  Ensure session persistence for stateful transactions, such
            as card authorization or multi-step account operations, even
            during node failover.

# RSA Key Algorithm

+-----------------------------------+-----------------------------------+
| **Encryption Algorithm**          | RSA algorithm, ECB block mode     |
|                                   | with PKCS1 padding using SHA-1    |
|                                   | and MGF1 digests                  |
|                                   |                                   |
|                                   | Encoded in BASE64                 |
+===================================+===================================+
| **Public Key Size**               | 2048                              |
+-----------------------------------+-----------------------------------+
| **Public Key File Format**        | cms_public-key.pem                |
|                                   |                                   |
|                                   | "cms" is the cms short name       |
+-----------------------------------+-----------------------------------+

## RSA Keys Generation and Verification 

1\. CMS will Provide the Public key to the Client.

2\. Client will encrypt the field using public key provided by CMS.

3\. CMS will decrypt the field value and verify in system for further
process

+------------+---------------------------------------------------------+
| Private    | MIIEvQIBADANBgkqhkiG9                                   |
| Sample Key | w0BAQEFAASCBKcwggSjAgEAAoIBAQCub4QjHyGtit5fn2d5m9Jb7iRu |
|            |                                                         |
|            | cJjYkpcvqL7nDsbQJF9Fb                                   |
|            | fynjtZhWdizXwi7y0Q1EUalnNZ6v0kbUH4GeiD8RXZF6HPGh74gDn+h |
|            |                                                         |
|            | yf3tRr5UvXmE8HY2ggd1C                                   |
|            | egvY2wTOaXBLpYRXXIRfu8YxkjVnH/PXbRhO0QlQvZpJ7iNJ85mJi3M |
|            |                                                         |
|            | nIr7LV+6oS279N5dNt79U                                   |
|            | qgDrnvCd+cyZ+Quo40bmDJepib14Riv6+aWgwgIJSwpGvc3HWLSnLGP |
|            |                                                         |
|            | o21AVHzWku8HL7w98DA+o                                   |
|            | vM+7jdaUz2YL/tGmHgrggF/IX632Vtk6sI1XErNtN3QursSH/xueiHL |
|            |                                                         |
|            | LjutxhKH1NTVAgMBAAECg                                   |
|            | gEAG4MSK7nuxWDYNuu81cTaVk6Gp3aR3OKt/sHWLjo56D08W4Z/6WuR |
|            |                                                         |
|            | a3RQxeWwynHCVb5eTqOgf                                   |
|            | maqIKk+30Wm6zMHdvo1PHRPa93tinaB2skkHthtkKaednVmuLJx0PuU |
|            |                                                         |
|            | 4alfd8shtyZuZc0H5/fqJ                                   |
|            | +rRi8LDPuyqkFfx5l7x8C0653HjYAbTuzD/cCaQ/1Lp6MjDc+o/QzeF |
|            |                                                         |
|            | z3lZ/g9fg44x1IvCPDuWG                                   |
|            | Ii6yPT1zyxmSk7foSktg0NNsnLLeJ8x5FMBLNl1DT1Ly+SAiAoq8iH8 |
|            |                                                         |
|            | HooNp5vis9gP56f92Fhn9                                   |
|            | pbqbClXOz9hYAJ4kvOc1QDiSJovJDlLesZQnYUZgQKBgQDX0jGnZ3+r |
|            |                                                         |
|            | 5Umop+SfmdCr3XKdxhDKK                                   |
|            | DE05Rdvgo0ZTyBUjCnD+zVZPppRWe9+1rxzOM5onJoqQSU+8x/xTKYA |
|            |                                                         |
|            | Pu/G5n1xNkLbR71kBbT7f                                   |
|            | /GjYgFxJZvZ7wywu0xGij9vFkecHHBrU1UjXZHvasv2Awji/Ewb0pBp |
|            |                                                         |
|            | yxdgIt48FQKBgQDO6O895                                   |
|            | JGwaZH4QVW1TfF+hxS0BFtiXA7hBkmI095ekgzD3dDCkgGbE97peNbA |
|            |                                                         |
|            | 4X2CIXkqjWMZ5lVv2cdf8                                   |
|            | kiqmXms9qsok7S+jmTqM4mzVU8rG4u15MBuE1tkLkV4LW5uNwOWKywn |
|            |                                                         |
|            | ZAmXLN/JcsUBmRjGw1c6m                                   |
|            | juHT79LD1ClwQKBgGNn82rx5wJb5+OBAXLpvA2NQD+ffRhADvoYEwVP |
|            |                                                         |
|            | koH3yiJnNM2KJXZnuViDH                                   |
|            | ibD7aT8o0XX68JOo0MtZKcV8NfoJTTt8RV2MrEhiABMCKJWugvRFmzx |
|            |                                                         |
|            | L6nfy26Ttnw/LRyTnIQxL                                   |
|            | S6iAXL6pD8sZ6l2mF9EaiHeiJnR64BiTw5JAoGAV2Is1/jWRqjvSudc |
|            |                                                         |
|            | 6Ss32HX4GmbUqV+zsPlUy                                   |
|            | QKhoVMRLQ9bATFkmDf2JqgwGlmhBfpZD82SkveiEZDqEO1kHxieOJwc |
|            |                                                         |
|            | gRCQfwHoQLjvaNuYid4iT                                   |
|            | PmFA3gNWuvnzu9w+f8l9p/ZD/HB0yTShmOALEKaIieRiWBlz6mwYmTf |
|            |                                                         |
|            | bIECgYEArKJymtzufy7Ps                                   |
|            | yd3o/DUqQ8b32fkme+Y7ti+SvpRm7bXhQZ39d5AN9aCCws+YW7cVZHA |
|            |                                                         |
|            | oegpGhKuUnzUXnJQvh0Gq                                   |
|            | p4JpiyWNqkOxgXs8jmAMB1Lapn9J5OWBKmi8gp+oJpvr12Cg+WzRZKA |
|            |                                                         |
|            | OcLoOC1YlMf0DOVu2vFu0wEOavE=                            |
+============+=========================================================+
| Public     | MIIBIjANBgkqhkiG9w0BA                                   |
| Sample Key | QEFAAOCAQ8AMIIBCgKCAQEArm+EIx8hrYreX59neZvSW+4kbnCY2JKX |
|            |                                                         |
|            | L6i+5w7G0CRfRW38p47WY                                   |
|            | VnYs18Iu8tENRFGpZzWer9JG1B+Bnog/EV2Rehzxoe+IA5/ocn97Ua+ |
|            |                                                         |
|            | VL15hPB2NoIHdQnoL2NsE                                   |
|            | zmlwS6WEV1yEX7vGMZI1Zx/z120YTtEJUL2aSe4jSfOZiYtzJyK+y1f |
|            |                                                         |
|            | uqEtu/TeXTbe/VKoA657w                                   |
|            | nfnMmfkLqONG5gyXqYm9eEYr+vmloMICCUsKRr3Nx1i0pyxj6NtQFR8 |
|            |                                                         |
|            | 1pLvBy+8PfAwPqLzPu43W                                   |
|            | lM9mC/7Rph4K4IBfyF+t9lbZOrCNVxKzbTd0Lq7Eh/8bnohyy47rcYS |
|            |                                                         |
|            | h9TU1QIDAQAB                                            |
+------------+---------------------------------------------------------+

## Encryption & Decryption

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Type**             **Sample Value**
  -------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Encryption via       aq3G9Ec1yODk1+fBpfAATAYChgqvngafnipqw71lABPIotuhaT8BUs6FmMamGp0vMTjDwDibb0klo/FA1pwG6hTEyLzlf9f2gWAX6L0Ya8qVVpvcmpOkWJQnpFpOuT44GS6SHCAIq1cwxnkoaTEEQSNZ26rD0PbaAPK5jpgIURyydgH4osU+txN5MGNk6BVRj3bThrLgPplcxvOJgpmS5Lez8WwRNhI/huJqzSHgYA8sjKr+QVl9CKnUupU90ijF7ebR5DyZI5sJPgiyGrW8eRU5rcX18uiOVfmUzm9rtCKyurS2qofbaMNj0Fpiv6YtNKxqOK+mrWRA2d6QLx0+hg=
  Public Key           

  Decryption via       8520
  Private key          
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Functional Flows 

  -----------------------------------------------------------------------
  **Sr.**                 **Base URL**            **Value**
  ----------------------- ----------------------- -----------------------
  1                       Service-Layer-URL       http:IP:8088

  -----------------------------------------------------------------------

## Authenticate

+----------+---------------+------+---------+-------------------------+
| **Descr  | The service   |      |         |                         |
| iption** | allowed to    |      |         |                         |
|          | authenticate. |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | Channel       |      |         |                         |
| Client** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | Open CMS      |      |         |                         |
| Server** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | POST          |      |         |                         |
| Method** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **Method | Authenticate  |      |         |                         |
| Name**   |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **H      |   \"          |      |         |                         |
| eaders** | **X-Au        |      |         |                         |
|          | th-Username** |      |         |                         |
|          | \": \"\",     |      |         |                         |
|          |               |      |         |                         |
|          |   \"          |      |         |                         |
|          | **X-Au        |      |         |                         |
|          | th-Password** |      |         |                         |
|          | \": \" \"     |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **En     | {**S          |      |         |                         |
| dpoint** | ervice-Layer- |      |         |                         |
|          | URL**}/api/v1 |      |         |                         |
|          | /authenticate |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | [{]{.mark}    |      |         |                         |
| Response |               |      |         |                         |
| body     | [\"re         |      |         |                         |
| sample   | sponseCode\": |      |         |                         |
| (Su      | \"            |      |         |                         |
| ccess)** | 00\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"responseD  |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"Processed   |      |         |                         |
|          | OK\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"data\":    |      |         |                         |
|          | {]{.mark}     |      |         |                         |
|          |               |      |         |                         |
|          | [\"token\":   |      |         |                         |
|          | \"57d49e70    |      |         |                         |
|          | -65f4-43b5-aa |      |         |                         |
|          | a8-fde8125d79 |      |         |                         |
|          | a6\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"expiry\":  |      |         |                         |
|          | \"1737620181  |      |         |                         |
|          | 064\"]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [}]{.mark}    |      |         |                         |
|          |               |      |         |                         |
|          | [}]{.mark}    |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | [{]{.mark}    |      |         |                         |
| Response |               |      |         |                         |
| body     | [\"re         |      |         |                         |
| sample   | sponseCode\": |      |         |                         |
| (Reje    | \"            |      |         |                         |
| ction)** | 18\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"responseD  |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"INVALID     |      |         |                         |
|          | CREDENTIA     |      |         |                         |
|          | LS\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"data\":    |      |         |                         |
|          | {]{.mark}     |      |         |                         |
|          |               |      |         |                         |
|          | [\"status\":  |      |         |                         |
|          | 500,]{.mark}  |      |         |                         |
|          |               |      |         |                         |
|          | [\"error\":   |      |         |                         |
|          | \"Internal    |      |         |                         |
|          | Err           |      |         |                         |
|          | or\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"message\": |      |         |                         |
|          | \"INVALID     |      |         |                         |
|          | CREDENTIA     |      |         |                         |
|          | LS\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\            |      |         |                         |
|          | "timeStamp\": |      |         |                         |
|          | \"Thu Jan 23  |      |         |                         |
|          | 16:39:02 PKT  |      |         |                         |
|          | 2             |      |         |                         |
|          | 025\"]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [}]{.mark}    |      |         |                         |
|          |               |      |         |                         |
|          | [}]{.mark}    |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | **Field**     | **Ty | **Mand  | **Description**         |
| Response |               | pe** | atory** |                         |
| body     |               |      |         |                         |
| para     |               |      |         |                         |
| meters** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
|          | token         | St   | Yes     | **Jwt** containing      |
|          |               | ring |         | token                   |
+----------+---------------+------+---------+-------------------------+
|          | expiry        | St   | Yes     | **Expiry time** in      |
|          |               | ring |         | epoch                   |
+----------+---------------+------+---------+-------------------------+

## Get Customer Cards

+----------+---------------+------+---------+-------------------------+
| **Descr  | The service   |      |         |                         |
| iption** | allowed to    |      |         |                         |
|          | get customer  |      |         |                         |
|          | cards         |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | Channel       |      |         |                         |
| Client** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | Open CMS      |      |         |                         |
| Server** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | GET           |      |         |                         |
| Method** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **Method | Get Customer  |      |         |                         |
| Name**   | Cards         |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **En     | {**Ser        |      |         |                         |
| dpoint** | vice-Layer-UR |      |         |                         |
|          | L**}/getCards |      |         |                         |
|          | ByCustomer/{i |      |         |                         |
|          | dValue}/{rrn} |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **H      | **            |      |         |                         |
| eaders** | X-Auth-Token: |      |         |                         |
|          | {Token}**     |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | {             |      |         |                         |
| Response |               |      |         |                         |
| body     | \"re          |      |         |                         |
| sample   | sponseCode\": |      |         |                         |
| (Su      | \"00\",       |      |         |                         |
| ccess)** |               |      |         |                         |
|          | \"responseD   |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"Processed   |      |         |                         |
|          | OK\",         |      |         |                         |
|          |               |      |         |                         |
|          | \"data\": {   |      |         |                         |
|          |               |      |         |                         |
|          | \"cardList\": |      |         |                         |
|          | \[            |      |         |                         |
|          |               |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"cardId\":   |      |         |                         |
|          | 199,          |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardNumber\": |      |         |                         |
|          | \"22058\*\*\* |      |         |                         |
|          | \*\*000236\", |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardStatus\": |      |         |                         |
|          | \"Not         |      |         |                         |
|          | Produced\",   |      |         |                         |
|          |               |      |         |                         |
|          | \"card        |      |         |                         |
|          | StatusCode\": |      |         |                         |
|          | \"99\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"request\":  |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"recordId\": |      |         |                         |
|          | 394,          |      |         |                         |
|          |               |      |         |                         |
|          | \"status\":   |      |         |                         |
|          | \"In          |      |         |                         |
|          | Process\",    |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | statusCode\": |      |         |                         |
|          | \"02\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"d           |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"E\"         |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | },            |      |         |                         |
|          |               |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"cardId\":   |      |         |                         |
|          | 200,          |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardNumber\": |      |         |                         |
|          | \"22058\*\*\* |      |         |                         |
|          | \*\*000244\", |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardStatus\": |      |         |                         |
|          | \"Not         |      |         |                         |
|          | Produced\",   |      |         |                         |
|          |               |      |         |                         |
|          | \"card        |      |         |                         |
|          | StatusCode\": |      |         |                         |
|          | \"99\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"request\":  |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"recordId\": |      |         |                         |
|          | 396,          |      |         |                         |
|          |               |      |         |                         |
|          | \"status\":   |      |         |                         |
|          | \"In          |      |         |                         |
|          | Process\",    |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | statusCode\": |      |         |                         |
|          | \"02\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"d           |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"E\"         |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | },            |      |         |                         |
|          |               |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"cardId\":   |      |         |                         |
|          | 202,          |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardNumber\": |      |         |                         |
|          | \"22058\*\*\* |      |         |                         |
|          | \*\*000269\", |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardStatus\": |      |         |                         |
|          | \"Fresh\",    |      |         |                         |
|          |               |      |         |                         |
|          | \"card        |      |         |                         |
|          | StatusCode\": |      |         |                         |
|          | \"00\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"accc        |      |         |                         |
|          | ountNumber\": |      |         |                         |
|          | \"777         |      |         |                         |
|          | 6790190029\", |      |         |                         |
|          |               |      |         |                         |
|          | \"a           |      |         |                         |
|          | ccountName\": |      |         |                         |
|          | \"Megan\",    |      |         |                         |
|          |               |      |         |                         |
|          | \"acc         |      |         |                         |
|          | ountStatus\": |      |         |                         |
|          | \"Active\",   |      |         |                         |
|          |               |      |         |                         |
|          | "produc       |      |         |                         |
|          | tCode":"18",\ |      |         |                         |
|          | "product      |      |         |                         |
|          | Name":"PayPak |      |         |                         |
|          | Pink Cards"   |      |         |                         |
|          |               |      |         |                         |
|          | \"request\":  |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"recordId\": |      |         |                         |
|          | 398,          |      |         |                         |
|          |               |      |         |                         |
|          | \"status\":   |      |         |                         |
|          | \"In          |      |         |                         |
|          | Process\",    |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | statusCode\": |      |         |                         |
|          | \"02\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"d           |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"P\"         |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | },            |      |         |                         |
|          |               |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"request\":  |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"recordId\": |      |         |                         |
|          | 389,          |      |         |                         |
|          |               |      |         |                         |
|          | \"status\":   |      |         |                         |
|          | \"Rejected\", |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | statusCode\": |      |         |                         |
|          | \"03\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"d           |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"File Import |      |         |                         |
|          | Failed\"      |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | },            |      |         |                         |
|          |               |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"request\":  |      |         |                         |
|          | {             |      |         |                         |
|          |               |      |         |                         |
|          | \"recordId\": |      |         |                         |
|          | 401,          |      |         |                         |
|          |               |      |         |                         |
|          | \"status\":   |      |         |                         |
|          | \"In          |      |         |                         |
|          | Pending\",    |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | statusCode\": |      |         |                         |
|          | \"01\",       |      |         |                         |
|          |               |      |         |                         |
|          | \"d           |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"V\"         |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | \]            |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | [{]{.mark}    |      |         |                         |
| Response |               |      |         |                         |
| body     | [\"re         |      |         |                         |
| sample   | sponseCode\": |      |         |                         |
| (Reje    | \"            |      |         |                         |
| ction)** | 48\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"responseD  |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"Card not    |      |         |                         |
|          | found against |      |         |                         |
|          | entered       |      |         |                         |
|          | customer      |      |         |                         |
|          | Identifi      |      |         |                         |
|          | er/AccountNum |      |         |                         |
|          | ber\"]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [}]{.mark}    |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | **Field**     | **Ty | **Mand  | **Description**         |
| Response |               | pe** | atory** |                         |
| body     |               |      |         |                         |
| para     |               |      |         |                         |
| meters** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
|          | responseCode  | St   | Yes     | **Response Code** -     |
|          |               | ring |         | Indicates the status of |
|          |               |      |         | the response, where 00  |
|          |               |      |         | represents a successful |
|          |               |      |         | transaction.            |
+----------+---------------+------+---------+-------------------------+
|          | responseDesc  | St   | Yes     | **Response              |
|          |               | ring |         | Description** -         |
|          |               |      |         | Descriptive text        |
|          |               |      |         | related to the response |
|          |               |      |         | code, providing details |
|          |               |      |         | on the transaction      |
|          |               |      |         | result (e.g.,           |
|          |               |      |         | \"SUCCESS\").           |
+----------+---------------+------+---------+-------------------------+
|          | **Data**      |      |         |                         |
+----------+---------------+------+---------+-------------------------+
|          | cardList      | A    |         | **Customer Cards**      |
|          |               | rray |         |                         |
+----------+---------------+------+---------+-------------------------+
|          | cardId        | Int  | Yes     | **Card Id** -- card id  |
|          |               | eger |         | of the customer         |
+----------+---------------+------+---------+-------------------------+
|          | cardNumber    | St   | Yes     | **Card Number** -- Card |
|          |               | ring |         | Number                  |
+----------+---------------+------+---------+-------------------------+
|          | cardStatus    | St   | Yes     | **Card Status** -- card |
|          |               | ring |         | status e.g.:            |
|          |               |      |         | (Active,Warm,Hot..).    |
+----------+---------------+------+---------+-------------------------+
|          | c             | St   | Yes     | **Card Status Code --** |
|          | ardStatusCode | ring |         | card status code e.g.   |
|          |               |      |         | (00,01,02)              |
+----------+---------------+------+---------+-------------------------+
|          | accountNumber | St   | Yes     | **Account Number -**    |
|          |               | ring |         | 7776790190029           |
+----------+---------------+------+---------+-------------------------+
|          | accountName   | St   | Yes     | **Account Holder Name   |
|          |               | ring |         | --** Name               |
+----------+---------------+------+---------+-------------------------+
|          | accountStatus | St   | Yes     | **Status -** (Active -- |
|          |               | ring |         | InActive)               |
+----------+---------------+------+---------+-------------------------+
|          | productCode   | St   | Yes     | **Product code:** 18-19 |
|          |               | ring |         | etc.                    |
+----------+---------------+------+---------+-------------------------+
|          | productName   | St   | Yes     | **Product Name:**       |
|          |               | ring |         | Product Name eg :       |
|          |               |      |         | (PayPak Pink)           |
+----------+---------------+------+---------+-------------------------+
|          | request       | A    |         | **Customer Requested    |
|          |               | rray |         | Cards**                 |
+----------+---------------+------+---------+-------------------------+
|          | recordId      | Int  | Yes     | Record id of the card   |
|          |               | eger |         | for tracking            |
+----------+---------------+------+---------+-------------------------+
|          | status        | St   | Yes     | Request status e.g.     |
|          |               | ring |         | (Pending, Delivered,    |
|          |               |      |         | In-Process,Rejected)    |
+----------+---------------+------+---------+-------------------------+
|          | statusCode    | St   | Yes     | Request status code     |
|          |               | ring |         | (00,01,02,03)           |
+----------+---------------+------+---------+-------------------------+

## Set Card Status

+----------------+-----------+------+--------+-------------------------+
| *              | This      |      |        |                         |
| *Description** | Service   |      |        |                         |
|                | will      |      |        |                         |
|                | allow to  |      |        |                         |
|                | set card  |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Client**     | Channel   |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Server**     | Open CMS  |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Method**     | POST      |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Method       | setC      |      |        |                         |
| Name**         | ardStatus |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Endpoint**   | {         |      |        |                         |
|                | **Service |      |        |                         |
|                | -Layer-UR |      |        |                         |
|                | L**}/setC |      |        |                         |
|                | ardStatus |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Headers**    | **X-Au    |      |        |                         |
|                | th-Token: |      |        |                         |
|                | {Token}** |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Request      | {         |      |        |                         |
| body**         |           |      |        |                         |
|                | \"        |      |        |                         |
| **sample**     | cardId\": |      |        |                         |
|                | \"3\",    |      |        |                         |
|                |           |      |        |                         |
|                | \"i       |      |        |                         |
|                | dValue\": |      |        |                         |
|                | \"4200008 |      |        |                         |
|                | 716115\", |      |        |                         |
|                |           |      |        |                         |
|                | \"        |      |        |                         |
|                | status\": |      |        |                         |
|                | \"01\"    |      |        |                         |
|                |           |      |        |                         |
|                | [\"rrn\": |      |        |                         |
|                | \"212     |      |        |                         |
|                | 12121232\ |      |        |                         |
|                | "]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Request body | **Field** | **Ty | *      | **Description**         |
| parameters**   |           | pe** | *Manda |                         |
|                |           |      | tory** |                         |
+----------------+-----------+------+--------+-------------------------+
|                | cardId    | St   | Yes    | **Card Id** -- Card id  |
|                |           | ring |        |                         |
+----------------+-----------+------+--------+-------------------------+
|                | idValue   | St   | Yes    | **Customer\'s           |
|                |           | ring |        | CNIC/Passport/NTN/NICOP |
|                |           |      |        | number.**               |
+----------------+-----------+------+--------+-------------------------+
|                | status    | St   | Yes    | Card status key which   |
|                |           | ring |        | customer want to set    |
+----------------+-----------+------+--------+-------------------------+
|                | rrn       | St   | Yes    | **Retrieval Reference   |
|                |           | ring |        | Number for the request  |
|                |           |      |        | (e.g.,                  |
|                |           |      |        | \"123456123451\").**    |
+----------------+-----------+------+--------+-------------------------+
| **Response     | {         |      |        |                         |
| body sample    |           |      |        |                         |
| (Success)**    | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"00\",   |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \"        |      |        |                         |
|                | Processed |      |        |                         |
|                | OK\"      |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Response     | {         |      |        |                         |
| body sample    |           |      |        |                         |
| (Negative)**   | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"76\",   |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \"card    |      |        |                         |
|                | status is |      |        |                         |
|                | already   |      |        |                         |
|                | in the    |      |        |                         |
|                | same      |      |        |                         |
|                | state\"   |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Response     | **Field** | **Ty | *      | **Description**         |
| body           |           | pe** | *Manda |                         |
| parameters**   |           |      | tory** |                         |
+----------------+-----------+------+--------+-------------------------+
|                | res       | St   | Yes    | Response code           |
|                | ponseCode | ring |        | indicating the status   |
|                |           |      |        | of the transaction      |
|                |           |      |        | (e.g., 200 for          |
|                |           |      |        | success).               |
+----------------+-----------+------+--------+-------------------------+
|                | res       | St   | Yes    | A message accompanying  |
|                | ponseDesc | ring |        | the response code,      |
|                |           |      |        | indicating success or   |
|                |           |      |        | failure.                |
+----------------+-----------+------+--------+-------------------------+

## Create Card

+----------------+-----------+------+--------+-------------------------+
| **Create       | create    |      |        |                         |
| Card**         | card      |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Client**     | Channel   |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Server**     | Open CMS  |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Method**     | POST      |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Method       | c         |      |        |                         |
| Name**         | reateCard |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **URL**        | {**Se     |      |        |                         |
|                | rvice-Lay |      |        |                         |
|                | er-URL**} |      |        |                         |
|                | /api/     |      |        |                         |
|                | v1/Card/c |      |        |                         |
|                | reateCard |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Headers**    | **X-A     |      |        |                         |
|                | uth-Token |      |        |                         |
|                | :         |      |        |                         |
|                | {Token}** |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Request      | [         |      |        |                         |
| body**         | {]{.mark} |      |        |                         |
|                |           |      |        |                         |
| **sample**     | [         |      |        |                         |
|                | \"account |      |        |                         |
|                | Number\": |      |        |                         |
|                | \"127199  |      |        |                         |
|                | 9964444\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"       |      |        |                         |
|                | applicati |      |        |                         |
|                | onType\": |      |        |                         |
|                | \"New\"   |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"car    |      |        |                         |
|                | dTitle\": |      |        |                         |
|                | \"user\"  |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"ca     |      |        |                         |
|                | rdtype\": |      |        |                         |
|                | \"1\"     |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [         |      |        |                         |
|                | \"cell\": |      |        |                         |
|                | \"0321    |      |        |                         |
|                | 2479011\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [         |      |        |                         |
|                | \"city\": |      |        |                         |
|                | \"khi\"   |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"compa  |      |        |                         |
|                | nyName\": |      |        |                         |
|                | \"abc\"   |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"dateO  |      |        |                         |
|                | fBirth\": |      |        |                         |
|                | \"2       |      |        |                         |
|                | 3062000\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\        |      |        |                         |
|                | "email\": |      |        |                         |
|                | \"test@gm |      |        |                         |
|                | ail.com\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"fa     |      |        |                         |
|                | therHusba |      |        |                         |
|                | ndName\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"fir    |      |        |                         |
|                | stname\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [         |      |        |                         |
|                | \"        |      |        |                         |
|                | gender\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"homeA  |      |        |                         |
|                | ddress\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"hom    |      |        |                         |
|                | ePhone\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"       |      |        |                         |
|                | idType\": |      |        |                         |
|                | \"CNIC\"  |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"i      |      |        |                         |
|                | dValue\": |      |        |                         |
|                | \"421658  |      |        |                         |
|                | 9745314\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"la     |      |        |                         |
|                | stname\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\        |      |        |                         |
|                | "mailingA |      |        |                         |
|                | ddress\": |      |        |                         |
|                | \"abc\"   |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"m      |      |        |                         |
|                | otherMaid |      |        |                         |
|                | enName\": |      |        |                         |
|                | \"abc\"   |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"       |      |        |                         |
|                | nationali |      |        |                         |
|                | tyCode\": |      |        |                         |
|                | \"PK\"    |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [         |      |        |                         |
|                | \"officeA |      |        |                         |
|                | ddress\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"offic  |      |        |                         |
|                | ePhone\": |      |        |                         |
|                | \         |      |        |                         |
|                | "string\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"]{.ma  |      |        |                         |
|                | rk}primar |      |        |                         |
|                | yCardIden |      |        |                         |
|                | tityValue |      |        |                         |
|                | [\":      |      |        |                         |
|                | \"421658  |      |        |                         |
|                | 9745314\" |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"produ  |      |        |                         |
|                | ctCode\": |      |        |                         |
|                | \"1206\"  |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"prof   |      |        |                         |
|                | ession\": |      |        |                         |
|                | \"qa\"    |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"re     |      |        |                         |
|                | lation\": |      |        |                         |
|                | \"self\"  |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"re     |      |        |                         |
|                | placement |      |        |                         |
|                | Reason\": |      |        |                         |
|                | \"\"      |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [\"rrn\": |      |        |                         |
|                | \"21212   |      |        |                         |
|                | 121232\", |      |        |                         |
|                | \"bran    |      |        |                         |
|                | chCode\": |      |        |                         |
|                | \"\"      |      |        |                         |
|                | ,]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [         |      |        |                         |
|                | \"branchA |      |        |                         |
|                | ddress\": |      |        |                         |
|                | \"\       |      |        |                         |
|                | "]{.mark} |      |        |                         |
|                |           |      |        |                         |
|                | [         |      |        |                         |
|                | }]{.mark} |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Request body | **Field** | **Ty | *      | **Description**         |
| parameters**   |           | pe** | *Manda |                         |
|                |           |      | tory** |                         |
+----------------+-----------+------+--------+-------------------------+
|                | applic    | St   | Yes    | Type of application,    |
|                | ationType | ring |        | e.g.\                   |
|                |           |      |        | \"New\", \" Replacement |
|                |           |      |        | \"                      |
+----------------+-----------+------+--------+-------------------------+
|                | cardTitle | St   | Yes    | Title of the            |
|                |           | ring |        | cardholder, e.g.,       |
|                |           |      |        | \"user\".               |
+----------------+-----------+------+--------+-------------------------+
|                | cardtype  | St   | Yes    | Type of card, e.g.,\    |
|                |           | ring |        | "1" for Primary\        |
|                |           |      |        | "2" for supplementary   |
+----------------+-----------+------+--------+-------------------------+
|                | cell      | St   | Yes    | Cell phone number,      |
|                |           | ring |        | e.g., \"03212479011\"   |
+----------------+-----------+------+--------+-------------------------+
|                | city      | St   | Yes    | **City of the           |
|                |           | ring |        | applicant, e.g.,        |
|                |           |      |        | \"khi\".**              |
+----------------+-----------+------+--------+-------------------------+
|                | co        | St   | No     | A brief description of  |
|                | mpanyName | ring |        | the Company name (e.g., |
|                |           |      |        | \"Paysys Labs\").       |
+----------------+-----------+------+--------+-------------------------+
|                | da        | St   | Yes    | **Date of Birth** - The |
|                | teOfBirth | ring |        | Date involved in the    |
|                |           |      |        | transaction eg:         |
|                |           |      |        | (23062000)              |
+----------------+-----------+------+--------+-------------------------+
|                | email     | St   | Yes    | **Email** -             |
|                |           | ring |        | Applicant\'s email      |
|                |           |      |        | address (e.g.,          |
|                |           |      |        | \"Ahmed@gmail.com\").   |
+----------------+-----------+------+--------+-------------------------+
|                | fatherHu  | St   | Yes    | Name of the             |
|                | sbandName | ring |        | applicant\'s father or  |
|                |           |      |        | spouse.                 |
+----------------+-----------+------+--------+-------------------------+
|                | firstname | St   | Yes    | Applicant\'s first      |
|                |           | ring |        | name.                   |
+----------------+-----------+------+--------+-------------------------+
|                | acco      | St   | Yes    | Account Number,         |
|                | untNumber | ring |        | **Account Number**      |
+----------------+-----------+------+--------+-------------------------+
|                | gender    | St   | Yes    | Applicant\'s gender     |
|                |           | ring |        | (e.g., \"Male\",        |
|                |           |      |        | \"Female\", \"Other\"). |
+----------------+-----------+------+--------+-------------------------+
|                | ho        | St   | No     | Residential address of  |
|                | meAddress | ring |        | the applicant.          |
+----------------+-----------+------+--------+-------------------------+
|                | homePhone | St   | No     | Applicant\'s home phone |
|                |           | ring |        | number.                 |
+----------------+-----------+------+--------+-------------------------+
|                | idType    | St   | Yes    | Identification type     |
|                |           | ring |        | **Identification        |
|                |           |      |        | Type(CNIC, Passport     |
|                |           |      |        | ,NICOP,NTN)**           |
+----------------+-----------+------+--------+-------------------------+
|                | idValue   | St   | Yes    | Identification value.   |
|                |           | ring |        |                         |
+----------------+-----------+------+--------+-------------------------+
|                | lastname  | St   | Yes    | Applicant\'s last name. |
|                |           | ring |        |                         |
+----------------+-----------+------+--------+-------------------------+
|                | maili     | St   | Yes    | Mailing address of the  |
|                | ngAddress | ring |        | applicant (e.g.,        |
|                |           |      |        | \"abc\").               |
+----------------+-----------+------+--------+-------------------------+
|                | motherM   | St   | Yes    | Applicant\'s mother\'s  |
|                | aidenName | ring |        | maiden name (e.g.,      |
|                |           |      |        | \"abc\").               |
+----------------+-----------+------+--------+-------------------------+
|                | nation    | St   | Yes    | Nationality code of the |
|                | alityCode | ring |        | applicant (e.g., \"PK\" |
|                |           |      |        | for Pakistan).          |
+----------------+-----------+------+--------+-------------------------+
|                | offi      | St   | No     | Applicant\'s office     |
|                | ceAddress | ring |        | address.                |
+----------------+-----------+------+--------+-------------------------+
|                | of        | St   | No     | Applicant\'s office     |
|                | ficePhone | ring |        | phone number.           |
+----------------+-----------+------+--------+-------------------------+
|                | primar    | St   | No     | Identification value of |
|                | yCardIden | ring |        | the primary cardholder  |
|                | tityValue |      |        | (e.g.,                  |
|                |           |      |        | \"9999999999999\" for   |
|                |           |      |        | CNIC or "XX9999999" for |
|                |           |      |        | Passport).              |
+----------------+-----------+------+--------+-------------------------+
|                | pr        | St   | Yes    | Code of the product     |
|                | oductCode | ring |        | being applied for       |
|                |           |      |        | (e.g., \"07\").         |
+----------------+-----------+------+--------+-------------------------+
|                | p         | Ob   | No     | Applicant\'s profession |
|                | rofession | ject |        | (e.g., \"QA\").         |
+----------------+-----------+------+--------+-------------------------+
|                | relation  | Ob   | No     | Relationship of the     |
|                |           | ject |        | applicant to the        |
|                |           |      |        | primary cardholder      |
|                |           |      |        | (e.g., \"self\").       |
+----------------+-----------+------+--------+-------------------------+
|                | replacem  | St   | No     | Reason for replacing    |
|                | entReason | ring |        | the card, if            |
|                |           |      |        | applicable.\            |
|                |           |      |        | 1- New\                 |
|                |           |      |        | 2- Lost\                |
|                |           |      |        | 3- Stolen\              |
|                |           |      |        | 4- Damaged              |
+----------------+-----------+------+--------+-------------------------+
|                | rrn       | St   | No     | **Retrieval Reference   |
|                |           | ring |        | Number for the request  |
|                |           |      |        | (e.g.,                  |
|                |           |      |        | \"123456123451\").**    |
+----------------+-----------+------+--------+-------------------------+
|                | b         | St   | No     | BranchCode              |
|                | ranchCode | ring |        |                         |
+----------------+-----------+------+--------+-------------------------+
|                | b         | St   | No     | Branch address of the   |
|                | ranchName | ring |        | applicant (e.g.,        |
|                |           |      |        | \"abc\").               |
+----------------+-----------+------+--------+-------------------------+
| **Response     | {         |      |        |                         |
| body sample    |           |      |        |                         |
| (Success)**    | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"00\",   |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \"Card    |      |        |                         |
|                | request   |      |        |                         |
|                | parked    |      |        |                         |
|                | for       |      |        |                         |
|                | embo      |      |        |                         |
|                | ssing.\", |      |        |                         |
|                |           |      |        |                         |
|                | \"data\": |      |        |                         |
|                | \"bc      |      |        |                         |
|                | 4eec2f-ed |      |        |                         |
|                | a2-4821-a |      |        |                         |
|                | 0aa-dbb92 |      |        |                         |
|                | bcfa50a\" |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Response     | {         |      |        |                         |
| body sample    |           |      |        |                         |
| (Negative)**   | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"409\",  |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \"Card    |      |        |                         |
|                | Request   |      |        |                         |
|                | Already   |      |        |                         |
|                | In        |      |        |                         |
|                | Process\" |      |        |                         |
|                |           |      |        |                         |
|                | }\        |      |        |                         |
|                | {         |      |        |                         |
|                |           |      |        |                         |
|                | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"400\",  |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \"Account |      |        |                         |
|                | number is |      |        |                         |
|                | already   |      |        |                         |
|                | present\" |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Response     | **Field** | **Ty | *      | **Description**         |
| body           |           | pe** | *Manda |                         |
| parameters**   |           |      | tory** |                         |
+----------------+-----------+------+--------+-------------------------+
|                | res       | Int  | Yes    | Response code           |
|                | ponseCode | eger |        | indicating the status   |
|                |           |      |        | of the transaction      |
|                |           |      |        | (e.g., 200 for          |
|                |           |      |        | success).               |
+----------------+-----------+------+--------+-------------------------+
|                | res       | St   | Yes    | A message accompanying  |
|                | ponseDesc | ring |        | the response code,      |
|                |           |      |        | indicating success or   |
|                |           |      |        | failure.                |
+----------------+-----------+------+--------+-------------------------+
|                | data      | St   | Yes    | Contains the Tracking   |
|                |           | ring |        | Id.                     |
+----------------+-----------+------+--------+-------------------------+

## Reveal Card Details

  ----------------- ------------------------------------------------------
  **Description**   **Reveal Card Details**

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   GetCardDetail

  **URL**           {**Service-Layer-URL**} /api/v1/Card/revealCardDetail

  **Headers**       **X-Auth-Token**
  ----------------- ------------------------------------------------------

+----------------+-----------+------+-------+-------------------------+
| **Request      | [         |      |       |                         |
| body**         | {]{.mark} |      |       |                         |
|                |           |      |       |                         |
| **sample**     | [\"       |      |       |                         |
|                | cardId\": |      |       |                         |
|                | \         |      |       |                         |
|                | "441487\" |      |       |                         |
|                | ,]{.mark} |      |       |                         |
|                |           |      |       |                         |
|                | [\"i      |      |       |                         |
|                | dValue\": |      |       |                         |
|                | \"54550   |      |       |                         |
|                | 94464896\ |      |       |                         |
|                | "]{.mark} |      |       |                         |
|                |           |      |       |                         |
|                | [\"rrn\": |      |       |                         |
|                | \"2121    |      |       |                         |
|                | 2121232\" |      |       |                         |
|                | ,]{.mark} |      |       |                         |
|                |           |      |       |                         |
|                | [         |      |       |                         |
|                | }]{.mark} |      |       |                         |
+----------------+-----------+------+-------+-------------------------+
| **Request body | **Field** | **Ty | **M   | **Description**         |
| parameters**   |           | pe** | andat |                         |
|                |           |      | ory** |                         |
+----------------+-----------+------+-------+-------------------------+
|                | [cardI    | St   | Yes   | **Card ID** - Unique    |
|                | d]{.mark} | ring |       | identifier for the      |
|                |           |      |       | Card.                   |
+----------------+-----------+------+-------+-------------------------+
|                | [idValu   | St   | Yes   | **Id Value** --         |
|                | e]{.mark} | ring |       | Customer Identifier     |
+----------------+-----------+------+-------+-------------------------+
|                | [rr       | St   | Yes   | **Retrieval Reference   |
|                | n]{.mark} | ring |       | Number for the request  |
|                |           |      |       | (e.g.,                  |
|                |           |      |       | \"123456123451\").**    |
+----------------+-----------+------+-------+-------------------------+
| **Response     | {         |      |       |                         |
| body sample    |           |      |       |                         |
| (Success)**    | \"respon  |      |       |                         |
|                | seCode\": |      |       |                         |
|                | \"00\",   |      |       |                         |
|                |           |      |       |                         |
|                | \"resp    |      |       |                         |
|                | onseDescr |      |       |                         |
|                | iption\": |      |       |                         |
|                | \"        |      |       |                         |
|                | Processed |      |       |                         |
|                | OK\",     |      |       |                         |
|                |           |      |       |                         |
|                | \"data\": |      |       |                         |
|                | {         |      |       |                         |
|                |           |      |       |                         |
|                | \"card    |      |       |                         |
|                | Number\": |      |       |                         |
|                | \"2       |      |       |                         |
|                | 205820000 |      |       |                         |
|                | 022467\", |      |       |                         |
|                |           |      |       |                         |
|                | \"cvc\":  |      |       |                         |
|                | \         |      |       |                         |
|                | "\*\*5\", |      |       |                         |
|                |           |      |       |                         |
|                | \"        |      |       |                         |
|                | expiry\": |      |       |                         |
|                | \"3009\"  |      |       |                         |
|                |           |      |       |                         |
|                | }         |      |       |                         |
|                |           |      |       |                         |
|                | }         |      |       |                         |
+----------------+-----------+------+-------+-------------------------+
| **Response     | {         |      |       |                         |
| body sample    |           |      |       |                         |
| (Negative)**   | \"respon  |      |       |                         |
|                | seCode\": |      |       |                         |
|                | \"1805\", |      |       |                         |
|                |           |      |       |                         |
|                | \"resp    |      |       |                         |
|                | onseDescr |      |       |                         |
|                | iption\": |      |       |                         |
|                | \         |      |       |                         |
|                | "Customer |      |       |                         |
|                | Card      |      |       |                         |
|                | Relation  |      |       |                         |
|                | not       |      |       |                         |
|                | found\"   |      |       |                         |
|                |           |      |       |                         |
|                | }         |      |       |                         |
|                |           |      |       |                         |
|                | }         |      |       |                         |
+----------------+-----------+------+-------+-------------------------+
| **Response     | **Field** | **Ty | **M   | **Description**         |
| body           |           | pe** | andat |                         |
| parameters**   |           |      | ory** |                         |
+----------------+-----------+------+-------+-------------------------+
|                | res       | Int  | Yes   | Response code           |
|                | ponseCode | eger |       | indicating the status   |
|                |           |      |       | of the transaction      |
|                |           |      |       | (e.g., 200 for          |
|                |           |      |       | success).               |
+----------------+-----------+------+-------+-------------------------+
|                | res       | St   | Yes   | A message accompanying  |
|                | ponseDesc | ring |       | the response code,      |
|                |           |      |       | indicating success or   |
|                |           |      |       | failure.                |
+----------------+-----------+------+-------+-------------------------+

## Set Customer Card Limits

+----------------+------------+----+-------+-------------------------+
| *              | **Set      |    |       |                         |
| *Description** | Customer   |    |       |                         |
|                | Card       |    |       |                         |
|                | Limits**   |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Client**     | Channel    |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Server**     | Open CMS   |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Method**     | POST       |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Method       | upda       |    |       |                         |
| Name**         | teCustomer |    |       |                         |
|                | CardLimits |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **URL**        | {**Servi   |    |       |                         |
|                | ce-Layer-U |    |       |                         |
|                | RL**}/upda |    |       |                         |
|                | teCustomer |    |       |                         |
|                | CardLimits |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Headers**    | **X-Au     |    |       |                         |
|                | th-Token** |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Request      | [{]{.mark} |    |       |                         |
| body**         |            |    |       |                         |
|                | [\         |    |       |                         |
| **sample**     | "cardId\": |    |       |                         |
|                | 3,]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"        |    |       |                         |
|                | idValue\": |    |       |                         |
|                | \"4200     |    |       |                         |
|                | 008716115\ |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"rrn\":  |    |       |                         |
|                | \"2        |    |       |                         |
|                | 1212121232 |    |       |                         |
|                | \"]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"limit   |    |       |                         |
|                | Details\": |    |       |                         |
|                | \[]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [{]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"chan    |    |       |                         |
|                | nelCode\": |    |       |                         |
|                | \          |    |       |                         |
|                | "ATM-OnUs\ |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"c       |    |       |                         |
|                | urrency\": |    |       |                         |
|                | \"PKR\     |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"cyc     |    |       |                         |
|                | leLimit\": |    |       |                         |
|                | 30000      |    |       |                         |
|                | 0,]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"effect  |    |       |                         |
|                | iveDate\": |    |       |                         |
|                | \"\        |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"        |    |       |                         |
|                | endDate\": |    |       |                         |
|                | \"\        |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"limitCy |    |       |                         |
|                | cleName\": |    |       |                         |
|                | \"Daily\   |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\"li      |    |       |                         |
|                | mitPerTran |    |       |                         |
|                | saction\": |    |       |                         |
|                | 3000       |    |       |                         |
|                | 0,]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [\         |    |       |                         |
|                | "status\": |    |       |                         |
|                | \"ACTIVE\  |    |       |                         |
|                | ",]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [          |    |       |                         |
|                | \"transact |    |       |                         |
|                | ionType\": |    |       |                         |
|                | \"Cash     |    |       |                         |
|                | Withdrawal |    |       |                         |
|                | \"]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [}]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [          |    |       |                         |
|                | \]]{.mark} |    |       |                         |
|                |            |    |       |                         |
|                | [}]{.mark} |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Request body | **Field**  | ** | **M   | **Description**         |
| parameters**   |            | Ty | andat |                         |
|                |            | pe | ory** |                         |
|                |            | ** |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | [card      | St | Yes   | **Card ID** - Unique    |
|                | Id]{.mark} | ri |       | identifier for the      |
|                |            | ng |       | Card.                   |
+----------------+------------+----+-------+-------------------------+
|                | [idVal     | St | Yes   | **Id Value** --         |
|                | ue]{.mark} | ri |       | Customer Identifier     |
|                |            | ng |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | [r         | St | Yes   | **Retrieval Reference   |
|                | rn]{.mark} | ri |       | Number for the request  |
|                |            | ng |       | (e.g.,                  |
|                |            |    |       | \"123456123451\").**    |
+----------------+------------+----+-------+-------------------------+
|                | **[Limit   |    |       |                         |
|                | Details    |    |       |                         |
|                | ]{.mark}** |    |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | [channelCo | St | Yes   | **Channel Codes** - A   |
|                | de]{.mark} | ri |       | unique identifier for   |
|                |            | ng |       | the channel eg. (       |
|                |            |    |       | [ATM-OnUs]{.mark})      |
+----------------+------------+----+-------+-------------------------+
|                | [curren    | St | Yes   | **Currency -** currency |
|                | cy]{.mark} | ri |       | eg. (PKR)               |
|                |            | ng |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | [cycleLim  | St | No    | A brief description of  |
|                | it]{.mark} | ri |       | the transaction (e.g.,  |
|                |            | ng |       | \"30000\").             |
+----------------+------------+----+-------+-------------------------+
|                | [e         | St | No    | **Effective Date** -    |
|                | ffectiveDa | ri |       | The date from which it  |
|                | te]{.mark} | ng |       | will be effective.      |
+----------------+------------+----+-------+-------------------------+
|                | [endDa     | St | No    | **End Date** - The date |
|                | te]{.mark} | ri |       | from which it will be   |
|                |            | ng |       | end is specified.       |
+----------------+------------+----+-------+-------------------------+
|                | [li        | St | Yes   | Limit Cycle Name for    |
|                | mitCycleNa | ri |       | now it only supports    |
|                | me]{.mark} | ng |       | Daily, Eg . (Daily)     |
+----------------+------------+----+-------+-------------------------+
|                | [limitPe   | St | Yes   | **Limit Per Transaction |
|                | rTransacti | ri |       | --** Limit per          |
|                | on]{.mark} | ng |       | Transaction (10000) --  |
|                |            |    |       | means per Transaction   |
|                |            |    |       | it will be 10000 Max    |
+----------------+------------+----+-------+-------------------------+
|                | [stat      | St | Yes   | **Status** - It will be |
|                | us]{.mark} | ri |       | Enable or Disable       |
|                |            | ng |       | ("ACTI                  |
|                |            |    |       | VE"**,"**INACTIVE**"**) |
+----------------+------------+----+-------+-------------------------+
|                | [tra       | St | Yes   | Type of the             |
|                | nsactionTy | ri |       | Transaction, **Eg. (**  |
|                | pe]{.mark} | ng |       | **[Cash                 |
|                |            |    |       | Withdrawal]{.mark})**   |
+----------------+------------+----+-------+-------------------------+
| **Response     | {          |    |       |                         |
| body sample    |            |    |       |                         |
| (Success)**    | \"respo    |    |       |                         |
|                | nseCode\": |    |       |                         |
|                | \"00\",    |    |       |                         |
|                |            |    |       |                         |
|                | \"re       |    |       |                         |
|                | sponseDesc |    |       |                         |
|                | ription\": |    |       |                         |
|                | \          |    |       |                         |
|                | "Processed |    |       |                         |
|                | OK\",      |    |       |                         |
|                |            |    |       |                         |
|                | \"data\":  |    |       |                         |
|                | {          |    |       |                         |
|                |            |    |       |                         |
|                | \"         |    |       |                         |
|                | [idValue]  |    |       |                         |
|                | {.mark}\": |    |       |                         |
|                | \"422014   |    |       |                         |
|                | 2163583\", |    |       |                         |
|                |            |    |       |                         |
|                | \          |    |       |                         |
|                | "cardId\": |    |       |                         |
|                | 190,       |    |       |                         |
|                |            |    |       |                         |
|                | \          |    |       |                         |
|                | "processed |    |       |                         |
|                | Details\": |    |       |                         |
|                | \[         |    |       |                         |
|                |            |    |       |                         |
|                | {          |    |       |                         |
|                |            |    |       |                         |
|                | \"cyc      |    |       |                         |
|                | leLimit\": |    |       |                         |
|                | 300000,    |    |       |                         |
|                |            |    |       |                         |
|                | \"transact |    |       |                         |
|                | ionType\": |    |       |                         |
|                | \"Cash     |    |       |                         |
|                | Wit        |    |       |                         |
|                | hdrawal\", |    |       |                         |
|                |            |    |       |                         |
|                | \"chan     |    |       |                         |
|                | nelCode\": |    |       |                         |
|                | \"A        |    |       |                         |
|                | TM-OnUs\", |    |       |                         |
|                |            |    |       |                         |
|                | \"li       |    |       |                         |
|                | mitPerTran |    |       |                         |
|                | saction\": |    |       |                         |
|                | 20000,     |    |       |                         |
|                |            |    |       |                         |
|                | \"limitCy  |    |       |                         |
|                | cleName\": |    |       |                         |
|                | \"Daily\", |    |       |                         |
|                |            |    |       |                         |
|                | \"c        |    |       |                         |
|                | urrency\": |    |       |                         |
|                | \"PKR\",   |    |       |                         |
|                |            |    |       |                         |
|                | \"effect   |    |       |                         |
|                | iveDate\": |    |       |                         |
|                | \"2        |    |       |                         |
|                | 025-03-01T |    |       |                         |
|                | 05:11:19.3 |    |       |                         |
|                | 60+0000\", |    |       |                         |
|                |            |    |       |                         |
|                | \"         |    |       |                         |
|                | endDate\": |    |       |                         |
|                | \"\",      |    |       |                         |
|                |            |    |       |                         |
|                | \          |    |       |                         |
|                | "status\": |    |       |                         |
|                | "ACTIVE",  |    |       |                         |
|                |            |    |       |                         |
|                | \"respo    |    |       |                         |
|                | nseCode\": |    |       |                         |
|                | \"00\",    |    |       |                         |
|                |            |    |       |                         |
|                | \"response |    |       |                         |
|                | Message\": |    |       |                         |
|                | \          |    |       |                         |
|                | "Processed |    |       |                         |
|                | OK\"       |    |       |                         |
|                |            |    |       |                         |
|                | }          |    |       |                         |
|                |            |    |       |                         |
|                | \]         |    |       |                         |
|                |            |    |       |                         |
|                | }          |    |       |                         |
|                |            |    |       |                         |
|                | }          |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Response     | {          |    |       |                         |
| body sample    |            |    |       |                         |
| (Negative)**   |            |    |       |                         |
|                | \"respo    |    |       |                         |
|                | nseCode\": |    |       |                         |
|                | \"48\",    |    |       |                         |
|                |            |    |       |                         |
|                |            |    |       |                         |
|                | \"re       |    |       |                         |
|                | sponseDesc |    |       |                         |
|                | ription\": |    |       |                         |
|                | \"Card not |    |       |                         |
|                | found      |    |       |                         |
|                | against    |    |       |                         |
|                | entered    |    |       |                         |
|                | [customer  |    |       |                         |
|                | Identifi   |    |       |                         |
|                | er]{.mark} |    |       |                         |
|                | /Accou     |    |       |                         |
|                | ntNumber\" |    |       |                         |
|                |            |    |       |                         |
|                | },         |    |       |                         |
|                |            |    |       |                         |
|                | {          |    |       |                         |
|                |            |    |       |                         |
|                | \"respo    |    |       |                         |
|                | nseCode\": |    |       |                         |
|                | \"00\",    |    |       |                         |
|                |            |    |       |                         |
|                | \"re       |    |       |                         |
|                | sponseDesc |    |       |                         |
|                | ription\": |    |       |                         |
|                | \          |    |       |                         |
|                | "Processed |    |       |                         |
|                | OK\",      |    |       |                         |
|                |            |    |       |                         |
|                | \"data\":  |    |       |                         |
|                | {          |    |       |                         |
|                |            |    |       |                         |
|                | \"         |    |       |                         |
|                | [idVal     |    |       |                         |
|                | ue]{.mark} |    |       |                         |
|                | \":        |    |       |                         |
|                | \"422014   |    |       |                         |
|                | 2163583\", |    |       |                         |
|                |            |    |       |                         |
|                | \          |    |       |                         |
|                | "cardId\": |    |       |                         |
|                | 190,       |    |       |                         |
|                |            |    |       |                         |
|                | \          |    |       |                         |
|                | "processed |    |       |                         |
|                | Details\": |    |       |                         |
|                | \[         |    |       |                         |
|                |            |    |       |                         |
|                | {          |    |       |                         |
|                |            |    |       |                         |
|                | \"cyc      |    |       |                         |
|                | leLimit\": |    |       |                         |
|                | 300000,    |    |       |                         |
|                |            |    |       |                         |
|                | \"transact |    |       |                         |
|                | ionType\": |    |       |                         |
|                | \"Cash     |    |       |                         |
|                | Wit        |    |       |                         |
|                | hdrawal\", |    |       |                         |
|                |            |    |       |                         |
|                | \"chan     |    |       |                         |
|                | nelCode\": |    |       |                         |
|                | \"         |    |       |                         |
|                | ATM-OnU\", |    |       |                         |
|                |            |    |       |                         |
|                | \"li       |    |       |                         |
|                | mitPerTran |    |       |                         |
|                | saction\": |    |       |                         |
|                | 20000,     |    |       |                         |
|                |            |    |       |                         |
|                | \"limitCy  |    |       |                         |
|                | cleName\": |    |       |                         |
|                | \"Daily\", |    |       |                         |
|                |            |    |       |                         |
|                | \"c        |    |       |                         |
|                | urrency\": |    |       |                         |
|                | \"PKR\",   |    |       |                         |
|                |            |    |       |                         |
|                | \"effect   |    |       |                         |
|                | iveDate\": |    |       |                         |
|                | \"2        |    |       |                         |
|                | 025-03-01T |    |       |                         |
|                | 05:11:19.3 |    |       |                         |
|                | 60+0000\", |    |       |                         |
|                |            |    |       |                         |
|                | \"         |    |       |                         |
|                | endDate\": |    |       |                         |
|                | \"2        |    |       |                         |
|                | 025-03-01T |    |       |                         |
|                | 05:11:19.3 |    |       |                         |
|                | 60+0000\", |    |       |                         |
|                |            |    |       |                         |
|                | \          |    |       |                         |
|                | "status\": |    |       |                         |
|                | null,      |    |       |                         |
|                |            |    |       |                         |
|                | \"respo    |    |       |                         |
|                | nseCode\": |    |       |                         |
|                | \"327\",   |    |       |                         |
|                |            |    |       |                         |
|                | \"response |    |       |                         |
|                | Message\": |    |       |                         |
|                | \"Channel  |    |       |                         |
|                | T          |    |       |                         |
|                | ransaction |    |       |                         |
|                | Matrix Is  |    |       |                         |
|                | Invalid\"  |    |       |                         |
|                |            |    |       |                         |
|                | }          |    |       |                         |
|                |            |    |       |                         |
|                | \]         |    |       |                         |
|                |            |    |       |                         |
|                | }          |    |       |                         |
|                |            |    |       |                         |
|                | }          |    |       |                         |
+----------------+------------+----+-------+-------------------------+
| **Response     | **Field**  | ** | **M   | **Description**         |
| body           |            | Ty | andat |                         |
| parameters**   |            | pe | ory** |                         |
|                |            | ** |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | re         | I  | Yes   | Response code           |
|                | sponseCode | nt |       | indicating the status   |
|                |            | eg |       | of the transaction      |
|                |            | er |       | (e.g., 200 for          |
|                |            |    |       | success).               |
+----------------+------------+----+-------+-------------------------+
|                | re         | St | Yes   | A message accompanying  |
|                | sponseDesc | ri |       | the response code,      |
|                |            | ng |       | indicating success or   |
|                |            |    |       | failure.                |
+----------------+------------+----+-------+-------------------------+
|                | **data**   | ** | **    | **Contains the details  |
|                |            | Ob | Yes** | of the transaction,     |
|                |            | je |       | including channel,      |
|                |            | ct |       | transaction date,       |
|                |            | ** |       | etc.**                  |
+----------------+------------+----+-------+-------------------------+
|                | [idVal     | St | Yes   | Unique identifier for   |
|                | ue]{.mark} | ri |       | the customer (e.g.,     |
|                |            | ng |       | \"99999999999999\").    |
+----------------+------------+----+-------+-------------------------+
|                | cardId     | I  | Yes   | Unique identifier for   |
|                |            | nt |       | the card (e.g., 190).   |
|                |            | eg |       |                         |
|                |            | er |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | **processe | *  | **    | **List of processed     |
|                | dDetails** | *A | Yes** | transaction details for |
|                |            | rr |       | the customer.**         |
|                |            | ay |       |                         |
|                |            | ** |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | cycleLimit | I  | Yes   | Maximum allowable limit |
|                |            | nt |       | for the cycle (e.g.,    |
|                |            | eg |       | 300000).                |
|                |            | er |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | trans      | St | Yes   | Type of transaction     |
|                | actionType | ri |       | (e.g., \"Cash           |
|                |            | ng |       | Withdrawal\").          |
+----------------+------------+----+-------+-------------------------+
|                | c          | St | Yes   | Code representing the   |
|                | hannelCode | ri |       | transaction channel     |
|                |            | ng |       | (e.g., \"ATM-OnU\").    |
+----------------+------------+----+-------+-------------------------+
|                | limitPerT  | I  | Yes   | Maximum allowable limit |
|                | ransaction | nt |       | per transaction (e.g.,  |
|                |            | eg |       | 20000).                 |
|                |            | er |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | limi       | St | Yes   | Name of the limit cycle |
|                | tCycleName | ri |       | (e.g., \"Daily\").      |
|                |            | ng |       |                         |
+----------------+------------+----+-------+-------------------------+
|                | currency   | St | Yes   | Currency code for the   |
|                |            | ri |       | transaction (e.g.,      |
|                |            | ng |       | \"PKR\").               |
+----------------+------------+----+-------+-------------------------+
|                | eff        | St | Yes   | The date and time when  |
|                | ectiveDate | ri |       | the transaction will    |
|                |            | ng |       | enable, in YYYY-MM-DD   |
|                |            |    |       | HH:mm:ss format.        |
+----------------+------------+----+-------+-------------------------+
|                | endDate    | St | No    | The date and time when  |
|                |            | ri |       | the transaction will    |
|                |            | ng |       | disable, in YYYY-MM-DD  |
|                |            |    |       | HH:mm:ss format.        |
+----------------+------------+----+-------+-------------------------+
|                | status     | St | Yes   | Status of the limit     |
|                |            | ri |       | (e.g., true for         |
|                |            | ng |       | status).                |
+----------------+------------+----+-------+-------------------------+
|                | re         | St | Yes   | Code indicating the     |
|                | sponseCode | ri |       | result of the           |
|                |            | ng |       | transaction processing  |
|                |            |    |       | (e.g., \"00\").         |
+----------------+------------+----+-------+-------------------------+
|                | respo      | St | Yes   | Description of the      |
|                | nseMessage | ri |       | response (e.g.,         |
|                |            | ng |       | \"Channel Transaction   |
|                |            |    |       | Matrix Is Invalid\").   |
+----------------+------------+----+-------+-------------------------+

## Get Customer Card Limits

+----------+--------------------+------+---+-------------------------+
| **Descr  | To get customer    |      |   |                         |
| iption** | card limits        |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | Channel            |      |   |                         |
| Client** |                    |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | Open CMS           |      |   |                         |
| Server** |                    |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | GET                |      |   |                         |
| Method** |                    |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **Method | Get                |      |   |                         |
| Name**   | CustomerCardLimits |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **URL**  | {**Service-La      |      |   |                         |
|          | yer-URL**}/custome |      |   |                         |
|          | rCardLimits/{idVal |      |   |                         |
|          | ue}/{CardId}/{rrn} |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **H      | **X-Auth-Token :   |      |   |                         |
| eaders** | {Token}**          |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | {                  |      |   |                         |
| Response |                    |      |   |                         |
| body     | \"responseCode\":  |      |   |                         |
| sample   | \"00\",            |      |   |                         |
| (Su      |                    |      |   |                         |
| ccess)** | \"resp             |      |   |                         |
|          | onseDescription\": |      |   |                         |
|          | \"Processed OK\",  |      |   |                         |
|          |                    |      |   |                         |
|          | \"data\": {        |      |   |                         |
|          |                    |      |   |                         |
|          | \"cardLimits\": \[ |      |   |                         |
|          |                    |      |   |                         |
|          | {                  |      |   |                         |
|          |                    |      |   |                         |
|          | \"status\":        |      |   |                         |
|          | \"ACTIVE\",        |      |   |                         |
|          |                    |      |   |                         |
|          | \"channelName\":   |      |   |                         |
|          | \"ATM-OffU         |      |   |                         |
|          | s-International\", |      |   |                         |
|          |                    |      |   |                         |
|          | \"                 |      |   |                         |
|          | transactionName\": |      |   |                         |
|          | \"Cash             |      |   |                         |
|          | Withdrawal\",      |      |   |                         |
|          |                    |      |   |                         |
|          | \"                 |      |   |                         |
|          | allowedMaxLimit\": |      |   |                         |
|          | 150000.00,         |      |   |                         |
|          |                    |      |   |                         |
|          | \"allowedLimit\":  |      |   |                         |
|          | 150000.00,         |      |   |                         |
|          |                    |      |   |                         |
|          | \"usedLimit\": 0,  |      |   |                         |
|          |                    |      |   |                         |
|          | \                  |      |   |                         |
|          | "availableLimit\": |      |   |                         |
|          | 150000.00,         |      |   |                         |
|          |                    |      |   |                         |
|          | \"currency\":      |      |   |                         |
|          | \"PKR\",           |      |   |                         |
|          |                    |      |   |                         |
|          | \"limitCycle\":    |      |   |                         |
|          | \"Daily\",         |      |   |                         |
|          |                    |      |   |                         |
|          | \"frequency\": 25, |      |   |                         |
|          |                    |      |   |                         |
|          | \"effectiveDate\": |      |   |                         |
|          | \"2025-01-10T00    |      |   |                         |
|          | :00:00.000+0000\", |      |   |                         |
|          |                    |      |   |                         |
|          | \"endDate\": null, |      |   |                         |
|          |                    |      |   |                         |
|          | \"limi             |      |   |                         |
|          | tPerTransaction\": |      |   |                         |
|          | 5000               |      |   |                         |
|          |                    |      |   |                         |
|          | },                 |      |   |                         |
|          |                    |      |   |                         |
|          | {                  |      |   |                         |
|          |                    |      |   |                         |
|          | \"status\":        |      |   |                         |
|          | \"ACTIVE\",        |      |   |                         |
|          |                    |      |   |                         |
|          | \"channelName\":   |      |   |                         |
|          | \"ATM-OnUs\",      |      |   |                         |
|          |                    |      |   |                         |
|          | \"                 |      |   |                         |
|          | transactionName\": |      |   |                         |
|          | \"Cash             |      |   |                         |
|          | Withdrawal\",      |      |   |                         |
|          |                    |      |   |                         |
|          | \"                 |      |   |                         |
|          | allowedMaxLimit\": |      |   |                         |
|          | 175000.00,         |      |   |                         |
|          |                    |      |   |                         |
|          | \"allowedLimit\":  |      |   |                         |
|          | 175000.00,         |      |   |                         |
|          |                    |      |   |                         |
|          | \"usedLimit\": 0,  |      |   |                         |
|          |                    |      |   |                         |
|          | \                  |      |   |                         |
|          | "availableLimit\": |      |   |                         |
|          | 175000.00,         |      |   |                         |
|          |                    |      |   |                         |
|          | \"currency\":      |      |   |                         |
|          | \"PKR\",           |      |   |                         |
|          |                    |      |   |                         |
|          | \"limitCycle\":    |      |   |                         |
|          | \"Daily\",         |      |   |                         |
|          |                    |      |   |                         |
|          | \"frequency\": 20, |      |   |                         |
|          |                    |      |   |                         |
|          | \"effectiveDate\": |      |   |                         |
|          | \"2024-12-25T00    |      |   |                         |
|          | :00:00.000+0000\", |      |   |                         |
|          |                    |      |   |                         |
|          | \"endDate\": null, |      |   |                         |
|          |                    |      |   |                         |
|          | \"limi             |      |   |                         |
|          | tPerTransaction\": |      |   |                         |
|          | 25000              |      |   |                         |
|          |                    |      |   |                         |
|          | }                  |      |   |                         |
|          |                    |      |   |                         |
|          | \]                 |      |   |                         |
|          |                    |      |   |                         |
|          |     }              |      |   |                         |
|          |                    |      |   |                         |
|          | }                  |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | {                  |      |   |                         |
| Response |                    |      |   |                         |
| body     |                    |      |   |                         |
| sample   | \"responseCode\":  |      |   |                         |
| (Reje    | \"48\",            |      |   |                         |
| ction)** |                    |      |   |                         |
|          |                    |      |   |                         |
|          | \"resp             |      |   |                         |
|          | onseDescription\": |      |   |                         |
|          | \"Card not found   |      |   |                         |
|          | against entered    |      |   |                         |
|          | [customer          |      |   |                         |
|          | Identifier]{.mark} |      |   |                         |
|          | /AccountNumber\"   |      |   |                         |
|          |                    |      |   |                         |
|          | }                  |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | **Field**          | **Ty | * | **Description**         |
| Response |                    | pe** | * |                         |
| body     |                    |      | M |                         |
| para     |                    |      | a |                         |
| meters** |                    |      | n |                         |
|          |                    |      | d |                         |
|          |                    |      | a |                         |
|          |                    |      | t |                         |
|          |                    |      | o |                         |
|          |                    |      | r |                         |
|          |                    |      | y |                         |
|          |                    |      | * |                         |
|          |                    |      | * |                         |
+----------+--------------------+------+---+-------------------------+
|          | responseCode       | St   | Y | Response code for the   |
|          |                    | ring |   | request                 |
+----------+--------------------+------+---+-------------------------+
|          | responseDesc       | St   | Y | Description for the     |
|          |                    | ring |   | respective response     |
|          |                    |      |   | code, the response code |
|          |                    |      |   | narrates the exact      |
|          |                    |      |   | status of the account   |
+----------+--------------------+------+---+-------------------------+
|          | **data**           |      |   |                         |
+----------+--------------------+------+---+-------------------------+
|          | cardLimits         | A    | Y | List of card limit      |
|          |                    | rray |   | details for different   |
|          |                    |      |   | channels and            |
|          |                    |      |   | transactions.           |
+----------+--------------------+------+---+-------------------------+
|          | **cardLimits**     |      |   |                         |
+----------+--------------------+------+---+-------------------------+
|          | status             | St   | Y | Current status of the   |
|          |                    | ring |   | card limit (e.g.,       |
|          |                    |      |   | \"ACTIVE\","INACTIVE"). |
+----------+--------------------+------+---+-------------------------+
|          | channelName        | St   | Y | Name of the channel     |
|          |                    | ring |   | associated with the     |
|          |                    |      |   | transaction (e.g.,      |
|          |                    |      |   | \"ATM-                  |
|          |                    |      |   | OffUs-International\"). |
+----------+--------------------+------+---+-------------------------+
|          | transactionName    | St   | C | Type of transaction     |
|          |                    | ring |   | (e.g., \"Cash           |
|          |                    |      |   | Withdrawal\").          |
+----------+--------------------+------+---+-------------------------+
|          | allowedMaxLimit    | St   | C | Maximum limit allowed   |
|          |                    | ring |   | for the transaction in  |
|          |                    |      |   | the given channel.      |
+----------+--------------------+------+---+-------------------------+
|          | allowedLimit       | Dec  | C | Allowed limit for the   |
|          |                    | imal |   | transaction in the      |
|          |                    |      |   | given channel.          |
+----------+--------------------+------+---+-------------------------+
|          | usedLimit          | Dec  | C | Limit already utilized  |
|          |                    | imal |   | for the transaction.    |
+----------+--------------------+------+---+-------------------------+
|          | availableLimit     | St   | C | Remaining limit         |
|          |                    | ring |   | available for the       |
|          |                    |      |   | transaction.            |
+----------+--------------------+------+---+-------------------------+
|          | currency           | St   | C | Currency code for the   |
|          |                    | ring |   | transaction (e.g.,      |
|          |                    |      |   | \"PKR\").               |
+----------+--------------------+------+---+-------------------------+
|          | limitCycle         | St   | C | Cycle duration for the  |
|          |                    | ring |   | limit (e.g.,            |
|          |                    |      |   | \"Daily\").             |
+----------+--------------------+------+---+-------------------------+
|          | frequency          | Int  |   | Number of times the     |
|          |                    | eger |   | limit can be utilized   |
|          |                    |      |   | during the cycle.       |
+----------+--------------------+------+---+-------------------------+
|          | effectiveDate      | St   | Y | The date and time when  |
|          |                    | ring | e | the transaction will    |
|          |                    |      | s | enable, in YYYY-MM-DD   |
|          |                    |      |   | HH:mm:ss format.        |
+----------+--------------------+------+---+-------------------------+
|          | endDate            | St   | N | The date and time when  |
|          |                    | ring | o | the transaction will    |
|          |                    |      |   | disable, in YYYY-MM-DD  |
|          |                    |      |   | HH:mm:ss format.        |
+----------+--------------------+------+---+-------------------------+
|          | l                  | Dec  | Y | Maximum limit allowed   |
|          | imitPerTransaction | imal | e | per transaction.        |
|          |                    |      | s |                         |
+----------+--------------------+------+---+-------------------------+

## Get All Product List

+----------+-------------+---------+--------+-------------------------+
| **Descr  | To fetch    |         |        |                         |
| iption** | all product |         |        |                         |
|          | list        |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **       | Channel     |         |        |                         |
| Client** |             |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **       | Open CMS    |         |        |                         |
| Server** |             |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **       | POST        |         |        |                         |
| Method** |             |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **Method | Get All     |         |        |                         |
| Name**   | Product     |         |        |                         |
|          | List        |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **URL**  | {*          |         |        |                         |
|          | *Service-La |         |        |                         |
|          | yer-URL**}/ |         |        |                         |
|          | productList |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **H      | **X-        |         |        |                         |
| eaders** | Auth-Token: |         |        |                         |
|          | {Token}**   |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| *        | {           |         |        |                         |
| *Request |             |         |        |                         |
| body**   | \"acc       |         |        |                         |
|          | ountType\": |         |        |                         |
| **       | \"\",       |         |        |                         |
| sample** |             |         |        |                         |
|          | \"action\": |         |        |                         |
|          | \"          |         |        |                         |
|          | issuance\", |         |        |                         |
|          |             |         |        |                         |
|          | \           |         |        |                         |
|          | "IdValue\": |         |        |                         |
|          | \"42201     |         |        |                         |
|          | 42163583\", |         |        |                         |
|          |             |         |        |                         |
|          | \"IdType\": |         |        |                         |
|          | \"CNIC\"    |         |        |                         |
|          |             |         |        |                         |
|          | \"rrn\":    |         |        |                         |
|          | \"21        |         |        |                         |
|          | 212121232\" |         |        |                         |
|          |             |         |        |                         |
|          | }           |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| *        | **Field**   | *       | *      | **Description**         |
| *Request |             | *Type** | *Manda |                         |
| body     |             |         | tory** |                         |
| para     |             |         |        |                         |
| meters** |             |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
|          | accountType | String  | No     | Any value up to 10      |
|          |             |         |        | digits (account type    |
|          |             |         |        | parameter will provide  |
|          |             |         |        | an ease in future use   |
|          |             |         |        | cases, where banks want |
|          |             |         |        | to limit the product    |
|          |             |         |        | for specific account    |
|          |             |         |        | type customers)         |
+----------+-------------+---------+--------+-------------------------+
|          | action      | String  | Yes    | Issuance, Renewal       |
+----------+-------------+---------+--------+-------------------------+
|          | IdValue     | String  | No     | Value of the UID Type   |
+----------+-------------+---------+--------+-------------------------+
|          | IdType      | String  | No     | Customer identification |
|          |             |         |        | type such as **CNIC,    |
|          |             |         |        | Passport ,NICOP,NTN**)  |
+----------+-------------+---------+--------+-------------------------+
|          | rrn         | String  | Yes    | **Retrieval Reference   |
|          |             |         |        | Number for the request  |
|          |             |         |        | (e.g.,                  |
|          |             |         |        | \"123456123451\").**    |
+----------+-------------+---------+--------+-------------------------+
| **       | {           |         |        |                         |
| Response |             |         |        |                         |
| body     | \"resp      |         |        |                         |
| sample   | onseCode\": |         |        |                         |
| (Su      | \"00\",     |         |        |                         |
| ccess)** |             |         |        |                         |
|          | \"          |         |        |                         |
|          | responseDes |         |        |                         |
|          | cription\": |         |        |                         |
|          | \"Processed |         |        |                         |
|          | OK\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"data\":   |         |        |                         |
|          | \[          |         |        |                         |
|          |             |         |        |                         |
|          | {           |         |        |                         |
|          |             |         |        |                         |
|          | \"pro       |         |        |                         |
|          | ductCode\": |         |        |                         |
|          | \"01\",     |         |        |                         |
|          |             |         |        |                         |
|          | \"pro       |         |        |                         |
|          | ductName\": |         |        |                         |
|          | \"UPI       |         |        |                         |
|          | Classic\",  |         |        |                         |
|          |             |         |        |                         |
|          | \"pro       |         |        |                         |
|          | ductType\": |         |        |                         |
|          | \"          |         |        |                         |
|          | Physical\", |         |        |                         |
|          |             |         |        |                         |
|          | \"          |         |        |                         |
|          | cardType\": |         |        |                         |
|          | \"Single    |         |        |                         |
|          | Scheme\",   |         |        |                         |
|          |             |         |        |                         |
|          | \"scheme\": |         |        |                         |
|          | \"UPI\",    |         |        |                         |
|          |             |         |        |                         |
|          | \"fee\":    |         |        |                         |
|          | 1000.00,    |         |        |                         |
|          |             |         |        |                         |
|          | \"logo1\":  |         |        |                         |
|          | \"\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"logo2\":  |         |        |                         |
|          | \"\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"logo3\":  |         |        |                         |
|          | \"\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"logo4\":  |         |        |                         |
|          | \"\"        |         |        |                         |
|          |             |         |        |                         |
|          | },          |         |        |                         |
|          |             |         |        |                         |
|          | {           |         |        |                         |
|          |             |         |        |                         |
|          | \"pro       |         |        |                         |
|          | ductCode\": |         |        |                         |
|          | \"02\",     |         |        |                         |
|          |             |         |        |                         |
|          | \"pro       |         |        |                         |
|          | ductName\": |         |        |                         |
|          | \"UPI       |         |        |                         |
|          | Gold\",     |         |        |                         |
|          |             |         |        |                         |
|          | \"pro       |         |        |                         |
|          | ductType\": |         |        |                         |
|          | \"          |         |        |                         |
|          | Physical\", |         |        |                         |
|          |             |         |        |                         |
|          | \"          |         |        |                         |
|          | cardType\": |         |        |                         |
|          | \"Single    |         |        |                         |
|          | Scheme\",   |         |        |                         |
|          |             |         |        |                         |
|          | \"scheme\": |         |        |                         |
|          | \"UPI\",    |         |        |                         |
|          |             |         |        |                         |
|          | \"fee\": 0, |         |        |                         |
|          |             |         |        |                         |
|          | \"logo1\":  |         |        |                         |
|          | \"\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"logo2\":  |         |        |                         |
|          | \"\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"logo3\":  |         |        |                         |
|          | \"\",       |         |        |                         |
|          |             |         |        |                         |
|          | \"logo4\":  |         |        |                         |
|          | \"\"        |         |        |                         |
|          |             |         |        |                         |
|          | }           |         |        |                         |
|          |             |         |        |                         |
|          | \]          |         |        |                         |
|          |             |         |        |                         |
|          | }}          |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **       | {           |         |        |                         |
| Response |             |         |        |                         |
| body     | \"resp      |         |        |                         |
| sample   | onseCode\": |         |        |                         |
| (Reje    | \" 323 \",  |         |        |                         |
| ction)** |             |         |        |                         |
|          | \"resp      |         |        |                         |
|          | onseDesc\": |         |        |                         |
|          | \" Unable   |         |        |                         |
|          | to get list |         |        |                         |
|          | of products |         |        |                         |
|          | \"          |         |        |                         |
|          |             |         |        |                         |
|          | }           |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
| **       | **Field**   | *       | *      | **Description**         |
| Response |             | *Type** | *Manda |                         |
| body     |             |         | tory** |                         |
| para     |             |         |        |                         |
| meters** |             |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
|          | r           | Integer | Yes    | Response code           |
|          | esponseCode |         |        | indicating the status   |
|          |             |         |        | of the transaction      |
|          |             |         |        | (e.g., 00 for success). |
+----------+-------------+---------+--------+-------------------------+
|          | r           | String  | Yes    | A message accompanying  |
|          | esponseDesc |         |        | the response code,      |
|          |             |         |        | indicating success or   |
|          |             |         |        | failure.                |
+----------+-------------+---------+--------+-------------------------+
|          | **data**    |         |        |                         |
+----------+-------------+---------+--------+-------------------------+
|          | productCode | String  | Yes    | Unique code identifying |
|          |             |         |        | the product (e.g.,      |
|          |             |         |        | \"01\").                |
+----------+-------------+---------+--------+-------------------------+
|          | productName | String  | Yes    | Name of the product     |
|          |             |         |        | (e.g., \"UPI            |
|          |             |         |        | Classic\").             |
+----------+-------------+---------+--------+-------------------------+
|          | productType | String  | Yes    | Type of the product     |
|          |             |         |        | (e.g., \"Physical\").   |
+----------+-------------+---------+--------+-------------------------+
|          | cardType    | String  | Yes    | Type of card associated |
|          |             |         |        | with the product (e.g., |
|          |             |         |        | \"Single Scheme\").     |
+----------+-------------+---------+--------+-------------------------+
|          | scheme      | String  | Yes    | Payment scheme          |
|          |             |         |        | associated with the     |
|          |             |         |        | product (e.g.,          |
|          |             |         |        | \"UPI\").               |
+----------+-------------+---------+--------+-------------------------+
|          | fee         | Decimal | Yes    | Fee associated with the |
|          |             |         |        | product.                |
+----------+-------------+---------+--------+-------------------------+
|          | logo1       | String  | Yes    | URL or identifier for   |
|          |             |         |        | the first logo          |
|          |             |         |        | associated with the     |
|          |             |         |        | product.                |
+----------+-------------+---------+--------+-------------------------+
|          | logo2       | String  | Yes    | URL or identifier for   |
|          |             |         |        | the 2nd logo associated |
|          |             |         |        | with the product.       |
+----------+-------------+---------+--------+-------------------------+
|          | Logo3       | String  | Yes    | URL or identifier for   |
|          |             |         |        | the 3rd logo associated |
|          |             |         |        | with the product.       |
+----------+-------------+---------+--------+-------------------------+
|          | Logo4       | String  | Yes    | URL or identifier for   |
|          |             |         |        | the 4th logo associated |
|          |             |         |        | with the product.       |
+----------+-------------+---------+--------+-------------------------+

## ~~Get Physical Card Status (Deprecated)~~ 

*Note: Will be removed after 1^st^ November 2025*

+----------+--------------------+------+---+-------------------------+
| **Descr  | To fetch card      |      |   |                         |
| iption** | status             |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | Channel            |      |   |                         |
| Client** |                    |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | Open CMS           |      |   |                         |
| Server** |                    |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | GET                |      |   |                         |
| Method** |                    |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **Method | Get Physical Card  |      |   |                         |
| Name**   | Status             |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **H      | **X-Auth-Token:    |      |   |                         |
| eaders** | {Token}**          |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **URL**  | {*                 |      |   |                         |
|          | *Service-Layer-URL |      |   |                         |
|          | **}/getPhysicalCar |      |   |                         |
|          | dStatus/{idValue}/ |      |   |                         |
|          | {trackingId}/{rrn} |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | {                  |      |   |                         |
| Response |                    |      |   |                         |
| body     | \"responseCode\":  |      |   |                         |
| sample   | \"00\",            |      |   |                         |
| (Su      |                    |      |   |                         |
| ccess)** | \"resp             |      |   |                         |
|          | onseDescription\": |      |   |                         |
|          | \"Request          |      |   |                         |
|          | Processed          |      |   |                         |
|          | Successfully\",    |      |   |                         |
|          |                    |      |   |                         |
|          | \"data\": \[       |      |   |                         |
|          |                    |      |   |                         |
|          | {                  |      |   |                         |
|          |                    |      |   |                         |
|          | \"recordId\": 64,  |      |   |                         |
|          |                    |      |   |                         |
|          | \"status\":        |      |   |                         |
|          | \"Rejected\",      |      |   |                         |
|          |                    |      |   |                         |
|          | \"description\":   |      |   |                         |
|          | \"Maker Rejected\" |      |   |                         |
|          |                    |      |   |                         |
|          | },                 |      |   |                         |
|          |                    |      |   |                         |
|          | {                  |      |   |                         |
|          |                    |      |   |                         |
|          | \"recordId\": 73,  |      |   |                         |
|          |                    |      |   |                         |
|          | \"status\": \"In   |      |   |                         |
|          | Process\",         |      |   |                         |
|          |                    |      |   |                         |
|          | \"description\":   |      |   |                         |
|          | \"MK\"             |      |   |                         |
|          |                    |      |   |                         |
|          | },                 |      |   |                         |
|          |                    |      |   |                         |
|          | {                  |      |   |                         |
|          |                    |      |   |                         |
|          | \"recordId\": 64,  |      |   |                         |
|          |                    |      |   |                         |
|          | \"status\":        |      |   |                         |
|          | \"Rejected\",      |      |   |                         |
|          |                    |      |   |                         |
|          | \"description\":   |      |   |                         |
|          | \"\"               |      |   |                         |
|          |                    |      |   |                         |
|          | },                 |      |   |                         |
|          |                    |      |   |                         |
|          | {                  |      |   |                         |
|          |                    |      |   |                         |
|          | \"recordId\": 73,  |      |   |                         |
|          |                    |      |   |                         |
|          | \"status\": \"In   |      |   |                         |
|          | Process\",         |      |   |                         |
|          |                    |      |   |                         |
|          | \"description\":   |      |   |                         |
|          | \"E\"              |      |   |                         |
|          |                    |      |   |                         |
|          | }                  |      |   |                         |
|          |                    |      |   |                         |
|          | \]                 |      |   |                         |
|          |                    |      |   |                         |
|          | }                  |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | {                  |      |   |                         |
| Response |                    |      |   |                         |
| body     |                    |      |   |                         |
| sample   | \"responseCode\":  |      |   |                         |
| (Reje    | \"34\",            |      |   |                         |
| ction)** |                    |      |   |                         |
|          | "responseDesc":"   |      |   |                         |
|          | Unable to get card |      |   |                         |
|          | status"            |      |   |                         |
|          |                    |      |   |                         |
|          | }                  |      |   |                         |
+----------+--------------------+------+---+-------------------------+
| **       | **Field**          | **Ty | * | **Description**         |
| Response |                    | pe** | * |                         |
| body     |                    |      | M |                         |
| para     |                    |      | a |                         |
| meters** |                    |      | n |                         |
|          |                    |      | d |                         |
|          |                    |      | a |                         |
|          |                    |      | t |                         |
|          |                    |      | o |                         |
|          |                    |      | r |                         |
|          |                    |      | y |                         |
|          |                    |      | * |                         |
|          |                    |      | * |                         |
+----------+--------------------+------+---+-------------------------+
|          | responseCode       | Int  | Y | Response code           |
|          |                    | eger | e | indicating the status   |
|          |                    |      | s | of the transaction      |
|          |                    |      |   | (e.g., 00 for success). |
+----------+--------------------+------+---+-------------------------+
|          | responseDesc       | St   | Y | A message accompanying  |
|          |                    | ring | e | the response code,      |
|          |                    |      | s | indicating success or   |
|          |                    |      |   | failure.                |
+----------+--------------------+------+---+-------------------------+
|          | **Data**           |      |   |                         |
+----------+--------------------+------+---+-------------------------+
|          | recordId           | Int  | Y | Unique identifier for   |
|          |                    | eger | e | the record.             |
|          |                    |      | s |                         |
+----------+--------------------+------+---+-------------------------+
|          | Status             | St   | Y | Current status of the   |
|          |                    | ring | e | record (e.g.,           |
|          |                    |      | s | \"Rejected\", \"In      |
|          |                    |      |   | Process\").             |
+----------+--------------------+------+---+-------------------------+
|          | Description        | St   | Y | Additional information  |
|          |                    | ring | e | or remarks regarding    |
|          |                    |      | s | the status.(e.g.,       |
|          |                    |      |   | "E","MK","\")           |
+----------+--------------------+------+---+-------------------------+

##  Get Card Details

  ----------------- -----------------------------------------------------------------
  **Description**   The service allowed to get customer card detail

  **Client**        Channel

  **Server**        Open CMS

  **Method**        GET

  **Method Name**   Get Customer Card Detail

  **Endpoint**      {**Service-Layer-URL**}/getCardDetails/{idValue}/{cardId}/{rrn}

  **Headers**       **X-Auth-Token: {Token}**
  ----------------- -----------------------------------------------------------------

+----------+---------------+------+---------+-------------------------+
| **       | {             |      |         |                         |
| Response |               |      |         |                         |
| body     | \"re          |      |         |                         |
| sample   | sponseCode\": |      |         |                         |
| (Su      | \"00\",       |      |         |                         |
| ccess)** |               |      |         |                         |
|          | \"responseD   |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"Processed   |      |         |                         |
|          | OK\",         |      |         |                         |
|          |               |      |         |                         |
|          | \"data\": {   |      |         |                         |
|          |               |      |         |                         |
|          | \"cardId\":   |      |         |                         |
|          | \"7\",        |      |         |                         |
|          |               |      |         |                         |
|          | \"c           |      |         |                         |
|          | reatedDate\": |      |         |                         |
|          | \"2020-05-21  |      |         |                         |
|          | 11            |      |         |                         |
|          | :45:59.414\", |      |         |                         |
|          |               |      |         |                         |
|          | \"cardName\": |      |         |                         |
|          | \"SHAHZAD     |      |         |                         |
|          | YOUSUF\",     |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | cardstatus\": |      |         |                         |
|          | \"Active\",   |      |         |                         |
|          |               |      |         |                         |
|          | \"            |      |         |                         |
|          | expirydate\": |      |         |                         |
|          | \"2505\",     |      |         |                         |
|          |               |      |         |                         |
|          | \"masked      |      |         |                         |
|          | cardnumber\": |      |         |                         |
|          | \"22058\*\*\  |      |         |                         |
|          | *\*\*000053\" |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
|          |               |      |         |                         |
|          | }             |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | [{]{.mark}    |      |         |                         |
| Response |               |      |         |                         |
| body     | [\"re         |      |         |                         |
| sample   | sponseCode\": |      |         |                         |
| (Reje    | \"4           |      |         |                         |
| ction)** | 00\",]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [\"responseD  |      |         |                         |
|          | escription\": |      |         |                         |
|          | \"Invalid Id  |      |         |                         |
|          | Value or      |      |         |                         |
|          | Car           |      |         |                         |
|          | dId\"]{.mark} |      |         |                         |
|          |               |      |         |                         |
|          | [}]{.mark}    |      |         |                         |
+----------+---------------+------+---------+-------------------------+
| **       | **Field**     | **Ty | **Mand  | **Description**         |
| Response |               | pe** | atory** |                         |
| body     |               |      |         |                         |
| para     |               |      |         |                         |
| meters** |               |      |         |                         |
+----------+---------------+------+---------+-------------------------+
|          | responseCode  | St   | Yes     | **Response Code** -     |
|          |               | ring |         | Indicates the status of |
|          |               |      |         | the response, where 00  |
|          |               |      |         | represents a successful |
|          |               |      |         | transaction.            |
+----------+---------------+------+---------+-------------------------+
|          | responseDesc  | St   | Yes     | **Response              |
|          |               | ring |         | Description** -         |
|          |               |      |         | Descriptive text        |
|          |               |      |         | related to the response |
|          |               |      |         | code, providing details |
|          |               |      |         | on the transaction      |
|          |               |      |         | result (e.g.,           |
|          |               |      |         | \"SUCCESS\").           |
+----------+---------------+------+---------+-------------------------+
|          | **Data**      |      |         |                         |
+----------+---------------+------+---------+-------------------------+
|          | cardId        | Int  | Yes     | **Card Id** -- card id  |
|          |               | eger |         | of the customer         |
+----------+---------------+------+---------+-------------------------+
|          | ExpiryDate    | St   | Yes     | **ExpiryDate-** Expiry  |
|          |               | ring |         | Date of Card            |
+----------+---------------+------+---------+-------------------------+
|          | mas           | St   | Yes     | **Card Number**         |
|          | kedCardNumber | ring |         | --Masked Card Number    |
+----------+---------------+------+---------+-------------------------+
|          | cardName      | St   | Yes     | **Card Name --** Card   |
|          |               | ring |         | name of the Holder      |
+----------+---------------+------+---------+-------------------------+
|          | cardStatus    | St   | Yes     | **Card Status** -- card |
|          |               | ring |         | status e.g. :           |
|          |               |      |         | (Active,Warm,Hot..).    |
+----------+---------------+------+---------+-------------------------+

##  Activate Card

+----------------+-----------+------+--------+-------------------------+
| *              | To        |      |        |                         |
| *Description** | Activate  |      |        |                         |
|                | card and  |      |        |                         |
|                | Generate  |      |        |                         |
|                | pin/      |      |        |                         |
|                | Change    |      |        |                         |
|                | PIN       |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Client**     | Channel   |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Server**     | Open CMS  |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Method**     | POST      |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Method       | act       |      |        |                         |
| Name**         | ivateCard |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **URL**        | {**Se     |      |        |                         |
|                | rvice-Lay |      |        |                         |
|                | er-URL**} |      |        |                         |
|                | /api      |      |        |                         |
|                | /v1/manag |      |        |                         |
|                | ement/act |      |        |                         |
|                | ivateCard |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Headers**    | **X-Au    |      |        |                         |
|                | th-Token: |      |        |                         |
|                | {Token}** |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Request      | {         |      |        |                         |
| body**         |           |      |        |                         |
|                | \"account |      |        |                         |
| **sample**     | Number\": |      |        |                         |
|                | \         |      |        |                         |
|                | "73264\", |      |        |                         |
|                |           |      |        |                         |
|                | \"i       |      |        |                         |
|                | dValue\": |      |        |                         |
|                | \"4200008 |      |        |                         |
|                | 716115\", |      |        |                         |
|                |           |      |        |                         |
|                | \"c       |      |        |                         |
|                | hannel\": |      |        |                         |
|                | \"004\",  |      |        |                         |
|                |           |      |        |                         |
|                | "cardId": |      |        |                         |
|                | 3,        |      |        |                         |
|                |           |      |        |                         |
|                | \"        |      |        |                         |
|                | oldPin\": |      |        |                         |
|                | \"\",     |      |        |                         |
|                |           |      |        |                         |
|                | \"pin\":  |      |        |                         |
|                | \"B       |      |        |                         |
|                | F70E5C3ED |      |        |                         |
|                | 41C5EE\", |      |        |                         |
|                |           |      |        |                         |
|                | "car      |      |        |                         |
|                | dExpiry": |      |        |                         |
|                | "2509"    |      |        |                         |
|                |           |      |        |                         |
|                | \"rrn\":  |      |        |                         |
|                | \"200507  |      |        |                         |
|                | 160418\", |      |        |                         |
|                |           |      |        |                         |
|                | \"nar     |      |        |                         |
|                | ration\": |      |        |                         |
|                | \"        |      |        |                         |
|                | Mobile\", |      |        |                         |
|                |           |      |        |                         |
|                | \"        |      |        |                         |
|                | format\": |      |        |                         |
|                | \"01\",   |      |        |                         |
|                |           |      |        |                         |
|                | \"        |      |        |                         |
|                | transacti |      |        |                         |
|                | onDate\": |      |        |                         |
|                | \         |      |        |                         |
|                | "2025-02- |      |        |                         |
|                | 27T07:15: |      |        |                         |
|                | 50.408Z\" |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Request body | **Field** | **Ty | *      | **Description**         |
| parameters**   |           | pe** | *Manda |                         |
|                |           |      | tory** |                         |
+----------------+-----------+------+--------+-------------------------+
|                | [Channe   | St   | Yes    | **A unique identifier   |
|                | l]{.mark} | ring |        | for the channel (e.g.,  |
|                |           |      |        | \"003\").**\            |
|                |           |      |        | **"003" for IVR**\      |
|                |           |      |        | **"004" for Digital     |
|                |           |      |        | Channel**               |
+----------------+-----------+------+--------+-------------------------+
|                | [IdValu   | St   | Yes    | **Customer\'s           |
|                | e]{.mark} | ring |        | CNIC/Passport/NTN/NICOP |
|                |           |      |        | number.**               |
+----------------+-----------+------+--------+-------------------------+
|                | [CardI    | Int  | Yes    | **Card's reference Id** |
|                | d]{.mark} | eger |        |                         |
+----------------+-----------+------+--------+-------------------------+
|                | [Account  | St   | C      | **Unique account number |
|                | Numbe     | ring |        | associated with the     |
|                | r]{.mark} |      |        | customer\'s account     |
|                |           |      |        | (e.g., \"48758\").**    |
+----------------+-----------+------+--------+-------------------------+
|                | [Forma    | St   | Yes    | **The desired format    |
|                | t]{.mark} | ring |        | for the response (e.g., |
|                |           |      |        | \"01\").**              |
+----------------+-----------+------+--------+-------------------------+
|                | Narration | St   | No     | **A description from    |
|                |           | ring |        | where it initiated**    |
+----------------+-----------+------+--------+-------------------------+
|                | [OldPi    | St   | C      | **For change old pin    |
|                | n]{.mark} | ring |        | must be present         |
|                |           |      |        | Encrypted with public   |
|                |           |      |        | key provided by CMS**   |
+----------------+-----------+------+--------+-------------------------+
|                | [Pi       | St   | Yes    | **Personal              |
|                | n]{.mark} | ring |        | Identification Number   |
|                |           |      |        | (PIN) for customer      |
|                |           |      |        | authentication.         |
|                |           |      |        | Encrypted with public   |
|                |           |      |        | key provided by CMS**   |
+----------------+-----------+------+--------+-------------------------+
|                | [         | St   | No     | **The expiry date of    |
|                | CardExpir | ring |        | the card in the format  |
|                | y]{.mark} |      |        | "YYMM" (Optional for    |
|                |           |      |        | now)**                  |
+----------------+-----------+------+--------+-------------------------+
|                | [Rr       | St   | No     | **Retrieval Reference   |
|                | n]{.mark} | ring |        | Number for the          |
|                |           |      |        | transaction (e.g.,      |
|                |           |      |        | \"123456123451\").**    |
+----------------+-----------+------+--------+-------------------------+
|                | [Trans    | St   | Yes    | **The date and time of  |
|                | actionDat | ring |        | the transaction in ISO  |
|                | e]{.mark} |      |        | 8601 format (e.g.,      |
|                |           |      |        | \"2025-01               |
|                |           |      |        | -21T05:06:14.875Z\").** |
+----------------+-----------+------+--------+-------------------------+
| **Response     | {         |      |        |                         |
| body sample    |           |      |        |                         |
| (Success)**    | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"00\",   |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \"        |      |        |                         |
|                | Processed |      |        |                         |
|                | OK\",     |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Response     | {         |      |        |                         |
| body sample    |           |      |        |                         |
| (Negative)**   |           |      |        |                         |
|                | \"respon  |      |        |                         |
|                | seCode\": |      |        |                         |
|                | \"830\",  |      |        |                         |
|                |           |      |        |                         |
|                |           |      |        |                         |
|                | \"resp    |      |        |                         |
|                | onseDescr |      |        |                         |
|                | iption\": |      |        |                         |
|                | \" UNABLE |      |        |                         |
|                | TO        |      |        |                         |
|                | REGISTER  |      |        |                         |
|                | CUSTOMER  |      |        |                         |
|                | PIN\"     |      |        |                         |
|                |           |      |        |                         |
|                | }         |      |        |                         |
+----------------+-----------+------+--------+-------------------------+
| **Response     | **Field** | **Ty | *      | **Description**         |
| body           |           | pe** | *Manda |                         |
| parameters**   |           |      | tory** |                         |
+----------------+-----------+------+--------+-------------------------+
|                | res       | Int  | Yes    | Response code           |
|                | ponseCode | eger |        | indicating the status   |
|                |           |      |        | of the transaction      |
|                |           |      |        | (e.g., 200 for          |
|                |           |      |        | success).               |
+----------------+-----------+------+--------+-------------------------+
|                | res       | St   | Yes    | A message accompanying  |
|                | ponseDesc | ring |        | the response code,      |
|                |           |      |        | indicating success or   |
|                |           |      |        | failure.                |
+----------------+-----------+------+--------+-------------------------+

##  Get Card Block Rules

  ----------------- ------------------------------------------------------
  **Description**   To get the list of block rules against a card

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   getCardBlockedRules

  **URL**           {**Service-Layer-URL**}/getCardBlockRules

  **Headers**       **X-Auth-Token: {Token}**
  ----------------- ------------------------------------------------------

+---------------+-------------+-----+-------+------------------------+
| **Request     | {           |     |       |                        |
| body**        |             |     |       |                        |
|               | \"cardId\": |     |       |                        |
| **sample**    | 3,          |     |       |                        |
|               |             |     |       |                        |
|               | \"type\":   |     |       |                        |
|               | \"ALL\"     |     |       |                        |
|               |             |     |       |                        |
|               | \"rrn\":    |     |       |                        |
|               | \"21        |     |       |                        |
|               | 212121232\" |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
+---------------+-------------+-----+-------+------------------------+
| **Request     | **Field**   | **  | **M   | **Description**        |
| body          |             | Typ | andat |                        |
| parameters**  |             | e** | ory** |                        |
+---------------+-------------+-----+-------+------------------------+
|               | [car        | I   | Yes   | Card's reference Id    |
|               | dId]{.mark} | nte |       |                        |
|               |             | ger |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | [t          | Str | Yes   | Block Rule Type (e.g.  |
|               | ype]{.mark} | ing |       | "COUNTRYCODE",         |
|               |             |     |       | "MCCODE" and "All" for |
|               |             |     |       | both)                  |
+---------------+-------------+-----+-------+------------------------+
|               | [           | Str | Yes   | **Retrieval Reference  |
|               | rrn]{.mark} | ing |       | Number for the request |
|               |             |     |       | (e.g.,                 |
|               |             |     |       | \"123456123451\").**   |
+---------------+-------------+-----+-------+------------------------+
| **Response    | {           |     |       |                        |
| body sample   |             |     |       |                        |
| (Success)**   | \"resp      |     |       |                        |
|               | onseCode\": |     |       |                        |
|               | \"00\",     |     |       |                        |
|               |             |     |       |                        |
|               | \"          |     |       |                        |
|               | responseDes |     |       |                        |
|               | cription\": |     |       |                        |
|               | \"Processed |     |       |                        |
|               | OK\",       |     |       |                        |
|               |             |     |       |                        |
|               | \"data\": { |     |       |                        |
|               |             |     |       |                        |
|               | \"cardId\": |     |       |                        |
|               | 3,          |     |       |                        |
|               |             |     |       |                        |
|               | \"coun      |     |       |                        |
|               | tryCodes\": |     |       |                        |
|               | \[          |     |       |                        |
|               |             |     |       |                        |
|               | {           |     |       |                        |
|               |             |     |       |                        |
|               | \"cou       |     |       |                        |
|               | ntryName\": |     |       |                        |
|               | \"Aland     |     |       |                        |
|               | Islands\",  |     |       |                        |
|               |             |     |       |                        |
|               | \"countryAl |     |       |                        |
|               | pha3Code\": |     |       |                        |
|               | \"ALA\",    |     |       |                        |
|               |             |     |       |                        |
|               | \"effec     |     |       |                        |
|               | tiveDate\": |     |       |                        |
|               | \           |     |       |                        |
|               | "2025-06-02 |     |       |                        |
|               | T06:41:33.5 |     |       |                        |
|               | 97+00:00\", |     |       |                        |
|               |             |     |       |                        |
|               | \           |     |       |                        |
|               | "endDate\": |     |       |                        |
|               | \           |     |       |                        |
|               | "2025-07-02 |     |       |                        |
|               | T06:41:33.5 |     |       |                        |
|               | 97+00:00\", |     |       |                        |
|               |             |     |       |                        |
|               | \"num       |     |       |                        |
|               | ericCode\": |     |       |                        |
|               | \"248\",    |     |       |                        |
|               |             |     |       |                        |
|               | \"status\": |     |       |                        |
|               | \"ACTIVE\"  |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
|               |             |     |       |                        |
|               | \],         |     |       |                        |
|               |             |     |       |                        |
|               | \"mcc\": \[ |     |       |                        |
|               |             |     |       |                        |
|               | {           |     |       |                        |
|               |             |     |       |                        |
|               | \"code\":   |     |       |                        |
|               | \"0744\",   |     |       |                        |
|               |             |     |       |                        |
|               | \"type\":   |     |       |                        |
|               | \"A         |     |       |                        |
|               | gricultural |     |       |                        |
|               | Services\", |     |       |                        |
|               |             |     |       |                        |
|               | \"effec     |     |       |                        |
|               | tiveDate\": |     |       |                        |
|               | \           |     |       |                        |
|               | "2025-06-17 |     |       |                        |
|               | T00:00:00.0 |     |       |                        |
|               | 00+00:00\", |     |       |                        |
|               |             |     |       |                        |
|               | \           |     |       |                        |
|               | "endDate\": |     |       |                        |
|               | \           |     |       |                        |
|               | "2025-07-02 |     |       |                        |
|               | T06:41:33.5 |     |       |                        |
|               | 97+00:00\", |     |       |                        |
|               |             |     |       |                        |
|               | \"status\": |     |       |                        |
|               | \"ACTIVE\"  |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
|               |             |     |       |                        |
|               | \]          |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
+---------------+-------------+-----+-------+------------------------+
| **Response    | {           |     |       |                        |
| body sample   |             |     |       |                        |
| (Negative)**  | \"resp      |     |       |                        |
|               | onseCode\": |     |       |                        |
|               | \"19\",     |     |       |                        |
|               |             |     |       |                        |
|               | \"          |     |       |                        |
|               | responseDes |     |       |                        |
|               | cription\": |     |       |                        |
|               | \"Record    |     |       |                        |
|               | not         |     |       |                        |
|               | found.\",   |     |       |                        |
|               |             |     |       |                        |
|               | \"data\": { |     |       |                        |
|               |             |     |       |                        |
|               | \"cardId\": |     |       |                        |
|               | 4,          |     |       |                        |
|               |             |     |       |                        |
|               | \"coun      |     |       |                        |
|               | tryCodes\": |     |       |                        |
|               | \[\],       |     |       |                        |
|               |             |     |       |                        |
|               | \"mcc\":    |     |       |                        |
|               | \[\]        |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
|               |             |     |       |                        |
|               | }           |     |       |                        |
+---------------+-------------+-----+-------+------------------------+
| **Response    | **Field**   | **  | **M   | **Description**        |
| body          |             | Typ | andat |                        |
| parameters**  |             | e** | ory** |                        |
+---------------+-------------+-----+-------+------------------------+
|               | r           | I   | Yes   | Response code          |
|               | esponseCode | nte |       | indicating the status  |
|               |             | ger |       | of the transaction     |
|               |             |     |       | (e.g., 200 for         |
|               |             |     |       | success).              |
+---------------+-------------+-----+-------+------------------------+
|               | r           | Str | Yes   | A message accompanying |
|               | esponseDesc | ing |       | the response code,     |
|               |             |     |       | indicating success or  |
|               |             |     |       | failure.               |
+---------------+-------------+-----+-------+------------------------+
|               | **Data**    |     |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | CardId      | I   | Yes   | **Card Id** -- card id |
|               |             | nte |       | of the customer        |
|               |             | ger |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | **Country   |     |       |                        |
|               | Codes --**  |     |       |                        |
|               | Contains    |     |       |                        |
|               | the list of |     |       |                        |
|               | Countries   |     |       |                        |
|               | that are    |     |       |                        |
|               | blocked for |     |       |                        |
|               | the card    |     |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | countryName | Str | Yes   | Name of the Country    |
|               |             | ing |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | countr      | Str | Yes   | Country Alpha 3 Code   |
|               | yAlpha3Code | ing |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | ef          | Str | Yes   | The date and time when |
|               | fectiveDate | ing |       | the rule will be       |
|               |             |     |       | active, in YYYY-MM-DD  |
|               |             |     |       | HH:mm:ss format.       |
+---------------+-------------+-----+-------+------------------------+
|               | endDate     | Str | Yes   | The date and time when |
|               |             | ing |       | the rule will be       |
|               |             |     |       | in-active, in          |
|               |             |     |       | YYYY-MM-DD HH:mm:ss    |
|               |             |     |       | format.                |
+---------------+-------------+-----+-------+------------------------+
|               | numericCode | Str | Yes   | Unique numeric code    |
|               |             | ing |       | for country            |
+---------------+-------------+-----+-------+------------------------+
|               | status      | Str | Yes   | Status of the rule     |
|               |             | ing |       | i.e. "Active" or       |
|               |             |     |       | "INACTIVE"             |
+---------------+-------------+-----+-------+------------------------+
|               | **MC Codes  |     |       |                        |
|               | --**        |     |       |                        |
|               | Contains    |     |       |                        |
|               | the list of |     |       |                        |
|               | Merchant    |     |       |                        |
|               | Categories  |     |       |                        |
|               | that are    |     |       |                        |
|               | blocked for |     |       |                        |
|               | the card    |     |       |                        |
+---------------+-------------+-----+-------+------------------------+
|               | code        | Str | Yes   | Unique code for a      |
|               |             | ing |       | merchant               |
+---------------+-------------+-----+-------+------------------------+
|               | type        | Str | Yes   | Type of Merchant       |
|               |             | ing |       | Category               |
+---------------+-------------+-----+-------+------------------------+
|               | ef          | Str | Yes   | The date and time when |
|               | fectiveDate | ing |       | the rule will be       |
|               |             |     |       | active, in YYYY-MM-DD  |
|               |             |     |       | HH:mm:ss format.       |
+---------------+-------------+-----+-------+------------------------+
|               | endDate     | Str | Yes   | The date and time when |
|               |             | ing |       | the rule will be       |
|               |             |     |       | in-active, in          |
|               |             |     |       | YYYY-MM-DD HH:mm:ss    |
|               |             |     |       | format.                |
+---------------+-------------+-----+-------+------------------------+
|               | status      | Str | Yes   | Status of the rule     |
|               |             | ing |       | i.e. "Active" or       |
|               |             |     |       | "INACTIVE"             |
+---------------+-------------+-----+-------+------------------------+

##  Update Card Block Rules

  ----------------- ------------------------------------------------------
  **Description**   **Update Card Block Rules**

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   updateCardBlockRules

  **URL**           {**Service-Layer-URL**}/updateCardBlockRules

  **Headers**       **X-Auth-Token**
  ----------------- ------------------------------------------------------

+---------------+-------------+------+-------+------------------------+
| **Request     | [{]{.mark}  |      |       |                        |
| body**        |             |      |       |                        |
|               | [           |      |       |                        |
| **sample**    | \"cardId\": |      |       |                        |
|               | 3,]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | []{.ma      |      |       |                        |
|               | rk}\"rrn\": |      |       |                        |
|               | \"21        |      |       |                        |
|               | 212121232\" |      |       |                        |
|               |             |      |       |                        |
|               | [\"coun     |      |       |                        |
|               | tryCodes\": |      |       |                        |
|               | \[]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | [{]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | [\"cou      |      |       |                        |
|               | ntryName\": |      |       |                        |
|               | \"Argentina |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [           |      |       |                        |
|               | \"countryAl |      |       |                        |
|               | pha3Code\": |      |       |                        |
|               | \"ARG       |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"effec    |      |       |                        |
|               | tiveDate\": |      |       |                        |
|               | \"20        |      |       |                        |
|               | 25-06-03T07 |      |       |                        |
|               | :54:21.445Z |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\          |      |       |                        |
|               | "endDate\": |      |       |                        |
|               | \"20        |      |       |                        |
|               | 25-07-03T07 |      |       |                        |
|               | :54:21.445Z |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"num      |      |       |                        |
|               | ericCode\": |      |       |                        |
|               | \"32        |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [           |      |       |                        |
|               | \"status\": |      |       |                        |
|               | \"ACTIV     |      |       |                        |
|               | E\"]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [}]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | [           |      |       |                        |
|               | \],]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"mcc\":   |      |       |                        |
|               | \[]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | [{]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | [\"code\":  |      |       |                        |
|               | \"4111      |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"type\":  |      |       |                        |
|               | \"Tra       |      |       |                        |
|               | nsportation |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"effec    |      |       |                        |
|               | tiveDate\": |      |       |                        |
|               | \"20        |      |       |                        |
|               | 25-06-03T07 |      |       |                        |
|               | :54:21.445Z |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\          |      |       |                        |
|               | "endDate\": |      |       |                        |
|               | \"20        |      |       |                        |
|               | 25-07-03T07 |      |       |                        |
|               | :54:21.445Z |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [           |      |       |                        |
|               | \"status\": |      |       |                        |
|               | \"ACTIV     |      |       |                        |
|               | E\"]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [}]{.mark}  |      |       |                        |
|               |             |      |       |                        |
|               | [\]]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [}]{.mark}  |      |       |                        |
+---------------+-------------+------+-------+------------------------+
| **Request     | **Field**   | **Ty | **M   | **Description**        |
| body          |             | pe** | andat |                        |
| parameters**  |             |      | ory** |                        |
+---------------+-------------+------+-------+------------------------+
|               | [car        | St   | Yes   | **Card ID** - Unique   |
|               | dId]{.mark} | ring |       | identifier for the     |
|               |             |      |       | Card.                  |
+---------------+-------------+------+-------+------------------------+
|               | [           | St   | Yes   | **Retrieval Reference  |
|               | rrn]{.mark} | ring |       | Number for the request |
|               |             |      |       | (e.g.,                 |
|               |             |      |       | \"123456123451\").**   |
+---------------+-------------+------+-------+------------------------+
|               | **Country   |      |       |                        |
|               | Codes --**  |      |       |                        |
|               | Contains    |      |       |                        |
|               | the list of |      |       |                        |
|               | Countries   |      |       |                        |
|               | that are    |      |       |                        |
|               | blocked for |      |       |                        |
|               | the card    |      |       |                        |
+---------------+-------------+------+-------+------------------------+
|               | countryName | St   | Yes   | Name of the Country    |
|               |             | ring |       |                        |
+---------------+-------------+------+-------+------------------------+
|               | countr      | St   | Yes   | Country Alpha 3 Code   |
|               | yAlpha3Code | ring |       |                        |
+---------------+-------------+------+-------+------------------------+
|               | ef          | St   | Yes   | The date and time when |
|               | fectiveDate | ring |       | the rule will be       |
|               |             |      |       | active, in YYYY-MM-DD  |
|               |             |      |       | HH:mm:ss format.       |
+---------------+-------------+------+-------+------------------------+
|               | endDate     | St   | No    | The date and time when |
|               |             | ring |       | the rule will be       |
|               |             |      |       | in-active, in          |
|               |             |      |       | YYYY-MM-DD HH:mm:ss    |
|               |             |      |       | format.                |
+---------------+-------------+------+-------+------------------------+
|               | numericCode | St   | Yes   | Unique numeric code    |
|               |             | ring |       | for country            |
+---------------+-------------+------+-------+------------------------+
|               | status      | St   | Yes   | Status of the rule     |
|               |             | ring |       | i.e. "Active" or       |
|               |             |      |       | "INACTIVE"             |
+---------------+-------------+------+-------+------------------------+
|               | **MC Codes  |      |       |                        |
|               | --**        |      |       |                        |
|               | Contains    |      |       |                        |
|               | the list of |      |       |                        |
|               | Merchant    |      |       |                        |
|               | Categories  |      |       |                        |
|               | that are    |      |       |                        |
|               | blocked for |      |       |                        |
|               | the card    |      |       |                        |
+---------------+-------------+------+-------+------------------------+
|               | code        | St   | Yes   | Unique code for a      |
|               |             | ring |       | merchant               |
+---------------+-------------+------+-------+------------------------+
|               | type        | St   | Yes   | Type of Merchant       |
|               |             | ring |       | Category               |
+---------------+-------------+------+-------+------------------------+
|               | ef          | St   | Yes   | The date and time when |
|               | fectiveDate | ring |       | the rule will be       |
|               |             |      |       | active, in YYYY-MM-DD  |
|               |             |      |       | HH:mm:ss format.       |
+---------------+-------------+------+-------+------------------------+
|               | endDate     | St   | Yes   | The date and time when |
|               |             | ring |       | the rule will be       |
|               |             |      |       | in-active, in          |
|               |             |      |       | YYYY-MM-DD HH:mm:ss    |
|               |             |      |       | format.                |
+---------------+-------------+------+-------+------------------------+
|               | status      | St   | Yes   | Status of the rule     |
|               |             | ring |       | i.e. "Active" or       |
|               |             |      |       | "INACTIVE"             |
+---------------+-------------+------+-------+------------------------+
| **Response    | {           |      |       |                        |
| body sample   |             |      |       |                        |
| (Success)**   | \"resp      |      |       |                        |
|               | onseCode\": |      |       |                        |
|               | \"00\",     |      |       |                        |
|               |             |      |       |                        |
|               | \"          |      |       |                        |
|               | responseDes |      |       |                        |
|               | cription\": |      |       |                        |
|               | \"Block     |      |       |                        |
|               | Rules       |      |       |                        |
|               | Ad          |      |       |                        |
|               | ded/Updated |      |       |                        |
|               | Succ        |      |       |                        |
|               | essfully!\" |      |       |                        |
|               |             |      |       |                        |
|               | }           |      |       |                        |
+---------------+-------------+------+-------+------------------------+
| **Response    | {           |      |       |                        |
| body sample   |             |      |       |                        |
| (Negative)**  | \"resp      |      |       |                        |
|               | onseCode\": |      |       |                        |
|               | \"99\",     |      |       |                        |
|               |             |      |       |                        |
|               | \"          |      |       |                        |
|               | responseDes |      |       |                        |
|               | cription\": |      |       |                        |
|               | \"Country   |      |       |                        |
|               | Code Not    |      |       |                        |
|               | Found\"     |      |       |                        |
|               |             |      |       |                        |
|               | }           |      |       |                        |
+---------------+-------------+------+-------+------------------------+
| **Response    | **Field**   | **Ty | **M   | **Description**        |
| body          |             | pe** | andat |                        |
| parameters**  |             |      | ory** |                        |
+---------------+-------------+------+-------+------------------------+
|               | r           | Int  | Yes   | Response code          |
|               | esponseCode | eger |       | indicating the status  |
|               |             |      |       | of the transaction     |
|               |             |      |       | (e.g., 200 for         |
|               |             |      |       | success).              |
+---------------+-------------+------+-------+------------------------+
|               | r           | St   | Yes   | A message accompanying |
|               | esponseDesc | ring |       | the response code,     |
|               |             |      |       | indicating success or  |
|               |             |      |       | failure.               |
+---------------+-------------+------+-------+------------------------+

##  ~~Get Card International Status (Deprecated)~~

*Note: Will be removed after 1^st^ November 2025*

  ----------------- ------------------------------------------------------
  **Description**   To get the status of international transactions
                    enabled or disabled for a card

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   getCardInternationalStatus

  **URL**           {**Service-Layer-URL**}/ getCardInternationalStatus

  **Headers**       **X-Auth-Token: {Token}**
  ----------------- ------------------------------------------------------

+---------------+-------------+------+--------+----------------------+
| **Request     | {           |      |        |                      |
| body**        |             |      |        |                      |
|               | \"cardId\": |      |        |                      |
| **sample**    | 3,          |      |        |                      |
|               |             |      |        |                      |
|               | \"attri     |      |        |                      |
|               | buteType\": |      |        |                      |
|               | \"INTE      |      |        |                      |
|               | RNATIONAL\" |      |        |                      |
|               |             |      |        |                      |
|               | \"rrn\":    |      |        |                      |
|               | \"21        |      |        |                      |
|               | 212121232\" |      |        |                      |
|               |             |      |        |                      |
|               | }           |      |        |                      |
+---------------+-------------+------+--------+----------------------+
| **Request     | **Field**   | **Ty | *      | **Description**      |
| body          |             | pe** | *Manda |                      |
| parameters**  |             |      | tory** |                      |
+---------------+-------------+------+--------+----------------------+
|               | [car        | Int  | Yes    | **Card's reference   |
|               | dId]{.mark} | eger |        | Id**                 |
+---------------+-------------+------+--------+----------------------+
|               | at          | St   | Yes    | **Attribute type of  |
|               | tributeType | ring |        | the card e.g.        |
|               |             |      |        | "INTERNATIONAL"**    |
+---------------+-------------+------+--------+----------------------+
|               | rrn         | St   | Yes    | **Retrieval          |
|               |             | ring |        | Reference Number for |
|               |             |      |        | the request (e.g.,   |
|               |             |      |        | \"123456123451\").** |
+---------------+-------------+------+--------+----------------------+
| **Response    | {           |      |        |                      |
| body sample   |             |      |        |                      |
| (Success)**   | \"resp      |      |        |                      |
|               | onseCode\": |      |        |                      |
|               | \"00\",     |      |        |                      |
|               |             |      |        |                      |
|               | \"          |      |        |                      |
|               | responseDes |      |        |                      |
|               | cription\": |      |        |                      |
|               | \"Processed |      |        |                      |
|               | OK\",       |      |        |                      |
|               |             |      |        |                      |
|               | \"data\": { |      |        |                      |
|               |             |      |        |                      |
|               | \"cardId\": |      |        |                      |
|               | 3,          |      |        |                      |
|               |             |      |        |                      |
|               | \"          |      |        |                      |
|               | isEnable\": |      |        |                      |
|               | true        |      |        |                      |
|               |             |      |        |                      |
|               | }           |      |        |                      |
|               |             |      |        |                      |
|               | }           |      |        |                      |
+---------------+-------------+------+--------+----------------------+
| **Response    | [{]{.mark}  |      |        |                      |
| body sample   |             |      |        |                      |
| (Negative)**  | [\"resp     |      |        |                      |
|               | onseCode\": |      |        |                      |
|               | \"48        |      |        |                      |
|               | \",]{.mark} |      |        |                      |
|               |             |      |        |                      |
|               | [\"         |      |        |                      |
|               | responseDes |      |        |                      |
|               | cription\": |      |        |                      |
|               | \"Card not  |      |        |                      |
|               | found       |      |        |                      |
|               | against     |      |        |                      |
|               | entered     |      |        |                      |
|               | customer    |      |        |                      |
|               | Identifier  |      |        |                      |
|               | /A          |      |        |                      |
|               | ccountNumbe |      |        |                      |
|               | r\"]{.mark} |      |        |                      |
|               |             |      |        |                      |
|               | [}]{.mark}  |      |        |                      |
+---------------+-------------+------+--------+----------------------+
| **Response    | **Field**   | **Ty | *      | **Description**      |
| body          |             | pe** | *Manda |                      |
| parameters**  |             |      | tory** |                      |
+---------------+-------------+------+--------+----------------------+
|               | r           | Int  | Yes    | Response code        |
|               | esponseCode | eger |        | indicating the       |
|               |             |      |        | status of the        |
|               |             |      |        | transaction (e.g.,   |
|               |             |      |        | 200 for success).    |
+---------------+-------------+------+--------+----------------------+
|               | r           | St   | Yes    | A message            |
|               | esponseDesc | ring |        | accompanying the     |
|               |             |      |        | response code,       |
|               |             |      |        | indicating success   |
|               |             |      |        | or failure.          |
+---------------+-------------+------+--------+----------------------+
|               | **Data**    |      |        |                      |
+---------------+-------------+------+--------+----------------------+
|               | CardId      | Int  | Yes    | **Card Id** -- card  |
|               |             | eger |        | id of the customer   |
+---------------+-------------+------+--------+----------------------+
|               | isEnable    | Boo  | Yes    | Card current         |
|               |             | lean |        | international status |
+---------------+-------------+------+--------+----------------------+

##  ~~Update Card International Status (Deprecated)~~

*Note: Will be removed after 1^st^ November 2025*

  ----------------- -------------------------------------------------------
  **Description**   **Update Card International Status**

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   updateCardInternationalStatus

  **URL**           {**Service-Layer-URL**}/updateCardInternationalStatus

  **Headers**       **X-Auth-Token**
  ----------------- -------------------------------------------------------

+---------------+------------+-------+-------+------------------------+
| **Request     | [{]{.mark} |       |       |                        |
| body**        |            |       |       |                        |
|               | [\         |       |       |                        |
| **sample**    | "cardId\": |       |       |                        |
|               | \"3\       |       |       |                        |
|               | ",]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | [\"        |       |       |                        |
|               | cardAttrib |       |       |                        |
|               | uteType\": |       |       |                        |
|               | \"INTE     |       |       |                        |
|               | RNATIONAL\ |       |       |                        |
|               | ",]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | [\"i       |       |       |                        |
|               | sEnable\": |       |       |                        |
|               | tru        |       |       |                        |
|               | e,]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | [\"f       |       |       |                        |
|               | romDate\": |       |       |                        |
|               | \"2025-    |       |       |                        |
|               | 06-03T07:5 |       |       |                        |
|               | 7:48.691Z\ |       |       |                        |
|               | ",]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | [\         |       |       |                        |
|               | "toDate\": |       |       |                        |
|               | \"2025     |       |       |                        |
|               | -07-03T07: |       |       |                        |
|               | 57:48.691Z |       |       |                        |
|               | \"]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | \"rrn\":   |       |       |                        |
|               | \"212      |       |       |                        |
|               | 12121232\" |       |       |                        |
|               |            |       |       |                        |
|               | [}]{.mark} |       |       |                        |
+---------------+------------+-------+-------+------------------------+
| **Request     | **Field**  | **T   | **M   | **Description**        |
| body          |            | ype** | andat |                        |
| parameters**  |            |       | ory** |                        |
+---------------+------------+-------+-------+------------------------+
|               | [card      | S     | Yes   | **Card ID -** Unique   |
|               | Id]{.mark} | tring |       | identifier for the     |
|               |            |       |       | Card.                  |
+---------------+------------+-------+-------+------------------------+
|               | cardAtt    | S     | Yes   | Attribute type of the  |
|               | ributeType | tring |       | card e.g.              |
|               |            |       |       | **"INTERNATIONAL"**    |
+---------------+------------+-------+-------+------------------------+
|               | isEnable   | Bo    | Yes   | Card current           |
|               |            | olean |       | international status   |
+---------------+------------+-------+-------+------------------------+
|               | [fromDa    | S     | Yes   | The date and time when |
|               | te]{.mark} | tring |       | the status will be     |
|               |            |       |       | active, in YYYY-MM-DD  |
|               |            |       |       | HH:mm:ss format.       |
+---------------+------------+-------+-------+------------------------+
|               | [toDa      | S     | Yes   | The date and time when |
|               | te]{.mark} | tring |       | the status will be     |
|               |            |       |       | in-active, in          |
|               |            |       |       | YYYY-MM-DD HH:mm:ss    |
|               |            |       |       | format.                |
+---------------+------------+-------+-------+------------------------+
|               | [r         | S     | Yes   | **Retrieval Reference  |
|               | rn]{.mark} | tring |       | Number for the request |
|               |            |       |       | (e.g.,                 |
|               |            |       |       | \"123456123451\").**   |
+---------------+------------+-------+-------+------------------------+
| **Response    | {          |       |       |                        |
| body sample   |            |       |       |                        |
| (Success)**   | \"respo    |       |       |                        |
|               | nseCode\": |       |       |                        |
|               | \"00\",    |       |       |                        |
|               |            |       |       |                        |
|               | \"re       |       |       |                        |
|               | sponseDesc |       |       |                        |
|               | ription\": |       |       |                        |
|               | \"Int      |       |       |                        |
|               | ernational |       |       |                        |
|               | status     |       |       |                        |
|               | updated    |       |       |                        |
|               | succe      |       |       |                        |
|               | ssfully!\" |       |       |                        |
|               |            |       |       |                        |
|               | }          |       |       |                        |
+---------------+------------+-------+-------+------------------------+
| **Response    | [{]{.mark} |       |       |                        |
| body sample   |            |       |       |                        |
| (Negative)**  | [\"respo   |       |       |                        |
|               | nseCode\": |       |       |                        |
|               | \"48\      |       |       |                        |
|               | ",]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | [\"re      |       |       |                        |
|               | sponseDesc |       |       |                        |
|               | ription\": |       |       |                        |
|               | \"Card not |       |       |                        |
|               | found      |       |       |                        |
|               | against    |       |       |                        |
|               | entered    |       |       |                        |
|               | customer   |       |       |                        |
|               | Identifier |       |       |                        |
|               | /Acc       |       |       |                        |
|               | ountNumber |       |       |                        |
|               | \"]{.mark} |       |       |                        |
|               |            |       |       |                        |
|               | [}]{.mark} |       |       |                        |
+---------------+------------+-------+-------+------------------------+
| **Response    | **Field**  | **T   | **M   | **Description**        |
| body          |            | ype** | andat |                        |
| parameters**  |            |       | ory** |                        |
+---------------+------------+-------+-------+------------------------+
|               | re         | In    | Yes   | Response code          |
|               | sponseCode | teger |       | indicating the status  |
|               |            |       |       | of the transaction     |
|               |            |       |       | (e.g., 200 for         |
|               |            |       |       | success).              |
+---------------+------------+-------+-------+------------------------+
|               | re         | S     | Yes   | A message accompanying |
|               | sponseDesc | tring |       | the response code,     |
|               |            |       |       | indicating success or  |
|               |            |       |       | failure.               |
+---------------+------------+-------+-------+------------------------+

##  Customer Channel Preferences

  ----------------- -----------------------------------------------------------
  **Description**   **Customer level channel preferences**

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   channelList

  **URL**           {**Service-Layer-URL**}/api/v1/cardApi/channelPreferences

  **Headers**       **X-Auth-Token**
  ----------------- -----------------------------------------------------------

+---------------+-------------+------+-------+------------------------+
| **Request     | [{]{.mark}  |      |       |                        |
| body**        |             |      |       |                        |
|               | [\"         |      |       |                        |
| **sample**    | identificat |      |       |                        |
|               | ionValue\": |      |       |                        |
|               | \"41        |      |       |                        |
|               | 30212321111 |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [           |      |       |                        |
|               | \"cardId\": |      |       |                        |
|               | \"01        |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"rrn\":   |      |       |                        |
|               | \           |      |       |                        |
|               | "1212341241 |      |       |                        |
|               | 2\"]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [}]{.mark}  |      |       |                        |
+---------------+-------------+------+-------+------------------------+
| **Request     | **Field**   | **Ty | **M   | **Description**        |
| body          |             | pe** | andat |                        |
| parameters**  |             |      | ory** |                        |
+---------------+-------------+------+-------+------------------------+
|               | [ident      | St   | Yes   | A unique customer      |
|               | ificationVa | ring |       | identification value   |
|               | lue]{.mark} |      |       | e.g (CNIC)             |
+---------------+-------------+------+-------+------------------------+
|               | [car        | St   | Yes   | Card Unique Identifier |
|               | dId]{.mark} | ring |       |                        |
+---------------+-------------+------+-------+------------------------+
|               | [           | St   | No    | **Retrieval Reference  |
|               | rrn]{.mark} | ring |       | Number for the request |
|               |             |      |       | (e.g.,                 |
|               |             |      |       | \"123456123451\").**   |
+---------------+-------------+------+-------+------------------------+
| **Response    | {\          |      |       |                        |
| body sample   | \"resp      |      |       |                        |
| (Success)**   | onseCode\": |      |       |                        |
|               | \           |      |       |                        |
|               | "string\",\ |      |       |                        |
|               | \"          |      |       |                        |
|               | responseDes |      |       |                        |
|               | cription\": |      |       |                        |
|               | \           |      |       |                        |
|               | "string\",\ |      |       |                        |
|               | \"data\":   |      |       |                        |
|               | {\          |      |       |                        |
|               | \"          |      |       |                        |
|               | channels\": |      |       |                        |
|               | {\          |      |       |                        |
|               | \"ATM\": {\ |      |       |                        |
|               | \"          |      |       |                        |
|               | domestic\": |      |       |                        |
|               | true,\      |      |       |                        |
|               | \"inter     |      |       |                        |
|               | national\": |      |       |                        |
|               | true\       |      |       |                        |
|               | },\         |      |       |                        |
|               | \"POS\": {\ |      |       |                        |
|               | \"          |      |       |                        |
|               | domestic\": |      |       |                        |
|               | true,\      |      |       |                        |
|               | \"inter     |      |       |                        |
|               | national\": |      |       |                        |
|               | true\       |      |       |                        |
|               | },\         |      |       |                        |
|               | \"          |      |       |                        |
|               | Online\":   |      |       |                        |
|               | {\          |      |       |                        |
|               | \"          |      |       |                        |
|               | domestic\": |      |       |                        |
|               | true,\      |      |       |                        |
|               | \"inter     |      |       |                        |
|               | national\": |      |       |                        |
|               | true\       |      |       |                        |
|               | }\          |      |       |                        |
|               | }\          |      |       |                        |
|               | }\          |      |       |                        |
|               | }           |      |       |                        |
+---------------+-------------+------+-------+------------------------+
| **Response    | [{]{.mark}  |      |       |                        |
| body sample   |             |      |       |                        |
| (Negative)**  | [\"resp     |      |       |                        |
|               | onseCode\": |      |       |                        |
|               | \"99        |      |       |                        |
|               | \",]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [\"         |      |       |                        |
|               | responseDes |      |       |                        |
|               | cription\": |      |       |                        |
|               | \"No active |      |       |                        |
|               | channels    |      |       |                        |
|               | foun        |      |       |                        |
|               | d\"]{.mark} |      |       |                        |
|               |             |      |       |                        |
|               | [}]{.mark}  |      |       |                        |
+---------------+-------------+------+-------+------------------------+
| **Response    | **Field**   | **Ty | **M   | **Description**        |
| body          |             | pe** | andat |                        |
| parameters**  |             |      | ory** |                        |
+---------------+-------------+------+-------+------------------------+
|               | r           | Int  | Yes   | Response code          |
|               | esponseCode | eger |       | indicating the status  |
|               |             |      |       | of the transaction     |
|               |             |      |       | (e.g., 200 for         |
|               |             |      |       | success).              |
+---------------+-------------+------+-------+------------------------+
|               | r           | St   | Yes   | A message accompanying |
|               | esponseDesc | ring |       | the response code,     |
|               |             |      |       | indicating success or  |
|               |             |      |       | failure.               |
+---------------+-------------+------+-------+------------------------+

##  Update Customer Channel Preferences

  ----------------- ----------------------------------------------------------------
  **Description**   **Update Card International Status**

  **Client**        Channel

  **Server**        Open CMS

  **Method**        POST

  **Method Name**   updateChannel

  **URL**           {**Service-Layer-URL**}/api/v1/cardApi/updateChannelPreference

  **Headers**       **X-Auth-Token**
  ----------------- ----------------------------------------------------------------

+---------------+-------------+------+----------+----------------------+
| **Request     | [{]{.mark}\ |      |          |                      |
| body**        | [           |      |          |                      |
|               | \"cardId\": |      |          |                      |
| **sample**    | \"string\   |      |          |                      |
|               | ",]{.mark}\ |      |          |                      |
|               | [\"         |      |          |                      |
|               | identificat |      |          |                      |
|               | ionValue\": |      |          |                      |
|               | \"string    |      |          |                      |
|               | \",]{.mark} |      |          |                      |
|               |             |      |          |                      |
|               | [\"rrn\":   |      |          |                      |
|               | \"1         |      |          |                      |
|               | 2123412412\ |      |          |                      |
|               | ",]{.mark}\ |      |          |                      |
|               | [\"pre      |      |          |                      |
|               | ferences\": |      |          |                      |
|               | {]{.mark}\  |      |          |                      |
|               | [\"ATM\":   |      |          |                      |
|               | {]{.mark}\  |      |          |                      |
|               | [\"inter    |      |          |                      |
|               | national\": |      |          |                      |
|               | tru         |      |          |                      |
|               | e,]{.mark}\ |      |          |                      |
|               | [\"         |      |          |                      |
|               | domestic\": |      |          |                      |
|               | tr          |      |          |                      |
|               | ue]{.mark}\ |      |          |                      |
|               | [           |      |          |                      |
|               | },]{.mark}\ |      |          |                      |
|               | [\"POS\":   |      |          |                      |
|               | {]{.mark}\  |      |          |                      |
|               | [\"inter    |      |          |                      |
|               | national\": |      |          |                      |
|               | tru         |      |          |                      |
|               | e,]{.mark}\ |      |          |                      |
|               | [\"         |      |          |                      |
|               | domestic\": |      |          |                      |
|               | tr          |      |          |                      |
|               | ue]{.mark}\ |      |          |                      |
|               | [           |      |          |                      |
|               | },]{.mark}\ |      |          |                      |
|               | [           |      |          |                      |
|               | \"Online\": |      |          |                      |
|               | {]{.mark}\  |      |          |                      |
|               | [\"inter    |      |          |                      |
|               | national\": |      |          |                      |
|               | tru         |      |          |                      |
|               | e,]{.mark}\ |      |          |                      |
|               | [\"         |      |          |                      |
|               | domestic\": |      |          |                      |
|               | tr          |      |          |                      |
|               | ue]{.mark}\ |      |          |                      |
|               | [}]{.mark}\ |      |          |                      |
|               | [}]{.mark}\ |      |          |                      |
|               | [}]{.mark}  |      |          |                      |
+---------------+-------------+------+----------+----------------------+
| **Request     | **Field**   | **Ty | **Man    | **Description**      |
| body          |             | pe** | datory** |                      |
| parameters**  |             |      |          |                      |
+---------------+-------------+------+----------+----------------------+
|               | [car        | St   | Yes      | **Card ID -** Unique |
|               | dId]{.mark} | ring |          | identifier for the   |
|               |             |      |          | Card.                |
+---------------+-------------+------+----------+----------------------+
|               | [ident      | St   | Yes      | A unique customer    |
|               | ificationVa | ring |          | identification value |
|               | lue]{.mark} |      |          | e.g. (CNIC)          |
+---------------+-------------+------+----------+----------------------+
|               | [           | St   | No       | **Retrieval          |
|               | rrn]{.mark} | ring |          | Reference Number for |
|               |             |      |          | the request (e.g.,   |
|               |             |      |          | \"123456123451\").** |
+---------------+-------------+------+----------+----------------------+
|               | [pr         |      |          |                      |
|               | eferences-- |      |          |                      |
|               | List of     |      |          |                      |
|               | customer    |      |          |                      |
|               | preferen    |      |          |                      |
|               | ces]{.mark} |      |          |                      |
+---------------+-------------+------+----------+----------------------+
|               | channelName | St   | Yes      | Transaction Type as  |
|               |             | ring |          | a channelName that   |
|               |             |      |          | is currently enabled |
|               |             |      |          | on your product.     |
+---------------+-------------+------+----------+----------------------+
|               | in          | Boo  | Yes      | Status of            |
|               | ternational | lean |          | international        |
|               |             |      |          | channels             |
+---------------+-------------+------+----------+----------------------+
|               | domestic    | Boo  | Yes      | Status of domestic   |
|               |             | lean |          | channels             |
+---------------+-------------+------+----------+----------------------+
| **Response    | {           |      |          |                      |
| body sample   |             |      |          |                      |
| (Success)**   | \"resp      |      |          |                      |
|               | onseCode\": |      |          |                      |
|               | \"00\",     |      |          |                      |
|               |             |      |          |                      |
|               | \"          |      |          |                      |
|               | responseDes |      |          |                      |
|               | cription\": |      |          |                      |
|               | \"Processed |      |          |                      |
|               | ok\"        |      |          |                      |
|               |             |      |          |                      |
|               | }           |      |          |                      |
+---------------+-------------+------+----------+----------------------+
| **Response    | [{]{.mark}  |      |          |                      |
| body sample   |             |      |          |                      |
| (Negative)**  | [\"resp     |      |          |                      |
|               | onseCode\": |      |          |                      |
|               | \"99        |      |          |                      |
|               | \",]{.mark} |      |          |                      |
|               |             |      |          |                      |
|               | [\"         |      |          |                      |
|               | responseDes |      |          |                      |
|               | cription\": |      |          |                      |
|               | \"Unable to |      |          |                      |
|               | process     |      |          |                      |
|               | reques      |      |          |                      |
|               | t\"]{.mark} |      |          |                      |
|               |             |      |          |                      |
|               | [}]{.mark}  |      |          |                      |
+---------------+-------------+------+----------+----------------------+
| **Response    | **Field**   | **Ty | **Man    | **Description**      |
| body          |             | pe** | datory** |                      |
| parameters**  |             |      |          |                      |
+---------------+-------------+------+----------+----------------------+
|               | r           | Int  | Yes      | Response code        |
|               | esponseCode | eger |          | indicating the       |
|               |             |      |          | status of the        |
|               |             |      |          | transaction (e.g.,   |
|               |             |      |          | 200 for success).    |
+---------------+-------------+------+----------+----------------------+
|               | r           | St   | Yes      | A message            |
|               | esponseDesc | ring |          | accompanying the     |
|               |             |      |          | response code,       |
|               |             |      |          | indicating success   |
|               |             |      |          | or failure.          |
+---------------+-------------+------+----------+----------------------+

##  Channel Code

Below list are for transaction code

  -----------------------------------------------------------------------
  Channel Name                  
  ----------------------------- -----------------------------------------
  ATM-OnUs                      

  ATM-OffUs-Local               

  ATM-OffUs-International       

  ONLINE-OnUs                   

  ONLINE-OffUs-Local            

  ONLINE-OffUs-International    

  POS-OnUs                      

  POS-OffUs-International       

  POS-OffUs-Local               

  ATM-Contactless               

  POS-Contactless               

  All Channel                   
  -----------------------------------------------------------------------

##  Transaction Setup

Customer Type are listed below

  -----------------------------------------------------------------------
  Customer Type                 Description
  ----------------------------- -----------------------------------------
  1001                          Balance Inquiry

  1002                          Cash Withdrawal

  1003                          Online Purchase

  1004                          POS Purchase
  -----------------------------------------------------------------------

##  Response codes

Response codes are listed below

  -----------------------------------------------------------------------
  Customer Type                 Description
  ----------------------------- -----------------------------------------
  00                            SUCCESS

  01                            Invalid params or value provided provided

  99                            Unable to process at this time. Please,
                                try again later

  309                           Duplicate transaction.

  34                            UNABLE TO GET CARD

  48                            Card not found against entered [customer
                                Identifier]{.mark}/accountNumber

  36                            UNABLE TO UPDATE CARD LIMITS

  35                            UNABLE TO GET CARD LIMITS

  830                           UNABLE TO REGISTER CUSTOMER PIN

  323                           Unable to get list of products

  327                           Channel Transaction Matrix Is Invalid

  409                           Duplicate Request
  -----------------------------------------------------------------------

##  Card Request Status

  -----------------------------------------------------------------------
  Code                          Status
  ----------------------------- -----------------------------------------
  00                            DELIVERED

  01                            PENDING

  02                            IN_PROCESS

  03                            REJECTED
  -----------------------------------------------------------------------

##  Card Status

![Picture](./image1.png){width="3.4583333333333335in"
height="1.4583333333333333in"}
