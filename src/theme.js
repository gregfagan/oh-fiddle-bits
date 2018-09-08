const shades = {
  accent: '#66AEBD',
  darkAccent: '#255959',
  lightest: '#F2EADF',
  light: '#BFA288',
  base: '#A68365',
  dark: '#614433',
  darkest: '#422F23',
}

export default {
  shades,
  info: {
    primary: shades.darkest,
    secondary: shades.base,
    background: shades.lightest,
  },
  text: {
    color: shades.darkest,
    family: {
      display: 'Patua One, sans-serif',
      interface: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
      import: `
        @import url('https://fonts.googleapis.com/css?family=Patua+One');
      `,
    },
  },
  active: shades.lightest,
  inactive: shades.light,
  foreground: shades.base,
  background: shades.dark,
  disabled: shades.darkest,
}
