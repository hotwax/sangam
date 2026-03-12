---
name: bopis-customizer
description: Use this skill when modifying the "Buy Online, Pick Up In Store" (BOPIS) feature, including the pickup button text, modal design, or store search logic. Triggered by keywords: BOPIS, pickup today, store finder, local pickup.
---

# BOPIS Customization Skill

This skill provides comprehensive guidance for modifying the "Buy Online, Pick Up In Store" (BOPIS) experience in this theme. The BOPIS feature is a custom integration (prefixed with `hc-`) that uses HotWax Commerce logic.

## 🏗 Architecture Overview

| Component | Responsibility | File Path |
| :--- | :--- | :--- |
| **Container** | Placeholder for the button on PDP | [`blocks/buy-buttons.liquid`](file:///Users/adityapatel/Documents/GitHub/sangam/blocks/buy-buttons.liquid) |
| **Logic/Injection** | Dynamic button creation & modal handling | [`assets/bopis.js`](file:///Users/adityapatel/Documents/GitHub/sangam/assets/bopis.js) |
| **Styling** | Layout and visual appearance | [`assets/bopis.css`](file:///Users/adityapatel/Documents/GitHub/sangam/assets/bopis.css) |

## 🛠 Common Customizations

### 1. Changing Button Text
The button text is hardcoded in the JavaScript injection.
- **Where:** `assets/bopis.js`
- **Search for:** `Pick Up Today`
- **Note:** There are multiple instances (one for the main button, one for the modal submission).

### 2. Styling the Button
The "Pick Up Today" button uses the `hc-open-bopis-modal` class.
- **Where:** `assets/bopis.css`
- **Class:** `.hc-open-bopis-modal`
- **Tip:** To match the theme's native buttons, use CSS variables like `--color-button` and `--font-button-size`.

### 3. Modifying the Modal Layout
The modal HTML is stored in a string variable inside `assets/bopis.js`.
- **Search for:** `$pickUpModal`
- **Tip:** If adding new fields, ensure you update the `handleAddToCartEvent` to process them.

### 4. Adjusting Store List Result
The store cards (shown after searching) are generated in the `displayStoreInformation` function.
- **Where:** `assets/bopis.js` -> `displayStoreInformation` function.
- **Class:** `#hc-store-card`

## 🚀 Vibecoding Best Practices

When asking an agent to modify BOPIS:
1. **Specify the Layer:** Tell the agent if the change is visual (CSS) or functional (JS).
2. **Handle Injections:** Remind the agent that the button is *dynamically injected* into `<div class="hc-bopis-button"></div>`.
3. **Check the Sku:** The BOPIS logic relies on the SKU found in `<input class="hc_product_sku">`.

## ⚠️ Known Gotchas
- **Shopify Assets Cache:** After modifying `bopis.js` or `bopis.css`, ensure you are viewing the site on a fresh session or bypass cache.
- **Duplicate Buttons:** The code checks `existingBopisButton.length == 0` before injecting. If you change the selector names, you might end up with duplicate buttons.
