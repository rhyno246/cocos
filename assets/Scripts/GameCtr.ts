import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input , KeyCode, Node  , Sprite} from 'cc';
const { ccclass, property } = _decorator;
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { PipePool } from './PipePool';

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
        type : CCInteger
    })
    public speed : number = 100;

    @property({
        type : CCInteger
    })
    public pipeSpeed : number = 100;


    initListener () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown , this);
        this.node.on(Node.EventType.TOUCH_START, ()=> {
            this.bird?.birdFly();
        });
    }

    onKeyDown(event : EventKeyboard){
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.SPACE:
                this.result?.addScore();
                break;
            case KeyCode.KEY_Q:
                this.onReset();
                this.bird?.resetBird();
                break;
            default:
                break;
        }
    }

    gameOver () {
        this.result?.showResult();
        this.result?.updateScore(0);
        director.pause();
    }

    onLoad (){
        this.initListener();
        this.result?.resetScore();
        director.pause();
    }

    startGame (){
        this.result?.hideResult();
        director.resume();
    }

    onReset () {
        this.result?.resetScore();
        this.pipeQueue?.reset();
        this.startGame();
    }

    passPipe () {
        this.result?.addScore();
    }

    createPipe () {
        this.pipeQueue?.addPool();
    }
}


