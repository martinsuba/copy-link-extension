import { DESTROY_IFRAME_TIMEOUT } from '../../../utils/constants';

import './index.scss';

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('msg');

document.querySelector('.message').innerHTML = message;

const wrapper = document.querySelector('.wrapper');
wrapper.classList.add('visible');
setTimeout(() => wrapper.classList.remove('visible'), DESTROY_IFRAME_TIMEOUT - 300);
