# Chevalier & Roth — GitHub Pages Edition

This repository is designed to deploy directly to **GitHub Pages** with no framework build step.

## Deploy
1. Upload the contents of this folder to the root of your GitHub repository.
2. Ensure the default branch is `main`.
3. Go to **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions** and run `Deploy Chevalier & Roth to GitHub Pages`, or push a commit.

The workflow uses `ubuntu-24.04` explicitly and the official GitHub Pages actions.

## Important architecture note
GitHub Pages is static hosting. It cannot provide:
- secure server-side admin authentication
- server-side pricing validation
- private database secrets
- secure checkout/payment processing
- protected API keys

For production, keep this GitHub Pages frontend and connect an external backend such as **Appwrite**:
- Appwrite Auth for customers/admin
- Appwrite Databases for products, codes and orders
- Appwrite Storage for product images
- Appwrite Functions for server-side price/discount/order validation and payment-provider integration

Do **not** put secret API keys in this repository.

## Current demo behavior
The shop, cart, discount-code logic, test checkout, admin product editor and test orders work in-browser with localStorage. That is suitable for design/demo testing, not secure production commerce.

## Admin
Open `/admin/`.
There is intentionally no hard-coded admin password in the repository because a password stored in GitHub Pages source would be public and insecure.

## Product images
Replace files under `assets/img/` and update product image paths through the demo admin editor or in `data/products.json`.
