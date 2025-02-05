import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {
    @property({
        type : Label
    })
    public scoreLabel : Label
    @property({
        type : Label
    })
    public hightLabel : Label

    @property({
        type : Label
    })
    public resultEnd : Label
    maxScore  : number = 0;
    currentScore : number;


    updateScore (num : number) {
        this.currentScore = num;
        this.scoreLabel.string = '' + this.currentScore
    }

    resetScore () {
        this.updateScore(0);
        this.hideResult();
    }

    addScore (){
        this.updateScore(this.currentScore + 1);
    }

    showResult () {
        this.maxScore = Math.max(this.maxScore,this.currentScore);
        this.hightLabel.string = 'Hight Score : ' + this.maxScore;
        this.resultEnd.node.active = true;
        this.hightLabel.node.active = true;
    }

    hideResult () {
        this.resultEnd.node.active = false;
        this.hightLabel.node.active = false;
    }
}


