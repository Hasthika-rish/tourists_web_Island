# Task: Convert Static Website to PHP & Build Gallery Admin Panel

## Objective
Migrate the current static HTML/CSS/JS website to a dynamic PHP architecture suitable for standard server hosting (Apache/Nginx). Implement a secure backend and an admin panel to manage image uploads for the website's gallery section.

## 1. Architectural Conversion (HTML to PHP)
- **Refactor Files:** Rename all primary `.html` files to `.php`.
- **Component Modularization:** Extract repeating UI elements (navigation bars, headers, footers, head tags) into separate files (e.g., `includes/header.php`, `includes/footer.php`).
- **Templating:** Use PHP `include_once` or `require_once` to stitch the components back into the main pages to eliminate code duplication.

## 2. Database Schema (MySQL)
- Provide the SQL script to create a database and a `gallery_images` table.
- The table should contain the following columns: 
  - `id` (INT, Primary Key, Auto Increment)
  - `file_name` (VARCHAR)
  - `file_path` (VARCHAR)
  - `uploaded_at` (TIMESTAMP)

## 3. Admin Panel & File Upload Logic (`admin.php`)
- **UI Implementation:** Build a clean admin form accepting image files (`enctype="multipart/form-data"`).
- **Backend Processing:** 
  - Write a PHP handler to accept the POST request.
  - Generate a unique filename using `uniqid()` to prevent file overwrites.
  - Move the validated image into a dedicated `/uploads/gallery/` directory.
  - Use PHP Data Objects (PDO) with prepared statements to insert the file path into the MySQL `gallery_images` table.

## 4. Security & Hardening
- **Authentication:** Implement a simple PHP session-based login (`login.php`) to protect `admin.php`. Prevent unauthorized users from loading the upload form or submitting POST requests.
- **Form Handling:** Add strict backend validation to ensure only allowed MIME types (image/jpeg, image/png, image/webp) and file extensions are accepted. Check file sizes (e.g., max 5MB).
- **Directory Protection:** Provide a custom `.htaccess` configuration to:
  - Disable PHP/script execution inside the `/uploads/` directory.
  - Strip `.php` extensions from the URL routes to maintain clean, user-friendly links.

## 5. Dynamic Gallery Rendering (`gallery.php`)
- Write a PDO query to `SELECT` all images from the `gallery_images` table, ordering by `uploaded_at DESC`.
- Use a `while` or `foreach` loop to dynamically generate the HTML `<img>` tags inside the existing CSS gallery grid/layout, replacing the hardcoded static images.

## Output Requirements for the Agent
1. Provide the necessary `.htaccess` configuration rules.
2. Provide the database creation SQL.
3. Provide the full code for `includes/db.php` (PDO connection).
4. Provide the full code for `admin.php` (including session check, HTML form, and PHP upload logic).
5. Provide the logic snippet for rendering the images on `gallery.php`.