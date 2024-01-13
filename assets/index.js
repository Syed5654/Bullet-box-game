const app = document.getElementById("app");
    const wrapper = document.getElementById("wrapper");
    const character = document.getElementById("character");
    const enemy = document.getElementById("enemy");
    const bullet = document.getElementById("bullet");
    let characterTop = parseFloat(window.getComputedStyle(character).top);
    let characterLeft = parseFloat(window.getComputedStyle(character).left);
    let enemyTop = parseFloat(window.getComputedStyle(enemy).top);
    let enemyLeft = parseFloat(window.getComputedStyle(enemy).left);
    let bulletTop = parseFloat(window.getComputedStyle(bullet).top);
    let bulletLeft = parseFloat(window.getComputedStyle(bullet).left);
    let wrapperWidth = wrapper.clientWidth;
    let wrapperHeight = wrapper.clientHeight;
    let reloading = false;

    const moveCharacter = (direction) => {
      if (direction === "forward" && characterLeft < wrapperWidth - 36) {
        character.style.left = `${(characterLeft += 10)}px`;
      } else if (direction === "back" && characterLeft > 0) {
        character.style.left = `${(characterLeft -= 10)}px`;
      } else if (direction === "up" && characterTop > 6) {
        character.style.top = `${(characterTop -= 10)}px`;
      } else if (
        direction === "down" &&
        characterTop < Math.floor(wrapperHeight) - 70
      ) {
        character.style.top = `${(characterTop += 10)}px`;
      }
    };
    const fireBullet = () => {
      reloading = true;
      bullet.style.cssText = `left: ${characterLeft}px;
      top:calc(${characterTop}px + ${character.clientHeight / 2}px);
      opacity: 1`;
      bulletLeft = parseFloat(bullet.style.left);
      bulletTop = bullet.style.top;
      bulletTop = parseFloat(bulletTop.split("(")[1]);
      bulletAnimation();
    };

    const bulletAnimation = () => {
      let enemyExist = document.getElementById("enemy");
      requestAnimationFrame(function move() {
        bulletLeft += 16;
        bullet.style.left = `${bulletLeft}px`;
        switch (true) {
          case enemyExist &&
            bulletLeft >= Math.floor(enemyLeft) &&
            bulletTop - 30 >= enemyTop - 30 &&
            bulletTop - 30 <= enemyTop + 20:
            enemy.remove();
            bullet.style.opacity = "0";
            reloading = false;
            break;
          case bulletLeft >= wrapperWidth - 16:
            bullet.style.opacity = "0";
            reloading = false;
            break;

          default:
            requestAnimationFrame(move);
            break;
        }
      });
    };

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowRight") {
        moveCharacter("forward");
      }
      if (event.code === "ArrowLeft") {
        moveCharacter("back");
      }
      if (event.code === "ArrowUp") {
        moveCharacter("up");
      }
      if (event.code === "ArrowDown") {
        moveCharacter("down");
      }

      if (event.code === "Space" && !reloading) {
        fireBullet();
      }
    });