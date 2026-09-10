/**
 * ============================================================================
 * NOVA — Developer Registration Engine (Client-Side Vanilla JavaScript)
 * Author: Vibhav Mishra
 * Internship: Web Development Internship at Codec Technologies
 * Project: NOVA — Responsive Registration Form
 * ============================================================================
 * 
 * VIVA EXPLANATION GUIDE FOR B.TECH EVALUATION:
 * 1. DOM Traversal: Uses `document.getElementById` and `document.querySelector` for fast O(1) element caching.
 * 2. Regular Expressions (RegEx):
 *    - Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` verifies valid characters before/after '@' and domain dot.
 *    - Phone: `/^\d{10}$/` strictly validates exactly 10 numeric digits (Indian mobile standard).
 * 3. Functional Array Methods:
 *    - `map()` & `every()`: executes validation functions across all inputs and verifies truthiness.
 *    - `filter()`: dynamically counts valid fields to compute real-time completion percentage.
 * 4. Micro-Interactions:
 *    - Live Preview Card: synchronously binds user input to a 3D preview badge.
 *    - Password Visibility Toggle: toggles input type between 'password' and 'text'.
 * ============================================================================
 */

// --- 1. DOM Element Cache ---
const form = document.getElementById("registrationForm");
const success = document.getElementById("successState");
const progress = document.querySelector(".progress span");
const progressPercent = document.getElementById("progressPercent");
const summary = document.getElementById("summary");

// Live Preview DOM Elements
const previewName = document.getElementById("previewName");
const previewCourse = document.getElementById("previewCourse");

// Registered Input Field IDs (Preserves exact field architecture)
const ids = [
  "fullName",
  "email",
  "phone",
  "dob",
  "gender",
  "course",
  "city",
  "password",
  "confirmPassword"
];

// --- 2. Validation Rules & Custom Error Messages ---
// Map of field validation rules returning [validatorFunction, errorMessage]
const checks = {
  // Name must contain at least 3 non-whitespace characters
  fullName: [
    v => v.trim().length >= 3,
    "Enter at least 3 characters."
  ],

  // RFC-standard simplified email format check
  email: [
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    "Enter a valid email address."
  ],

  // Exactly 10 digits for mobile number
  phone: [
    v => /^\d{10}$/.test(v.trim()),
    "Enter exactly 10 digits."
  ],

  // Date of birth is mandatory
  dob: [
    v => !!v,
    "Select your date of birth."
  ],

  // Gender selection required
  gender: [
    v => !!v,
    "Select a gender."
  ],

  // Academic program selection required
  course: [
    v => !!v,
    "Choose a course."
  ],

  // City must have at least 2 characters
  city: [
    v => v.trim().length >= 2,
    "Enter your city."
  ],

  // Password must be at least 8 characters long
  password: [
    v => v.length >= 8,
    "Use at least 8 characters."
  ],

  // Confirmation password must match the primary password and have >= 8 chars
  confirmPassword: [
    v => v.length >= 8 && v === document.getElementById("password").value,
    "Passwords must match."
  ]
};

// --- 3. UI State Feedback Functions ---

/**
 * Displays or clears validation error message and updates UI states.
 * @param {string} id - The ID of the input field.
 * @param {string} msg - The error message to display (empty string if valid).
 */
function showError(id, msg = "") {
  const input = document.getElementById(id);
  const err = document.getElementById(id + "Error");
  const container = input.closest(".input");
  
  const hasError = !!msg;
  const isFilledAndValid = !hasError && input.value.trim().length > 0;

  if (container) {
    container.classList.toggle("invalid", hasError);
    container.classList.toggle("valid", isFilledAndValid);
  }

  if (err) {
    err.textContent = msg;
  }
}

/**
 * Validates a specific field against its defined rule.
 * @param {string} id - The field ID to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validate(id) {
  const input = document.getElementById(id);
  const [fn, msg] = checks[id];
  const ok = fn(input.value);
  showError(id, ok ? "" : msg);
  return ok;
}

/**
 * Calculates and animates the progress bar and percentage indicator.
 */
function updateProgress() {
  const done = ids.filter(id => {
    const val = document.getElementById(id).value;
    return checks[id][0](val);
  }).length;

  const percentage = Math.round((done / ids.length) * 100);
  const barWidth = Math.max(8, percentage);

  if (progress) {
    progress.style.width = barWidth + "%";
  }

  if (progressPercent) {
    progressPercent.textContent = percentage + "%";
  }
}

/**
 * Synchronizes the live preview credential card on the left showcase column.
 */
function syncLivePreview() {
  const nameVal = document.getElementById("fullName").value.trim();
  const courseVal = document.getElementById("course").value;

  if (previewName) {
    previewName.textContent = nameVal.length > 0 ? nameVal : "Vibhav Mishra";
  }

  if (previewCourse) {
    previewCourse.textContent = courseVal.length > 0 ? courseVal : "B.Tech — Computer Science";
  }
}

// --- 4. Event Listeners Binding ---

// Attach real-time input and change listeners to all registration fields
ids.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("input", () => {
    validate(id);
    updateProgress();
    if (id === "fullName" || id === "course") {
      syncLivePreview();
    }
    // If user is editing primary password, re-check confirmPassword if it was already entered
    if (id === "password" && document.getElementById("confirmPassword").value.length > 0) {
      validate("confirmPassword");
    }
  });

  el.addEventListener("change", () => {
    validate(id);
    updateProgress();
    if (id === "fullName" || id === "course") {
      syncLivePreview();
    }
  });
});

// Password Show/Hide Visibility Toggles
document.querySelectorAll(".toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const targetInput = document.getElementById(targetId);
    if (!targetInput) return;

    const isPassword = targetInput.type === "password";
    targetInput.type = isPassword ? "text" : "password";
    btn.textContent = isPassword ? "Hide" : "Show";
    btn.setAttribute("aria-label", isPassword ? "Hide password text" : "Show password text");
  });
});

// --- 5. Form Submission Handler ---
form.addEventListener("submit", e => {
  e.preventDefault();

  // Validate all 9 fields simultaneously
  let ok = ids.map(validate).every(Boolean);

  // Validate terms and conditions agreement
  const termsCheckbox = document.getElementById("terms");
  const termsError = document.getElementById("termsError");
  const termsAgreed = termsCheckbox ? termsCheckbox.checked : false;

  if (termsError) {
    termsError.textContent = termsAgreed ? "" : "Please accept the terms and conditions.";
  }

  if (!termsAgreed) {
    ok = false;
  }

  // If validation fails, automatically focus the first invalid field
  if (!ok) {
    const firstInvalid = document.querySelector(".input.invalid input, .input.invalid select");
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return;
  }

  // Build registration summary record for confirmed display
  const summaryData = [
    ["Full name", document.getElementById("fullName").value.trim()],
    ["Email", document.getElementById("email").value.trim()],
    ["Phone", document.getElementById("phone").value.trim()],
    ["Course", document.getElementById("course").value]
  ];

  if (summary) {
    summary.innerHTML = summaryData
      .map(([k, v]) => `<div><b>${k}</b>${v}</div>`)
      .join("");
  }

  // Smoothly transition from form to success confirmation
  form.style.display = "none";
  if (success) {
    success.classList.add("show");
    success.setAttribute("aria-hidden", "false");
  }
});

// --- 6. Reset Form / Register Another Account ---
const againBtn = document.getElementById("again");
if (againBtn) {
  againBtn.addEventListener("click", () => {
    // Reset all form inputs to default values
    form.reset();

    // Clear all validation errors and CSS classes
    ids.forEach(id => {
      showError(id, "");
      const container = document.getElementById(id)?.closest(".input");
      if (container) {
        container.classList.remove("valid", "invalid");
      }
    });

    const termsError = document.getElementById("termsError");
    if (termsError) {
      termsError.textContent = "";
    }

    // Reset password toggle buttons and input types back to secure hidden state
    document.querySelectorAll(".toggle").forEach(b => {
      b.textContent = "Show";
    });
    const pwd = document.getElementById("password");
    const confirmPwd = document.getElementById("confirmPassword");
    if (pwd) pwd.type = "password";
    if (confirmPwd) confirmPwd.type = "password";

    // Hide success message, restore form display
    if (success) {
      success.classList.remove("show");
      success.setAttribute("aria-hidden", "true");
    }
    form.style.display = "";

    // Reset progress indicator
    if (progress) progress.style.width = "8%";
    if (progressPercent) progressPercent.textContent = "0%";

    // Reset live preview to default intern card state
    syncLivePreview();

    // Auto-focus on first input for effortless re-entry
    const nameInput = document.getElementById("fullName");
    if (nameInput) nameInput.focus();
  });
}

// --- 7. Security: Restrict Date of Birth to Today or Earlier ---
const dobInput = document.getElementById("dob");
if (dobInput) {
  // Format current ISO timestamp date: "YYYY-MM-DD"
  dobInput.max = new Date().toISOString().split("T")[0];
}
