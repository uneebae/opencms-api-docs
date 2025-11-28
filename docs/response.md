# ⚠️ Response Codes & Error Handling

This section defines the standardized HTTP response codes, OpenCMS custom response codes, and error structures returned by the APIs.  
It helps developers interpret success, warning, and failure conditions accurately during integration.

---

# 🧩 Overview

Every OpenCMS API returns a **Response Object** containing:

- `responseCode`
- `responseDescription`
- `timestamp`
- Optional: `data` or `errorDetails`

---

# 🟢 Standard HTTP Status Codes

| HTTP Code | Status | Meaning | Action Required |
|-----------|--------|---------|------------------|
| **200 OK** | Success | Request executed successfully | Proceed as normal |
| **201 Created** | Resource Created | New record successfully added | Store created resource ID |
| **202 Accepted** | Que


## Error Response Example
```Json
{
  "responseCode": "05",
  "responseDescription": "Missing mandatory field: cardId",
  "timestamp": "2025-10-30T12:46:00Z",
  "errorDetails": {
    "field": "cardId",
    "message": "cardId cannot be null or empty",
    "suggestion": "Include cardId parameter in request body"
  }
}

```json
{
  "responseCode": "05",
  "responseDescription": "Missing mandatory field: cardId",
  "timestamp": "2025-10-30T12:46:00Z",
  "errorDetails": {
    "field": "cardId",
    "message": "cardId cannot be null or empty",
    "suggestion": "Include cardId parameter in request body"
  }
}
```

## 🔁 Retry Logic
| Error Type                 | Recommended Action           | Retry Interval |
| -------------------------- | ---------------------------- | -------------- |
| Timeout / **408** / **20** | Retry request                | 2–5 seconds    |
| **429 Too Many Requests**  | Exponential backoff          | 5–10 seconds   |
| **500 / 503**              | Retry after delay            | 10–15 seconds  |
| Validation / **400 / 05**  | ❌ Do NOT retry — fix payload | N/A            |


## 🧰 Error Handling Guidelines

- Always validate mandatory fields before calling APIs.

- Create a centralized error handler to map both HTTP & OpenCMS codes.

- Log the following per API call:
    
    - RRN / Request ID

    - Endpoint

    - HTTP Status Code

    - responseCode

- For async or scheduled operations, maintain:
    
    - Retry counters
    - Failure logs

## 🚨 Common Failure Scenarios

| Scenario                | Symptom                     | Resolution                |
| ----------------------- | --------------------------- | ------------------------- |
| **Expired Token**       | 401 Unauthorized            | Regenerate JWT            |
| **Duplicate RRN**       | 10 Duplicate Request        | Use a new RRN             |
| **Invalid Card Status** | 30 Invalid State            | Only activate Fresh cards |
| **Missing Field**       | 05 Validation Error         | Add required field        |
| **Scheme Down**         | 41 External Service Failure | Retry after 1–2 mins      |


## 🧠 Developer Tips

- Always include X-Correlation-ID for system-wide traceability.

- Never retry validation errors — fix the payload.

- Use sandbox mode for integration before production.

- Log both:
    - HTTP status
    - OpenCMS custom code

## 🚀 Next Steps

➡️ Continue with Authentication API
➡️ Explore Card Lifecycle APIs
➡️ Review Data Type References


