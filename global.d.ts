declare module '*.module.css' {
    const clasess: { [key: string] : string };
    export default clasess;
}

// en caso de usar scss
// declare module '*.module.scss' {
//   const classes: { [key: string]: string };
//   export default classes;
// }   