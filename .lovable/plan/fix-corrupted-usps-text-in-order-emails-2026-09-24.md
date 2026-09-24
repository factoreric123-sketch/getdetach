# Fix corrupted USPS text in order emails

## Changes
- Replace the invisible zero-width character inside “USPS” with normal plain text in both customer and internal order emails.
- Keep the existing black, non-underlined email styling unchanged.
- Deploy the updated transactional email function and verify the rendered email contains clean “USPS” text.
