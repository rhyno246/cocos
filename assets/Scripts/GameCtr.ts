import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input , KeyCode, Node  , Contact2DType , Collider2D , IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';



@ccclass('GameCtr')
export class GameCtr extends Component {
    @property({
        type : Ground,
        tooltip : 'this is Ground Components'
    })
    public ground : Ground

    @property({
        type : Result,
        tooltip : 'this is Result Components'
    })
    public result : Result

    @property({
        type : Bird,
        tooltip : 'this is Bird Components'
    })
    public bird : Bird


    @property({
        type : PipePool,
        tooltip : 'this is PipePool Components'
    })
    public pipeQueue : PipePool

    @property({
        type : BirdAudio
    })
    public clip : BirdAudio

    @property({
        type : CCInteger
    })
    public speed : number = 100;

    @property({
        type : CCInteger
    })
    public pipeSpeed : number = 100;

    public isOver : boolean;


    initListener () {
        this.node.on(Node.EventType.TOUCH_START, ()=> {
            if(this.isOver == true){
                this.onReset();
                this.bird.resetBird();
                this.startGame();
            }
            if(this.isOver == false){
                this.bird.birdFly();
                this.clip.onAudioQueue(0)
            }
        });
    }

    gameOver () {
        this.result.showResult();
        this.result.updateScore(0);
        this.clip.onAudioQueue(3);
        this.isOver = true;
        director.pause();
    }

    onLoad (){
        this.initListener();
        this.result.resetScore();
        director.pause();
        this.isOver = true;
    }

    startGame (){
        this.result.hideResult();
        director.resume();
    }

    onReset () {
        this.result.resetScore();
        this.pipeQueue.reset();
        this.isOver = false;
        this.startGame();
    }

    passPipe () {
        this.clip.onAudioQueue(1);
        this.result.addScore();
    }

    createPipe () {
        this.pipeQueue.addPool();
    }

    contactGroundPipe () {
        let collider = this.bird.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT , this.onBeginContact , this)
        }
    }

    onBeginContact (seftCollider : Collider2D , otherCollider : Collider2D , contact : IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck () {
        this.contactGroundPipe();
        if(this.bird.hitSomething == true){
            this.gameOver();
        }
    }

    update(){
        if(this.isOver == false) {
            this.birdStruck();
        }
    }
}


