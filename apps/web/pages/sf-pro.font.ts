import localFont from '@next/font/local'

export const sfPro = localFont({
  src: [
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-UltralightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-Heavy.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display/SF-Pro-Display-HeavyItalic.otf',
      weight: '900',
      style: 'italic',
    }
  ],
  variable: '--font-inter',
})