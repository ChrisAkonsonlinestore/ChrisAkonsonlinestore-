# Security Specification: chrisAkons online store

## 1. Data Invariants
- Products, Services, Gallery, and Settings are publicly readable by customers.
- Only authenticated admins (`isAdmin()`) can create, update, or delete Products, Services, Gallery items, or update Settings.
- Inquiries can be created by any visitor (public create with validated payload: name, email, message length limits), but can ONLY be read, listed, or managed by an admin. Visitors cannot read other customers' inquiries.
- Admin authority is checked via `request.auth != null && (request.auth.token.email in ['christianakobundu09@gmail.com', 'prolordaichristian001@gmail.com'] || exists(/databases/$(database)/documents/admins/$(request.auth.uid)))`.

## 2. The Dirty Dozen Payloads (Rejection Matrix)
1. **Unauthenticated Product Creation**: An unauthenticated user attempts to create a product. (Rejected: permission denied)
2. **Visitor Product Price Tampering**: An unauthenticated user attempts to update a product price to 0. (Rejected)
3. **Public Reading of Inquiries**: An unauthenticated user or non-admin attempts to read `/inquiries/{inquiryId}`. (Rejected)
4. **Public Listing of Inquiries**: Non-admin attempts to query/list all customer inquiries. (Rejected)
5. **Junk/Oversized Product Description Attack**: Payload containing 100,000 characters in product name/description. (Rejected: schema size limit)
6. **Inquiry with Missing Required Fields**: Incomplete payload omitting customer email or message. (Rejected: missing required fields)
7. **Inquiry ID Injection**: Injected path variable with invalid characters. (Rejected)
8. **Malicious Admin Promotion**: Non-admin attempts to write their own UID into `/admins/{uid}`. (Rejected)
9. **Tampering with Settings**: Non-admin attempting to change store contact phone or WhatsApp link. (Rejected)
10. **Gallery Deletion by Anonymous Visitor**: Non-admin attempting to delete gallery images. (Rejected)
11. **Negative Price Product**: Product creation with negative price. (Rejected)
12. **Out of Range Stock**: Product creation with invalid stock number or unsupported availability enum. (Rejected)
