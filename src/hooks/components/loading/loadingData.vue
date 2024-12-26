<template>
    <div class="cube-loader z-20">
        <div class="cube-top"/>
        <div class="cube-wrapper">
                <span class="cube-span" style="--i:0">
                  <span class="taco-container text-center text-5xl">🍕</span>
                </span>
            <span class="cube-span" style="--i:1">
                  <span class="taco-container text-center text-5xl">🍔</span>
                </span>
            <span class="cube-span" style="--i:2">
                  <span class="taco-container text-center text-5xl">🍗</span>
                </span>
            <span class="cube-span" style="--i:3">
                  <span class="taco-container text-center text-5xl">🍩</span>
                </span>
        </div>
    </div>
</template>

<style>
.cube-loader {
    @apply w-20 h-20;
    transform-style: preserve-3d;
    transform: rotateX(-40deg);
    animation: animate 4s linear infinite;
}

@keyframes animate {
    0% {
        transform: rotateX(-30deg) rotateY(0);
    }

    100% {
        transform: rotateX(-30deg) rotateY(360deg);
    }
}

.cube-loader .cube-wrapper {
    @apply absolute w-full h-full;
    transform-style: preserve-3d;
}

.dark {
    --cube-gradient: -webkit-linear-gradient(90deg, hsla(230, 42%, 26%, 0.85) 1%, hsla(258, 34%, 57%, 0.85) 99%);

    .cube-loader .cube-wrapper .cube-span,
    .cube-top,
    .cube-top::before {
        background: var(--cube-gradient);
    }
}

.cube-loader .cube-wrapper .cube-span {
    @apply absolute w-full h-full;
    transform: rotateY(calc(90deg * var(--i))) translateZ(39px);
    background: -webkit-linear-gradient(90deg, hsla(230, 39%, 41%, 0.85) 1%, hsla(257, 47%, 55%, 0.85) 99%);
}

.cube-top {
    @apply absolute w-20 h-20;
    background: -webkit-linear-gradient(90deg, hsla(230, 39%, 41%, 0.85) 1%, hsla(257, 47%, 55%, 0.85) 99%);
    transform: rotateX(90deg) translateZ(39px);
    transform-style: preserve-3d;
}

.cube-top::before {
    @apply absolute w-20 h-20;
    content: '';
    background: -webkit-linear-gradient(90deg, hsla(230, 39%, 41%, 0.85) 1%, hsla(257, 47%, 55%, 0.85) 99%);
    transform: translateZ(-90px);
    filter: blur(10px);
}


</style>