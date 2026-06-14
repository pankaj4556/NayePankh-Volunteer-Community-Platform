# NayePankh Volunteer & Community Connect Platform

A premium, modern, highly interactive web platform built for **NayePankh Foundation** to manage volunteers, campaigns, community engagement, gamified achievements, and digital certificates. 

This platform is structured as a high-fidelity Single-Page Application (SPA) using clean, vanilla HTML5, CSS3, and JavaScript, designed with modern aesthetics (inspired by Apple, Linear, and Stripe interfaces) featuring glassmorphism, responsive grids, dark/light theme switching, and smooth transitions.

---

## ✨ Features

### 1. View Role Simulator (Trial Access)
A dropdown selector in the navbar allows instantaneous toggling between:
*   **Guest View**: Browsing the homepage and active campaigns. Attempts to join campaigns or access profiles trigger the authentication modal.
*   **Volunteer View**: Unlocks the personalized dashboard, social community feed, skills portfolio, badges gallery, and digital certificates.

### 2. Personalized Volunteer Dashboard
*   **Stats Counters**: Real-time counter animations tracking lifetime hours, events attended, and campaigns joined.
*   **Activity Timeline**: Clear status indicators showing registered campaigns.
*   **Level Progress**: Visual progress indicators tracking level thresholds (e.g., Level 3 Impact Maker).

### 3. Campaign Discovery Channel
*   **Live Search**: Instant keyword filtering across campaign details, categories, and required skills.
*   **Filters**: Dropdowns to categorize campaigns by sector (*Education Support*, *Food & Shelter*, *Cleanliness & Environment*) or by region (*Kanpur*, *Lucknow*, *Delhi*).
*   **Registration Drawer**: Informative drawer detail sheets showing dates, skills required, remaining slots, and instant register/cancel triggers.

### 4. Interactive Gamification & Achievements
*   **Impact Badges**: Double-sided badge cards with a premium rotate hover animation detailing unlock guidelines.
*   **Level Ups**: Automatic triggers checking badge status when a volunteer registers for drives.

### 5. Community Social Wall
*   **Status Publisher**: Input story box supporting text formatting and simulated media photo attachments.
*   **Interactive Stream**: LinkedIn-style social feed with active like triggers and simulated comments.
*   **Monthly Leaderboard**: Highlights top volunteers and total hours contributed.

### 6. Certificate Generation Engine
*   **Canvas Drawing**: Generates official volunteer appreciation certificates dynamically using the HTML5 Canvas API.
*   **Direct Download**: Renders the certificate with the volunteer's name and campaign title, exporting it directly as a high-quality PNG image file.

---

## 🛠️ Technology Stack

*   **Markup**: HTML5 (Semantic structures)
*   **Styling**: Vanilla CSS3 (Custom properties, grid systems, glassmorphism, keyframe animations, media queries)
*   **Logic & Routing**: Vanilla JavaScript (ES6+, hash routing shell, Canvas API rendering, LocalStorage persistence)
*   **Icons**: Inline vector SVGs
*   **Typography**: Plus Jakarta Sans & Outfit (Google Fonts)

---

## 🚀 Running Locally

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/naye-pankh-platform.git
    cd naye-pankh-platform
    ```

2.  **Install Dependencies**:
    The project relies on zero heavy frameworks or bundlers. A simple development server (`http-server`) is used to test caching and routing.
    ```bash
    npm install
    ```

3.  **Start Dev Server**:
    Run the dev command to serve files on port `8082` with caching disabled:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to `http://localhost:8082/` in your web browser.

---

## 🔑 Trial Log In Credentials

To log in as a volunteer through the Auth modal form, use:
*   **Email**: `example@123`
*   **Password**: `12345678`

*Note: You can also use the **Google** or **Apple** social OAuth buttons for immediate access.*
