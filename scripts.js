var pos = 0;
            const pacArray = [
                ['images/PacMan1.png', 'images/PacMan2.png'],
                ['images/PacMan3.png', 'images/PacMan4.png']
            ];
            
            const pacMen = []; // This array holds all the pacmen
        
            function setToRandom(scale) {
                return {
                    x: Math.random() * scale,
                    y: Math.random() * scale
                }
            }
            // Factory to make a PacMan at a random position with random velocity
            function makePac() {
                // returns an object with random values scaled {x: 33, y: 21}
                let velocity = setToRandom(10); // {x:?, y:?}
                let position = setToRandom(200);
                let counter = 0;
                let direction = 0;
                let chomp = 0;
             
                // Add image to div id = game
                let game = document.getElementById('game');
                let newimg = document.createElement('img');
                newimg.style.position = 'absolute';
                newimg.src = pacArray[0][0];
                newimg.width = 100;
                //
                newimg.style.left = position.x;
                newimg.style.top = position.y
                //
        
                // add new Child image to game
                game.appendChild(newimg);
                // return details in an object
                return {
                    position,
                    velocity,
                    newimg,
                    counter,
                    direction,
                    chomp
                
                }
            }
        
            function update() {
                //loop over pacmen array and move each one and move image in DOM
                pacMen.forEach((item) => {
                    item.counter++;
                    let forceImageChange = checkCollisions(item)
                    checkImageChange(item,forceImageChange);
                    item.position.x += item.velocity.x;
                    item.position.y += item.velocity.y;
        
                    item.newimg.style.left = item.position.x;
                    item.newimg.style.top = item.position.y;
                });
                setTimeout(update, 20);
            }
            function checkImageChange(item, force){
                const velocityIntensity = (Math.abs(item.velocity.x) + Math.abs(item.velocity.y));
                const biteSpeed = 22-velocityIntensity;
                let factor = Math.floor(biteSpeed);
                let change = force;
                if(item.counter==factor){
                    item.counter=0;
                    item.chomp = (item.chomp+1)%2;
                    change = true;
                }
                if(change) item.newimg.src = pacArray[item.direction][item.chomp];
               console.log(item.chomp);
            }
        
            function checkCollisions(item) {
                let change = false;
                if((item.position.x + item.velocity.x + item.newimg.width > window.innerWidth)||
                (item.position.x + item.velocity.x <0)){
                    item.velocity.x = -item.velocity.x;
                    item.direction = (item.direction+1)%2;
                    change = true;
                } 
              
                if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
                    item.position.y + item.velocity.y <0) {
                        item.velocity.y = -item.velocity.y;
                }
                return change
            }
        
            function makeOne() {
                pacMen.push(makePac()); // add a new PacMan
            }