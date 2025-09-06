import localFont from 'next/font/local';

// Alexandria Font
const alexandria = localFont({
  src: [
    {
      path: '../../public/fonts/Alexandria-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Alexandria-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-alexandria',
});

// Alexandria Variable Font
const alexandriaVariable = localFont({
  src: [
    {
      path: '../../public/fonts/Alexandria-VariableFont_wght.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-alexandria-variable',
});

// Chivo Font
const chivo = localFont({
  src: [
    {
      path: '../../public/fonts/Chivo-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Chivo-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Chivo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Chivo-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Chivo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Chivo-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Chivo-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Chivo-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-chivo',
});

// Nunito Font
const nunito = localFont({
  src: [
    {
      path: '../../public/fonts/Nunito-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-ExtraLightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Nunito-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Nunito-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Nunito-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Nunito-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Nunito-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-ExtraBoldItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Nunito-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nunito-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-nunito',
});

export { alexandria, alexandriaVariable, chivo, nunito };