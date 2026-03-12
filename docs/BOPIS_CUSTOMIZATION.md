# 📦 BOPIS Customization Guide for Sangam Theme

This guide helps you customize the **"Pick Up Today"** (BOPIS) experience. This feature is a custom integration provided by HotWax Commerce and is separate from Shopify's native "Local Pickup" logic.

## 📍 Where is the code?

### 1. The Visual Button (PDP)
On the Product Detail Page, the button is placed using a placeholder.
- **File:** [`blocks/buy-buttons.liquid`](file:///Users/adityapatel/Documents/GitHub/sangam/blocks/buy-buttons.liquid)
- **Code:** Look for `<div class="hc-bopis-button"></div>`. This is where the button "lives".

### 2. The Text & Interaction (JavaScript)
The actual labels (like "Pick Up Today") and the logic that opens the store finder are in the JavaScript file.
- **File:** [`assets/bopis.js`](file:///Users/adityapatel/Documents/GitHub/sangam/assets/bopis.js)
- **Customizing Text:** Search for `"Pick Up Today"` or `"Pick Up Here"` in this file to change the button labels.

### 3. Styling & Colors (CSS)
To change how the button or modal looks, use the specific BOPIS stylesheet.
- **File:** [`assets/bopis.css`](file:///Users/adityapatel/Documents/GitHub/sangam/assets/bopis.css)
- **Important Classes:** 
  - `.hc-open-bopis-modal`: The main button on the product page.
  - `.hc-modal-content`: The main container of the store finder popup.

---

## 🎨 Common Requests (Vibecoding Cheat Sheet)

If you are using an AI agent (like Antigravity) to help you, you can give it these simple instructions:

### "Change the pickup button color to blue"
> "Update `assets/bopis.css` and set the background-color for `.hc-open-bopis-modal` to blue."

### "Change the button text to 'Check Store Stock'"
> "Go to `assets/bopis.js` and update the injection of the `.hc-open-bopis-modal` button to say 'Check Store Stock' instead of 'Pick Up Today'."

### "Make the store finder modal full screen on mobile"
> "Modify the `@media (max-width: 768px)` section in `assets/bopis.css` to make `.hc-modal-content` take up 100% width and height."

---

## 🛠 Support & Integration
This theme is optimized for HotWax Commerce BOPIS. If the button is not appearing, ensure:
1. The product has a SKU.
2. The `hc_product_sku` input field in `buy-buttons.liquid` is correctly populated.
