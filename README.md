# NCLLL Admin Panel - Vue 3 Frontend

A modern, responsive admin dashboard built with Vue 3, TypeScript, and Vite for managing the National Committee for Lifelong Learning content management system.

## 🚀 Features

### Core Features

- **Content Management**: Rich text editor for blogs, resources, and announcements
- **User Management**: Admin user creation and role-based access control
- **File Management**: Drag-and-drop file uploads with multiple storage backends
- **Government Structure**: Member hierarchy and organizational chart management
- **Partnership Portal**: Partner application and collaboration management
- **Resource Library**: Document and media file organization system
- **Real-time Updates**: Live notifications and status updates

### Technical Features

- **Modern Stack**: Vue 3 with Composition API and TypeScript
- **Rich Text Editor**: TipTap editor with full formatting capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui components with full customization
- **State Management**: Pinia for application state
- **Internationalization**: Vue i18n for multi-language support
- **File Handling**: Advanced file upload with preview and validation
- **Form Validation**: Comprehensive validation with VeeValidate and Zod

## 🛠️ Tech Stack

- **Framework**: Vue 3.5.13 with Composition API
- **Language**: TypeScript 5.7.2
- **Build Tool**: Vite 6.3.4
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Reka UI)
- **State Management**: Pinia 3.0.1
- **Routing**: Vue Router 4.5.0
- **Form Handling**: VeeValidate 4.15.0 + Zod 3.24.2
- **Rich Text Editor**: TipTap 2.11.5
- **File Upload**: Vue Draggable Plus 0.6.0
- **Date Picker**: VuePic Vue Datepicker 11.0.2
- **Icons**: Lucide Vue Next + Iconify
- **Internationalization**: Vue i18n 11.1.2

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm or yarn package manager
- Modern browser with ES6+ support

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nclll-admin.git
   cd nclll-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env.development
   ```

   Configure your environment variables:

   ```env
   VITE_NODE_ENV=development
   VITE_API_URL=http://localhost:3000/v1/a
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:8888`

## 🐳 Docker Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Build Docker image**

   ```bash
   docker build -t nclll-admin .
   ```

3. **Run container**
   ```bash
   docker run -p 80:80 nclll-admin
   ```

## 🏗️ Project Structure

```
src/
├── apis/                   # API endpoint configurations
│   ├── authUrl.ts         # Authentication endpoints
│   ├── bannerUrl.ts       # Banner management endpoints
│   ├── blogUrl.ts         # Blog content endpoints
│   └── ...                # Other API configurations
├── assets/                 # Static assets
│   ├── css/               # Global styles
│   └── images/            # Image assets
├── components/             # Reusable components
│   ├── cards/             # Card components
│   ├── custom/            # Custom components
│   ├── dashboard/         # Dashboard-specific components
│   ├── form/              # Form components
│   ├── selection/         # Selection/dropdown components
│   ├── tiptap/           # Rich text editor
│   └── ui/               # shadcn/ui components
├── config/                # Application configuration
├── locales/               # Internationalization files
├── router/                # Vue Router configuration
├── scripts/               # Utility scripts and models
│   ├── cookie/           # Cookie management
│   ├── enum/             # TypeScript enums
│   ├── handler/          # API handlers
│   └── model/            # Data models
├── stores/                # Pinia stores
├── utils/                 # Utility functions
└── views/                 # Page components
```

## 🎨 Design System

### Color Scheme

- **Primary**: Green-based theme for NCLLL branding
- **Background**: Light gray (#FBFBFD) for main areas
- **Cards**: White backgrounds with subtle shadows
- **Accents**: Green (#16a34a) for primary actions

### Typography

- **Primary Font**: Kantumruy Pro (Khmer support)
- **Secondary Font**: Koulen for display text
- **Fallback**: Inter for Latin characters

### Components

- **Buttons**: Consistent styling with hover states
- **Forms**: Clean input design with validation feedback
- **Cards**: Rounded corners with elevation
- **Navigation**: Collapsible sidebar with smooth animations

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full system access
- **Editor**: Content creation and editing
- **Viewer**: Read-only access

### Authentication Flow

1. **Login**: Username/password authentication
2. **Token Storage**: JWT tokens in secure cookies
3. **Route Guards**: Protected routes based on user roles
4. **Session Management**: Automatic token refresh

## 📝 Key Features Guide

### Content Management

- **Rich Text Editor**: Full TipTap integration with:
  - Text formatting (bold, italic, underline)
  - Headings and paragraphs
  - Lists and tables
  - Image and link insertion
  - Custom styling options

### File Upload System

- **Multiple Storage Backends**: Local, AWS S3, DigitalOcean Spaces
- **Drag & Drop Interface**: Intuitive file upload
- **File Preview**: Image and document previews
- **Validation**: File type and size restrictions

### Multi-language Support

- **Interface Languages**: English and Khmer
- **Content Languages**: Bilingual content creation
- **Dynamic Switching**: Runtime language switching
- **Localized Validation**: Language-specific error messages

### Form Handling

- **Validation**: Real-time validation with VeeValidate
- **Error Handling**: Comprehensive error display
- **Auto-save**: Prevent data loss
- **File Integration**: Seamless file upload in forms

## 🌐 API Integration

### Base Configuration

```typescript
const BASE_URL = import.meta.env.VITE_API_URL;
```

### API Handlers

```typescript
// Example: Banner API
const bannerAPI = (_id?: string) => ({
  create_banner: BASE_URL + "/banner",
  retrive_banner: BASE_URL + "/banner",
  delete_banner: BASE_URL + "/banner/" + _id,
  update_banner: BASE_URL + "/banner",
});
```

### Error Handling

- **Global Error Handler**: Centralized error processing
- **Toast Notifications**: User-friendly error messages
- **Loading States**: Visual feedback during operations
- **Retry Logic**: Automatic retry for failed requests

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 8888)
npm run build        # Build for production
npm run preview      # Preview production build

# Quality Assurance
npm run lint         # Lint code (if configured)
npm run type-check   # TypeScript type checking
```

## 🔧 Configuration

### Vite Configuration

```typescript
export default defineConfig({
  server: {
    port: 8888,
    strictPort: true,
  },
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

### Tailwind Configuration

```javascript
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto_sans_khmer: ["Noto Sans Khmer", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features

- **Collapsible Sidebar**: Touch-friendly navigation
- **Responsive Tables**: Horizontal scrolling
- **Optimized Forms**: Mobile-first form design
- **Touch Gestures**: Swipe and tap interactions

## 🚀 Performance Optimizations

### Code Splitting

- **Route-based**: Automatic route splitting
- **Component-based**: Lazy loading for heavy components
- **Asset Optimization**: Image and font optimization

### Caching Strategy

- **API Responses**: Smart caching with invalidation
- **Static Assets**: Long-term caching
- **Service Worker**: Offline support (if implemented)

## 🧪 Testing

### Component Testing

```bash
# Run component tests (if configured)
npm run test:unit
```

### E2E Testing

```bash
# Run end-to-end tests (if configured)
npm run test:e2e
```

## 🛡️ Security Features

### Input Validation

- **Client-side Validation**: Immediate feedback
- **XSS Prevention**: Sanitized HTML output
- **CSRF Protection**: Token-based protection
- **File Upload Security**: Type and size validation

### Authentication Security

- **JWT Tokens**: Secure token handling
- **Secure Storage**: HttpOnly cookies
- **Session Timeout**: Automatic logout
- **Route Protection**: Authentication guards

## 🌍 Internationalization

### Supported Languages

- **English** (`en`)
- **Khmer** (`kh`)

### Translation Files

```typescript
// English translations
export default {
  common: {
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
  },
  // ... more translations
};
```

### Usage

```vue
<template>
  <button>{{ $t("common.save") }}</button>
</template>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- **TypeScript**: Use strict typing
- **Vue 3**: Composition API preferred
- **Components**: Follow single responsibility principle
- **Styling**: Use Tailwind utility classes
- **Naming**: Use descriptive, consistent naming

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

### Build Output

```
dist/
├── assets/         # Optimized static assets
├── index.html      # Main HTML file
└── ...            # Other build artifacts
```

### Deployment Options

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Docker**: Containerized deployment
- **Traditional Web Servers**: Apache, Nginx

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**

   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript Errors**

   ```bash
   # Run type checking
   npx vue-tsc --noEmit
   ```

3. **Styling Issues**
   ```bash
   # Rebuild Tailwind
   npx tailwindcss build
   ```

### Performance Issues

- **Large Bundle Size**: Use code splitting
- **Slow Loading**: Implement lazy loading
- **Memory Leaks**: Check component cleanup

## 📊 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Development Team** - NCLLL Technical Team

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- shadcn/ui for the beautiful component library
- TipTap team for the rich text editor
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped improve this project

---

For more information, please contact the development team or open an issue on GitHub.

## 📞 Support

- **Documentation**: Check the inline code comments
- **Issues**: Open a GitHub issue
- **Questions**: Contact the development team
- **Feature Requests**: Use the GitHub discussions

---

**Happy coding! 🎉**
