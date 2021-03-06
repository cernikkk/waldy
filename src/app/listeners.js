import App from './app';
import UI from './UI';
import g from './global';

export default class BindEvent {
  static click() {
    const game = document.querySelector('.game');
    game.addEventListener('mouseup', (e) => {
      e.preventDefault();
      document.body.style.cursor = 'default';
      g.isMouseDown = false;
      if (g.lastPos.x === e.clientX && g.lastPos.y === e.clientY) {
        const realImgW = e.target.naturalWidth;
        const realImgH = e.target.naturalHeight;
        const clientImgW = e.target.getBoundingClientRect().width;
        const clientImgH = e.target.getBoundingClientRect().height;
        const clientImgX = e.pageX - e.target.getBoundingClientRect().left;
        const clientImgY = e.pageY - e.target.getBoundingClientRect().top;
        g.guess = {
          x: (clientImgX * realImgW) / clientImgW,
          y: (clientImgY * realImgH) / clientImgH,
        };
        UI.characterSelector(e.pageX, e.pageY);
      }
    });

    game.addEventListener('mousedown', (e) => {
      e.preventDefault();
      document.body.style.cursor = 'grabbing';
      g.start = { x: e.clientX - g.point.x, y: e.clientY - g.point.y };
      g.lastPos = { x: e.clientX, y: e.clientY };
      g.isMouseDown = true;
    });

    game.addEventListener('mousemove', (e) => {
      if (!g.isMouseDown) return;
      g.point.x = e.clientX - g.start.x;
      g.point.y = e.clientY - g.start.y;
      UI.applyTransform(false);
      UI.hideSelector();
      UI.removeCircle();
    });
  }

  static scroll() {
    const game = document.querySelector('.game');
    game.addEventListener('wheel', (e) => {
      e.preventDefault();
      UI.setZoom(e);
      UI.applyTransform(true);
      UI.hideSelector();
      UI.removeCircle();
    });
  }

  static guessCharacter() {
    document
      .querySelectorAll('.character-selector button')
      .forEach((element) => {
        element.addEventListener('click', (e) => {
          App.checkGuess(e.target.dataset.name);
          UI.hideSelector();
          UI.removeCircle();
        });
      });
  }
}
