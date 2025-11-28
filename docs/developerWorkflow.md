# 🧭 Developer Workflow

This guide explains how a developer can integrate with the OpenCMS API, from obtaining authentication to performing operational requests such as card activation, inquiry, limits, status updates, and channel preference updates.

---

## 1️⃣ Authentication

All requests require a valid JWT token issued by the `/api/v1/authenticate` endpoint.  
Use the returned `X-Auth-Token` in the header for subsequent API calls.

### Request
```bash
POST /api/v1/authenticate
Content-Type: application/json

{
  "username": "partner_user",
  "password": "s3cr3t#Key"
}
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiry": "1737620181064"
}
X-Auth-Token: eyJhbGciOiJI...

2️⃣ Card Lifecycle (Create → Activate)
A. Create Card

Use /api/v1/Card/create to issue a physical or virtual card.
POST /api/v1/Card/create
X-Auth-Token: <token>
Content-Type: application/json
{
  "idValue": "4220142163583",
  "idType": "CNIC",
  "productCode": "DEBIT001",
  "embossName": "MEGAN ROSS",
  "virtual": true,
  "idempotencyKey": "f0d32e10-91d7-4029-8ad3-1a70b8c93d7a",
  "rrn": "21212121232"
}

B. Activate Card / Generate PIN

Once the card record exists, use /activateCard.
POST /activateCard
X-Auth-Token: <token>
{
  "idType": "CNIC",
  "idValue": "4220142163583",
  "format": "01",
  "pin": "BASE64ENC_PIN",
  "rrn": "21212121232",
  "transactionDate": "2025-01-21T05:06:14.875Z"
}

3️⃣ Card Inquiry

Retrieve a list of all cards linked to a customer.
GET /getCardsByCustomer/4220142163583/21212121232
X-Auth-Token: <token>

Response
{
  "responseCode": "00",
  "responseDescription": "OK",
  "data": {
    "cardList": [
      {
        "cardId": 202,
        "cardNumber": "22058*****000269",
        "cardStatus": "Fresh",
        "productName": "PayPak Pink Cards"
      }
    ]
  }
}


4️⃣ Card Limits

Set or update card limits using /setCustomerCardLimits.
POST /setCustomerCardLimits
X-Auth-Token: <token>
{
  "idType": "CNIC",
  "idValue": "4220142163583",
  "dailyLimit": 50000,
  "perTxnLimit": 20000,
  "channel": "ECOM",
  "rrn": "21212121232"
}

5️⃣ Block Rules
Get Rules
POST /getCardBlockRules
X-Auth-Token: <token>
{
  "cardId": 3,
  "type": "ALL",
  "rrn": "21212121232"
}

Update Rules
POST /updateCardBlockRules
X-Auth-Token: <token>
{
  "cardId": 3,
  "countryCodes": [{ "countryAlpha3Code": "ARG", "status": "ACTIVE" }],
  "mcc": [{ "code": "4111", "status": "ACTIVE" }],
  "rrn": "21212121232"
}

6️⃣ Channel Preferences
Get Preferences
GET /getCustomerChannelPreferences/4220142163583/21212121232
X-Auth-Token: <token>

Update Preferences
POST /updateCustomerChannelPreferences
X-Auth-Token: <token>
{
  "idType": "CNIC",
  "idValue": "4220142163583",
  "preferences": [
    { "channelCode": "ECOM", "enabled": true }
  ],
  "rrn": "21212121232"
}

7️⃣ Card Status

Block or re-activate a card using /setCardStatus.
POST /setCardStatus
X-Auth-Token: <token>
{
  "cardId": 12345,
  "status": "BLOCKED",
  "reason": "Customer request",
  "rrn": "21212121232"
}

8️⃣ Error Handling

All APIs return the following failure structure:
{
  "responseCode": "99",
  "responseDescription": "Invalid parameter or card not found"
}

Refer to the Response Codes section for full mappings.

🔁 Workflow Summary

| Step | Description          | Example                                  |
| ---- | -------------------- | ---------------------------------------- |
| 1    | Obtain token         | `/api/v1/authenticate`                   |
| 2    | Create/activate card | `/api/v1/Card/create`, `/activateCard`   |
| 3    | Fetch details        | `/getCardsByCustomer`, `/getCardDetails` |
| 4    | Configure limits     | `/setCustomerCardLimits`                 |
| 5    | Apply restrictions   | `/updateCardBlockRules`                  |
| 6    | Manage preferences   | `/updateCustomerChannelPreferences`      |
| 7    | Manage status        | `/setCardStatus`                         |
| 8    | Handle errors        | `responseCode + responseDescription`     |
