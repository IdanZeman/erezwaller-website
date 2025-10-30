# MRBuild – Hebrew RTL Handyman Landing Page

A production-ready Next.js 14 landing page for a Hebrew handyman/contractor business with full RTL (Right-to-Left) support.

## 🚀 Features

- **Next.js 14** with App Router and TypeScript
- **Hebrew RTL Support** – Full right-to-left layout
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Beautiful, accessible UI components
- **Framer Motion** – Smooth animations
- **Lucide Icons** – Modern icon library
- **Jest & React Testing Library** – Comprehensive testing setup
- **ESLint & Prettier** – Code quality and formatting

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🛠️ Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm start` – Start production server
- `npm run lint` – Run ESLint
- `npm test` – Run tests in watch mode
- `npm run test:ci` – Run tests once (for CI/CD)

## ✏️ Editing Content

### Update Contact Information

Edit `app/page.tsx` and search for:
- Phone: `050-1234567`
- Email: `erez@handyman.co.il`

Replace with your actual contact details.

### Change Hero Image

The hero section uses an Unsplash image. To use a custom image with a blurred background:

1. Add your image to the `public` folder (e.g., `public/hero-bg.jpg`)
2. In `app/page.tsx`, find the hero `<img>` tag:
   ```tsx
   <img src="https://images.unsplash.com/photo-1581093458791-9d09f0dba7f1?q=80&w=1400&auto=format&fit=crop" alt="אתר עבודה" className="w-full h-[420px] object-cover" />
   ```
3. Replace with:
   ```tsx
   <img src="/hero-bg.jpg" alt="אתר עבודה" className="w-full h-[420px] object-cover" />
   ```
4. For a blurred background effect, wrap it in a container with `backdrop-blur`:
   ```tsx
   <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
     <img src="/hero-bg.jpg" alt="אתר עבודה" className="w-full h-[420px] object-cover opacity-90" />
   </div>
   ```

### Modify Services

In `app/page.tsx`, locate the services array (around line 91):
```tsx
{[
  {icon: <Hammer className="w-6 h-6"/>, title: 'שיפוצים כלליים', desc: 'שיפוץ מקיף...'},
  // Add or edit services here
]}
```

### Update Project Images

Project images use Unsplash placeholders. Replace with your actual project images by:

1. Adding images to `public/projects/` folder
2. Updating the image sources in the Projects section (around line 117):
   ```tsx
   <img src={`/projects/project-${i}.jpg`} alt={`פרויקט ${i}`} ... />
   ```

## 🚢 Deployment to Vercel

### Method 1: Deploy from GitHub

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js – click "Deploy"

### Method 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow the prompts. Your site will be live in seconds!

## 🧪 Testing

Tests are located in `__tests__/page.test.tsx`. They verify:

- Hebrew RTL layout rendering
- Presence of CTA buttons
- Contact links (phone & email)

Run tests:
```bash
npm test
```

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx       # Root layout with RTL & Hebrew support
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles & Tailwind
├── components/
│   └── ui/
│       ├── button.tsx   # shadcn/ui Button component
│       └── card.tsx     # shadcn/ui Card component
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
├── __tests__/
│   └── page.test.tsx    # Jest tests
├── public/              # Static assets
├── .github/
│   └── copilot-instructions.md
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript config
├── jest.config.ts       # Jest configuration
├── .eslintrc.json       # ESLint config
├── .prettierrc          # Prettier config
└── package.json         # Dependencies & scripts
```

## 🎨 Customization

### Colors

The site uses Tailwind's default palette with custom amber accents. To change:

1. Edit `tailwind.config.ts` to add custom colors
2. Update color classes in `app/page.tsx` (e.g., `bg-amber-500` → `bg-blue-500`)

### Typography

The site uses system fonts with RTL support. To add custom fonts:

1. Add font import to `app/layout.tsx`
2. Update Tailwind config with font family

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for the Hebrew-speaking handyman community**
