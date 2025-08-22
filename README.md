# Mounting Medical – Hospital CRM System

Mounting Medical is a custom-built CRM designed to streamline hospital operations by centralizing appointment scheduling, patient management, and member coordination. The system offers an intuitive interface and a calendar-driven workflow, making it easy for healthcare professionals to manage daily activities.

## 🔹 Key Features
- **Appointments Management:** Interactive full-page calendar to create, edit, and manage appointments. Future updates include filtering by member and automatic default view for the logged-in user.  
- **Members Module:** Data table with search and filtering by name/email, quick actions to view details or schedule appointments, and a dedicated member details page with widgets for personal details, appointments, and assigned patients.  
- **Patients Module:** Similar to members, with advanced details page including:  
  - Patient information with avatar and quick messaging.  
  - Notes section for historical insights.  
  - File uploads with drag-and-drop support for medical documents (X-rays, reports, etc.).  
  - Appointment history linked to relevant members.  
- **Settings:** User profile management with editable personal details, role assignments, and security updates (email, password, role changes). Admin onboarding includes an initial registration flow for the first user.  
- **Authentication:** Secure login and initial admin registration.  

## 🔹 Tech Stack
- **Frontend:** React, TypeScript, TailwindCSS, shadcn/ui  
- **Database:** Dexie (IndexedDB wrapper)  
- **UI/UX:** Responsive, widget-based design with focus on usability and modular expansion  
