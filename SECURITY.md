# Security

Never commit:
- private API keys
- payment provider secrets
- admin passwords
- database credentials

GitHub Pages serves all repository frontend files publicly. Any true admin authentication and protected business logic must be enforced by an external backend.

For production, use an external backend and server-side validation for:
- prices
- discounts
- stock
- orders
- payment state
