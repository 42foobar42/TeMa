var tutorial_levels = {
    title:'Tutorial Levels',
    levels:[1, 2, 3, 4, 5],
    1:{
        startScreen:'This tutorial will explain to you the basics of the game. The goal of the game is to create equations that arise on both sides the same and thus earn points. In this level you have one brick to solve the equation correctly. Use the arrow keys to put the brick on the right position.',
        img:['tutorial/tut1.png'],
        startBricks:[{x:1, y:9, value:4}, {x:3, y:9, value:3}, {x:4, y:9, value:'+'}, {x:5, y:9, value:1}],
        nextBricks:['='],
        winningConditions:{score:4,bricks:0}
    },
    2:{
        startScreen:'Equations can be solved not only horizontally, but also vertically. In this level you get one brick to solve the equation.',
        img:['tutorial/tut2.png'],
        startBricks:[{x:3, y:9, value:2}, {x:3, y:8, value:'+'}, {x:3, y:7, value:3}, {x:3, y:6, value:'='}],
        nextBricks:[5],
        winningConditions:{score:5,bricks:0}
    },
    3:{
        startScreen:'The third possibility to create equations is diagonal. In this level you have two bricks to create equations. You have to earn at least 10 points.',
        img:['tutorial/tut3_1.png', 'tutorial/tut3_2.png'],
        startBricks:[{x:3, y:9, value:2}, {x:4, y:8, value:'+'}, {x:5, y:7, value:1}, 
                     {x:6, y:6, value:'='}, {x:7, y:6, value:'='}, {x:7, y:7, value:4},
                     {x:7, y:8, value:'+'}, {x:7, y:9, value:3}, {x:4, y:9, value:1},
                     {x:5, y:9, value:'+'}, {x:5, y:8, value:'+'}, {x:6, y:9, value:8},
                     {x:6, y:8, value:'-'}, {x:6, y:7, value:5}, {x:6, y:5, value:'-'}],
        nextBricks:[3, 7],
        winningConditions:{score:10,bricks:99}
    },
    4:{
        startScreen:'Sometimes it happens that two numbers or characters are next to each other and it is not possible to generate any equation. Then you can place 3 identical bricks next to each other to make them disappear. This has no effect on the score.',
        img:['tutorial/tut4_1.png', 'tutorial/tut4_2.png'],
        startBricks:[{x:0, y:9, value:8}, {x:1, y:9, value:'+'}, {x:2, y:9, value:3}, 
                     {x:3, y:9, value:'='}, {x:4, y:9, value:5}, {x:1, y:8, value:'+'}],
        nextBricks:['+', '-'],
        winningConditions:{score:5,bricks:0}
    },
    5:{
        startScreen:'An equation with negative results mean that the score will be reduced by the corresponding result. But sometimes that is necessary to produce other equations.',
        img:['tutorial/tut5_1.png', 'tutorial/tut5_2.png', 'tutorial/tut5_3.png'],
        startBricks:[{x:1, y:9, value:6}, {x:2, y:9, value:'-'}, {x:3, y:9, value:5}, 
                     {x:4, y:9, value:'='}, {x:5, y:9, value:3}, {x:6, y:9, value:0},
                     {x:2, y:8, value:2}, {x:2, y:7, value:'&#x00D7;'}, {x:2, y:6, value:1},
                     {x:2, y:5, value:'='},{x:3, y:8, value:'-'}, {x:3, y:7, value:3},
                     {x:3, y:6, value:'='}, {x:4, y:8, value:1}, {x:4, y:7, value:'+'},
                     {x:5, y:8, value:'&#x00D7;'}, {x:0, y:9, value:7}, {x:7, y:9, value:0}
                    ],
        nextBricks:['-', 2, '&#x00D7;'],
        winningConditions:{score:28,bricks:99}
    }
};

