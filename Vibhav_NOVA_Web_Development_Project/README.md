# NOVA — Developer Registration Portal (2026 Edition)

**Project Owner**: Vibhav Mishra  
**Internship Role**: Web Development Intern  
**Organization**: Codec Technologies  
**Internship Period**: 14 July 2026 — 14 August 2026  
**Project**: Responsive Registration Form with Client-Side Validation  

---

## 🌟 Overview & Highlights

NOVA is a flagship, enterprise-grade responsive onboarding experience engineered without heavy external frameworks or build tooling. It is built strictly with modern **semantic HTML5**, **reactive CSS3 (Glassmorphism & CSS Grid)**, and **modular vanilla ES6+ JavaScript**.

### Key Architectural Features:
- **Zero-Dependency Architecture**: No `npm`, `node_modules`, or build systems required. Double-click `index.html` to run locally in any modern browser.
- **2026 SaaS Visual Identity**:
  - Cosmic deep-slate layered surfaces with ambient radial meshes.
  - Multi-layer frosted glass cards (`backdrop-filter: blur(24px)`).
  - High-definition inline vector SVGs that look razor-sharp on 1080p, 1440p, 4K, and mobile Retina displays.
  - Dynamic **Live Preview Credential Card** that synchronizes real-time applicant data as you type.
- **Robust Client-Side Validation**:
  - Full Name: Minimum 3 non-whitespace characters.
  - Email: RFC-compliant regular expression pattern check.
  - Phone: Exactly 10 numeric digits.
  - Date of Birth: Date picker restricted to current date or earlier (`dob.max`).
  - Gender & Course: Dropdown requirement validation.
  - City: Minimum 2 characters.
  - Password: Minimum 8 characters with dynamic Show/Hide visibility toggling.
  - Confirm Password: Strict equality check with primary password.
  - Terms & Conditions: Mandatory checkbox validation.
- **Micro-Interactions**:
  - Fluid, animated progress bar with live percentage pill.
  - Micro-shake validation error animation with custom alerts.
  - Polished input focus rings with cyber-cyan elevation.
  - Animated celebration success state with a structured 4-field verification record.
  - Seamless "Register Another Account" reset functionality with auto-focus.

---

## 📁 File Structure

```
nova-registration/
├── index.html       # Clean, accessible semantic HTML5 structure
├── style.css        # 2026 SaaS CSS3 design system with custom variables & grid
├── script.js        # Modular ES6+ validation engine & DOM manipulation
└── README.md        # Project documentation & B.Tech viva preparation guide
```

---

## 🎓 B.Tech 2nd-Year Viva Examination Cheat-Sheet

If an external examiner or internship supervisor asks you to explain the code during your viva evaluation, here are clear, confident answers to common questions:

### Q1. How does the validation engine work without a backend?
> **Answer**:  
> We implemented a client-side JavaScript object named `checks` where each field ID maps to an array `[validatorFunction, errorMessage]`. When the user types (`input` event) or changes a dropdown (`change` event), the respective validator function is executed against `input.value`. On form submission, we run `ids.map(validate).every(Boolean)`. If any rule returns `false`, `every()` evaluates to `false`, stops submission, and moves the cursor focus to the first invalid field using `document.querySelector(".input.invalid input")?.focus()`.

### Q2. Can you explain the Email and Phone Regular Expressions (RegEx)?
> **Answer**:  
> - **Email**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
>   - `^` asserts the start of the string.
>   - `[^\s@]+` ensures at least one character that is neither whitespace nor `@`.
>   - `@` matches the literal `@` symbol.
>   - `\.` matches the literal domain separator dot.
>   - `$` asserts the end of the string.
> - **Phone**: `/^\d{10}$/`
>   - `\d` represents any digit (0-9).
>   - `{10}` strictly requires exactly 10 digits without spaces or symbols.

### Q3. How did you create the glassmorphism and depth effects in CSS?
> **Answer**:  
> We combined:
> 1. `backdrop-filter: blur(20px)` and `-webkit-backdrop-filter` to dynamically blur underlying layers.
> 2. Translucent background fills like `rgba(15, 23, 42, 0.72)`.
> 3. Subtle 1px borders using `rgba(255, 255, 255, 0.08)` to simulate the light catch on glass edges.
> 4. Multi-tiered box shadows (`box-shadow: 0 24px 60px ...`) for optical elevation and depth.

### Q4. How is the layout made responsive from mobile phones up to 1440p screens?
> **Answer**:  
> We used modern CSS Grid and Flexbox with CSS custom properties:
> - On desktop and 1440p screens, the `.wrapper` uses a 2-column split grid (`grid-template-columns: 45% 55%`) with max-width `1340px`.
> - The form fields inside use a 2-column subgrid (`grid-template-columns: 1fr 1fr`).
> - At breakpoints (`1024px` and `768px`), media queries dynamically collapse the columns to single-column layouts (`1fr`), stack the hero section above the form, and scale padding and fonts using `clamp()` to guarantee zero horizontal overflow.

### Q5. How does the password show/hide feature work?
> **Answer**:  
> Each toggle button has a `data-target` attribute corresponding to the input's ID (`password` or `confirmPassword`). On click, JavaScript checks `input.type === "password"`. If true, it changes the type to `"text"` and updates the button label to `"Hide"`; otherwise, it changes it back to `"password"` and `"Show"`.

---

## 🚀 How to Run Locally

1. Open your browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
2. Press `Ctrl + O` (or right-click `index.html` > *Open with*).
3. Select `index.html` from `C:\Users\vibha\.gemini\antigravity\scratch\nova-registration\index.html`.
4. The application runs immediately with full interactivity and zero setup!
