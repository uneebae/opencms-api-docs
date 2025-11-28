# 🧱 Structure: How to Organize Your Content in API Reference

This section helps developers and integrators navigate the OpenCMS API documentation effectively.  
All endpoints, categories, and descriptions follow a standardized format to ensure consistency and clarity across modules.

---

# 📘 API Documentation Structure

Each API definition follows a standardized format, ensuring all modules (Card Lifecycle, Inquiry, Limits & Preferences, etc.) remain consistent.

| Section | Description | Example |
|--------|-------------|---------|
| **Overview** | Explains what the API does and its business purpose. | “Activates a newly issued card.” |
| **Request Schema** | Defines the mandatory and optional request parameters. | cardId, rrn, productCode |
| **Response Schema** | Specifies the expected response format. | responseCode, responseDescription |
| **Authentication** | Indicates security and authorization requirements. | Bearer Token (JWT) |
| **Error Codes** | Lists possible errors and their meanings. | 05 – Invalid Card ID |
| **Code Samples** | Shows how to call the API using multiple languages. | cURL, Node.js, Python |

---

# 🗂️ API Categories in OpenCMS

| Category | Purpose |
|----------|---------|
| **Authentication** | Generate and validate JWT tokens for secure API access. |
| **Card Lifecycle APIs** | Create, activate, block, replace, and manage cards. |
| **Inquiry APIs** | Fetch card details, balances, and related information. |
| **Limits & Preferences APIs** | Modify or retrieve customer spending and channel limits. |
| **Response Codes & Error Handling** | Reference section for common OpenCMS response codes. |
| **API Explorer** | Live environment to test API requests using sandbox credentials. |

---

# 🧩 Developer Workflow

1. **Authenticate** → Obtain JWT token via `/api/v1/authenticate`.  
2. **Create Card** → Register a new card record.  
3. **Activate Card** → Enable card for customer use.  
4. **Inquiry** → Retrieve card or transaction details.  
5. **Update Limits** → Adjust channel or spending limits.  
6. **Handle Responses** → Use response codes for validation.

---

# ⚙️ Formatting Guidelines

To maintain consistency across all APIs:

- All dates must follow **ISO 8601** format: `YYYY-MM-DD`.
- Parameter names use **PascalCase** (e.g., CardId, ProductCode).
- Every response must include:
  - `responseCode`
  - `responseDescription`
- Always provide:
  - Request Example (JSON)
  - Response Example (JSON)
  - Error Response Example
  - Authentication Header Example

---

# 💡 Example API Format

## **POST /api/v1/Card/activateCard**

### **Overview**  
Activates a newly issued or replaced card.

---

### **Request Example**

```json
{
  "cardId": "100000245",
  "rrn": "23132313131313",
  "productCode": "1206"
}
