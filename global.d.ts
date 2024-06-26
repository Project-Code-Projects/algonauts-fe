import { Quill } from 'quill';

declare global {
  interface Window {
    Quill: typeof Quill;
  }}