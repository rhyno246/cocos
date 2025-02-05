import { _decorator, Component, find, Node, screen, UITransform, Vec3  } from 'cc';
const { ccclass, property } = _decorator;

const random = (min,max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipe')
export class Pipe extends Component {
    @property({
        type : Node
    })
    public topPipe : Node;

    @property({
        type : Node
    })
    public bottomPipe : Node;


    public tempStartLocationUp = new Vec3(0,0,0);
    public tempStartLocationDown = new Vec3(0,0,0);
    public scenes = screen.windowSize;

    public game; //speed pipe GameController
    public pipeSpeed : number; // final speed off pipe
    public tempSpeed : number; // temporary speed

    isPass : boolean;

    onLoad(){
        this.game = find('GameController').getComponent('GameCtr')
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    initPos() {
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scenes.width;
        this.tempStartLocationDown.x = this.bottomPipe.getComponent(UITransform).width + this.scenes.width;
        let gap = random(90,100);
        let topHeight = random(0,450);
        
        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = topHeight - (gap * 10); 

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);
    }
    
    update(deltaTime: number){
        this.tempSpeed = this.pipeSpeed * deltaTime;
        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

        if(this.isPass == false && this.topPipe.position.x <= 0){
            this.isPass = true;
            this.game.passPipe();

            this.destroy();
        }
    }
}


