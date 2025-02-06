import { _decorator, Component, Node, Vec3, screen, find, UITransform, director } from 'cc';
import { GameCtr } from './GameCtr';
const { ccclass, property } = _decorator;

//make a random number generator for the gap
const random = (min,max) => {
    return Math.random() * (max - min) + min
}

@ccclass('Pipe')
export class Pipe extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
     })
     public topPipe: Node;
    
     @property({
        type: Node,
        tooltip: 'Bottom Pipe'
     })
     public bottomPipe: Node;

    public tempStartLocationUp:Vec3 = new Vec3(0,0,0);
    public tempStartLocationDown:Vec3 = new Vec3(0,0,0);
    public scene = screen.windowSize;

    public game;
    public pipeSpeed:number;
    public tempSpeed:number;

    isPass: boolean;

    onLoad (){
        const canvas = director.getScene().getChildByName("Canvas");
        this.game = canvas.getChildByName("GameCtr").getComponent(GameCtr);
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false; 

    }
    initPos() {
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width);

        let gap = random(90,100);
        let topHeight = random(0,450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10));
        
        this.topPipe.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.bottomPipe.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);
    }

    update(deltaTime: number){
        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomPipe.position; 
        this.tempStartLocationUp = this.topPipe.position;
        
        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);
        
        // const poBottom = this.bottomPipe.getPosition();
        // const newPoBottom = new Vec3(poBottom.x - this.tempSpeed ,poBottom.y, poBottom.z);
        // this.bottomPipe.setPosition(newPoBottom);

        // const poTop = this.topPipe.getPosition();
        // const newPoTop = new Vec3(poTop.x - this.tempSpeed ,poTop.y, poTop.z);
        // this.topPipe.setPosition(newPoTop);
    
        if (this.isPass == false && this.topPipe.position.x <= 0)
        {
            this.isPass = true; 
            this.game.passPipe();
        };

        if (this.topPipe.position.x < (0 - this.scene.width)){
            this.game.createPipe();
            this.destroy();
        };

    }
}


