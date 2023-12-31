<style>
    .bg{
        width: 400px;
        height: 720px;
        max-width: 100vw;
        max-height: calc(100vh - 80px);
    }
    @media (max-width: 1200px) {
        .bg{
            max-height: calc(100vh - 48px);
        }
    }
</style>
<div class="bg" bind:this={game}>
</div>
<script>
    import * as PIXI from 'pixi.js';
    import {onMount} from "svelte";
    const s3 = "https://s3.ap-northeast-2.amazonaws.com/meso.gg/image";
    let objectList = [{
        url: '/image_1.png',
        score: 1
    },{
        url: '/image_2.png',
        score: 3
    },{
        url: '/image_3.png',
        score: 6
    },{
        url: '/image_4.png',
        score: 10
    },{
        url: '/image_5.png',
        score: 15
    },{
        url: '/image_6.png',
        score: 21
    },{
        url: '/image_7.png',
        score: 28
    },{
        url: '/image_8.png',
        score: 36
    },{
        url: '/image_9.png',
        score: 45
    },{
        url: '/image_10.png',
        score: 55
    },{
        url: '/image_11.png',
        score: 66
    }];
    let game;
    let spriteList = [];
    onMount(function (){
        const canvas = document.createElement('canvas');
        const view = canvas.transferControlToOffscreen();

        console.log(game.window)
        const app = new PIXI.Application({ view, background: 0xffffff, resizeTo: game });

        game.appendChild(canvas);

        const container = new PIXI.Container();

        app.stage.addChild(container);

        // Create a new texture

        // Create a 5x5 grid of bunnies
        for (let i = 0; i < objectList.length; i++)
        {
            const texture = PIXI.Texture.from(`${s3}${objectList[i].url}`);
            const sprite = new PIXI.Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.x = (i % 50) * 40;
            sprite.y = Math.floor(i / 5) * 40;
            spriteList.push(sprite);
            container.addChild(sprite);
        }
        console.log(spriteList)

        // Move container to the center
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        // Center bunny sprite in local container coordinates
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;

        // Listen for animate update
        app.ticker.add((delta) =>
        {
            // rotate the container!
            // use delta to create frame-independent transform
            // container.rotation -= 0.01 * delta;
        });

    })

</script>