# ארזולר - אתר נחיתה עם ממשק ניהול

אתר מקצועי לעסק שיפוצים ובנייה עם ממשק ניהול מלא ומערכת העלאת תמונות.

## 🚀 טכנולוגיות

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - עיצוב
- **Supabase** - Database + Storage (חינמי!)
- **Framer Motion** - אנימציות
- **shadcn/ui** - קומפוננטות UI

## 📋 התקנה

### 1. התקנת חבילות

```bash
npm install
```

### 2. הגדרת Supabase

עקוב אחר ההוראות המפורטות ב-[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**תקציר:**
1. צור חשבון ב-[supabase.com](https://supabase.com)
2. צור פרויקט חדש
3. צור טבלת `projects` ו-bucket `projects`
4. העתק API credentials ל-`.env.local`

### 3. משתני סביבה

צור קובץ `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. הרצת שרת פיתוח

```bash
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000)

## 🔐 ממשק ניהול

גש ל-`/admin` (לא מופיע בתפריט!)

**פרטי התחברות:**
- שם משתמש: `erezWaller`
- סיסמה: `IdanIsKing`

### יכולות ממשק הניהול:
- ✅ הוספת פרויקטים חדשים
- ✅ עריכת פרויקטים קיימים
- ✅ מחיקת פרויקטים
- ✅ העלאת תמונות ישירות (נשמר ב-Supabase)
- ✅ עדכונים בזמן אמת באתר הראשי

## 📱 יצירת קשר

לעדכון פרטי יצירת קשר, ערוך את `app/page.tsx`:
- טלפון: `054-925-0567`
- אימייל: `erez@handyman.co.il`
- WhatsApp: `972549250567`

## 🌐 פריסה ל-Vercel

1. Push הקוד ל-GitHub
2. ב-Vercel: Import project מ-GitHub
3. הוסף Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 💰 עלויות

**הכל 100% חינמי!**
- ✅ Supabase Free: 500MB storage, 2GB bandwidth/חודש
- ✅ Vercel Free: hosting ללא הגבלה

מספיק לאתר קטן-בינוני!

## 📁 מבנה הפרויקט

```
├── app/
│   ├── admin/page.tsx     # ממשק ניהול
│   ├── layout.tsx         # Layout ראשי (RTL)
│   ├── page.tsx           # דף נחיתה ראשי
│   └── globals.css        # סגנונות גלובליים
├── components/ui/         # קומפוננטות shadcn/ui
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # פונקציות עזר
├── public/
│   ├── images/            # תמונות מקומיות
│   └── icons8-whatsapp-48.svg
└── SUPABASE_SETUP.md      # הוראות הגדרה מפורטות
```

## 🎨 התאמה אישית

### שינוי צבעים
הצבע העיקרי הוא `#f0001c` (אדום). לשינוי, חפש והחלף ב-`app/page.tsx` ו-`app/admin/page.tsx`.

### הוספת סעיפים
כל הסעיפים ב-`app/page.tsx` מסודרים בצורה מודולרית. העתק-הדבק סעיף קיים וערוך.

## 🔧 פקודות

```bash
npm run dev        # שרת פיתוח
npm run build      # בניית production
npm start          # הרצת production
npm run lint       # בדיקת קוד
npm test           # הרצת בדיקות
```

## 📞 תמיכה

שאלות? פתח issue ב-GitHub!
