declare module '@/lib/roslib' {
  // We tell TypeScript: "Trust us, this file exports the ROSLIB library"
  // We can reuse the types from the @types/roslib package we installed earlier.
  import * as ROSLIB from 'roslib';
  export default ROSLIB;
}