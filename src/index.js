import './main.scss';
import DOMRender from './scripts/DOMRender';

const music = new Audio();
music.autoplay = true;
music.loop = true;

DOMRender.renderStartPage(music);
